/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - The values [CASHIER] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `role` ENUM('ADMIN', 'USER', 'EMPLOYEE') NOT NULL,
    ADD PRIMARY KEY (`id_user`);

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `Book` (
    `id_book` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_book`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BooksOnCategories` (
    `category_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,

    PRIMARY KEY (`category_id`, `book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id_author` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_author`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id_language` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_id_book_fkey` FOREIGN KEY (`id_book`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BooksOnCategories` ADD CONSTRAINT `BooksOnCategories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Book`(`id_book`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BooksOnCategories` ADD CONSTRAINT `BooksOnCategories_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Category`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Author` ADD CONSTRAINT `Author_id_author_fkey` FOREIGN KEY (`id_author`) REFERENCES `Book`(`id_book`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Language` ADD CONSTRAINT `Language_id_language_fkey` FOREIGN KEY (`id_language`) REFERENCES `Book`(`id_book`) ON DELETE RESTRICT ON UPDATE CASCADE;
