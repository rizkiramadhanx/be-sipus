/*
  Warnings:

  - You are about to drop the column `id_spesific` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bookspesific` DROP FOREIGN KEY `BookSpesific_id_book_fkey`;

-- DropIndex
DROP INDEX `Book_id_spesific_key` ON `book`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `id_spesific`;

-- AddForeignKey
ALTER TABLE `BookSpesific` ADD CONSTRAINT `BookSpesific_id_book_fkey` FOREIGN KEY (`id_book`) REFERENCES `Book`(`id_book`) ON DELETE RESTRICT ON UPDATE CASCADE;
