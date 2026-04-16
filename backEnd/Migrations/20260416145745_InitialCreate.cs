using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "rental");

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ProfilePictureUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Role = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    AccountStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdminActions",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdminId = table.Column<long>(type: "bigint", nullable: false),
                    EntityType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminActions_Users_AdminId",
                        column: x => x.AdminId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CarOwners",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    BusinessName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    NationalId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ApprovedByAdminId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarOwners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarOwners_Users_ApprovedByAdminId",
                        column: x => x.ApprovedByAdminId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CarOwners_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ReferenceId = table.Column<long>(type: "bigint", nullable: true),
                    ReferenceType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Renters",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Renters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Renters_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarPosts",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<long>(type: "bigint", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    CarType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Year = table.Column<short>(type: "smallint", nullable: false),
                    Transmission = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Latitude = table.Column<decimal>(type: "decimal(9,6)", precision: 9, scale: 6, nullable: true),
                    Longitude = table.Column<decimal>(type: "decimal(9,6)", precision: 9, scale: 6, nullable: true),
                    PricePerDay = table.Column<decimal>(type: "decimal(12,2)", precision: 12, scale: 2, nullable: false),
                    PostStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CarStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarPosts_CarOwners_OwnerId",
                        column: x => x.OwnerId,
                        principalSchema: "rental",
                        principalTable: "CarOwners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DriverLicenses",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RenterId = table.Column<long>(type: "bigint", nullable: false),
                    LicenseNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IssuingCountry = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ExpiryDate = table.Column<DateOnly>(type: "date", nullable: false),
                    FrontImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    BackImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    VerificationStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    VerifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    VerifiedByAdminId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverLicenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DriverLicenses_Renters_RenterId",
                        column: x => x.RenterId,
                        principalSchema: "rental",
                        principalTable: "Renters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DriverLicenses_Users_VerifiedByAdminId",
                        column: x => x.VerifiedByAdminId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AvailabilityCalendars",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarPostId = table.Column<long>(type: "bigint", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvailabilityCalendars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvailabilityCalendars_CarPosts_CarPostId",
                        column: x => x.CarPostId,
                        principalSchema: "rental",
                        principalTable: "CarPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarImages",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarPostId = table.Column<long>(type: "bigint", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IsPrimary = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<byte>(type: "tinyint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarImages_CarPosts_CarPostId",
                        column: x => x.CarPostId,
                        principalSchema: "rental",
                        principalTable: "CarPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RentalRequests",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RenterId = table.Column<long>(type: "bigint", nullable: false),
                    CarPostId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    TotalDays = table.Column<short>(type: "smallint", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(12,2)", precision: 12, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    RejectionReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentalRequests_CarPosts_CarPostId",
                        column: x => x.CarPostId,
                        principalSchema: "rental",
                        principalTable: "CarPosts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RentalRequests_Renters_RenterId",
                        column: x => x.RenterId,
                        principalSchema: "rental",
                        principalTable: "Renters",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RentalStatusLogs",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RentalRequestId = table.Column<long>(type: "bigint", nullable: false),
                    FromStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    ToStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    ChangedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalStatusLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentalStatusLogs_RentalRequests_RentalRequestId",
                        column: x => x.RentalRequestId,
                        principalSchema: "rental",
                        principalTable: "RentalRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RentalStatusLogs_Users_ChangedByUserId",
                        column: x => x.ChangedByUserId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                schema: "rental",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RentalRequestId = table.Column<long>(type: "bigint", nullable: false),
                    ReviewerId = table.Column<long>(type: "bigint", nullable: false),
                    CarPostId = table.Column<long>(type: "bigint", nullable: false),
                    Rating = table.Column<byte>(type: "tinyint", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_CarPosts_CarPostId",
                        column: x => x.CarPostId,
                        principalSchema: "rental",
                        principalTable: "CarPosts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reviews_RentalRequests_RentalRequestId",
                        column: x => x.RentalRequestId,
                        principalSchema: "rental",
                        principalTable: "RentalRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_ReviewerId",
                        column: x => x.ReviewerId,
                        principalSchema: "rental",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdminActions_AdminId",
                schema: "rental",
                table: "AdminActions",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_AvailabilityCalendars_CarPostId_Date",
                schema: "rental",
                table: "AvailabilityCalendars",
                columns: new[] { "CarPostId", "Date" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CarImages_CarPostId",
                schema: "rental",
                table: "CarImages",
                column: "CarPostId");

            migrationBuilder.CreateIndex(
                name: "IX_CarOwners_ApprovedByAdminId",
                schema: "rental",
                table: "CarOwners",
                column: "ApprovedByAdminId");

            migrationBuilder.CreateIndex(
                name: "IX_CarOwners_UserId",
                schema: "rental",
                table: "CarOwners",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_OwnerId",
                schema: "rental",
                table: "CarPosts",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_DriverLicenses_RenterId",
                schema: "rental",
                table: "DriverLicenses",
                column: "RenterId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DriverLicenses_VerifiedByAdminId",
                schema: "rental",
                table: "DriverLicenses",
                column: "VerifiedByAdminId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                schema: "rental",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalRequests_CarPostId",
                schema: "rental",
                table: "RentalRequests",
                column: "CarPostId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalRequests_RenterId",
                schema: "rental",
                table: "RentalRequests",
                column: "RenterId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalStatusLogs_ChangedByUserId",
                schema: "rental",
                table: "RentalStatusLogs",
                column: "ChangedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalStatusLogs_RentalRequestId",
                schema: "rental",
                table: "RentalStatusLogs",
                column: "RentalRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Renters_UserId",
                schema: "rental",
                table: "Renters",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_CarPostId",
                schema: "rental",
                table: "Reviews",
                column: "CarPostId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_RentalRequestId",
                schema: "rental",
                table: "Reviews",
                column: "RentalRequestId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ReviewerId",
                schema: "rental",
                table: "Reviews",
                column: "ReviewerId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                schema: "rental",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminActions",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "AvailabilityCalendars",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "CarImages",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "DriverLicenses",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "Notifications",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "RentalStatusLogs",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "Reviews",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "RentalRequests",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "CarPosts",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "Renters",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "CarOwners",
                schema: "rental");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "rental");
        }
    }
}
