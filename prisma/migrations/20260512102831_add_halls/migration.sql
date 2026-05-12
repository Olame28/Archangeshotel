-- CreateTable
CREATE TABLE "Hall" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryOfOrigin" TEXT,
    "nationality" TEXT,
    "idDocument" TEXT,
    "cityOfProvenance" TEXT,
    "type" TEXT NOT NULL,
    "checkin" DATETIME NOT NULL,
    "checkout" DATETIME NOT NULL,
    "guests" INTEGER NOT NULL DEFAULT 1,
    "stayPurpose" TEXT,
    "roomId" INTEGER,
    "hallId" INTEGER,
    "message" TEXT,
    "paymentMode" TEXT NOT NULL,
    "companyName" TEXT,
    "companyContact" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "lang" TEXT NOT NULL DEFAULT 'fr',
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Reservation_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "Hall" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("checkin", "checkout", "cityOfProvenance", "companyContact", "companyName", "countryOfOrigin", "createdAt", "email", "firstName", "guests", "id", "idDocument", "lang", "lastName", "message", "nationality", "paymentMode", "phone", "roomId", "status", "stayPurpose", "type", "updatedAt") SELECT "checkin", "checkout", "cityOfProvenance", "companyContact", "companyName", "countryOfOrigin", "createdAt", "email", "firstName", "guests", "id", "idDocument", "lang", "lastName", "message", "nationality", "paymentMode", "phone", "roomId", "status", "stayPurpose", "type", "updatedAt" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
