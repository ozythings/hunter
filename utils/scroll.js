const scroll = async (page, div) => {
    await page.evaluate(async (div) => {
        let lastScrollTop = -1;

        while (div.scrollTop !== lastScrollTop) {
            lastScrollTop = div.scrollTop;
            div.scrollTop += div.clientHeight * 2;
            await new Promise(resolve => setTimeout(resolve, 2000)); // maybe you should increase the delay
        }
    }, div);
}

export default scroll;
