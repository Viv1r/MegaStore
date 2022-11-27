-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(256) NOT NULL,
    `description` VARCHAR(4096) NULL,
    `price` DECIMAL(16, 2) NULL DEFAULT 0.00,
    `count_available` INTEGER NULL DEFAULT 0,
    `store_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
