import { googleAPIKey, googleCxKey } from "./constants.js";
import { google } from "googleapis";
import { getSearchedArticleContent } from "./webScrapper.js";

/**
 * Searches Google for articles related to a query and
 * returns the top 2 article URLs (excluding beyondchats).
 *
 * @param query - Search query string
 * @returns Top 2 article URLs with their type
 */

export async function searchOnGoogle(query: string) {
  const customSearch = google.customsearch("v1");

  const res = await customSearch.cse.list({
    q: query,
    cx: googleCxKey,
    key: googleAPIKey,
  });

  // top 2 articles
  const googleSearchData = (res.data.items ?? [])
    .filter(
      (elem): elem is typeof elem & {
        link: string;
        pagemap: { metatags: Array<{ "og:type"?: string }> };
      } =>
        elem?.pagemap?.metatags?.[0]?.["og:type"] === "article" &&
        typeof elem.link === "string" &&
        !elem.link.includes("beyondchats")
    )
    .map((elem) => ({
      url: elem.link,
      type: elem.pagemap.metatags[0]["og:type"]!,
    }));

  return googleSearchData.slice(0, 2);
}

/**
 * Fetches reference articles related to a blog title from Google
 * and extracts their main readable content.
 *
 * @param title - Title of the blog
 * @returns Array of extracted reference article contents
 */
export const getReferenceArticleData = async (title: string) => {
  const articlesOnGoogle = await searchOnGoogle(title);
  
  if (!articlesOnGoogle) throw Error("Failed to fetch article data");
  
  const articleContent = await Promise.all(
    articlesOnGoogle.map(async (elem) => {
      return (await getSearchedArticleContent(elem.url || "")).content
    })
  );
  
    
  return articleContent;
}