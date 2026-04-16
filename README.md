# Car Rental Platform

A full-stack car rental web application with a role-based REST API, JWT authentication, real-time notifications via SignalR, and a Dockerized deployment.

| Layer | Technology |
|-------|-----------|
| **Backend** | .NET 10 Web API — Clean Architecture (Repo → Service → Controller) |
| **Database** | SQL Server 2022 — schema `rental` inside `CarRentalDB` |
| **Auth** | JWT Bearer tokens — BCrypt password hashing |
| **Real-time** | SignalR hub at `/hubs/notifications` |
| **API Docs** | Swagger UI (Swashbuckle) with JWT authorize button |
| **Frontend** | React 19 + Vite — Tailwind CSS, Framer Motion, React Router v7 |
| **HTTP Client** | axios 1.15.0 (pinned — post supply-chain-attack safe release) |
| **Orchestration** | Docker Compose |

---

## Project Structure

```
project/
├── backEnd/
│   ├── Controllers/            # HTTP layer — thin, delegates to services
│   │   ├── AuthController.cs           POST register/login/logout, GET/PUT me, POST change-password
│   │   ├── AdminController.cs          Users, car posts, licenses, rentals, stats (Admin)
│   │   ├── CarsController.cs           Public + owner car, availability & image endpoints
│   │   ├── OwnerController.cs          Owner car list & rental accept/reject
│   │   ├── RenterController.cs         License submit/upload/get & renter reviews
│   │   ├── RentalsController.cs        Create, view, complete, cancel rentals
│   │   ├── ReviewsController.cs        Post, delete & query reviews
│   │   └── NotificationsController.cs  Read, mark-read & delete notifications
│   ├── Services/
│   │   ├── Interfaces/         # IAuthService, ICarPostService, …
│   │   └── Implementations/    # Business logic
│   ├── Repositories/
│   │   ├── Interfaces/         # IUserRepository, ICarPostRepository, …
│   │   └── Implementations/    # EF Core data access
│   ├── DTOs/                   # Request / response shapes per feature
│   │   ├── Auth/               # Login, Register, Me, UpdateProfile, ChangePassword
│   │   ├── Car/                # List, Detail, Create, Update, Search, Image, Pending
│   │   ├── Availability/       # Set / update availability calendar
│   │   ├── License/            # Submit, upload images, verify, reject
│   │   ├── Rental/             # Create, list (renter/owner/admin), action responses
│   │   ├── Review/             # Create, item, car reviews, renter reviews
│   │   ├── Notification/       # NotificationDto, NotificationsListDto
│   │   └── User/               # Summary, Detail, action responses
│   ├── Hubs/
│   │   └── NotificationHub.cs  # SignalR hub — real-time push notifications
│   ├── Models/                 # EF Core entities (User, CarPost, Rental …)
│   ├── Data/                   # AppDbContext + Fluent API config + DbSeeder
│   ├── Common/                 # ServiceResult<T> wrapper
│   ├── Swagger/                # AuthOperationFilter (JWT padlock per endpoint)
│   ├── appsettings.json
│   └── Dockerfile
├── frontEnd/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── auth.js             # saveAuth / getToken / clearAuth helpers
│   │   │   └── apiClient.js        # Shared axios instance (JWT interceptor + 401 handler)
│   │   ├── services/               # One file per API domain
│   │   │   ├── authService.js
│   │   │   ├── carService.js
│   │   │   ├── rentalService.js
│   │   │   ├── renterService.js
│   │   │   ├── ownerService.js
│   │   │   ├── reviewService.js
│   │   │   ├── adminService.js
│   │   │   └── notificationService.js
│   │   ├── features/               # Route-level feature folders
│   │   │   ├── home/               # Renter home page
│   │   │   ├── explore/            # Browse & filter listings
│   │   │   ├── car-detail/         # Single car view + reviews
│   │   │   ├── confirm-request/    # Rental booking confirmation
│   │   │   ├── dashboard/          # Renter booking dashboard
│   │   │   ├── profile-settings/   # Renter profile & security settings
│   │   │   └── admin/              # Admin dashboard components
│   │   ├── Admin/                  # Admin pages (overview, cars, rentals, users, verifications)
│   │   ├── Owner/                  # Owner pages (dashboard, home, create post, settings)
│   │   ├── HomePage/               # Public landing page
│   │   ├── LoginPage/
│   │   ├── SignupPage/
│   │   └── shared/                 # Reusable layouts, Navbar, Footer, StatusChip …
│   ├── package.json                # React 19, Vite 8, Tailwind 3, axios 1.15.0
│   └── Dockerfile
├── database/
│   └── CarRental_Database.sql      # Full schema — applied automatically on first Docker run
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
| .NET 10 SDK | Backend local development only |
| Node.js 20+ | Frontend local development only |

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
| SignalR Hub | ws://localhost:5000/hubs/notifications |
| SQL Server | `localhost,1434` (mapped from container port 1433) |

> **Schema**: migrations run automatically on startup — no manual SQL script needed. The database and schema are created on first `docker compose up`.

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
npm run dev       # Vite dev server — http://localhost:5173
```

