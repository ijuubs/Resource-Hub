const fs = require('fs');

const path = 'src/data/initialData.ts';
let content = fs.readFileSync(path, 'utf8');

const newPDFResources = `
  {
    id: 'res-pdf-inv-1',
    status: 'published',
    versionHistory: [
      { version: 'v1.0.0', date: '2026-08-04', changes: 'Initial release of printable PDF invoice generator', author: 'ResourceHub Engineering' }
    ],
    isFeatured: true,
    isPremium: false,
    rating: 4.97,
    reviewCount: 64,
    viewsCount: 8400,
    downloadsCount: 3100,
    faqs: [
      { question: 'Is this PDF Invoice Generator 100% free with no watermark?', answer: 'Yes! All generated invoices can be printed or saved directly to PDF cleanly without any forced watermarks.' },
      { question: 'Are my invoice client details stored on a server?', answer: 'No. All invoice fields are processed locally in your browser for privacy and security.' }
    ],
    createdBy: 'admin-pdf',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'Free PDF Invoice & Quote Generator (Printable & Downloadable)',
    slug: 'pdf-invoice-quote-generator',
    metaDescription: 'Create, customize, and print clean professional invoices and PDF quotes. Free browser-based invoice builder for freelancers, contractors, and agencies.',
    type: 'calculator',
    category: 'calculators',
    tags: ['PDF', 'Invoice Generator', 'Freelance', 'Invoicing', 'Business Tools'],
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Instant PDF invoice and quote builder with tax, discounts, itemized billing, and custom brand colors.',
    interactiveConfig: {
      toolType: 'pdf-invoice-generator',
      invoiceNumber: 'INV-2026-001',
    },
    contentBlocks: [
      { id: 'pb1', type: 'heading', content: 'Professional Invoicing Made Simple' },
      { id: 'pb2', type: 'paragraph', content: 'Generate clean PDF invoices directly in your browser. Enter line items, tax percentages, client billing info, and print or export to PDF.' }
    ],
  },

  {
    id: 'res-pdf-md-2',
    status: 'published',
    versionHistory: [
      { version: 'v1.0.0', date: '2026-08-04', changes: 'Initial release of Markdown & Document to PDF Converter', author: 'ResourceHub Engineering' }
    ],
    isFeatured: true,
    isPremium: false,
    rating: 4.95,
    reviewCount: 52,
    viewsCount: 6700,
    downloadsCount: 2200,
    faqs: [
      { question: 'Can I customize document fonts and primary colors before printing to PDF?', answer: 'Yes! Select between Clean Sans, Editorial Serif, and Monospace font families along with primary accent colors.' }
    ],
    createdBy: 'admin-pdf',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'Free Markdown to PDF Converter & Document Printer',
    slug: 'markdown-document-pdf-converter',
    metaDescription: 'Convert Markdown notes, proposals, terms of service, and contracts into styled printable PDF documents instantly.',
    type: 'calculator',
    category: 'calculators',
    tags: ['PDF', 'Markdown', 'Document Converter', 'Contracts', 'Proposals'],
    featuredImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Convert markdown text and notes into beautifully formatted printable PDF documents.',
    interactiveConfig: {
      toolType: 'pdf-markdown-converter',
      title: 'SaaS Master Service Agreement & Terms of Service',
    },
    contentBlocks: [
      { id: 'pmb1', type: 'heading', content: 'Convert Markdown Notes to PDF Documents' },
      { id: 'pmb2', type: 'paragraph', content: 'Paste markdown text, select document styling presets, and export professional PDF documents for agreements, proposals, and meeting notes.' }
    ],
  },
`;

content = content.replace('export const INITIAL_RESOURCES: Resource[] = [', 'export const INITIAL_RESOURCES: Resource[] = [' + newPDFResources);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully inserted PDF tools into initialData.ts');
