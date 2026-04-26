import InvoiceList from "@/components/invoices/InvoiceList";
import UploadForm from "@/components/invoices/UploadForm";
import { prisma } from "@/lib/prisma";

export const revalidate = 0

// Fungsi untuk ambil data dari Prisma
async function getInvoices() {
  return await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" }, // Invoice terbaru di atas
    select: {
      id: true,
      storeName: true,
      date: true,
      total: true,
      paymentMethod: true,
      fileUrl: true,
      items: {
        select: {
          name: true,
          quantity: true,
          price: true,
          total: true,
        },
      },
    },
  });
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-gray-200 mb-8 gap-4">
          <div className="flex items-center gap-4">
            {/* Logo Dummy menggunakan Placeholder Image */}
            <div className="relative h-14 w-14 overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white">
              {/* Kamu bisa ganti src ini dengan logo asli nanti */}
              <img
                src="/logo.png"
                alt="InvoiceLens Logo"
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Invoice<span className="text-blue-600">Lens</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium italic">
                "Focused on your financial clarity"
              </p>
            </div>
          </div>

          
        </header>

        {/* Grid Layout: Kiri Upload, Kanan List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UploadForm />
          </div>
          <div className="lg:col-span-2">
            <InvoiceList invoices={invoices} />
          </div>
        </div>
      </div>
    </main>
  );
}
