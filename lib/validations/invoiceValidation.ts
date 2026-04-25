import { z } from "zod";

export const InvoiceItemSchema = z.object({
    name: z.string().nullable(),
    quantity: z.number().nullable(),
    price: z.number().nullable(),
    total: z.number().nullable(),
});

export const InvoiceSchema = z.object({
    id: z.string(),
    storeName: z.string().nullable(),
    date: z.string().nullable().transform((val) => (val ? new Date(val) : null)),
    total: z.number().nullable(),
    paymentMethod: z.string().nullable(),
    items: z.array(InvoiceItemSchema),
});

export type InvoiceInput = z.infer<typeof InvoiceSchema>;