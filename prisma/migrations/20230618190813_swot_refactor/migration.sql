/*
  Warnings:

  - The `strengths` column on the `swot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weaknesses` column on the `swot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `opportunities` column on the `swot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `threats` column on the `swot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "swot" DROP COLUMN "strengths",
ADD COLUMN     "strengths" TEXT[],
DROP COLUMN "weaknesses",
ADD COLUMN     "weaknesses" TEXT[],
DROP COLUMN "opportunities",
ADD COLUMN     "opportunities" TEXT[],
DROP COLUMN "threats",
ADD COLUMN     "threats" TEXT[];
