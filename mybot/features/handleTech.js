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
                    title: "About Me",
                    payload: "about me"
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

 

    controller.hears(['tech','technologies','skills'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        
        setTimeout(async () => {

            let info = resume.skills[0].keywords;

            let skills = "";

            info.forEach((hash, i) => {
                if (i < info.length - 1) {
                    skills += (hash + ", ");
                } else {
                    skills += hash
                }
            })

            function displaySkills () {
                // return `test`;
                return skills;
            }

            await bot.changeContext(message.reference);
            await bot.reply(message, displaySkills());
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
               await bot.reply(message,currentJob);
            },1000)   

        }, 500);
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            await bot.reply(message, nextQs);
        },1500)
    });
}