"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Buat pratinjau jika file adalah gambar
      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null); // Tidak ada pratinjau untuk PDF
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/invoices/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Memproses file:", file.name);
      const result = await response.json();
      if (!response.ok) {
        console.error("Gagal:", result.message);
        alert(result.message ?? "Terjadi kesalahan saat memproses invoice.");
        return;
      }

      console.log("Sukses:", result.data);
      
      setFile(null);
      setPreviewUrl(null);
      alert("Invoice berhasil diproses!");
      window.location.reload();
    } catch (error) {
      console.error("Gagal mengunggah:", error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Upload Invoice Baru
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropzone Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer bg-gray-50 text-center">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="invoiceFile"
          />
          <label htmlFor="invoiceFile" className="cursor-pointer block">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              {file
                ? `File terpilih: ${file.name}`
                : "Klik atau seret file gambar/PDF ke sini"}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, PDF max 500kb</p>
          </label>
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau:</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview Invoice"
              className="max-h-48 rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition ${
            !file || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memproses AI...
            </>
          ) : (
            "Proses dengan InvoiceLens AI"
          )}
        </button>
      </form>
    </div>
  );
}
