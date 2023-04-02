/*
  Warnings:

  - You are about to drop the column `title` on the `stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stores` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(128) NULL DEFAULT 'Store';
