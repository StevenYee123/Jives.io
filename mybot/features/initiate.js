const { BotkitConversation } = require("botkit");

module.exports = function(controller){
    const jivesBot = new BotkitConversation("welcome", controller);

    jivesBot.say({ type: "typing" });
    jivesBot.addAction("welcome");
    jivesBot.addMessage("Hello, I'm Jives.io. How can I be of service to you today?", "next_thread");

    jivesBot.addAction("next_thread", "welcome");
    jivesBot.addMessage({ type: "typing" }, "next_thread");
    jivesBot.addAction("last_thread", "next_thread");

    //Start the typing indicator(?)
    jivesBot.addMessage({ type: "typing" }, "welcome");

    jivesBot.addMessage(
        {
            text: "What would you like to know about me?"
        },
        "last_thread"
    );

    //use the before handler to delay the next message
    jivesBot.before("next_thread", async () => {
        return new Promise((resolve) => {
            //Simulate some long running process
            setTimeout(resolve, 1500);
        });
    });

    jivesBot.before("last_thread", async () => {
        return new Promise((resolve) => {
            //Simulate some long running process
            setTimeout(resolve, 1500);
        });
    });

    controller.addDialog(jivesBot);

    controller.on('welcome_back', async (bot, message) => {
        await bot.beginDialog("welcome");
    });

    controller.hears(['hi','hello','howdy','hey','aloha','hola','bonjour','oi'],['message'], async (bot,message) => {
        await bot.reply(message, {type: 'typing'});

        setTimeout(async () => {
        // will have to reset context because turn has now ended.
        await bot.changeContext(message.reference);
        await bot.reply(message, "Hello! I'm Jives.io, what would you like to know about me?");
        }, 1000);

    });
};

