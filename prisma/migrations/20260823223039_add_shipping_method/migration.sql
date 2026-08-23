-- CreateEnum
CREATE TYPE "ShippingMethod" AS ENUM ('STANDARD', 'EXPRESS', 'PICKUP');

-- AlterTable
ALTER TABLE "CheckoutSession" ADD COLUMN     "shippingMethod" "ShippingMethod";
