const { BotkitConversation } = require("botkit");

module.exports = function(controller){
    controller.hears(['fuck', 'shit', 'damn', 'hell', 'bitch'], ['message'], async (bot, message) => {

        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            // will have to reset context because turn has now ended.
            await bot.changeContext(message.reference);
            await bot.reply(message, "...I would appreciate it if you didn't use foul language please :)");
        }, 1000);
    });
}