-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Reservation" (
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
    "message" TEXT,
    "paymentMode" TEXT NOT NULL,
    "companyName" TEXT,
    "companyContact" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "lang" TEXT NOT NULL DEFAULT 'fr',
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
