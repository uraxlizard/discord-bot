# Discord Bot Commands for Airdrop and Account Verification

This project implements two custom Slash Commands for a Discord bot to manage airdrops and account verification. The commands are designed to interact with a MySQL database and are configured to work with the `discord.js` library.

## Features

1. **Check Airdrops (`/checkairdrop`)**
   - Responds with the number of airdrops available for a Discord user.
   - Fetches data from a MySQL database based on the user's Discord ID.

2. **Verify Account (`/verifyaccount`)**
   - Verifies a user's account using a token provided by the user.
   - Updates the MySQL database to mark the account as verified and associates it with the user's Discord ID.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **discord.js**: Install the `discord.js` library for interacting with the Discord API.
- **MySQL**: A running MySQL instance with tables for managing users and airdrops.