const resume = require('./resume.json');

module.exports = (controller) => {
     const nextQs =  {
            text: "Is there anything else you would like to know about me?",
            quick_replies : [
                {
                    title: "Work",
                    payload: "work"
                },
                {
                    title: "Profiles",
                    payload: "profiles"
                },
                {
                    title: "Education",
                    payload: "education"
                },
                {
                    title: "Skills",
                    payload: "skills"
                },
                {
                    title: "No",
                    payload: "bye"
                }
            ]
        };

    controller.hears('Yes, I would like to know more about your recent education','message',async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        await bot.changeContext(message.reference);
        let recentEd = resume.education[0];
        let courses = recentEd.courses.join(", ")
        setTimeout(async () => {
            await bot.reply(message, {type: 'typing'});
            await bot.changeContext(message.reference);
            await bot.reply(message, `I went to ${recentEd.institution}. I majored in ${recentEd.area}
        \nI have a ${recentEd.studyType}'s degree.
        \nI graduated on ${recentEd.endDate} with ${recentEd.gpa}
        \nI took several courses such as ${courses}
        `) 
        },1000)
        setTimeout(async () => {
           await bot.reply(message, nextQs);
        },1500)
    });

    controller.hears(['school', 'education','bootcamp', 'major'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        await bot.changeContext(message.reference);
        setTimeout(async () => {
            const themostRecentEd = {
                text: `Would you like to know more about my recent education?`,
                quick_replies: [
                    {
                        title: 'Yes',
                        payload: 'Yes, I would like to know more about your recent education'
                    },
                    {
                        title: 'No',
                        payload: 'No, I would like to ask another question'
                    },
                ]
            }   

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

            if (previousEd.length > 0) previousEd = previousEd.join(" & ")
                await bot.reply(message, {type: 'typing'});
                await bot.changeContext(message.reference);
                await bot.reply(message, `I went to ${recentEd}. I majored in ${major}.`);
                await bot.reply(message, `I also went to ${previousEd}.`)

            setTimeout(async () => {
                await bot.reply(message, {type: 'typing'});
                await bot.changeContext(message.reference);
                await bot.reply(message, themostRecentEd)
            },500)
        }, 1000);
    });
}
