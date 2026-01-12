
## Running the Project
1️⃣ Install dependencies
npm install

2️⃣ Run in development mode
npm run dev

3️⃣ Build for production
npm run build
npm start







## MoodTunes – Backend

This is the backend service for MoodTunes, a mood-based song recommendation application.
It provides REST APIs to manage moods, songs, and mood-based recommendations, built using Node.js, Express, MongoDB, and Clean Architecture principles.


##  Features

Create, read, update, and delete moods

Add, edit, and delete songs inside a mood

Fetch song recommendations based on mood

Clean Architecture (Domain, Application, Infrastructure, Presentation)

Dependency Injection using tsyringe

MongoDB with Mongoose

Input validation and proper error handling



## Redis (Scalability Knowledge)

Redis is not currently implemented in this backend, but the application is designed in a way that allows Redis to be easily integrated as a caching layer.

Where Redis Would Be Used

Caching frequently accessed endpoints such as:
GET /api/moods
GET /api/moods/:id/recommend

Reducing repeated database queries for read-heavy operations
Improving response times under high traffic

Why Redis Is Suitable

In-memory data store with extremely low latency
Supports TTL-based caching
Commonly used for session storage, rate limiting, and caching
Fits well with read-heavy REST APIs like this application
Cache Invalidation Strategy (Planned)

Cache would be invalidated when:
A mood is created, updated, or deleted
A song is added, edited, or removed
Ensures consistency between cache and database

Design Consideration
The backend follows Clean Architecture, making it easy to introduce Redis at the infrastructure layer without affecting business logic.