# Full-Stack Project: .NET 9 + React + SQL Server (Dockerized)

A full-stack web application with:
- **Backend**: .NET 9 Web API with Entity Framework Core
- **Frontend**: React (Create React App)
- **Database**: SQL Server 2022
- **Orchestration**: Docker Compose

## Project Structure

```
project/
├── backEnd/          # .NET 9 Web API
│   ├── Controllers/  # API endpoints
│   ├── Data/         # EF Core DbContext
│   ├── Models/       # Domain models
│   ├── Program.cs
│   └── Dockerfile
├── frontEnd/         # React app
│   ├── src/
│   ├── nginx.conf    # Production reverse proxy config
│   └── Dockerfile
├── database/         # (Optional) SQL init scripts
└── docker-compose.yml
```

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
- .NET 9 SDK (only for local development outside Docker)
- Node.js 18+ (only for local development outside Docker)

## Running with Docker

```bash
# Build and start all services
docker-compose up --build

# Run in detached (background) mode
docker-compose up --build -d

# Stop all services
docker-compose down

# Stop and remove volumes (wipes the database)
docker-compose down -v
```

### Service URLs

| Service  | URL                              |
|----------|----------------------------------|
| Frontend | http://localhost:3000            |
| Backend  | http://localhost:5000            |
| Swagger  | http://localhost:5000/swagger    |
| SQL Server | localhost,1433               |

## Database Migrations

From inside the `backEnd/` directory (requires .NET SDK):

```bash
# Add a new migration
dotnet ef migrations add InitialCreate

# Apply migrations to the database
dotnet ef database update
```

To run migrations automatically on startup, add this to `Program.cs`:

```csharp
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}
```

## Environment Variables

The SQL Server SA password is set in `docker-compose.yml`:

```
SA_PASSWORD: "YourStrong!Passw0rd"
```

Change this before deploying to production and use a `.env` file or secrets manager.

## Local Development (without Docker)

**Backend:**
```bash
cd backEnd
dotnet run
```

**Frontend:**
```bash
cd frontEnd
npm start
```
