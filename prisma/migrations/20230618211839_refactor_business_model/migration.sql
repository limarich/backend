/*
  Warnings:

  - The `mainPartnerships` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mainActivities` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mainResources` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `valueProposition` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `customerRelationship` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `channels` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `customerSegments` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `costs` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenue` column on the `business_model` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "business_model" DROP COLUMN "mainPartnerships",
ADD COLUMN     "mainPartnerships" TEXT[],
DROP COLUMN "mainActivities",
ADD COLUMN     "mainActivities" TEXT[],
DROP COLUMN "mainResources",
ADD COLUMN     "mainResources" TEXT[],
DROP COLUMN "valueProposition",
ADD COLUMN     "valueProposition" TEXT[],
DROP COLUMN "customerRelationship",
ADD COLUMN     "customerRelationship" TEXT[],
DROP COLUMN "channels",
ADD COLUMN     "channels" TEXT[],
DROP COLUMN "customerSegments",
ADD COLUMN     "customerSegments" TEXT[],
DROP COLUMN "costs",
ADD COLUMN     "costs" TEXT[],
DROP COLUMN "revenue",
ADD COLUMN     "revenue" TEXT[];
