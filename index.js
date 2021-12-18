/**
 * Create By Zahwa Zein.
 * Contact Me on t.me/zhwzein
 * Follow https://github.com/zhwzein
**/

const { 
    downloadContentFromMessage, 
    generateWAMessageFromContent,
    proto,
} = require("@adiwajshing/baileys-md");

const fs = require('fs')
const { spawn, exec } = require("child_process")
const axios = require("axios")
const chalk = require('chalk')
const ffmpeg = require('fluent-ffmpeg')
const moment = require("moment-timezone");
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')

const { color } = require('./lib/color')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetcher')
const { sleep, uploadImages, getBuffer, getGroupAdmins, getRandom } = require('./lib/functions')
const Exif = require('./lib/exif');
const exif = new Exif();

// CONFIG
publik = true
multi = true
nopref = false
apikey = "YOURAPIKEY"

module.exports = async(client, mek) => {
    try {
        const fromMe = mek.key.fromMe
        const content = JSON.stringify(mek.message)
        const from = mek.key.remoteJid
        const type = Object.keys(mek.message)[0]
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'documentMessage') && mek.message.documentMessage.caption ? mek.message.documentMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : ""
		
        if (multi) {
            var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
        } else {
            if (nopref) {
                prefix = ''
            } else {
                prefix = prefa
            }
        }

        const body = (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ""
		const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''

        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const args = body.trim().split(/ +/).slice(1)
		const arg = budy.slice(command.length + 2, budy.length)
        const ar = args.map((v) => v.toLowerCase())
		const q = args.join(' ')

        const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'
        const ownerNumber = ["62812XXXX@s.whatsapp.net"]
        const isGroup = from.endsWith('@g.us')
        const sender = isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
        
        const fullname =  mek.pushName || "NESYA"
        const pushname = fullname.replace(/ .*/,'');

        const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupOwner = isGroup ? groupMetadata.owner : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''

        const isOwner = ownerNumber.includes(sender)
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        
        const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage')
        const isQuotedMsg = (type == 'extendedTextMessage')
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

        // FUNCTION
        const reply = (string) => {
            client.sendMessage(from, { text: string }, { quoted: mek })
        }

        if (!publik) {
			if (!isOwner && !mek.key.fromMe) return
		}

		if (isCmd && !isGroup) {
			console.log(color('[CMD]', 'cyan'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'orange'), color(prefix + command, 'cyan'), color(pushname, 'orange'), color(sender, 'deeppink'))
		}

		if (!command) {
			console.log(color('[MSG]', 'cyan'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'orange'), color(cmd, 'cyan'), color(pushname, 'orange'), color(sender, 'deeppink'))
		}

        switch (command) {

            // ISLAMI FEATURES
            case 'jadwal': case 'jadwalsholat':
                if (!q) return await reply(`Example : ${prefix + command} Jakarta`)
				get_result = await fetchJson(`https://zenzapi.xyz/api/jadwalshalat?kota=${q}&apikey=${apikey}`)
				get_result = get_result.result
                txt = `*${get_result.kota}*\n\n`
				txt += `Kota : ${get_result.kota}\n`
				txt += `Tanggal : ${get_result.tanggal}\n`
				txt += `Imsyak : ${get_result.imsyak}\n`
				txt += `Subuh : ${get_result.subuh}\n`
				txt += `Dzuhur : ${get_result.dzuhur}\n`
                txt += `Ashar : ${get_result.ashar}\n`
                txt += `Maghrib : ${get_result.maghrib}\n`
                txt += `Isya : ${get_result.isya}`
				reply(txt)
			break
            case 'listsurah':
                get_result = await fetchJson(`https://zenzapi.xyz/api/quran?apikey=${apikey}`)
                get_result = get_result.result
                txt = `Berikut adalah List surah:\n\n`
                for (var x in get_result) {
                    txt += `${x}. ${get_result[x]}\n`
                }
                reply(txt)
            break
            case 'audiosurah':
                if (!q) return await reply(`Example : ${prefix + command} 1`)
                get_result = await getBuffer(`https://zenzapi.xyz/api/quran/audio/${q}?apikey=${apikey}`)
                client.sendMessage(from, { audio: get_result }, { quoted: mek })
            break
            case 'audioayat':
                if (!arg.split('|')) return reply(`Example: ${prefix + command} Nomor Surah | Ayat`)
				const surat = q.substring(0, q.indexOf('|') - 1)
				const ayat = q.substring(q.lastIndexOf('|') + 2)
                get_result = await getBuffer(`https://zenzapi.xyz/api/quran/audio/${surat}/${ayat}?apikey=${apikey}`)
                client.sendMessage(from, { audio: get_result }, { quoted: mek })
            break
            case 'adam': case 'idris': case 'nuh': case 'hud': case 'sholeh': case 'ibrahim': case 'luth': case 'ismail': case 'ishaq': case 'yaqub': case 'yusuf': case 'ayyub': case 'syuaib':
            case 'musa': case 'harun': case 'dzulkifli': case 'daud': case 'sulaiman': case 'ilyas': case 'ilyasa': case 'yunus': case 'zakariya': case 'yahya': case 'isa': case 'muhammad':
                get_result = await fetchJson(`https://zenzapi.xyz/api/kisahnabi/${command}?apikey=${apikey}`)
                get_result = get_result.result
                txt = `Nama : ${get_result.name}\n`
                txt += `Lahir : ${get_result.lahir}\n`
                txt += `Umur : ${get_result.age}\n\n`
                txt += `Story : ${get_result.story}`
                reply(txt)
            break
            case 'kisahmuslim':
                get_result = await fetchJson(`https://zenzapi.xyz/api/kisahmuslim?apikey=${apikey}`)
                get_result = get_result.result
                txt = `Judul : ${get_result.Judul}\n\n`
                txt += `Cerita : ${get_result.Cerita}\n`
                ini_buffer = await getBuffer(get_result.Thumb)
                client.sendMessage(from, { image: ini_buffer, caption: txt }, { quoted: mek })
            break
            case 'asmaul': case 'asmaulhusna':
				get_result = await fetchJson(`https://zenzapi.xyz/api/asmaulhusna?apikey=${apikey}`)
				get_result = get_result.result
				txt = `index : ${get_result.index}\n`
				txt += `latin : ${get_result.latin}\n`
				txt += `arab : ${get_result.arabic}\n`
				txt += `id : ${get_result.translation_id}\n`
				txt += `en : ${get_result.translation_en}`
				reply(txt)
			break
            case 'quran':
				get_result = await fetchJson(`https://zenzapi.xyz/api/qurans?apikey=${apikey}`)
				get_result = get_result.result
				txt = `Surat : ${get_result.id.surat}\n`
				txt += `Ayat : ${get_result.id.ayat}\n`
				txt += `Teks : ${get_result.id.teks}\n\n`
				txt += `Teks Ar : ${get_result.ar.teks}`
				reply(txt)
			break

            // DOWNLOADER FEATURES
            case 'pinterest':
                if (!q) return await reply(`Example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/pinterestdl?url=${q}&apikey=${apikey}`)
                get_buffer = await getBuffer(get_result.result)
                client.sendMessage(from, { video: get_buffer }, { quoted: mek })
            break
            case 'tiktok':
                if (!q) return await reply(`Example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/musically?url=${q}&apikey=${apikey}`)
                get_result = get_result.result.nowm
                get_buffer = await getBuffer(get_result)
                client.sendMessage(from, { video: get_buffer }, { quoted: mek })
            break
            case 'tiktokaudio':
                if (!q) return await reply(`Example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/musically?url=${q}&apikey=${apikey}`)
                get_result = get_result.result.audio_original
                get_buffer = await getBuffer(get_result)
                client.sendMessage(from, { audio: get_buffer }, { quoted: mek })
            break
            case 'twitter':
                if (!q) return await reply(`Example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/twitter?url=${q}&apikey=${apikey}`)
                get_result = get_result.result
                txt = `Twitter Downloader\n\n`
                txt += `Desc : ${get_result.desc}`
                get_buffer = await getBuffer(get_result.HD)
                client.sendMessage(from, { video: get_buffer, caption: txt }, { quoted: mek })
            break
            case 'facebook': case 'fb':
                if (!q) return await reply(`Example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/facebook?url=${q}&apikey=${apikey}`)
                get_result = get_result.result
                txt = `Facebook Downloader\n\n`
                txt += `Title : ${get_result.title}`
                get_buffer = await getBuffer(get_result.url)
                client.sendMessage(from, { video: get_buffer, caption: txt }, { quoted: mek })
            break

            case 'joox':
                if (!q) return await reply(`Example : ${prefix + command} judul`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/joox?query=${q}&apikey=${apikey}`)
                get_result = get_result.result
                get_buffer = await getBuffer(get_result.mp3Link)
                client.sendMessage(from, { audio: get_buffer }, { quoted: mek })
            break

            case 'scdl': case 'soundcloud':
                if (!q) return await reply(`Example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/soundcloud?url=${q}&apikey=${apikey}`)
                get_result = get_result.result
                get_buffer = await getBuffer(get_result.url)
                client.sendMessage(from, { audio: get_buffer }, { quoted: mek })
            break

            case 'xnxx': case 'xvideos':
                if (!q) return await reply(`Example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/downloader/${command}?url=${q}&apikey=${apikey}`)
                get_result = get_result.result
                txt = `Title : ${get_result.title}\n`
                txt += `Duration : ${get_result.duration}\n`
                get_buffer = await getBuffer(get_result.files.low)
                client.sendMessage(from, { video: get_buffer, caption: txt  }, { quoted: mek })
            break

            case 'cocofun':
                if (!q) return reply(`example : ${prefix + command} url`)
                get_result = await fetchJson(`https://zenzapi.xyz/api/cocofun?url=${q}&apikey=${apikey}`)
                get_result = get_result.result
                txt = `Title : ${get_result.title}\n`
                txt += `Desc : ${get_result.desc}\n`
                txt += `Like : ${get_result.like}\n`
                txt += `Play Count : ${get_result.play_count}`
                get_buffer = await getBuffer(get_result.url)
                client.sendMessage(from, { video: get_buffer, caption: txt  }, { quoted: mek })
            break

            case 'gore':
                get_result = await fetchJson(`https://zenzapi.xyz/api/gore?apikey=${apikey}`)
                get_result = get_result.result
                txt = `Title : ${get_result.title}\n`
                txt += `Tag : ${get_result.tag}`
                get_buffer = await getBuffer(get_result.video1)
                client.sendMessage(from, { video: get_buffer, caption: txt  }, { quoted: mek })
            break

            case 'tikporn':
                get_result = await fetchJson(`https://zenzapi.xyz/api/tikporn?apikey=${apikey}`)
                get_result = get_result.result
                txt = `Title : ${get_result.title}\n`
                txt += `Desc : ${get_result.desc}`
                get_buffer = await getBuffer(get_result.video)
                client.sendMessage(from, { video: get_buffer, caption: txt  }, { quoted: mek })
            break

            case 'hentaivid':
                get_result = await fetchJson(`https://zenzapi.xyz/api/hentaivid?apikey=${apikey}`)
                get_result = get_result.result
                txt = `Title : ${get_result.title}\n`
                txt += `Category : ${get_result.category}`
                get_buffer = await getBuffer(get_result.video_1)
                client.sendMessage(from, { video: get_buffer, caption: txt  }, { quoted: mek })
            break

            // SOON
            
            case 'motivasi': case 'dilanquote': case 'bucinquote': case 'katasenja': case 'puisi': {
                let anu = await fetchJson(`https://zenzapi.xyz/api/${command}?apikey=${apikey}`)
                let buttons = [
                    { buttonId: prefix + command, buttonText: {displayText: 'Next'}, type: 1 }
                ]
                let buttonMessage = {
                    text: anu.result.message,
                    footer: 'Random ' + command,
                    buttons: buttons,
                    headerType: 2
                }
                client.sendMessage(from, buttonMessage, { quoted: mek })
            }
            break

            case 'anime': case 'waifu': case 'husbu': case 'neko': case 'shinobu': case 'megumin':
                buffer = await getBuffer(`https://zenzapi.xyz/api/random/${command}?apikey=${apikey}`) 
                client.sendMessage(from, { image: buffer, caption: 'Generate Random ' + command }, { quoted: mek })
            break

        }

    } catch (e) {
		e = String(e)
        console.log(color('[ERR]', 'red'), color(e, 'cyan'))
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.cyan(`UPDATE ${__filename}`))
	delete require.cache[file]
	require(file)
})
