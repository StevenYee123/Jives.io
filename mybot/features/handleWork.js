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

   controller.hears('Yes, I would like to know more about your current work','message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        await bot.changeContext(message.reference);

        let cWork = resume.work[0];

        setTimeout(async () => {
            await bot.reply(message, `I currently work at ${cWork.company} as a ${cWork.position} from ${cWork.startDate}. 
            \nHere is the company website: ${cWork.website}. 
            \nI do ${cWork.summary}` );
        },500)

        setTimeout(async () => {
        await bot.reply(message, nextQs);
        },500)

   });

    controller.hears(['previous job','work','job','current work','current job','job history'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            const currentJob = {
                text: `Would you like to know more about my current job?`,
                quick_replies: [
                    {
                        title: 'Yes',
                        payload: 'Yes, I would like to know more about your current work'
                    },
                    {
                        title: 'No',
                        payload: 'No, I would like to ask another question'
                    },
                ]
            }    

            let info = resume.work
            let currComp = "";
            let companies = [];
            let position = "";

            info.forEach((hash, i) => {
                if (i === 0) {
                    currComp += hash.company
                    position = hash.position
                } else {
                    companies.push(hash.company)
                }
            })

            function displayCompanies () {
                if ( companies.length > 0 ) {
                    companies = companies.join("&")
                    return `I work at ${currComp}. I used to work at ${companies}.`
                } else {
                    return `I work at ${currComp} as ${position}.`
                }
            }

            await bot.changeContext(message.reference);
            await bot.reply(message, displayCompanies());
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
               await bot.reply(message,currentJob);
            },1000)   

        }, 500);
    });

    controller.hears('another question','message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        await bot.changeContext(message.reference);
        setTimeout(async () => {
           await bot.reply(message, nextQs);
        },500)
    })

    controller.hears('bye', 'message', async(bot,message) => {
        await bot.reply(message, {type: 'typing'});
        await bot.changeContext(message.reference);
        setTimeout(async () => {
        await bot.reply(message, "Bye! Hope to see you soon!")
        },500)
    })
}