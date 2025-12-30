# WEB SCRAPPER 

## Phase 1 – Blog Scraping & CRUD APIs

In Phase 1, an automated scraping system is implemented to collect blog articles from the BeyondChats website and store them in a database.

### Implemented Routes
- **POST `/scrap`**  
  Automatically scrapes the 5 oldest BeyondChats blog articles and saves their full content in the database.

- **POST `/create`**  
  Creates a blog entry manually (mainly for testing or future extension).

- **GET `/`**  
  Fetches all stored blog articles.

- **GET `/:id`**  
  Fetches a single blog article by its ID.

- **PUT `/update/:id`**  
  Updates an existing blog article.

- **DELETE `/:id`**  
  Deletes a blog article.

This phase ensures that blog data is **scraped automatically**, **stored persistently**, and **fully manageable via RESTful CRUD APIs**.

---

## Phase 2 – AI-Based Blog Enhancement

In Phase 2, the blogs scraped in Phase 1 are enhanced using AI by comparing them with high-ranking articles from other websites.

### Implemented Route
- **PUT `/enhance/:id`**

This endpoint performs the following steps:
1. Fetches the original BeyondChats blog article from the database  
2. Searches Google for relevant blog articles (excluding BeyondChats)  
3. Scrapes content from the top two external reference articles  
4. Uses an LLM to enhance clarity, structure, and formatting  
5. Publishes the enhanced article back to the database using the existing CRUD logic  

The enhanced content is stored alongside the original article, with reference URLs clearly cited.

## APIs

| # | Endpoint | Method | Description |
|---|---------|--------|-------------|
| 1 | `/api/v1/blogs/create` | `POST` | Creates a new blog |
| 2 | `/api/v1/blogs/update/:id` | `PUT` | Updates an existing blog |
| 3 | `/api/v1/blogs` | `GET` | Retrieves all blogs |
| 4 | `/api/v1/blogs/:id` | `GET` | Retrieves a specific blog by ID |
| 5 | `/api/v1/blogs/delete/:id` | `DELETE` | Deletes a blog by ID |
| 6 | `/api/v1/blogs/scrap` | `POST` | Scrapes blogs from the internet and stores them in the database |
| 7 | `/api/v1/blogs/enhance/:id` | `PUT` | Enhances the content of a blog by fetching reference articles |

---

### Summary
**Phase 1 builds the blog data pipeline, and Phase 2 enhances that data using AI and external references.**