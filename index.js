import { Telegraf,Markup} from 'telegraf'
import { message } from 'telegraf/filters'
const TOKEN = '8113227325:AAEF7EpZxns00Ih_uATWGZh9YhoIMoHTrnE'
const website = 'https://cheerful-biscotti-13bc5d.netlify.app/'
const bot = new Telegraf('8113227325:AAEF7EpZxns00Ih_uATWGZh9YhoIMoHTrnE')
bot.start((ctx) => ctx.reply('HI, I am web designer and developer',{
    reply_markup:{
        inline_keyboard:[[Markup.button.webApp('Visit My portfolio',website)]]}}))
// bot.start((ctx) => {
//     ctx.reply('Welcome! Click to launch the web app:', Markup.inlineKeyboard([
//         [Markup.button.webApp('Launch portfolio',{website})]
//     ]));
// });


bot.help((ctx) => ctx.reply('call me at 0930728383'))
bot.launch()
