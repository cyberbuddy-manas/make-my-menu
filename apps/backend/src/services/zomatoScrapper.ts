import puppeteer from 'puppeteer';

export const scrapeMenu = async (link: string) => {
    // const url = 'https://www.zomato.com/amritsar/eatasia-food-1-ranjit-avenue/order';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36');
        await page.goto(link, { waitUntil: 'networkidle2' });

        // Wait for the menu section to load
        await page.waitForSelector('.sc-1s0saks-17');

        // Extract the food items
        const foodItems = await page.evaluate(() => {
            const items = [];
            document.querySelectorAll('.sc-1s0saks-17.bGrnCu').forEach(item => {
                const itemName = (item.querySelector('h4.sc-1s0saks-15') as HTMLElement).innerText;
                const itemPrice = (item.querySelector('span.sc-17hyc2s-1') as HTMLElement).innerText;
                items.push({ name: itemName, price: itemPrice });
            });
            return items;
        });

        // console.log(foodItems);
        return foodItems;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
};
