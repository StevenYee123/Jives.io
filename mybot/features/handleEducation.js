const resume = require('./resume.json');

module.exports = (controller) => {

    controller.hears( ['name', 'first name', 'full name', 'last name','profile'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            let info = resume.basics
            // will have to reset context because turn has now ended.
            await bot.changeContext(message.reference);
            await bot.reply(message, `I am ${info.name}. I am a ${info.label}`)
        }, 800);
    });

   controller.hears( ['phone','contact', 'phone number','email', 'reach out'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            let info = resume.basics
            // will have to reset context because turn has now ended.
            await bot.changeContext(message.reference);
            await bot.reply(message, `Here's my phone number: ${info.phone} and my email address: ${info.email}`)
        }, 800);
    });

    controller.hears(['previous job','work','job','current work','current job','job history'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
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
            // await bot.reply(message,`Would you like to know more about my current job?`);
            // here we would like to put quick replies as well (Yes or No)
            const currentJob = {
                text: `Would you like to know more about my current job?`,
                quick_replies: [
                    {
                        title: 'Yes',
                        payload: 'hello'
                    },
                    {
                        title: 'No',
                        payload: 'help'
                    },
                ]
            }
            await bot.reply(message,currentJob);
       
        }, 500);
    });

 



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
    // back here
            // function displayCompanies () {
            //     if ( companies.length > 0 ) {
            //         companies = companies.join("&")
            //         return `I work at ${currComp}. I used to work at ${companies}.`
            //     } else {
            //         return `I work at ${currComp} as ${position}.`
            //     }
            // }

            await bot.changeContext(message.reference);
            await bot.reply(message, `I went to ${info.institution}. I majored in ${info.area}.`);
        }, 500);
    });

    controller.hears(['skill', 'tech stack','coding language', 'tool'], 'message', async(bot, message) => {
     setTimeout(async () => {
            let info = resume.skills
            await bot.changeContext(message.reference);
            await bot.reply(message, `I am proficient in ${info.keywords.join(", ")}.`);
        }, 500);
    });
}
