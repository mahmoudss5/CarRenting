
USE master;
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'CarRentalDB')
    CREATE DATABASE CarRentalDB
        COLLATE SQL_Latin1_General_CP1_CI_AS;
GO

USE CarRentalDB;
GO

-- ============================================================
-- 0. SCHEMA
-- this is not the final result     
-- it's just a resault of my brainStorming and first design with the llm tools
-- ============================================================
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'rental')
    EXEC('CREATE SCHEMA rental');
GO

-- ============================================================
-- 1. Users
-- ============================================================
CREATE TABLE rental.Users (
    Id              BIGINT          NOT NULL IDENTITY(1,1),
    FirstName       VARCHAR(100)    NOT NULL,
    LastName        VARCHAR(100)    NOT NULL,
    Email           VARCHAR(255)    NOT NULL,
    PasswordHash    VARCHAR(512)    NOT NULL,
    PhoneNumber     VARCHAR(20)     NULL,
    ProfilePictureUrl VARCHAR(500)  NULL,
    Role            VARCHAR(20)     NOT NULL
        CONSTRAINT CK_Users_Role
            CHECK (Role IN ('Admin', 'CarOwner', 'Renter')),
    AccountStatus   VARCHAR(20)     NOT NULL  DEFAULT 'Active'
        CONSTRAINT CK_Users_AccountStatus
            CHECK (AccountStatus IN ('Pending', 'Active', 'Rejected', 'Suspended')),
    CreatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_Users PRIMARY KEY (Id),
    CONSTRAINT UQ_Users_Email UNIQUE (Email)
);
GO

CREATE INDEX IX_Users_Role          ON rental.Users (Role);
CREATE INDEX IX_Users_AccountStatus ON rental.Users (AccountStatus);
GO

-- ============================================================
-- 2. CarOwners  (profile extension for Role = 'CarOwner')
-- ============================================================
CREATE TABLE rental.CarOwners (
    Id                  BIGINT          NOT NULL IDENTITY(1,1),
    UserId              BIGINT          NOT NULL,
    BusinessName        VARCHAR(200)    NULL,
    NationalId          VARCHAR(50)     NULL,
    ApprovedAt          DATETIME2       NULL,
    ApprovedByAdminId   BIGINT          NULL,
    CreatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_CarOwners PRIMARY KEY (Id),
    CONSTRAINT UQ_CarOwners_UserId UNIQUE (UserId),
    CONSTRAINT FK_CarOwners_Users
        FOREIGN KEY (UserId)          REFERENCES rental.Users (Id) ON DELETE CASCADE,
    CONSTRAINT FK_CarOwners_Admin
        FOREIGN KEY (ApprovedByAdminId) REFERENCES rental.Users (Id) ON DELETE NO ACTION
);
GO

CREATE INDEX IX_CarOwners_UserId ON rental.CarOwners (UserId);
GO

-- ============================================================
-- 3. Renters  (profile extension for Role = 'Renter')
-- ============================================================
CREATE TABLE rental.Renters (
    Id          BIGINT      NOT NULL IDENTITY(1,1),
    UserId      BIGINT      NOT NULL,
    CreatedAt   DATETIME2   NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2   NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_Renters PRIMARY KEY (Id),
    CONSTRAINT UQ_Renters_UserId UNIQUE (UserId),
    CONSTRAINT FK_Renters_Users
        FOREIGN KEY (UserId) REFERENCES rental.Users (Id) ON DELETE CASCADE
);
GO

CREATE INDEX IX_Renters_UserId ON rental.Renters (UserId);
GO

-- ============================================================
-- 4. DriverLicenses  (1-to-1 with Renters)
-- ============================================================
CREATE TABLE rental.DriverLicenses (
    Id              BIGINT          NOT NULL IDENTITY(1,1),
    RenterId        BIGINT          NOT NULL,
    LicenseNumber   VARCHAR(100)    NOT NULL,
    IssuingCountry  VARCHAR(100)    NOT NULL,
    ExpiryDate      DATE            NOT NULL,
    FrontImageUrl   VARCHAR(500)    NOT NULL,
    BackImageUrl    VARCHAR(500)    NOT NULL,
    IsVerified      BIT             NOT NULL  DEFAULT 0,
    VerifiedAt      DATETIME2       NULL,
    VerifiedByAdminId BIGINT        NULL,
    CreatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_DriverLicenses PRIMARY KEY (Id),
    CONSTRAINT UQ_DriverLicenses_RenterId UNIQUE (RenterId),
    CONSTRAINT FK_DriverLicenses_Renters
        FOREIGN KEY (RenterId) REFERENCES rental.Renters (Id) ON DELETE CASCADE,
    CONSTRAINT FK_DriverLicenses_Admin
        FOREIGN KEY (VerifiedByAdminId) REFERENCES rental.Users (Id) ON DELETE NO ACTION
);
GO

