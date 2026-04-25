"use client";

import { useState } from "react";

interface InvoiceSubItem {
  name: string | null;
  quantity: number | null;
  price: number | null;
  total: number | null;
}

interface Invoice {
  id: string;
  storeName: string | null;
  date: Date | null;
  total: number | null;
  paymentMethod: string | null;
  fileUrl: string | null;
  items: InvoiceSubItem[];
}

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Daftar Invoice Terproses</h2>
      
      {invoices.length === 0 ? (
        <div className="text-center py-10 border-2 border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500">Belum ada invoice yang diproses.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toko</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.storeName || "Tidak Diketahui"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {invoice.total ? `Rp ${invoice.total.toLocaleString("id-ID")}` : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {invoice.fileUrl ? (
                      <a href={invoice.fileUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                        File
                      </a>
                    ) : (
                      <span className="text-gray-400">No File</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => setSelectedInvoice(invoice)}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100 font-medium transition"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- MODAL DETAIL --- */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col scale-in-center">
            {/* Header Modal */}
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedInvoice.storeName}</h3>
                <p className="text-sm text-gray-500">ID Invoice: {selectedInvoice.id}</p>
              </div>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-600 border-b uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="py-2 text-left">Nama Item</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Harga</th>
                    <th className="py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx} className="text-gray-700 hover:bg-slate-50 transition">
                      <td className="py-3 font-medium">{item.name}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">Rp {item.price?.toLocaleString("id-ID")}</td>
                      <td className="py-3 text-right font-bold text-gray-900">Rp {item.total?.toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Modal */}
            <div className="p-6 border-t bg-slate-50 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Metode Pembayaran: <span className="font-bold text-gray-700 uppercase">{selectedInvoice.paymentMethod || "N/A"}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-tighter">Total Akhir</p>
                <p className="text-2xl font-black text-blue-600 leading-tight">
                  Rp {selectedInvoice.total?.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}