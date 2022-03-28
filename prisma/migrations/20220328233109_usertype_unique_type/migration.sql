/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `user_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_types_type_key" ON "user_types"("type");
