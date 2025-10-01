## Travel Booking Widget (SuiteSavvy-style)

A modern demo with React + Vite + Tailwind + framer-motion frontend and ASP.NET Core Web API backend (EF Core + SQLite). Includes destinations for Visakhapatnam, Tirupati, Vijayawada, Goa, Kerala, and Rajasthan.

### Prerequisites
- Node.js 18+
- .NET SDK 8.0+

### Backend (API)
```bash
cd backend/Travel.Api
dotnet restore
dotnet ef migrations add InitialCreate --output-dir Migrations
dotnet run
```
Swagger at `http://localhost:5223/swagger`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App at `http://localhost:5173`.

### Endpoints
- GET `/api/destinations`
- GET `/api/availability?destinationId=1&startDate=2025-10-01&endDate=2025-10-05`
- POST `/api/book` with body:
```json
{
  "destinationId": 1,
  "startDate": "2025-10-01",
  "endDate": "2025-10-05",
  "travelers": 2,
  "fullName": "Guest Name",
  "email": "guest@example.com"
}
```

### Notes
- Frontend falls back to `public/sample-data/destinations.json` if API is offline.
- Replace image URLs with your own for production.



"# Travel-app" 
