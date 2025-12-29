import { googleAPIKey, googleCxKey } from "./constants.ts";
import {google} from "googleapis";

// 1
export async function searchOnGoogle(query: string) {
  const customSearch = google.customsearch("v1");
  
  const res = await customSearch.cse.list({
    q: query,
    cx: googleCxKey,
    key: googleAPIKey,
  });
  
  // top 2 articles
  const googleSearchData =  res.data.items
  ?.filter(elem =>
    (elem?.pagemap?.metatags?.[0]?.["og:type"] === "article") && (!elem.link?.includes("beyondchats"))
  )
  .map(elem => ({
    url: elem.link,
    type: elem.pagemap.metatags[0]["og:type"],
  }));
  
  
  return googleSearchData;
}

searchOnGoogle("Can Chatbots Boost Small Business Growth beyondchats blogs");