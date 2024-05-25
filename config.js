import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

//Owner Numbers 
global.owner = [
  ['923013000254', 'wasi', false],
  [''], 
  [''],
]

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0gvODB4UC9aMlJ0di9KUE9URFZVRFR5VklGaXdTY1VDZ2lHNCs4QmpsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkloMkFhbDlyZWpTOTQxY1cwRmtwYmVQTlBzWVRtNkJkMHpCYWh3eTVXUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQTBVbGhsSmw1cHR3bHVMODU0REh5Z25Qa2IxZjg1MUovZjNwU2hrYjJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Wkllc3pDNmE4S1dBbkwxNm9VczJKcGthN3NFZmQ5UGR3NGdHRk5uQ1VnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlNa2hsRTNnUVJZVkRHRmRhZUc1R2hVSVdnUnZkYitMZGNuMmNqRHVpVlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktMeVJmUnROVHdGQWV2YVBiR0VDekh2cnAyaWUyVVVHcmZ6WUtDTktZaUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFB1RVZUYlhFSzZIU2JrVXhVaEVYQkFQTHhLb1BLaW9GRTlFVXhCM2swWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGhWMVIwMDJLRzhSaEZzSXlLWFAzWnhiamJyLzNvQzRoWlRkSDJqYmMzRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM5OXZDeGtxUnE3aXhzQUcxZ3hkRThCRzhrNUFmejVQRHptWnBrZFc2bklJOFJaNktrNUs3a3grTDU5UWNXcmNPRS9lc2duNk1PYitYYm1ZRFg3V2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI1LCJhZHZTZWNyZXRLZXkiOiJNaml3QjRuUklXNFo0eHBNV0FVaEdaNWtOc1FNMjJTT0k5cG8wSnVzVTJNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzAxMzAwMDI1NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwODNERUQzMDU0Q0ZGOEQyNDNBNkI1N0E1NjFFNTk5OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE2NjEwNzgwfV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnTElNdkhDMFNldVM0MGVDU2dZV1RRIiwicGhvbmVJZCI6IjMyMDQyMzY5LTYwMTMtNDkzOC1iMDUyLWExNzEzYmNkOGQ3ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrWmxVUmFKN2JhcHJ1RHlBUDRHdFcrM2MrTEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkxQdHAzNWNjV01KSWsxMytLelR5c2k2LzRnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjMzU1Q3NEo5IiwibWUiOnsiaWQiOiI5MjMwMTMwMDAyNTQ6MzlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4pyuzaLimKDig5/iiZvig53wn4e/afCdkIPwnZCDafCfh7Bp8J2QjfCdlqbwn4en6pOl8J2Qi+KdjfCdkILwnZCH4pig4pyu4oOd8J+YiCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTDdHMUxBREVOTE54YklHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWTV6WW5QMU5UQ1h3WGVjSGtQT2MzVTlKTnc5a3lBYUFqckU0QTc3cHdCZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSGF0ODQwOGwxcnhtRjBlczk3dndBQnEwSkZ0aDU5ajg3dmsyY1F1MmNISmpYV3podVIrSytBekhoVTBYWXJIMXY5L1hia3NLUFJKMmZZMjM3NlJSRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IjVxcWtuOWVEb1kzSDN6SlExOEUvTFN2YVpMSC9PMGpORHB1MkptVVFKY04vM3F4cmYvRGNOdW5kZURIWmEzRzFpbTEzWmdoRmlFZWtUcjg5dmtINmhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDEzMDAwMjU0OjM5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldPYzJKejlUVXdsOEYzbkI1RHpuTjFQU1RjUFpNZ0dnSTZ4T0FPKzZjQVkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTY2MTA3NzMsIm15QXBwU3RhdGVLZXlJZCI6IkFDTUFBS1NzIn0=" //put your bot number here
global.mods = ['923013000254'] 
global.prems = ['923013000254', '923013000254', '923013000254']
global.allowed = ['923013000254']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api.fgmods.xyz': 'dEBWvxCY'
}

// Sticker WM
global.botname = '𓆩⋆𝐙𝐈𝐃𝐃𝐈 𝐊𝐈𝐍𝐆 𝐁𝐀𝐋𝐎𝐂𝐇⋆𓆪'
global.princebot = '𓆩⋆𝐙𝐈𝐃𝐃𝐈 𝐊𝐈𝐍𝐆 𝐁𝐀𝐋𝐎𝐂𝐇⋆𓆪'
global.packname = 'وفـﹿٰٰٰٖٖٖٜ۬ﹿٰٰٖٖـــا کـﹿٰٰٰٖٖٖٜ۬ﹿٰٰٖٖـی تـﹻ۬ﹻۧ۬ﹻﹿٰٰٰٖﹿﹻۧ۬ﹻ۬ـلاش گـﹻۧ۬ﹻٰ۬ﹻٰ۬ﹻۧ۬ﹻ۬ـینگ ۲۰۱۲' 
global.author = 'وفـﹿٰٰٰٖٖٖٜ۬ﹿٰٰٖٖـــا کـﹿٰٰٰٖٖٖٜ۬ﹿٰٰٖٖـی تـﹻ۬ﹻۧ۬ﹻﹿٰٰٰٖﹿﹻۧ۬ﹻ۬ـلاش گـﹻۧ۬ﹻٰ۬ﹻٰ۬ﹻۧ۬ﹻ۬ـینگ ۲۰۱۲' 
global.princeig = 'https://www.instagram.com' 
global.princegp = 'https://chat.whatsapp.com/IhDUWhpX6OWI5q0cMh7tEj'
global.menuvid = ''
global.Princesc = '' 
global.princeyt = 'https://youtube.com/@wasitech1'
global.Princelog = 'https://i.imgur.com/ujxeU8g.jpeg'
global.thumb = fs.readFileSync('./Assets/wasi.png')

global.wait = '*♻️ _𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 𝙵𝙸𝙻𝙴 𝚆𝙰𝙸𝚃..._*\n*▰▰▰▱▱▱▱▱*'
global.imgs = '*🖼️ _𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 ɪᴍᴀɢᴇs 𝚆𝙰𝙸𝚃..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '♻️'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🌀' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
