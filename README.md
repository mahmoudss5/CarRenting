# Car Rental Platform

A full-stack car rental web application with a role-based REST API, JWT authentication, real-time notifications, and a Dockerized deployment.

| Layer | Technology |
|-------|-----------|
| **Backend** | .NET 10 Web API — Clean Architecture (Repo → Service → Controller) |
| **Database** | SQL Server 2022 — schema `rental` inside `CarRentalDB` |
| **Auth** | JWT Bearer tokens — BCrypt password hashing |
| **API Docs** | Swagger UI (Swashbuckle 10) with JWT authorize button |
| **Frontend** | React (served via Nginx) |
| **Orchestration** | Docker Compose |

---

## Project Structure

```
project/
├── backEnd/
│   ├── Controllers/            # HTTP layer — thin, delegates to services
│   │   ├── AuthController.cs       POST register/login/logout, GET me
│   │   ├── AdminController.cs      User, car post, license management (Admin)
│   │   ├── CarsController.cs       Public + owner car & availability endpoints
│   │   ├── OwnerController.cs      Owner car list & rental accept/reject
│   │   ├── RenterController.cs     License submit & renter reviews
│   │   ├── RentalsController.cs    Create, view, complete, cancel rentals
│   │   ├── ReviewsController.cs    Post & delete reviews
│   │   └── NotificationsController.cs  Read & delete notifications
│   ├── Services/
│   │   ├── Interfaces/         # IAuthService, ICarPostService, …
│   │   └── Implementations/    # Business logic
│   ├── Repositories/
│   │   ├── Interfaces/         # IUserRepository, ICarPostRepository, …
│   │   └── Implementations/    # EF Core data access
│   ├── DTOs/                   # Request / response shapes per feature
│   │   ├── Auth/
│   │   ├── Car/
│   │   ├── Availability/
│   │   ├── License/
│   │   ├── Rental/
│   │   ├── Review/
│   │   ├── Notification/
│   │   └── User/
│   ├── Models/                 # EF Core entities (User, CarPost, Rental …)
│   ├── Data/                   # AppDbContext + Fluent API config
│   ├── Common/                 # ServiceResult<T> wrapper
│   ├── Extensions/             # ClaimsPrincipalExtensions
│   ├── Swagger/                # AuthOperationFilter (JWT padlock per endpoint)
│   ├── appsettings.json
│   └── Dockerfile
├── frontEnd/
│   ├── src/
│   └── Dockerfile
├── database/
│   └── CarRental_Database.sql  # Full schema — run once against CarRentalDB
└── docker-compose.yml
```

---

## User Roles

| Role | What they can do |
|------|-----------------|
| `Admin` | Approve / reject users, car posts, driver licenses; delete reviews |
| `CarOwner` | Create car posts, manage availability, accept / reject rental requests |
| `Renter` | Submit driver license, book cars, cancel bookings, leave reviews |

---

## Prerequisites

| Tool | Purpose |
|------|---------|
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Run everything in containers |
| .NET 10 SDK | Local development only |
| Node.js 18+ | Frontend local development only |

---

## Running with Docker

```bash
# Build and start all three services (DB → Backend → Frontend)
docker compose up --build

# Background mode
docker compose up --build -d

# Stop
docker compose down

# Stop and wipe the database volume
docker compose down -v
```

### Service URLs (Docker)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Swagger UI | http://localhost:5000/swagger |
| SQL Server | localhost,1433 |

> **First run**: after the containers are healthy, connect to SQL Server (`sa` / `YourStrong!Passw0rd`) and run `database/CarRental_Database.sql` to create the schema.

---

## Local Development (without Docker)

### 1 — Start SQL Server

Use the Docker service only:

```bash
docker compose up database
```

Or point `appsettings.json → ConnectionStrings:DefaultConnection` at any running SQL Server instance.

### 2 — Backend

```bash
cd backEnd
dotnet run
```

API available at **http://localhost:5055**  
Swagger at **http://localhost:5055/swagger**

### 3 — Frontend

```bash
cd frontEnd
npm install
npm start
```

---

## API Overview

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Create account (`CarOwner` or `Renter`) |
| `POST` | `/login` | Public | Returns JWT token |
| `POST` | `/logout` | Bearer | Client-side token disposal |
| `GET` | `/me` | Bearer | Current user profile |

### Admin — `/api/admin`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List all users |
| `GET` | `/users/{id}` | User detail |
| `PATCH` | `/users/{id}/approve` | Approve account |
| `PATCH` | `/users/{id}/reject` | Reject account |
| `DELETE` | `/users/{id}` | Delete user |
| `GET` | `/cars/pending` | Pending car posts |
| `PATCH` | `/cars/{id}/approve` | Approve car post |
| `PATCH` | `/cars/{id}/reject` | Reject car post |
| `GET` | `/licenses` | All driver licenses |
| `PATCH` | `/licenses/{id}/verify` | Verify license |
| `PATCH` | `/licenses/{id}/reject` | Reject license |

