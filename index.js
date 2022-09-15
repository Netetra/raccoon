const crypto = require('crypto')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [ 'DIRECT_MESSAGES', 'GUILD_MESSAGES' ,'GUILDS' ,]});
const yts = require( 'yt-search' )
const ver = require('./package.json').version;
const token = require( "./token.json" );
const commands = require( "./commands.json" );
//const commands2 = require("./math.json")

///関数
function md5hex(str) {
    const md5 = crypto.createHash('md5')
    return md5.update(str, 'binary').digest('hex')
}

function sha256hex(str) {
    const sha2 = crypto.createHash('sha256')
    return sha2.update(str, 'binary').digest('hex')
}

///コマンドの定義とスタートアップ
client.once("ready", async () => {
    await client.application.commands.set(commands);
    setInterval(() => {
        client.user.setActivity({
            name: `Severs:${client.guilds.cache.size}|v${ver}`
        })
    }, 10000)
    console.log("Hello WR");
});

///コマンドの処理
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    };
    switch (interaction.commandName) {
        case "embed":
            let titlew =  interaction.options.getString("title")
            let descriptionw =  interaction.options.getString("description")
            await interaction.reply({embeds: [{
                title: titlew,
                color: 0xFFFFFF, 
                description: descriptionw}]});
        case "slot":
            let emoji = [":innocent: ",":poop: ",":face_with_symbols_over_mouth: ",":eyes: ",":monkey_face: ",":thinking: ",":radioactive: ",":computer: ",":cockroach: ",":face_vomiting: ",":thumbsdown: ",":nauseated_face: ",":sunglasses: ",":beer: ",":100: ",":pill: ",":gem: ",":fox: ",":hatching_chick: ",":strawberry: ",":squid: ",":chicken: ",":briefs: ",":smiling_imp: ",":avocado: ",":space_invader: ",":mechanical_arm: "];
            let n = (interaction.options.getNumber("n") * 2) + 1;
            let slot = "";
            if (n > 11){
                await interaction.reply("5以下の数値を入力してください");
                return;
            }
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    slot = slot + emoji[Math.floor(Math.random() * emoji.length)]
                }
                slot = slot + "\n";
            }
            await interaction.reply(slot);
        case "yts":
            let url = yts( interaction.options.getString("string"), async function ( err, r ) {
                let msg = "動画が見つかりませんでした";
                try{
                    msg = r.videos[0].url;
                }catch{
                    ;
                }
                await interaction.reply(msg);
            })
        case "crypt":
            switch (interaction.options.getString("hash")) {
                case "md5":
                    await interaction.reply(md5hex(interaction.options.getString("string")));
                case "sha256":
                    await interaction.reply(sha256hex(interaction.options.getString("string")));
            }
        case "rinvite":
            const args = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = '';
            for (let i = 0; i < 8; i++){
                result += args.charAt(Math.floor(Math.random() * 36));
            }
            await interaction.reply("discord.gg/"+result);
        case "info":
            await interaction.reply({embeds: [{
                title: "このbotについて",
                color: 0xFFFFFF, 
                description: `${client.user.tag}`,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.displayAvatarURL,
                },
                fields: [
                    {
                        name: "version",
                        value: "v"+ver,
                        inline: true,
                    },{
                        name: "ping",
                        value: `${client.ws.ping}ms`,
                        inline: true,
                    },{
                        name: "製作者",
                        value: "Netetra",
                        inline: true,
                    }
                ],
            }]});
    }
});

client.login(token["bot"]);
