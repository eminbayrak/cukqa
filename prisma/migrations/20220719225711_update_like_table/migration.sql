-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_email_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
