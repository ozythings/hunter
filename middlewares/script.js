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

    await page.goto(target);

}
