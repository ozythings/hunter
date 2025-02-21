import {config} from 'dotenv';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import saveImage from './middlewares/saveImage.js';

// helpers
import {message, sleep, date} from './utils/message.js';

// scripts
import browser from './middlewares/browser.js';
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
    const data = await browser(puppeteer, session, target, message, sleep);
    await saveImage(data, message, user, date);

    write(data, message, user, date);
})();


