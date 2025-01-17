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
		.setName('checkairdrop')
		.setDescription('Replies with how many airdrops a user have!'),
	async execute(interaction) {
		const username = interaction.user.username.toString();
		const discordid = interaction.user.id.toString();
		con.query(`SELECT total_airdrops FROM airdrops WHERE discord_id LIKE '${discordid}'`, (err, rows) => {
			if (rows && rows.length > 0) {
				const result = JSON.stringify(rows);
				const parse_result = JSON.parse(result);
				const airdrops = parse_result[0].total_airdrops;
				// Return if there is an error
				if (err) return console.log(err);
				return interaction.reply(`Hey, ${username}! You have ${airdrops} airdrops right now.`);
			}
			return interaction.reply(`Hey, ${username}! Unfortunately you are missing from our database.`);
		});
	},
};