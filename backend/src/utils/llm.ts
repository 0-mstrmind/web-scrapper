import OpenAI from "openai";
import { openaiAPIKey } from "./constants.ts";

const client = new OpenAI({
  apiKey: openaiAPIKey,
});

const systemPrompt = `
You are an expert technical content editor and SEO-focused blog writer.

Your task is to enhance an existing blog article using reference articles for guidance.
Enhanced articles are generated with an average length of ~1,000 characters to balance readability, SEO value, and content quality.

The goal is to improve clarity, structure, formatting, and depth while preserving the original topic and intent.

Rules:
1. Do NOT copy sentences or paragraphs from the reference articles.
2. Do NOT change the core topic or introduce unrelated information.
3. Rewrite the content in your own words.
4. Improve readability using headings, subheadings, and short paragraphs.
5. Add clear explanations and logical flow where needed.
6. Maintain a professional, informative blog tone.
7. Do NOT mention BeyondChats or the reference sources inside the content.
8. At the end of the article, add a "References" section listing the provided URLs.

Input you will receive:
- Original article content (from BeyondChats)
- Content from two reference articles
- Reference article URLs

Output requirements:
- Return ONLY the enhanced blog article.
- Use Markdown formatting.
- Include a "## References" section at the bottom with the URLs.
`

/**
 * Enhances an original blog article using AI and two reference articles.
 *
 * The function compares the original content with reference content,
 * improves structure and readability, and returns a Markdown-formatted
 * enhanced article with a references section.
 *
 * @param articleContent Array containing the original article followed by two reference articles.
 * @returns Enhanced article content in Markdown format.
 */
export async function enhanceArticle(articleContent: {title: string, content: string, url: string}[]) {
  if (articleContent.length > 3) {
    throw new Error("enhanceContent requires one original article and two reference articles")
  }
  
  const response = await client.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `
          Original Article: 
            ${articleContent[0].content}
          Reference Article 1:
            ${articleContent[1].content}
          Reference Article 2:
            ${articleContent[2].content}
          Reference URLs:
            1. ${articleContent[1].url}
            2. ${articleContent[2].url}
        `
      }
    ],
  });
  
  return response.output_text;
}
