# URL Shortener Backend

## Project Overview

The URL Shortener is a backend application developed using Node.js and Express.js. It converts long URLs into shorter, easy-to-share links and redirects users to the original URLs when the shortened links are accessed.

The application also tracks the number of clicks received by each shortened URL.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Framework used to build the backend and handle HTTP requests.
- **JavaScript:** Main programming language.
- **JSON File Storage:** Stores shortened URL information persistently in a local JSON file.
- **Crypto Module:** Generates random short codes.

## Features

1. Shorten long URLs.
2. Generate random short codes.
3. Create custom short codes.
4. Redirect users to original URLs.
5. Track the number of clicks.
6. View statistics for individual shortened URLs.
7. Validate URLs before shortening.
8. Prevent duplicate short codes.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Displays the frontend |
| GET | `/api/health` | Checks server health |
| POST | `/api/shorten` | Creates a shortened URL |
| GET | `/api/urls` | Retrieves all shortened URLs |
| GET | `/api/stats/:code` | Retrieves URL statistics |
| GET | `/:code` | Redirects to the original URL |

## Example API Request

**POST `/api/shorten`**

Request body:

```json
{
  "originalUrl": "https://www.google.com",
  "customCode": "google"
}
```

Example response:

```json
{
  "message": "Short URL created successfully",
  "shortUrl": "http://localhost:3000/google",
  "details": {
    "originalUrl": "https://www.google.com/",
    "shortCode": "google",
    "clicks": 0
  }
}
```

## How It Works

1. The user submits a long URL.
2. The backend validates the URL.
3. A random or custom short code is generated.
4. The original URL and short code are stored in `urls.json`.
5. When someone accesses the short link, the backend retrieves the original URL.
6. The click counter is incremented.
7. The user is redirected to the original website.

## Installation and Execution

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The server runs on port 3000.

## Testing

The following functionalities have been tested:

- Server health check.
- URL shortening.
- Custom short code generation.
- URL redirection.
- Click tracking.
- URL statistics retrieval.
- Invalid URL validation.
- Duplicate short code prevention.

## Future Enhancements

- MongoDB integration for database management.
- User authentication and authorization.
- URL expiry functionality.
- QR code generation.
- Advanced analytics and dashboard.
- Rate limiting and improved security.

## Conclusion

This project demonstrates the implementation of backend development concepts such as REST APIs, HTTP methods, routing, request handling, URL validation, redirection, and data storage using Node.js and Express.js.