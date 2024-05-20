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

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0gzZkkvTzhVOUU3U0lxWUZScHkxK2FLWlNCQURnRDJqRmd6YU1jZ3pHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlEzc2ZMVEVrV2tHb2ZCYW1QN1RLRnoyVG5IOEQ1WnBhRS8wbmdVV1VUQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySndDTnhCbEd1cXV3b2N4WFdtaDE1WEpENVRaM3dkWkJtY1N2U29TcUdBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6SkYydDRRakdnL1d1c3FoTlR0OWFEdHVmU2Q3MlhxRHBmSjNUTEM0dW1VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVBL1pWR3ZmaXRoMlZqV1pEdkFBVWwwQWt4RE81cmR3S2o2QklNcUlCMDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpZMjhxSC9jNWJVbFBZMGFlL2pmQnc5TUd2cVVSME43UTJQRlVJL2hGalk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUYwVXI4RkhSRlhYMFBWN3hyckpxdnFXTGRCa2JhMGV1U0J6eURDdkVVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGc1RXgyZElYSW5yaGRkOTVMMk1jbmFEelNMSWl5QjJpaXIvSzBnTzEzdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkluYTlUOHU3M2VlNENvZVF2U0pGK1R1VEs4TytyK0FESmR1MFVWWmcycU5UT2MzVEE1aUJDTVNiWFhKOXdUVWJrU091eUdOeUN0WXNyWDl2cmhLcENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6InQxTWRmeFdSZ09qNUlUbXB6ejhHdG96RXdaS2g1aEEzblprcUI3R3AzaFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDEzMDAwMjU0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkIyRTZFNkI0ODNCQkJCMUQ5RDg0NDQ2QjVGRDY1MzVDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTYyMTAyMTB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkFDWDBCS1k2VDdDS3ZuS0dPYVVqM0EiLCJwaG9uZUlkIjoiNWE0ZGM5ZGYtZmQ2ZC00MTUwLWI2YTktZDA1ZjNmYzIwMTAxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllSdFRycS9vTTJjeU5aSW9pUEgvZlpkc0pNUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrWVpiSmJVekNqRWN1VFJOOVFSSWxQYkpoZlE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMUZIWUVZUk4iLCJtZSI6eyJpZCI6IjkyMzAxMzAwMDI1NDozOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLinK7NouKYoOKDn+KJm+KDnfCfh79p8J2Qg/CdkINp8J+HsGnwnZCN8J2WpvCfh6fqk6XwnZCL4p2N8J2QgvCdkIfimKDinK7ig53wn5iIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMN0cxTEFERUp5VXJiSUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZNXpZblAxTlRDWHdYZWNIa1BPYzNVOUpOdzlreUFhQWpyRTRBNzdwd0JnPSIsImFjY291bnRTaWduYXR1cmUiOiJkWWJqek44OE5WTUp1Rkh4bkFRalNKSzdkZUFwbTlRZkJyb2YwRiswYUZDMEthOGNhQ0oyOVRIeE9Xd0RCWmNic0EzeUxiNklCT2dqMTRsdUlZNWhDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSi9leXRRVE9SU0hna1A2a1NjditHdk4rdFR0dU90VHBKVGw2SHQyK0FtelJIc21SQlR4S3lGSE5LNWxTRkdvSHdSQXJWY3ppZ0RjclhUbkw4SWRxREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMwMTMwMDAyNTQ6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV09jMkp6OVRVd2w4RjNuQjVEem5OMVBTVGNQWk1nR2dJNnhPQU8rNmNBWSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNjIxMDIwNywibXlBcHBTdGF0ZUtleUlkIjoiQUNNQUFLU3MifQ==" //put your bot number here
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
global.botname = '𝗪𝗔𝗦𝗜-𝗠𝗗'
global.princebot = '🛡️𝗪𝗔𝗦𝗜 𝗧𝗘𝗖𝗛🛡️'
global.packname = '𝗪𝗔𝗦𝗜♥️' 
global.author = '𝗧𝗘𝗖𝗛♥️' 
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