CREATE INDEX IX_DriverLicenses_RenterId  ON rental.DriverLicenses (RenterId);
CREATE INDEX IX_DriverLicenses_IsVerified ON rental.DriverLicenses (IsVerified);
GO

-- ============================================================
-- 5. CarPosts
-- ============================================================
CREATE TABLE rental.CarPosts (
    Id              BIGINT          NOT NULL IDENTITY(1,1),
    OwnerId         BIGINT          NOT NULL,      -- FK -> CarOwners.Id
    Title           VARCHAR(200)    NOT NULL,
    Description     VARCHAR(2000)   NULL,
    CarType         VARCHAR(50)     NOT NULL
        CONSTRAINT CK_CarPosts_CarType
            CHECK (CarType IN ('Sedan','SUV','Hatchback','Coupe','Pickup','Van','Minivan','Convertible','Other')),
    Brand           VARCHAR(100)    NOT NULL,
    Model           VARCHAR(100)    NOT NULL,
    Year            SMALLINT        NOT NULL
        CONSTRAINT CK_CarPosts_Year CHECK (Year BETWEEN 1980 AND 2100),
    Transmission    VARCHAR(10)     NOT NULL
        CONSTRAINT CK_CarPosts_Transmission CHECK (Transmission IN ('Automatic','Manual')),
    Location        VARCHAR(200)    NOT NULL,
    Latitude        DECIMAL(9,6)    NULL,
    Longitude       DECIMAL(9,6)    NULL,
    PricePerDay     DECIMAL(12,2)   NOT NULL
        CONSTRAINT CK_CarPosts_Price CHECK (PricePerDay > 0),
    PostStatus      VARCHAR(20)     NOT NULL  DEFAULT 'PendingApproval'
        CONSTRAINT CK_CarPosts_PostStatus
            CHECK (PostStatus IN ('PendingApproval','Active','Rejected','Inactive')),
    CarStatus       VARCHAR(20)     NOT NULL  DEFAULT 'Available'
        CONSTRAINT CK_CarPosts_CarStatus
            CHECK (CarStatus IN ('Available','Rented','Unavailable')),
    CreatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_CarPosts PRIMARY KEY (Id),
    CONSTRAINT FK_CarPosts_CarOwners
        FOREIGN KEY (OwnerId) REFERENCES rental.CarOwners (Id) ON DELETE CASCADE
);
GO

CREATE INDEX IX_CarPosts_OwnerId     ON rental.CarPosts (OwnerId);
CREATE INDEX IX_CarPosts_PostStatus  ON rental.CarPosts (PostStatus);
CREATE INDEX IX_CarPosts_CarStatus   ON rental.CarPosts (CarStatus);
CREATE INDEX IX_CarPosts_Brand       ON rental.CarPosts (Brand);
CREATE INDEX IX_CarPosts_CarType     ON rental.CarPosts (CarType);
CREATE INDEX IX_CarPosts_PricePerDay ON rental.CarPosts (PricePerDay);
-- Composite index for the most common listing query
CREATE INDEX IX_CarPosts_Search
    ON rental.CarPosts (PostStatus, CarStatus, Brand, CarType, PricePerDay);
GO

-- ============================================================
-- 6. CarImages
-- ============================================================
CREATE TABLE rental.CarImages (
    Id          BIGINT          NOT NULL IDENTITY(1,1),
    CarPostId   BIGINT          NOT NULL,
    ImageUrl    VARCHAR(500)    NOT NULL,
    IsPrimary   BIT             NOT NULL  DEFAULT 0,
    SortOrder   TINYINT         NOT NULL  DEFAULT 0,
    CreatedAt   DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_CarImages PRIMARY KEY (Id),
    CONSTRAINT FK_CarImages_CarPosts
        FOREIGN KEY (CarPostId) REFERENCES rental.CarPosts (Id) ON DELETE CASCADE
);
GO

CREATE INDEX IX_CarImages_CarPostId ON rental.CarImages (CarPostId);
GO

