import {config} from 'dotenv';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// helpers
import {message, sleep, date} from './utils/message.js';

// scripts
import script from './middlewares/script.js';
import write from './middlewares/write.js';

// dotenv configuration
config();

// plugins
puppeteer.use(StealthPlugin());

// constants
const session = process.env.SESSION;
const url = process.env.URL;
const user = process.env.USER;
const target = url + user;

(async () => {
    const data = await script(puppeteer, session, target, message, sleep);

    await write(data, message, user, date);
})();
