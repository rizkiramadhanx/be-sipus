/*
  Warnings:

  - You are about to drop the `booksoncategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `booksoncategories` DROP FOREIGN KEY `BooksOnCategories_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `booksoncategories` DROP FOREIGN KEY `BooksOnCategories_category_id_fkey`;

-- DropTable
DROP TABLE `booksoncategories`;

-- DropTable
DROP TABLE `category`;
