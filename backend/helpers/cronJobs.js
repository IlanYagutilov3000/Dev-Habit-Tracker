const cron = require("node-cron");

cron.schedule("0 0 * * *", () => {
    console.log("🌙 Midnight reset — new day started!", new Date().toLocaleDateString());
    // future: send reminder emails
    // future: cleanup old logs
})

module.exports = cron