Set the backend URL if it differs from the default:

```bash
# .env.local
VITE_API_URL=http://localhost:5000
```

---

## API Overview

> All JSON is **snake_case**. Protected endpoints require `Authorization: Bearer <token>`.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Create account (`CarOwner` or `Renter`) |
| `POST` | `/login` | Public | Returns JWT + user object |
| `POST` | `/logout` | Bearer | Client-side token disposal |
| `GET` | `/me` | Bearer | Current user profile |
| `PUT` | `/me` | Bearer | Update full name / phone number |
| `POST` | `/change-password` | Bearer | Change password |

### Admin — `/api/admin` *(Admin role)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List all users |
| `GET` | `/users/pending-owners` | Car owners awaiting approval |
| `GET` | `/users/{id}` | User detail |
| `PATCH` | `/users/{id}/approve` | Approve account |
| `PATCH` | `/users/{id}/reject` | Reject account with reason |
| `PATCH` | `/users/{id}/promote` | Promote user to Admin |
| `DELETE` | `/users/{id}` | Delete user |
| `GET` | `/cars/pending` | Pending car posts |
| `PATCH` | `/cars/{id}/approve` | Approve car post |
| `PATCH` | `/cars/{id}/reject` | Reject car post with reason |
| `GET` | `/licenses` | All submitted driver licenses |
| `PATCH` | `/licenses/{id}/verify` | Verify license |
| `PATCH` | `/licenses/{id}/reject` | Reject license with reason |
| `GET` | `/rentals` | All rentals in the system |
| `GET` | `/stats` | Dashboard statistics |

### Cars — `/api/cars`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | Public | Active listings (`?page=1&pageSize=20`) |
| `GET` | `/search` | Public | Filter by `type`, `brand`, `location`, `min_price`, `max_price` |
| `GET` | `/{id}` | Public | Car detail + reviews + availability |
| `POST` | `/` | CarOwner | Create car post |
| `PUT` | `/{id}` | CarOwner | Update car post |
| `DELETE` | `/{id}` | CarOwner / Admin | Delete car post |
| `GET` | `/{id}/availability` | Public | Availability calendar |
| `POST` | `/{id}/availability` | CarOwner | Set availability dates |
| `PUT` | `/{id}/availability` | CarOwner | Update availability dates |
| `GET` | `/{id}/reviews` | Public | Car reviews |
| `POST` | `/{id}/images` | CarOwner | Upload a car image (`multipart/form-data`) |
| `DELETE` | `/{id}/images/{imageId}` | CarOwner | Delete a car image |

### Owner — `/api/owner` *(CarOwner role)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cars` | Owner's car listings |
| `GET` | `/rentals` | Incoming rental requests |
| `PATCH` | `/rentals/{id}/accept` | Accept rental |
| `PATCH` | `/rentals/{id}/reject` | Reject rental with reason |

### Rentals — `/api/rentals`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | Renter | Create rental request |
| `GET` | `/my` | Renter | My rentals |
| `GET` | `/{id}` | Renter / Owner / Admin | Rental detail |
| `PATCH` | `/{id}/complete` | CarOwner / Admin | Mark completed |
| `DELETE` | `/{id}` | Renter | Cancel request |