-- ============================================================
-- 7. AvailabilityCalendars
--    One row per date per car. IsAvailable = 0 means blocked.
-- ============================================================
CREATE TABLE rental.AvailabilityCalendars (
    Id          BIGINT      NOT NULL IDENTITY(1,1),
    CarPostId   BIGINT      NOT NULL,
    Date        DATE        NOT NULL,
    IsAvailable BIT         NOT NULL  DEFAULT 1,
    CreatedAt   DATETIME2   NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2   NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_AvailabilityCalendars PRIMARY KEY (Id),
    CONSTRAINT UQ_Availability_CarDate UNIQUE (CarPostId, Date),
    CONSTRAINT FK_Availability_CarPosts
        FOREIGN KEY (CarPostId) REFERENCES rental.CarPosts (Id) ON DELETE CASCADE
);
GO

CREATE INDEX IX_Availability_CarPostId   ON rental.AvailabilityCalendars (CarPostId);
CREATE INDEX IX_Availability_Date        ON rental.AvailabilityCalendars (Date);
CREATE INDEX IX_Availability_CarDate_Avail
    ON rental.AvailabilityCalendars (CarPostId, Date, IsAvailable);
GO

-- ============================================================
-- 8. RentalRequests
-- ============================================================
CREATE TABLE rental.RentalRequests (
    Id                  BIGINT          NOT NULL IDENTITY(1,1),
    RenterId            BIGINT          NOT NULL,
    CarPostId           BIGINT          NOT NULL,
    StartDate           DATE            NOT NULL,
    EndDate             DATE            NOT NULL,
    TotalDays           SMALLINT        NOT NULL
        CONSTRAINT CK_RentalRequests_Days CHECK (TotalDays > 0),
    TotalPrice          DECIMAL(12,2)   NOT NULL
        CONSTRAINT CK_RentalRequests_Price CHECK (TotalPrice > 0),
    Status              VARCHAR(20)     NOT NULL  DEFAULT 'Pending'
        CONSTRAINT CK_RentalRequests_Status
            CHECK (Status IN ('Pending','Accepted','Rejected','Cancelled','Completed')),
    RejectionReason     VARCHAR(500)    NULL,
    CreatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_RentalRequests PRIMARY KEY (Id),
    CONSTRAINT CK_RentalRequests_Dates CHECK (EndDate >= StartDate),
    CONSTRAINT FK_RentalRequests_Renters
        FOREIGN KEY (RenterId)  REFERENCES rental.Renters (Id) ON DELETE NO ACTION,
    CONSTRAINT FK_RentalRequests_CarPosts
        FOREIGN KEY (CarPostId) REFERENCES rental.CarPosts (Id) ON DELETE NO ACTION
);
GO

CREATE INDEX IX_RentalRequests_RenterId  ON rental.RentalRequests (RenterId);
CREATE INDEX IX_RentalRequests_CarPostId ON rental.RentalRequests (CarPostId);
CREATE INDEX IX_RentalRequests_Status    ON rental.RentalRequests (Status);
CREATE INDEX IX_RentalRequests_Dates     ON rental.RentalRequests (StartDate, EndDate);
GO

-- ============================================================
-- 9. RentalStatusLogs  (audit trail for every status change)
-- ============================================================
CREATE TABLE rental.RentalStatusLogs (
    Id                  BIGINT          NOT NULL IDENTITY(1,1),
    RentalRequestId     BIGINT          NOT NULL,
    FromStatus          VARCHAR(20)     NOT NULL,
    ToStatus            VARCHAR(20)     NOT NULL,
    ChangedByUserId     BIGINT          NOT NULL,
    Note                VARCHAR(500)    NULL,
    CreatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_RentalStatusLogs PRIMARY KEY (Id),
    CONSTRAINT FK_StatusLogs_RentalRequests
        FOREIGN KEY (RentalRequestId) REFERENCES rental.RentalRequests (Id) ON DELETE CASCADE,
    CONSTRAINT FK_StatusLogs_Users
        FOREIGN KEY (ChangedByUserId) REFERENCES rental.Users (Id) ON DELETE NO ACTION
);
GO

CREATE INDEX IX_StatusLogs_RentalRequestId ON rental.RentalStatusLogs (RentalRequestId);
GO

