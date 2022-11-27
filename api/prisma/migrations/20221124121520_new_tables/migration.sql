/*
  Warnings:

  - Added the required column `owner_id` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stores` ADD COLUMN `owner_id` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(128) NULL DEFAULT 'Store';

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NULL DEFAULT 'Anonymous',
    `email` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `managersOnStores` (
    `manager_id` INTEGER NOT NULL,
    `store_id` INTEGER NOT NULL,

    PRIMARY KEY (`manager_id`, `store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stores` ADD CONSTRAINT `stores_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `managersOnStores` ADD CONSTRAINT `managersOnStores_manager_id_fkey` FOREIGN KEY (`manager_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `managersOnStores` ADD CONSTRAINT `managersOnStores_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
