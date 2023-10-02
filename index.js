/*!
 * Created by Manh Tuan (JUNO_OKYO)
 * Demo for my video on TikTok: https://www.tiktok.com/@juno_okyo/video/7284660854539177221
 * Follow me for more videos.
 *
 * Please edit webhookUrl and token before run this script!!!
 */
import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import 'dotenv/config';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/chi (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if (!match[1].includes('|')) {
        bot.sendMessage(chatId, 'Vui lòng nhập đúng định dạng.' + '\n\n' + 'Ví dụ:\n```\n/add chi_amount|chi_note\n```', {
            parse_mode: 'Markdown'
        });
        return;
    }

    bot.sendChatAction(chatId, 'typing');

    const resp = match[1];
    const values = resp.split('|');

    const url = new URL(process.env.WEBHOOK_URL);
    url.searchParams.append('chi_amount', values[0]);
    url.searchParams.append('chi_note', values[1]);

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return;
            } else {
                throw new Error('Failed to fetch data');
            }
            })
        .then(data => {
            bot.sendMessage(chatId, '✅ Đã thêm thành công.');
        })
        .catch(err => {
            bot.sendMessage(chatId, 'Không thể thêm. Vui lòng thử lại sau!');
        });
});

bot.onText(/\/thu (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if (!match[1].includes('|')) {
        bot.sendMessage(chatId, 'Vui lòng nhập đúng định dạng.' + '\n\n' + 'Ví dụ:\n```\n/add thu_amount|thu_note\n```', {
            parse_mode: 'Markdown'
        });
        return;
    }

    bot.sendChatAction(chatId, 'typing');

    const resp = match[1];
    const values = resp.split('|');

    const url = new URL(process.env.WEBHOOK_URL);
    url.searchParams.append('thu_amount', values[0]);
    url.searchParams.append('thu_note', values[1]);

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return;
            } else {
                throw new Error('Failed to fetch data');
            }
            })
        .then(data => {
            bot.sendMessage(chatId, '✅ Đã thêm thành công.');
        })
        .catch(err => {
            bot.sendMessage(chatId, 'Không thể thêm. Vui lòng thử lại sau!');
        });
});

console.log('Bot is running...')
