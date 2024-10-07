-- AlterTable
ALTER TABLE "EmailOtpPrisma" ADD COLUMN     "otp" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "EmailPassPrisma" ADD COLUMN     "otp" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "otpTime" TEXT NOT NULL DEFAULT '';
