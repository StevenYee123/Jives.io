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
    
  

    controller.hears([ /.*profile.*/, /.*github.*/, /.*portfolio.*/, /.*personal site.*/], 'message', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            

            let website = resume.basics.website;
            let linkedin = resume.profiles[0].url;
            function displayWebsite () {
                return `${website}`
            }

            function displayLinkedin () {
                return `${linkedin}`;
            }

        

            await bot.changeContext(message.reference);
            await bot.reply(message, displayWebsite());
            await bot.reply(message, displayLinkedin());
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
                await bot.reply(message, nextQs);
            },1000)   
        }, 500);
    });

 
}