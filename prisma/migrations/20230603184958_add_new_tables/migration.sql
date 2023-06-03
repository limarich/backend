/*
  Warnings:

  - Added the required column `isAdmin` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT,
    "userId" TEXT NOT NULL,
    "addressId" TEXT,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_model" (
    "id" TEXT NOT NULL,
    "mainPartnerships" TEXT NOT NULL,
    "mainActivities" TEXT NOT NULL,
    "mainResources" TEXT NOT NULL,
    "valueProposition" TEXT NOT NULL,
    "customerRelationship" TEXT NOT NULL,
    "channels" TEXT NOT NULL,
    "customerSegments" TEXT NOT NULL,
    "costs" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "business_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_plan" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "action_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_item" (
    "id" SERIAL NOT NULL,
    "what" TEXT NOT NULL,
    "why" TEXT NOT NULL,
    "who" TEXT NOT NULL,
    "when" TEXT NOT NULL,
    "where" TEXT NOT NULL,
    "how" TEXT NOT NULL,
    "howMuch" TEXT NOT NULL,
    "actionPlanId" TEXT NOT NULL,

    CONSTRAINT "action_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swot" (
    "id" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "opportunities" TEXT NOT NULL,
    "threats" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "swot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "business_userId_key" ON "business"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "business_model_businessId_key" ON "business_model"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "action_plan_businessId_key" ON "action_plan"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "action_item_actionPlanId_key" ON "action_item"("actionPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "swot_businessId_key" ON "swot"("businessId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_model" ADD CONSTRAINT "business_model_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_plan" ADD CONSTRAINT "action_plan_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_item" ADD CONSTRAINT "action_item_actionPlanId_fkey" FOREIGN KEY ("actionPlanId") REFERENCES "action_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swot" ADD CONSTRAINT "swot_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
