# FAQ Backend API

A FAQ management system with automatic translation support.

## Features

- Create and manage FAQs with rich text support(CkEditor)
- Automatic translation to multiple languages
- Redis caching for improved performance
- RESTful API endpoints
- Rich text editor interface

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Cache:** Redis
- **Frontend:** HTML, JavaScript ,  used CkEditor as rich text editor
- **Translation:** Google Translate API
- **Testing:** Mocha, Chai


## Prerequisites

Before starting, ensure that you have the following installed:

- Node.js (v18 or higher)
- MongoDB
- Redis


## Installation

### Local Development

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd bharatfd
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create an `.env` file and add the following environment variables:

    ```
    MONGO_URI= YOUR_MONGO_URL
    REDIS_URL=redis://localhost:6379
    PORT=4000
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

## API Endpoints

### Create FAQ
- **POST** `/api/faqs`
- **Body:** 
    ```json
    {
      "question": "What is FAQ?",
      "answer": "FAQ stands for Frequently Asked Questions."
    }
    ```
- **Response:** `201 Created`

### Get FAQs
- **GET** `/api/faqs`
- **Query Parameters:**
    - `lang`: Language code (e.g., `'hi'` for Hindi, `'es'` for Spanish)
- **Response:** `200 OK`

## Supported Languages
- Hindi (`hi`)
- Bengali (`bn`)
## Testing

Run the test suite with:

```bash
npm test
```

## Web Interface

Access the FAQ editor interface at:

```plaintext
http://localhost:4000/
```


