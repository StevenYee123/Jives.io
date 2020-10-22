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
    
   controller.hears('Yes, I would like to know more personal info','message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        await bot.changeContext(message.reference);


        setTimeout(async () => {
            await bot.reply(message, `I like to eat pickles with peanutbutter. 
            \nI used to think bats were birds. 
            \nMy favorite way to spend a saturday is to cry while watching lifetime movies with my fish.
            \nI am deathly afraid of fractals.` );
        },500)

        setTimeout(async () => {
        await bot.reply(message, nextQs);
        },500)

   });

    controller.hears(['about me','contact','contacts','personal info','personal information','email'], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            const currentJob = {
                text: `Would you like more info`,
                quick_replies: [
                    {
                        title: 'Yes',
                        payload: 'Yes, I would like to know more personal info'
                    },
                    {
                        title: 'No',
                        payload: 'No, I would like to ask another question'
                    },
                ]
            }    

            let info = resume.basics

            function displayBasics () {
                return `${info.summary}
                \n Here is how to contact me.`
            }

            function displayEmail () {
                return `${info.email}`
            }

            function displayPhone () {
                return `${info.phone}`
            }

            await bot.changeContext(message.reference);
            await bot.reply(message, displayBasics());
            await bot.reply(message, displayEmail());
            await bot.reply(message, displayPhone());
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
               await bot.reply(message,currentJob);
            },1000)   
        }, 500);
    });

 
}