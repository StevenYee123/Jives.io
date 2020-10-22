const resume = require('./resume.json');

module.exports = (controller) => {
    controller.hears(['school', 'education','bootcamp', 'major'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            let info = resume.education
            let recentEd = "";
            let previousEd = [];
            let major = "";
            info.forEach((hash, i) => {
                if (i === 0) {
                    recentEd += hash.institution
                    major = hash.area
                } else {
                    previousEd.push(hash.institution)
                }
            })

            if (previousEd.length > 0) previousEd.join(" & ")

            await bot.changeContext(message.reference);
            await bot.reply(message, `I went to ${recentEd}. I majored in ${major}.`);
            await bot.reply(message, `I also went to ${previousEd}`)
        }, 500);
    });
}
