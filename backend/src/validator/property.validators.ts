import { z } from "zod"

// TODO: Update the schema, learn zod library and add custom errors for each case
export const createUpdatePropertySchema = z.object({
    title: z.string("Not a string").min(1, { error: "Empty Title" }),
    description: z.string().optional(),
    address: z.string("Not a string").min(1, { message: "Empty Adress" }),
    pricePerNight: z.number().min(1),
    bedrooms: z.number().min(1),
    bathrooms: z.number().min(0),
    maxGuests: z.number().min(1),
    amenities: z.array(z.string()).optional()
})