### Cars — `/api/cars`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | Public | Active listings (paginated) |
| `GET` | `/search` | Public | Filter by type, brand, location, price |
| `GET` | `/{id}` | Public | Car detail + reviews + availability |
| `POST` | `/` | CarOwner | Create car post |
| `PUT` | `/{id}` | CarOwner | Update car post |
| `DELETE` | `/{id}` | CarOwner / Admin | Delete car post |
| `GET` | `/{id}/availability` | Public | Availability calendar |
| `POST` | `/{id}/availability` | CarOwner | Set availability dates |
| `PUT` | `/{id}/availability` | CarOwner | Update availability dates |
| `GET` | `/{id}/reviews` | Public | Car reviews |

### Owner — `/api/owner`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cars` | Owner's car listings |
| `GET` | `/rentals` | Incoming rental requests |
| `PATCH` | `/rentals/{id}/accept` | Accept rental |
| `PATCH` | `/rentals/{id}/reject` | Reject rental |

### Rentals — `/api/rentals`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | Renter | Create rental request |
| `GET` | `/my` | Renter | My rentals |
| `GET` | `/{id}` | Renter / Owner / Admin | Rental detail |
| `PATCH` | `/{id}/complete` | CarOwner / Admin | Mark completed |
| `DELETE` | `/{id}` | Renter | Cancel request |

### Driver License — `/api/renter`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/license` | Submit driver license |
| `GET` | `/license` | My license status |

### Reviews — `/api/reviews` and `/api/renter/reviews`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/reviews` | Renter | Post review (rental must be Completed) |
| `DELETE` | `/api/reviews/{id}` | Admin | Delete review |
| `GET` | `/api/renter/reviews` | Renter | My reviews |

### Notifications — `/api/notifications`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | All notifications with unread count |
| `PATCH` | `/{id}/read` | Mark one as read |
| `PATCH` | `/read-all` | Mark all as read |
| `DELETE` | `/{id}` | Delete notification |

---

## Testing with Swagger

1. Run the API (`dotnet run` or Docker)
2. Open **http://localhost:5055/swagger** (local) or **http://localhost:5000/swagger** (Docker)
3. Call `POST /api/auth/register` to create an account
4. Call `POST /api/auth/login` — copy the `token` value from the response
5. Click the **Authorize 🔒** button (top right of the Swagger page)
6. Paste the token and click **Authorize**
7. All protected endpoints now send `Authorization: Bearer <token>` automatically

> Endpoints that require auth show a **🔒 padlock** icon in the Swagger UI.

---

## JWT Configuration

Settings live in `appsettings.json`:

```json
"Jwt": {
  "Secret": "YourSuperSecretKeyForJWTAuthenticationMustBeAtLeast32Chars!",
  "Issuer": "CarRentalAPI",
  "Audience": "CarRentalClient",
  "ExpiryHours": 24
}
```

> **Before deploying**: replace `Secret` with a strong random value and inject it via an environment variable or a secrets manager — never commit real secrets to source control.

---

## Environment Variables (Docker)

| Variable | Default | Description |
|----------|---------|-------------|
| `ConnectionStrings__DefaultConnection` | see `docker-compose.yml` | Full SQL Server connection string |
| `ASPNETCORE_ENVIRONMENT` | `Development` | Controls Swagger visibility and logging |
| `SA_PASSWORD` | `YourStrong!Passw0rd` | SQL Server SA password |

---

## Database

The schema lives in `database/CarRental_Database.sql`. It creates:

| Table | Purpose |
|-------|---------|
| `rental.Users` | All user accounts |
| `rental.CarOwners` | Car owner profile extension |
| `rental.Renters` | Renter profile extension |
| `rental.DriverLicenses` | License verification |
| `rental.CarPosts` | Car listings |
| `rental.CarImages` | Car photos (URLs) |
| `rental.AvailabilityCalendars` | Per-day availability |
| `rental.RentalRequests` | Booking requests |
| `rental.RentalStatusLogs` | Audit trail for status changes |
| `rental.Reviews` | One review per completed rental |
| `rental.Notifications` | In-app notifications |
| `rental.AdminActions` | Admin audit log |

---

## Business Rules

- A `CarOwner` account must be **approved by an Admin** before they can post cars.
- A `Renter` must have a **verified driver license** before they can book a car.
- Car posts require **Admin approval** before they appear in public listings.
- A renter can only **review** a car after the rental status is `Completed`.
- Only **one review** is allowed per completed rental.
- A car in `Rented` status **cannot be deleted**.
- Cancelling an `Accepted` rental is **not allowed**.
- Every rental status change is written to `RentalStatusLogs`.
- Every admin decision is written to `AdminActions`.
