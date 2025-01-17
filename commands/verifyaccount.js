const { SlashCommandBuilder } = require('discord.js');
const { createConnection } = require('mysql');
const config = require('../config.json');

// Prepare the mysql connection
const con = createConnection(config.mysql);
// Then we are going to connect to our MySQL database and we will test this on errors
con.connect(err => {
	// Console log if there is an error
	if (err) return console.log(err);
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verifyaccount')
		.setDescription('Verify account with token generated in your redeemnft.io profile!')
		.addStringOption(option => option.setName('token').setDescription('The user\'s nonce to verify')),
	async execute(interaction) {
		const username = interaction.user.username.toString();
		const discordid = interaction.user.id.toString();
		const nonce = interaction.options.getString('token');
		con.query(`SELECT * FROM users WHERE nonce LIKE '${nonce}'`, (err, rows) => {
			if (err) return console.log(err);
			if (rows && rows.length > 0) {
				const data = JSON.stringify(rows);
				const parse_result = JSON.parse(data);
				const verified = parse_result[0].is_verified;
				const user_id = parse_result[0].id;
				if (!verified == 1) {
					con.query(`UPDATE airdrops SET discord_id = '${discordid}' WHERE user_id LIKE '${user_id}'`, (err) => {
						if (err) return console.log(err);
					});
					con.query(`UPDATE users SET is_verified = true WHERE nonce LIKE '${nonce}'`, (err) => {
						if (err) return console.log(err);
						return interaction.reply(`Hey ${username}, your account was verified! You can now login to your redeemnft.io account and fetch your nfts!`);
					});
				}
				else {
					return interaction.reply(`Oppps ${username}, it looks like your account was already verified!`);
				}
			}
			else {
				return interaction.reply(`Oppps ${username}, it looks like your token is wrong!`);
			}
		});
	},
};