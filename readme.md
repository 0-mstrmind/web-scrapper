# WEB SCRAPPER 

## Local Setup Instructions

### Backend
To run the web scraper locally, follow these steps:
1. `npm install` : to install the required dependencies.
2. Create a `.env` file with the following environment variables:

```bash
PORT=3030
DB_URL=mongodb://localhost:27017

// for google search
GOOGLE_API_KEY=
GOOGLE_CX_KEY=

// for ai agent call
OPENAI_API_KEY=
```
3. Reference article to setup <a href="https://joeyism.medium.com/custom-google-search-api-fbbafe4711eb">Google API Key</a> and <a href="https://platform.openai.com/docs/quickstart">OpenAI Key</a>
4. Setup a local mongodb instance using docker
```bash
docker run --name mongo -p 27017:27017 -d mongo
```
5. Run the using `npm run dev`

### Frontend
1. Run `bun install`
2. Create a `.env` file with the following environment variables:

```bash
VITE_BACKEND_URL=http://localhost:3030
```
3. Run `bun run dev`

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

## Phase 3 – Frontend Blog Viewer

In Phase 3, a React-based frontend application is built to display blog articles fetched from the backend APIs, showcasing both the original and AI-enhanced versions.

### Key Features
- Fetches blog articles using the existing backend APIs  
- Displays a list of available blogs in a clean, responsive card layout  
- Allows users to view individual blog articles  
- Provides a toggle to switch between the original and enhanced versions of an article  
- Clearly indicates AI-enhanced articles using visual labels  

The frontend is read-only and focuses on clarity, usability, and professional presentation to demonstrate the results of the AI-based enhancement pipeline.

### Home Page
![alt text](/docs/home-page.png)

### Blog Page
![alt text](/docs/blog-page.png)

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

## Basic Architecture Diagram
![alt text](/docs/architecture.png)