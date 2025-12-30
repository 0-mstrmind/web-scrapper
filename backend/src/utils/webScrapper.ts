import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import type { BlogData } from "../../index";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const turndownService = new TurndownService();

/**
 * This function  returns max number of pages
 * @returns number
 */
export const getPageNumbers = async (): Promise<number> => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://beyondchats.com/blogs", {
    waitUntil: "domcontentloaded",
  });

  const html = await page.content();
  const $ = cheerio.load(html);

  const numbers = $(".page-numbers")
    .map((_, el) => {
      const text = $(el).text().trim();

      if (!isNaN(Number(text))) {
        return Number(text);
      }
    })
    .get();

  browser.close();
  
  return Math.max(...numbers);
};

/**
 * This function returns the blog data of the given page number
 * 
 * @param pageNumber blog's page number 
 * @returns 5 oldest blog's data of the given page 
 */
const getBlogs = async (pageNumber: number): Promise<BlogData[]> => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://beyondchats.com/blogs/page/${pageNumber}`, {
    waitUntil: "domcontentloaded",
  });

  const html = await page.content();
  const $ = cheerio.load(html);

  const allCardsData: BlogData[] = [];

  $(".card-content").each((_, elem) => {
    const card = $(elem);

    const title = card.find(".entry-title").children().first().text().trim();

    const categories = card
      .find(".meta-categories")
      .children()
      .map((_, child) => $(child).text().trim())
      .get();

    const author = card
      .find(".ct-meta-element-author")
      .children()
      .first()
      .text()
      .trim();

    let date = new Date(card.find(".ct-meta-element-date").text().trim());
    
    const blogURL: string = card
      .find(".entry-title")
      .children()
      .first()
      .attr("href") as string;

    allCardsData.push({
      title,
      categories,
      author,
      date,
      blogURL,
    });
  });

  await browser.close();
  
  return allCardsData.slice(-5);
};

/**
 * This function returns content of the blog by visiting blog page (beyond chat only)
 * @param url url of the blog page
 * @returns content of the blog
 */
async function getBlogContent(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const blogPage = await browser.newPage();

  await blogPage.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const html = await blogPage.content();
  const $ = cheerio.load(html);

  const contentHtml = $(".elementor-widget-theme-post-content").html() ?? "";

  const markdown = turndownService.turndown(contentHtml);

  await browser.close();

  return markdown;
}


/**
 * This function fetches 5 oldest blogs.
 * 
  * Blog data structure:
 *
 * @property **title**      Title of the blog
 * @property **date**       Date of publishing
 * @property **author**     Author of the blog
 * @property **blogURL**    URL of the blog (opens blog content)
 * @property **categories** Blog categories
 * @property **content**    Blog content in *Markdown* format
 * 
 * @returns 5 oldest blog data 
 */
export async function getAllBlogData() {
  const maxPageNumber = await getPageNumbers();
  
  let card = await getBlogs(maxPageNumber);
  
  if (card.length <= 5) {
    const diff = 5 - card.length;
    const previousPageBlog = await getBlogs(maxPageNumber - 1);
    
    const oldestBlogs = previousPageBlog.slice(-diff);
    
    card = [...oldestBlogs,...card];
  }

  const dataWithContent: BlogData[] = await Promise.all(
    card.map(async (elem) => ({
      title: elem.title,
      date: elem.date,
      author: elem.author,
      blogURL: elem.blogURL,
      categories: elem.categories,
      content: await getBlogContent(elem.blogURL),
    }))
  );
  
  return dataWithContent;
}

/**
 * Extracts the main article content from HTML using Mozilla Readability.
 *
 * @param html - Raw HTML of the page
 * @param url - Page URL
 * @returns Extracted article title, text content, and URL
 */
function extractMainContent(html: string, url: string) {
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  return {
    title: article?.title,
    content: article?.textContent,
    url
  };
}

/**
 * Extracts the main readable content of an article from a given URL
 *
 * @param url - Article URL
 * @returns Extracted article content
 */
export async function getSearchedArticleContent(url: string) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  
  const articlePage = await browser.newPage();
  
  await articlePage.goto(url, {
    waitUntil: "domcontentloaded",
  });
  
  const html = await articlePage.content();
  const textContent = extractMainContent(html, articlePage.url());

  browser.close();
  
  return {
    content: textContent,
  }
} 