-- ============================================================
-- 10. Reviews
--     One review per completed rental (enforced by UQ).
-- ============================================================
CREATE TABLE rental.Reviews (
    Id                  BIGINT          NOT NULL IDENTITY(1,1),
    RentalRequestId     BIGINT          NOT NULL,
    ReviewerId          BIGINT          NOT NULL,   -- FK -> Users.Id
    CarPostId           BIGINT          NOT NULL,   -- denormalised for fast queries
    Rating              TINYINT         NOT NULL
        CONSTRAINT CK_Reviews_Rating CHECK (Rating BETWEEN 1 AND 5),
    Comment             VARCHAR(1000)   NULL,
    CreatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_Reviews PRIMARY KEY (Id),
    CONSTRAINT UQ_Reviews_RentalRequest UNIQUE (RentalRequestId),
    CONSTRAINT FK_Reviews_RentalRequests
        FOREIGN KEY (RentalRequestId) REFERENCES rental.RentalRequests (Id) ON DELETE CASCADE,
    CONSTRAINT FK_Reviews_Users
        FOREIGN KEY (ReviewerId) REFERENCES rental.Users (Id) ON DELETE NO ACTION,
    CONSTRAINT FK_Reviews_CarPosts
        FOREIGN KEY (CarPostId)  REFERENCES rental.CarPosts (Id) ON DELETE NO ACTION
);
GO

CREATE INDEX IX_Reviews_CarPostId   ON rental.Reviews (CarPostId);
CREATE INDEX IX_Reviews_ReviewerId  ON rental.Reviews (ReviewerId);
GO

-- ============================================================
-- 11. Notifications  (feeds the SignalR / WebSocket layer)
-- ============================================================
CREATE TABLE rental.Notifications (
    Id              BIGINT          NOT NULL IDENTITY(1,1),
    UserId          BIGINT          NOT NULL,
    Type            VARCHAR(50)     NOT NULL
        CONSTRAINT CK_Notifications_Type
            CHECK (Type IN (
                'NewRentalRequest',
                'RequestAccepted',
                'RequestRejected',
                'RequestCancelled',
                'RentalCompleted',
                'NewReview',
                'AccountApproved',
                'AccountRejected',
                'PostApproved',
                'PostRejected',
                'LicenseVerified'
            )),
    Message         VARCHAR(500)    NOT NULL,
    ReferenceId     BIGINT          NULL,
    ReferenceType   VARCHAR(50)     NULL
        CONSTRAINT CK_Notifications_RefType
            CHECK (ReferenceType IN (
                'RentalRequest','CarPost','Review','User', NULL
            )),
    IsRead          BIT             NOT NULL  DEFAULT 0,
    CreatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_Notifications PRIMARY KEY (Id),
    CONSTRAINT FK_Notifications_Users
        FOREIGN KEY (UserId) REFERENCES rental.Users (Id) ON DELETE CASCADE
);
GO

CREATE INDEX IX_Notifications_UserId ON rental.Notifications (UserId);
CREATE INDEX IX_Notifications_IsRead ON rental.Notifications (UserId, IsRead);
GO

-- ============================================================
-- 12. AdminActions  (audit log for every admin decision)
-- ============================================================
CREATE TABLE rental.AdminActions (
    Id              BIGINT          NOT NULL IDENTITY(1,1),
    AdminId         BIGINT          NOT NULL,
    EntityType      VARCHAR(50)     NOT NULL
        CONSTRAINT CK_AdminActions_EntityType
            CHECK (EntityType IN ('User','CarPost','DriverLicense')),
    EntityId        BIGINT          NOT NULL,
    Action          VARCHAR(50)     NOT NULL
        CONSTRAINT CK_AdminActions_Action
            CHECK (Action IN ('Approve','Reject','Suspend','Activate')),
    Reason          VARCHAR(500)    NULL,
    CreatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIME2       NOT NULL  DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_AdminActions PRIMARY KEY (Id),
    CONSTRAINT FK_AdminActions_Users
        FOREIGN KEY (AdminId) REFERENCES rental.Users (Id) ON DELETE NO ACTION
);
GO

CREATE INDEX IX_AdminActions_AdminId    ON rental.AdminActions (AdminId);
CREATE INDEX IX_AdminActions_EntityType ON rental.AdminActions (EntityType, EntityId);
GO


SELECT
    TABLE_SCHEMA    AS [Schema],
    TABLE_NAME      AS [Table],
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.COLUMNS c
        WHERE c.TABLE_NAME   = t.TABLE_NAME
          AND c.TABLE_SCHEMA = t.TABLE_SCHEMA
    )               AS [Columns]
FROM INFORMATION_SCHEMA.TABLES t
WHERE TABLE_SCHEMA = 'rental'
ORDER BY TABLE_NAME;
GO
