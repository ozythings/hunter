import type { MessageFunction } from "./types";

export default async function scrollPosts(page, message: MessageFunction): Promise<string[]> {
  let urls: string[] = [];

  await Promise.race([
    page.waitForSelector('._aagv img'),  // Waits for images to load
    page.waitForSelector('span[dir="auto"]') // Waits for the text
  ]);

  const noPostElement = await page.$('span[dir="auto"]');
  if (noPostElement) {
    const text = await page.evaluate(el => el.textContent, noPostElement);
    if (!text.includes("No Posts Yet")) {
      message('Scrolling to the end and getting post urls...');

      const postUrls = await page.evaluate(async () => {
        const postUrls = new Set(); // using Set() here for eliminating duplicates

        const scrollToBottom = async () => {
          let lastElement = null;
          let prevHeight = 0;

          while (true) { // while acts as a waiter here
            const elements = document.querySelectorAll('._aagw');
            if (elements.length > 0) {
              lastElement = elements[elements.length - 1]; // getting last element
              lastElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

              const imgs = document.querySelectorAll('._aagv img');
              imgs.forEach(img => {
                postUrls.add(img.src);
              });
            }

            // waiting for new elements
            await new Promise(resolve => setTimeout(resolve, 1500));

            let newHeight = document.body.scrollHeight;
            if (newHeight === prevHeight) {
              break; // stops when it reaches to the end
            };
            prevHeight = newHeight;
          }
        };

        await scrollToBottom();
        return Array.from(postUrls); // return as array
      });

      urls.push(...postUrls);

      message(`Number of unique images: ${urls.length}`);
    }
  }
  return urls;
}
