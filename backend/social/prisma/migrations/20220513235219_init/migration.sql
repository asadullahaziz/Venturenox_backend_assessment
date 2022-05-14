-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "address" JSONB NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "zipCode" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "webUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "designation" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255),
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255),
    "socialLinks" JSONB,
    "employeeId" INTEGER NOT NULL,
    "tenantId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
