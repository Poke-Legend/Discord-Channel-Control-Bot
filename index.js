require('dotenv').config(); // Load environment variables from .env file
const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '!'; // Your bot's command prefix
const allowedRoleIds = [process.env.ALLOWED_ROLE_ID, process.env.ALLOWED_ROLE_ID2]; // Array of allowed role IDs
const lockEmoji = '❌';
const unlockEmoji = '✅';

client.on('ready', () => {
    console.log(`CODED BY DEVRY`);
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`CHANNEL CONTROL BOT ONLINE`);
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'lock') {
        // Check if the user has any of the allowed roles to lock channels
        if (!message.member.roles.cache.some(role => allowedRoleIds.includes(role.id))) {
            // User does not have permission embed
            const noPermissionEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permission Denied')
                .setDescription('You do not have permission to use this command.');

            return message.channel.send({ embeds: [noPermissionEmbed] });
        }

        const channel = message.channel;

        if (!channel.name.startsWith(lockEmoji)) {
            const newName = `${lockEmoji}${channel.name.replace(unlockEmoji, '')}`;
            await channel.setName(newName);

            // Send lock message with embed
            const lockEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Channel Locked')
                .setDescription(`${message.author} has locked this channel.`);

            await message.channel.send({ embeds: [lockEmbed] });
        } else {
            // Channel is already locked embed
            const alreadyLockedEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Channel Already Locked')
                .setDescription('This channel is already locked.');

            await message.channel.send({ embeds: [alreadyLockedEmbed] });
        }

        // Delete the user's command message
        await message.delete();
    } else if (command === 'unlock') {
        // Check if the user has any of the allowed roles to unlock channels
        if (!message.member.roles.cache.some(role => allowedRoleIds.includes(role.id))) {
            // User does not have permission embed
            const noPermissionEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permission Denied')
                .setDescription('You do not have permission to use this command.');

            return message.channel.send({ embeds: [noPermissionEmbed] });
        }

        const channel = message.channel;

        if (channel.name.startsWith(lockEmoji)) {
            const newName = `${unlockEmoji}${channel.name.replace(lockEmoji, '')}`;
            await channel.setName(newName);

            // Send unlock message with embed
            const unlockEmbed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Channel Unlocked')
                .setDescription(`${message.author} has unlocked this channel.`);

            await message.channel.send({ embeds: [unlockEmbed] });
        } else {
            // Channel is already unlocked embed
            const alreadyUnlockedEmbed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Channel Already Unlocked')
                .setDescription('This channel is already unlocked.');

            await message.channel.send({ embeds: [alreadyUnlockedEmbed] });
        }

        // Delete the user's command message
        await message.delete();
    }
});

client.login(process.env.BOT_TOKEN); // Use the bot token from .env file
