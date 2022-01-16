// LOAD CONFIG
import dotenv from 'dotenv';
dotenv.config()

import { Telegraf } from 'telegraf'
import { isValidUrl } from './IsValidUrl'
import { download } from './YoutubeDownloader';
import fetch from 'node-fetch';

const BOT_TOKEN = process.env.BOT_TOKEN!;

async function main() {
    const clearUpdatesRequest = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=-1`);
    const clearUpdatesJson: any = await clearUpdatesRequest.json()
    const clearUpdateId = clearUpdatesJson.result.length > 0 ? clearUpdatesJson.result[0].update_id : null;

    const bot = new Telegraf(BOT_TOKEN, {
        'handlerTimeout': 5 * 60 * 1000 // 5 minutes
    });

    bot.on('text', async (ctx) => {
        
        const message = ctx.message.text;
        if (ctx.update.update_id == clearUpdateId) return;

        console.log(`Processing message: ` + ctx.update.update_id);

        if (isValidUrl(message)) {
            try {
                const path = await download(message);
                console.log('Sending: ' + './' + path);
                ctx.replyWithDocument({ source: './' + path });
            } catch (error) {
                console.error(error);
                ctx.reply('❌ errored');
            }
        } else {
            ctx.reply('❌ not a valid url');
        }
    });

    bot.launch()

    console.log("STARTED");
}

main();