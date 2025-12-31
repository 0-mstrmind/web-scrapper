import OpenAI from "openai";
import { openaiAPIKey } from "./constants.js";

const client = new OpenAI({
  apiKey: openaiAPIKey,
});

const systemPrompt = `
You are an expert technical content editor and SEO-focused blog writer.

Your task is to enhance an existing blog article using reference articles strictly as guidance.
The goal is to improve clarity, structure, formatting, and depth while preserving the
original topic, intent, and title.

Enhanced articles should be approximately 1,000 characters in length (±30%) to balance
readability, SEO value, and content quality.

Rules:
1. Do NOT copy or closely paraphrase sentences or paragraphs from the reference articles.
2. Do NOT change the article title or core topic.
3. Rewrite the content fully in your own words.
4. Improve readability using clear headings, subheadings, and concise paragraphs.
5. Add logical flow, explanations, and smooth transitions where helpful.
6. Maintain a professional, informative, and neutral blog tone.
7. Do NOT mention BeyondChats or the reference sources inside the article body.
8. Use reference articles only to guide structure, depth, and writing quality.
9. Do NOT add promotional language or exaggerated claims.
10. Do not add FAQs, summaries, or conclusions unless they already exist in the original article.

Input you will receive:
- Original article content
- Content from two reference articles
- Reference article URLs

Output requirements:
- Return ONLY the enhanced blog article.
- Use Markdown formatting.
- Preserve the original article title.
- End the article with a "## References" section listing the provided URLs.
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
            title: ${articleContent[0].title}
            content:${articleContent[0].content}
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