### Renter — `/api/renter` *(Renter role)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/license` | Submit license details (step 1) |
| `POST` | `/license/images` | Upload front & back images (`multipart/form-data`, step 2) |
| `GET` | `/license` | My license status |
| `GET` | `/reviews` | Reviews I have written |

### Reviews — `/api/reviews`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | Renter | Post review (rental must be `Completed`) |
| `DELETE` | `/{id}` | Admin | Delete review |
| `GET` | `/my` | Renter | My reviews |
| `GET` | `/all` | Any authenticated | All reviews |
| `GET` | `/car/{carPostId}` | Public | Public reviews for a car |
| `GET` | `/car/{carPostId}/all` | Any authenticated | All reviews for a car |
| `GET` | `/car/{carPostId}/top` | Public | Top N reviews (`?count=5`) |

### Notifications — `/api/notifications` *(Bearer)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | All notifications + unread count + total |
| `GET` | `/unread-count` | Unread notification count |
| `PATCH` | `/{id}/read` | Mark one as read |
| `PATCH` | `/read-all` | Mark all as read |
| `DELETE` | `/{id}` | Delete notification |

### Real-time — SignalR

Connect to `ws://localhost:5000/hubs/notifications?access_token=<JWT>` to receive push notifications when rental status changes, approvals, etc.

---

## Frontend Pages

| Route | Component | Role |
|-------|-----------|------|
| `/` | `HomePage` | Public |
| `/login` | `LoginPage` | Public |
| `/signup` | `SignupPage` | Public |
| `/renter-home` | `RenterHomePage` | Renter |
| `/renter-explore` | `RenterExplorePage` | Renter |
| `/renter-car-detail/:carId` | `RenterCarDetailPage` | Renter |
| `/renter-confirm-request` | `RenterConfirmRequestPage` | Renter |
| `/renter-dashboard` | `RenterDashboardPage` | Renter |
| `/renter-settings` | `RenterProfileSettingsPage` | Renter |
| `/owner` | `OwnerDashboard` | CarOwner |
| `/owner/home` | `OwnerHome` | CarOwner |
| `/owner/create-post` | `CreateCarPostPage` | CarOwner |
| `/owner/settings` | `OwnerProfileSettings` | CarOwner |
| `/admin` | `AdminOverviewPage` | Admin |
| `/admin/cars` | `AdminCarsPage` | Admin |
| `/admin/rentals` | `AdminRentalsPage` | Admin |
| `/admin/users` | `AdminUsersPage` | Admin |
| `/admin/verifications` | `AdminVerificationsPage` | Admin |

---

## Frontend Service Layer

All HTTP calls go through a central axios instance (`src/lib/apiClient.js`) that automatically attaches the JWT and redirects to `/login` on a `401` response.

```
src/services/
├── authService.js          register, login, logout, getMe, updateProfile, changePassword
├── carService.js           getCars, searchCars, getCarById, createCar, updateCar, deleteCar,
│                           getCarAvailability, setCarAvailability, updateCarAvailability,
│                           addCarImage, deleteCarImage
├── rentalService.js        createRental, getMyRentals, getRentalById, completeRental, cancelRental
├── ownerService.js         getMyCars, getOwnerRentals, acceptRental, rejectRental
├── renterService.js        submitLicense, uploadLicenseImages, getMyLicense, getMyReviews
├── reviewService.js        createReview, deleteReview, getMyReviews, getAllReviews,
│                           getCarReviews, getAllCarReviews, getTopCarReviews
├── adminService.js         getAllUsers, getPendingOwners, getUserById, approveUser, rejectUser,
│                           deleteUser, promoteToAdmin, getPendingCars, approveCar, rejectCar,
│                           getAllLicenses, verifyLicense, rejectLicense, getAllRentals, getAdminStats
└── notificationService.js  getNotifications, markNotificationRead, markAllNotificationsRead,
                            getUnreadCount, deleteNotification
```

Configure the backend URL with an env variable (defaults to `http://localhost:5000`):

```bash
# frontEnd/.env.local
VITE_API_URL=http://localhost:5000
```

---

## Testing with Swagger

1. Run the API (`dotnet run` or Docker)
2. Open **http://localhost:5000/swagger** (Docker) or **http://localhost:5055/swagger** (local)
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
| `VITE_API_URL` | `http://localhost:5000` | Frontend → backend base URL |

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
