import {config} from 'dotenv';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// scripts
import script from './middlewares/script.js';

// dotenv configuration
config();

// plugins
puppeteer.use(StealthPlugin());

// constants
const session = process.env.SESSION;
const url = process.env.URL;
const user = process.env.USER;
const target = url + user;

script(puppeteer, session, target);
