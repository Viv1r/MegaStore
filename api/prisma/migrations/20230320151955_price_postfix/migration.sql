/*
  Warnings:

  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `price_postfix` VARCHAR(191) NULL,
    MODIFY `price` DECIMAL(16, 2) NOT NULL DEFAULT 0.00;
