const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json')
const { readdirSync } = require('fs');
const { join } = require('path');
client.commands= new Discord.Collection();
require('dotenv').config();



const toolFiles = readdirSync(join(__dirname, "tools")).filter(file => file.endsWith(".js"));

for (const file of toolFiles) {
    const command = require(join(__dirname, "tools", `${file}`));
    client.commands.set(command.name, command);
    let commandName = file.split(".")[0];
    console.log('Loading Tool Command: '+commandName)
}

const funFiles = readdirSync(join(__dirname, "fun")).filter(file => file.endsWith(".js"));

for (const file of funFiles) {
    const command = require(join(__dirname, "fun", `${file}`));
    client.commands.set(command.name, command);
    let commandName = file.split(".")[0];
    console.log('Loading Fun Command: '+commandName)
}

const manageFiles = readdirSync(join(__dirname, "manage")).filter(file => file.endsWith(".js"));

for (const file of manageFiles) {
    const command = require(join(__dirname, "manage", `${file}`));
    client.commands.set(command.name, command);
    let commandName = file.split(".")[0];
    console.log('Loading Manage Command: '+commandName)
}

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})
// 봇 상태 메시지
const sleep = (ms) => {return new Promise(resolve=>{setTimeout(resolve,ms)})}
client.on('ready', async() => {   
    while(1) {
      client.user.setActivity(`만든사람ㅣ이 시 헌`)
      await sleep(4000)
      client.user.setActivity(`디스코드ㅣqZAZfsgmFE`)
      await sleep(4000)
      client.user.setActivity(`시헌아 도와줘`)
      await sleep(4000)
      client.user.setActivity(`[AD]ㅣ패치중`)
      await sleep(4000)
      client.user.setActivity(`Disocrd Land 커뮤니티`)
      await sleep(4000)
    } 
  })
// 마무리

  let stats = {
    serverID: '',
    total: "",
    member: "",
    bots: ""
}

client.on('guildMemberAdd', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`User: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`User: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bot: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('message', async message => {
    if (/\<\@\![0-9]+\>/.test(message.content) === true) {
        if (message.author.bot) return
        message.channel.send(`**${message.author.tag}** 맨션 감지 :sneezing_face:!`)
      }});

client.login(token);
