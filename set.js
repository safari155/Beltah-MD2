const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUQvOUN4eFZzUXJxenlWL2cwOWVoTWdlcDRZSE54RkpsM3lwUFZ4SjlHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGFmbmNRQy9ndUxMd2srK1VFNFdJMXlUMmlLQmliWWJqcUtZZk9oLzZDMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrSFQ2YjM1UUEreStaL3pqcXVSQlNTSEVQNTAvMFN2U2pwZko2VENJakdnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0dzN3U3NXVHBzbUZ5WGZtcU50b2J3MmJRNm9YR1RkNHJXUVFtRTE3d1hRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllIelBTUlUxVGtVQU0wbUtzUk9WSi9PL2VnMElsUGkxSG1TN09yM0wvV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJOZEFLd0JMUGZLcldlQWo1OGxBdkJVdXdpdHN2S3JnVU40aEhMN3hwVFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk5rTFkrZzZYbFJIalpFaEowMmtEU1QzZjFuL2FlN1N6Y0cyQlRuN1pVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzNoTk5RcUQ4NTV0Zy9tcmp0TEN1Ri9CTFAzRzRuWXZqYVpzbHBsOHl5ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5EM1R0dkFlRE9EcmZwQWlKaHZBS0sva2hsZFVnSXZReG1lYWZvTENHZW9xWkJLc2ZTRitIWVZYZk9pVzdwdHZDdVBwcFRuUVp1cjU3V1AvMXcva0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IjhOcVFHMFNzellXT3loWWlzVzBZck5ESno2Mzd6T1pIcklMRUlBbjZhNWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InF1S1U3ZjBTUXltX1phM1VFbXVkQ2ciLCJwaG9uZUlkIjoiYzhiZWYxNDAtOGYyYS00YzRhLTg1OWMtN2U0ZWMwZjZkZjEyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRJeUZobTJ6S2dNTkhhOVVTVWVrSnB6YStGOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiVmNVanB1ZGkzSUpuMXRmZzBWTDcxcWNzOWs9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlZGVlJQTDUiLCJtZSI6eyJpZCI6IjI2MDk3MTgxNjk1Njo4NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNYWtvIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMS3Bsc2tFRUtpSHk3UUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5d3RnQXloRXY3bEVkQUFKbDFBTmRPNks0M3lTTzN6UDNEZ0pjS1NPaW13PSIsImFjY291bnRTaWduYXR1cmUiOiJBTjlhcWt3VzNOOGt0TWJ2WThDNlJ1Q1dlQmpsSnZ0RndVcWtFaTh4VllNQ0ZPWVB2OU42TWh1Wk52QzFSZ1p0anV5aG5SOXFpUmlFZERadmpKVmpDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTUlaSlJZaUlNZEZiN3JUbUdLWmp1WVh6TFcxZDY0ZmFBLyt6OCsvSFFKOFg5S1VlNm9wbU5SR3pUTDhJUWI1ZVdOZW83dFNuWkcwa3hvdEwvbXpkQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjA5NzE4MTY5NTY6ODVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmNMWUFNb1JMKzVSSFFBQ1pkUURYVHVpdU44a2p0OHo5dzRDWENram9wcyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDg5NDM4OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFObXgifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "KING👑MAKO",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'MAKO✨🥀',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
