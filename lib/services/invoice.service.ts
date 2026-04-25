
import { InvoiceInput } from "@/lib/validations/invoiceValidation";
import { prisma } from "@/lib/prisma";

export const saveInvoiceToDb = async (data: InvoiceInput, fileUrl: string|null) => {
  return await prisma.$transaction(async (tx) => {
    return await tx.invoice.create({
      data: {
        id: data.id,
        storeName: data.storeName,
        date: data.date,
        total: data.total,
        paymentMethod: data.paymentMethod,
        fileUrl: fileUrl,
        items: {
          create: data.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          })),
        },
      },
      include: { items: true },
    });
  });
};