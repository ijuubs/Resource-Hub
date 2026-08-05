import React, { useState } from 'react';
import { FileText, Printer, Download, Plus, Trash2, DollarSign, Copy, CheckCircle2, ShieldCheck, Palette, Building } from 'lucide-react';

interface PDFInvoiceGeneratorToolProps {
  initialConfig?: Record<string, any>;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export const PDFInvoiceGeneratorTool: React.FC<PDFInvoiceGeneratorToolProps> = ({ initialConfig }) => {
  const [invoiceNumber, setInvoiceNumber] = useState<string>(initialConfig?.invoiceNumber || 'INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState<string>('2026-08-04');
  const [dueDate, setDueDate] = useState<string>('2026-08-18');

  // Sender details
  const [fromName, setFromName] = useState<string>('Acme Studio LLC');
  const [fromAddress, setFromAddress] = useState<string>('100 Innovation Way, Suite 400\nSan Francisco, CA 94105');
  const [fromEmail, setFromEmail] = useState<string>('billing@acmestudio.io');

  // Client details
  const [toName, setToName] = useState<string>('Nexus Cloud Systems Inc.');
  const [toAddress, setToAddress] = useState<string>('500 Enterprise Blvd\nAustin, TX 78701');
  const [toEmail, setToEmail] = useState<string>('ap@nexuscloud.com');

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'UI/UX Mobile App Redesign - Design Phase', quantity: 1, unitPrice: 3500 },
    { id: '2', description: 'React Frontend Development & Integration', quantity: 45, unitPrice: 95 },
    { id: '3', description: 'Cloud Infrastructure & API Setup', quantity: 1, unitPrice: 1200 },
  ]);

  const [taxRate, setTaxRate] = useState<number>(8.5); // %
  const [discountAmount, setDiscountAmount] = useState<number>(200); // $
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [accentColor, setAccentColor] = useState<string>('#4f46e5'); // Indigo default

  const [notes, setNotes] = useState<string>('Thank you for your business! Please submit payment within 14 days via wire transfer or Stripe portal.');
  const [copied, setCopied] = useState(false);

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const taxAmount = ((subtotal - discountAmount) * (taxRate / 100));
  const totalDue = Math.max(0, subtotal - discountAmount + taxAmount);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), description: 'New Consulting Service', quantity: 1, unitPrice: 150 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const embedCode = `<iframe src="${window.location.origin}/?resource=pdf-invoice-quote-generator" width="100%" height="700" frameborder="0"></iframe>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col space-y-0">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Free Online PDF Invoice & Quote Generator</h3>
            <p className="text-xs text-zinc-400">Create, Preview, and Print Clean Professional Business Invoices</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintPDF}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Invoice Form Controls (Left Column) */}
        <div className="lg:col-span-5 space-y-5 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80 max-h-[800px] overflow-y-auto">
          <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold border-b border-zinc-800 pb-2">
            Invoice Setup & Details
          </h4>

          {/* Invoice # & Dates */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Invoice #</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Issue Date</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2 py-1.5 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2 py-1.5 text-xs font-mono"
              />
            </div>
          </div>

          {/* Sender (From) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-300">Your Company / Contractor Details</label>
            <input
              type="text"
              placeholder="Business Name"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-1.5 text-xs font-medium"
            />
            <textarea
              rows={2}
              placeholder="Address"
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg p-2.5 text-xs"
            />
          </div>

          {/* Recipient (To) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-300">Bill To (Client Details)</label>
            <input
              type="text"
              placeholder="Client Name / Company"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-1.5 text-xs font-medium"
            />
            <textarea
              rows={2}
              placeholder="Client Address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg p-2.5 text-xs"
            />
          </div>

          {/* Line Items Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300">Line Items</label>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Line
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Service / Product Description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-2 py-1 text-xs"
                    />
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-zinc-400">Qty / Hrs</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-2 py-1 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400">Rate ({currencySymbol})</span>
                      <input
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-2 py-1 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax & Discounts */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Discount ({currencySymbol})</label>
              <input
                type="number"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-300">Invoice Brand Theme Color</label>
            <div className="flex items-center gap-2">
              {['#4f46e5', '#059669', '#dc2626', '#d97706', '#2563eb', '#0f172a'].map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    accentColor === color ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Document Paper Sheet Preview (Right Column) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono">Live PDF Document Sheet Preview</span>
            <button
              onClick={handlePrintPDF}
              className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
          </div>

          {/* Printable Sheet Container */}
          <div
            id="printable-invoice"
            className="bg-white text-zinc-900 rounded-lg p-8 shadow-2xl font-sans min-h-[680px] flex flex-col justify-between border border-zinc-200"
            style={{ color: '#18181b' }}
          >
            <div className="space-y-6">
              {/* Top Banner Header */}
              <div className="flex justify-between items-start border-b pb-6" style={{ borderColor: '#e4e4e7' }}>
                <div>
                  <h1 className="text-2xl font-extrabold uppercase tracking-tight" style={{ color: accentColor }}>
                    INVOICE
                  </h1>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">{invoiceNumber}</p>
                </div>

                <div className="text-right space-y-1 text-xs">
                  <div className="flex justify-end gap-3 text-zinc-600">
                    <span className="font-medium text-zinc-400">Issue Date:</span>
                    <span className="font-mono font-semibold">{invoiceDate}</span>
                  </div>
                  <div className="flex justify-end gap-3 text-zinc-600">
                    <span className="font-medium text-zinc-400">Due Date:</span>
                    <span className="font-mono font-semibold text-rose-600">{dueDate}</span>
                  </div>
                </div>
              </div>

              {/* From / To Info Block */}
              <div className="grid grid-cols-2 gap-8 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">From</span>
                  <h4 className="font-bold text-zinc-900 mt-0.5">{fromName}</h4>
                  <p className="text-zinc-600 whitespace-pre-line leading-relaxed mt-1">{fromAddress}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Billed To</span>
                  <h4 className="font-bold text-zinc-900 mt-0.5">{toName}</h4>
                  <p className="text-zinc-600 whitespace-pre-line leading-relaxed mt-1">{toAddress}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mt-6">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b" style={{ borderColor: accentColor, color: accentColor }}>
                      <th className="py-2.5 font-bold uppercase tracking-wider">Description</th>
                      <th className="py-2.5 text-center font-bold uppercase tracking-wider">Qty</th>
                      <th className="py-2.5 text-right font-bold uppercase tracking-wider">Unit Price</th>
                      <th className="py-2.5 text-right font-bold uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {items.map((item) => {
                      const amount = item.quantity * item.unitPrice;
                      return (
                        <tr key={item.id} className="text-zinc-800">
                          <td className="py-3 font-medium">{item.description}</td>
                          <td className="py-3 text-center font-mono text-zinc-600">{item.quantity}</td>
                          <td className="py-3 text-right font-mono text-zinc-600">{currencySymbol}{item.unitPrice.toLocaleString()}</td>
                          <td className="py-3 text-right font-mono font-semibold text-zinc-900">{currencySymbol}{amount.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Calculation Summary Block */}
              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-mono">{currencySymbol}{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount</span>
                      <span className="font-mono">-{currencySymbol}{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-600">
                    <span>Tax ({taxRate}%)</span>
                    <span className="font-mono">{currencySymbol}{taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-sm text-zinc-900" style={{ borderColor: accentColor }}>
                    <span>Total Due</span>
                    <span className="font-mono" style={{ color: accentColor }}>
                      {currencySymbol}{totalDue.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="border-t pt-4 text-[11px] text-zinc-500 space-y-1" style={{ borderColor: '#e4e4e7' }}>
              <span className="font-bold uppercase tracking-wider text-zinc-400">Payment Notes</span>
              <p className="leading-relaxed">{notes}</p>
            </div>
          </div>

          {/* Embed Snippet */}
          <div className="flex items-center justify-between bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-400 font-medium">Embed this PDF Invoice Generator on your blog</span>
            <button
              onClick={handleCopyEmbed}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shrink-0"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HTML Code!' : 'Copy Embed Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
