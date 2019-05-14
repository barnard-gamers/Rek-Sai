require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.slice(0, 7) === 'gank to') {
    let target = message.content.trim().split(' ')[2].slice(2, message.content.trim().split(' ')[2].length -1);
    target[0] === "!" ? target = target.slice(1, target.length) : null;

    if (message.author.id === target) {
      message.reply("You can't gank yourself!");
      return;
    }

    if (message.guild.members.find(user => user.id === target).voiceChannel) {
      const targetChannel = message.guild.members.find(user => user.id === target).voiceChannel;
      targetChannel.join().then(connection => {
        const dispatcher = connection.playFile('./reksai.mp3');
        dispatcher.on("end", end => {targetChannel.leave()});
      });
    } else {
      message.reply("The target isn't in voice channel!");
    }
  };
});

client.login(process.env.BOT_TOKEN);
