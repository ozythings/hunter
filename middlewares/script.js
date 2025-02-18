const classes = ".x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x5n08af.x9n4tj2._a6hd";
const user_classes = "._ap3a._aaco._aacw._aacx._aad7._aade";
const div_classes = ".xyi19xy.x1ccrb07.xtf3nb5.x1pc53ja.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6";

import {scroll} from '../utils/scroll.js';

export default async function script(puppeteer, session, target, message, sleep) {
    message('Launching browser...');
    const browser = await puppeteer.launch({
        headless: false, // visible browser
        defaultViewport: null,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // your chrome path
        args: ['--start-maximized', '--window-size=1920,1080', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    message('Opening new page...');
    const page = await browser.newPage();

    message('Setting the cookies...');
    await page.setCookie({
        name: 'sessionid',
        value: session,
        domain: '.instagram.com',
    });

    message('Navigating to the target...');
    await page.goto(target);

    message('Waiting for the page to load...');
    await page.waitForSelector(classes);

    const buttons = await page.$$(classes);

    message('Clicking the followers button...');
    await buttons[0].click();

    message('Waiting for the modal...');
    await page.waitForSelector(user_classes);

    message('Scrolling to the end...');
    const div = await page.$(div_classes);

    await scroll(page, div);

    message('Fetching the users...');
    const followers = await page.evaluate((user_classes) => {
        const users = document.querySelectorAll(user_classes);

        return Array.from(users).map(user => user.textContent);
    }, user_classes);

    message('Closing the followers modal...');
    await page.click('button[class="_abl-"]');

    message('Clicking the following button...');
    await buttons[1].click();

    message('Waiting for the modal...');
    await page.waitForSelector(user_classes);

    message('Scrolling to the end...');
    const _div = await page.$(div_classes);

    await
    message('Fetching the users...');
    const following = await page.evaluate((user_classes) => {
        const users = document.querySelectorAll(user_classes);

        return Array.from(users).map(user => user.textContent);
    }, user_classes);


    message('Closing the following modal...');
    await page.click('button[class="_abl-"]');

    console.log(followers);
    console.log(followers.length)
    console.log(following);
    console.log(following.length)
}
