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

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkNrcUNZN3BrYmhyZUYycEhneDA2b3Bhd21VQ1o2V3FOaG1HeHBuSGVIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDZGeHhCVjdIRkNIdUpGTm5jY1p3WWZZeFZHQldTUmEwWTFZc0dHbWUzQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0QVZibmxQM2ZHTlg2TXJZNU1FK2JPL3g0OHJEd3VacVJZTThRWEh6RWtJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCMS9mK1hmeW9GTFJoaUU0SmVZaVRjdHloN2RhQ04yTDczL2xXZWVpbUI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBFV0NOU2o0SnZTT0hpNVNob1c2eWdsanBvbXhJaWRnNnNjWW9RN1NKa2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imh2QTF3RkIraHpIUjI5SXljc0JQRTJMZ2JTelQvbXZFd3EwdGhzVE5YaHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUI2eStocXFqT0RoTW1FQUdOUGtncHpscldzOEZBclRVcHY0L2ZaVTAzND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEVsMXJhanAzK0UyeVdob0FPV3BIWjl1YnQzOW8rZnNhaXhpeEVuUGxRVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlHR3hpWkVHNUE5TktZcENYNHQ4N3NCRmtVbFFtczh2OGdqWmdHaDRJRmdDTy83VmZkU1dQRDJpNUxpdlNzUXdURXM4VGhmSnBxZFBybUVUbitSbURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjMsImFkdlNlY3JldEtleSI6IjZSUFFWYVk0dXJITmpFUjduZXQrWnVxSXk1bUZyWlVjNWh6aER1ZVQ5NUE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDEzMDAwMjU0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjFDNUJGQjY1QTlEOEE0MTRCNTZCQkU0MzZFNDU5OUMyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTY3OTg1MTJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImtzaXpCMFFCUkM2SV93ZU9fT1NpSlEiLCJwaG9uZUlkIjoiZmY3MWU2YmUtYWQ1Mi00NWM2LTkyNDEtNjdlZTFlNzlmNDBiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRtdHJSOWFXcG1RdEY2WFpqbXhkV09qdURscz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEam4rbExHeXR0dTFkZ1dueVNlTytWWGNlS2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNU5SM1lTV0EiLCJtZSI6eyJpZCI6IjkyMzAxMzAwMDI1NDo0MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLinK7NouKYoOKDn+KJm+KDnfCfh79p8J2Qg/CdkINp8J+HsGnwnZCN8J2WpvCfh6fqk6XwnZCL4p2N8J2QgvCdkIfimKDinK7ig53wn5iIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNML0cxTEFERUtpSTBiSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZNXpZblAxTlRDWHdYZWNIa1BPYzNVOUpOdzlreUFhQWpyRTRBNzdwd0JnPSIsImFjY291bnRTaWduYXR1cmUiOiJEV3ZtcUJjdmxac0poRUdsQXVrODhyOFk0NDMzSFdxU25mdFlkMzRGNS9uUHJjczJpV3QwRlBkR3JJTThVZFZuQjZTSFpCdUNORHdzeHA3ZFE4ZjRCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRGhSU2ZmV2F0UzBFd0dQRE44Y1c4dnplKzFhWDVFa0hWRWtoL3NEa0pSVkM4aHJNT3dpUms2ZHBBcHpiT1Q3a0RGRmJ0Wkk3UldXOEhrMjYxUE9xQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMwMTMwMDAyNTQ6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV09jMkp6OVRVd2w4RjNuQjVEem5OMVBTVGNQWk1nR2dJNnhPQU8rNmNBWSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNjc5ODUwNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLUzYifQ==" //put your bot number here
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
