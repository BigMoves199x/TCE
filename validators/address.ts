import { z } from "zod";

export const addressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(2, "Address label is required.")
    .max(30, "Address label is too long."),

  firstName: z
    .string()
    .trim()
    .min(2, "First name is required.")
    .max(50, "First name is too long."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name is required.")
    .max(50, "Last name is too long."),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .min(2, "Country is required.")
    .max(80, "Country name is too long."),

  address1: z
    .string()
    .trim()
    .min(5, "Street address is required.")
    .max(150, "Street address is too long."),

  address2: z
    .string()
    .trim()
    .max(150, "Additional address is too long.")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .trim()
    .min(2, "City is required.")
    .max(80, "City name is too long."),

  state: z
    .string()
    .trim()
    .min(2, "State is required.")
    .max(80, "State name is too long."),

  postalCode: z
    .string()
    .trim()
    .max(20, "Postal code is too long.")
    .optional()
    .or(z.literal("")),

  isDefault: z.boolean().default(false),
});

export type AddressInput = z.infer<typeof addressSchema>;