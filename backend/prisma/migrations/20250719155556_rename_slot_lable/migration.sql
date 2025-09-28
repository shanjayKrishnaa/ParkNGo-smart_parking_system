/*
  Warnings:

  - You are about to drop the column `slotLable` on the `ParkingSlot` table. All the data in the column will be lost.
  - Added the required column `slotLabel` to the `ParkingSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSlot" DROP COLUMN "slotLable",
ADD COLUMN     "slotLabel" TEXT NOT NULL;
