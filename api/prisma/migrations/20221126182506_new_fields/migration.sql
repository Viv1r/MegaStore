/*
  Warnings:

  - You are about to alter the column `description` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(4096)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `attributes` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(256) NOT NULL;
