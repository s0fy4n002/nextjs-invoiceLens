import { NextResponse } from "next/server";
import { InvoiceSchema } from "@/lib/validations/invoiceValidation";
import * as AIService from "@/lib/services/gemini.service";
import * as InvoiceService from "@/lib/services/invoice.service";
import { StorageService } from "@/lib/services/storage.service";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) return NextResponse.json({ error: "File required" }, { status: 400 });

        const upload = await StorageService.uploadToSupabase(file);
        if (!upload.photoUrl) {
            return NextResponse.json({ error: upload.message ?? "gagal upload file" }, { status: 500 });
        }

        const rawAiData = await AIService.scanInvoiceWithGemini(upload.photoUrl, file.type);
        console.log("rawAIData ", rawAiData)
        const validatedData = InvoiceSchema.parse(rawAiData);

        const existing = await prisma.invoice.findUnique({
            where: { id: validatedData.id }
        })

        if (existing) {
            return NextResponse.json({ message: "Invoice ID already exists" }, { status: 500 });
        }

        const result = await InvoiceService.saveInvoiceToDb(validatedData, upload.photoUrl);

        return NextResponse.json({ message: "Success", data: result }, { status: 201 });

    } catch (error: any) {
        console.log('error adalah ', error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "AI return invalid data structure", details: error.errors }, { status: 422 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}