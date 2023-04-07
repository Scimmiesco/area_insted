using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class CriandoTabelaAreaInsted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TbAddresses",
                columns: table => new
                {
                    IdAddress = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NmState = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NmCity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NmStreet = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NmNeighborhood = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NrHouseNumber = table.Column<int>(type: "int", nullable: false),
                    NmComplement = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NrZipCode = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbAddresses", x => x.IdAddress);
                });

            migrationBuilder.CreateTable(
                name: "TbUsers",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdAddress = table.Column<int>(type: "int", nullable: false),
                    NmUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NrRegister = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NrCpf = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NrRg = table.Column<int>(type: "int", nullable: true),
                    NmExpedition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DtBirthdate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NmSex = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NmPhone1 = table.Column<int>(type: "int", nullable: false),
                    NmPhone2 = table.Column<int>(type: "int", nullable: true),
                    NmEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NmPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImgFile = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    SnTeacher = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbUsers", x => x.IdUser);
                    table.ForeignKey(
                        name: "FK_TbUsers_TbAddresses_IdAddress",
                        column: x => x.IdAddress,
                        principalTable: "TbAddresses",
                        principalColumn: "IdAddress",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TbClasses",
                columns: table => new
                {
                    IdClass = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    NmClass = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NmWeekday = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NmClassroom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NrTotal = table.Column<int>(type: "int", nullable: true),
                    NmUser = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DtTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    IdUserNavigationIdUser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbClasses", x => x.IdClass);
                    table.ForeignKey(
                        name: "FK_TbClasses_TbUsers_IdUserNavigationIdUser",
                        column: x => x.IdUserNavigationIdUser,
                        principalTable: "TbUsers",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TbClassFiles",
                columns: table => new
                {
                    IdClassFiles = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdClass = table.Column<int>(type: "int", nullable: false),
                    NmFile = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ImgFile = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    IdClassNavigationIdClass = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbClassFiles", x => x.IdClassFiles);
                    table.ForeignKey(
                        name: "FK_TbClassFiles_TbClasses_IdClassNavigationIdClass",
                        column: x => x.IdClassNavigationIdClass,
                        principalTable: "TbClasses",
                        principalColumn: "IdClass",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TbUserClasses",
                columns: table => new
                {
                    IdUserClass = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    IdClass = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbUserClasses", x => x.IdUserClass);
                    table.ForeignKey(
                        name: "FK_TbUserClasses_TbClasses_IdClass",
                        column: x => x.IdClass,
                        principalTable: "TbClasses",
                        principalColumn: "IdClass",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TbAcadActivities",
                columns: table => new
                {
                    IdAcadActivity = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUserClass = table.Column<int>(type: "int", nullable: false),
                    NmAcadActivity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DtDeadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUserClassNavigationIdUserClass = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbAcadActivities", x => x.IdAcadActivity);
                    table.ForeignKey(
                        name: "FK_TbAcadActivities_TbUserClasses_IdUserClassNavigationIdUserClass",
                        column: x => x.IdUserClassNavigationIdUserClass,
                        principalTable: "TbUserClasses",
                        principalColumn: "IdUserClass",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TbFrequencies",
                columns: table => new
                {
                    IdFrequency = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUserClass = table.Column<int>(type: "int", nullable: false),
                    NrPresence = table.Column<int>(type: "int", nullable: false),
                    DtDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUserClassNavigationIdUserClass = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbFrequencies", x => x.IdFrequency);
                    table.ForeignKey(
                        name: "FK_TbFrequencies_TbUserClasses_IdUserClassNavigationIdUserClass",
                        column: x => x.IdUserClassNavigationIdUserClass,
                        principalTable: "TbUserClasses",
                        principalColumn: "IdUserClass",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TbGrades",
                columns: table => new
                {
                    IdGrades = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUserClass = table.Column<int>(type: "int", nullable: false),
                    Prova1 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Prova2 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ExCp1 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ExCp2 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Portfolio = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Project = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Exam = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    IdUserClassNavigationIdUserClass = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbGrades", x => x.IdGrades);
                    table.ForeignKey(
                        name: "FK_TbGrades_TbUserClasses_IdUserClassNavigationIdUserClass",
                        column: x => x.IdUserClassNavigationIdUserClass,
                        principalTable: "TbUserClasses",
                        principalColumn: "IdUserClass",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TbAcadActivities_IdUserClassNavigationIdUserClass",
                table: "TbAcadActivities",
                column: "IdUserClassNavigationIdUserClass");

            migrationBuilder.CreateIndex(
                name: "IX_TbClasses_IdUserNavigationIdUser",
                table: "TbClasses",
                column: "IdUserNavigationIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_TbClassFiles_IdClassNavigationIdClass",
                table: "TbClassFiles",
                column: "IdClassNavigationIdClass");

            migrationBuilder.CreateIndex(
                name: "IX_TbFrequencies_IdUserClassNavigationIdUserClass",
                table: "TbFrequencies",
                column: "IdUserClassNavigationIdUserClass");

            migrationBuilder.CreateIndex(
                name: "IX_TbGrades_IdUserClassNavigationIdUserClass",
                table: "TbGrades",
                column: "IdUserClassNavigationIdUserClass");

            migrationBuilder.CreateIndex(
                name: "IX_TbUserClasses_IdClass",
                table: "TbUserClasses",
                column: "IdClass");

            migrationBuilder.CreateIndex(
                name: "IX_TbUsers_IdAddress",
                table: "TbUsers",
                column: "IdAddress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TbAcadActivities");

            migrationBuilder.DropTable(
                name: "TbClassFiles");

            migrationBuilder.DropTable(
                name: "TbFrequencies");

            migrationBuilder.DropTable(
                name: "TbGrades");

            migrationBuilder.DropTable(
                name: "TbUserClasses");

            migrationBuilder.DropTable(
                name: "TbClasses");

            migrationBuilder.DropTable(
                name: "TbUsers");

            migrationBuilder.DropTable(
                name: "TbAddresses");
        }
    }
}
