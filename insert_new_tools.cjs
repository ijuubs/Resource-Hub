const fs = require('fs');

const path = 'src/data/initialData.ts';
let content = fs.readFileSync(path, 'utf8');

const newResources = `
  {
    id: 'res-cac-ltv-1',
    status: 'published',
    versionHistory: [
      { version: 'v1.0.0', date: '2026-08-01', changes: 'Initial release of SaaS Unit Economics CAC/LTV engine', author: 'ResourceHub Financial Team' }
    ],
    isFeatured: true,
    isPremium: false,
    rating: 4.9,
    reviewCount: 42,
    viewsCount: 3840,
    downloadsCount: 910,
    faqs: [
      { question: 'What is a healthy LTV to CAC ratio for SaaS?', answer: 'A healthy LTV:CAC ratio for subscription SaaS businesses is 3:1 or higher. A ratio below 1:1 means you are losing money on acquiring customers.' },
      { question: 'What is the target CAC payback period?', answer: 'Most venture-backed and bootstrapped SaaS founders aim for a CAC payback period under 12 months (or under 18 months for enterprise SaaS).' }
    ],
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'Customer Acquisition Cost (CAC) & LTV Unit Economics Calculator',
    slug: 'cac-ltv-ratio-calculator',
    metaDescription: 'Calculate CAC payback period, LTV:CAC ratio, monthly churn impact, and customer lifetime value for SaaS and subscription businesses.',
    type: 'calculator',
    category: 'calculators',
    tags: ['SaaS', 'CAC', 'LTV', 'Unit Economics', 'Financial Modeling'],
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Model CAC payback periods, LTV:CAC ratios, and net retention lifetime value.',
    interactiveConfig: {
      toolType: 'cac-ltv-calculator',
      spend: 15000,
      customers: 120,
      arpu: 99,
      grossMargin: 80,
      churn: 3.5,
    },
    contentBlocks: [
      { id: 'b1', type: 'heading', content: 'Why LTV:CAC Ratio is the Key Metric for Growth' },
      { id: 'b2', type: 'paragraph', content: 'Customer Acquisition Cost (CAC) and Lifetime Value (LTV) define the unit profitability of your startup. Higher LTV:CAC ratios allow you to reinvest aggressively in paid acquisition channels.' },
      { id: 'b3', type: 'callout', content: 'Benchmark: Aim for an LTV:CAC ratio >= 3.0x and CAC payback period <= 12 months.' }
    ],
  },
  {
    id: 'res-ad-rev-1',
    status: 'published',
    versionHistory: [
      { version: 'v1.0.0', date: '2026-08-01', changes: 'Launched AdSense and CPM Ad revenue forecasting engine', author: 'ResourceHub AdOps Team' }
    ],
    isFeatured: true,
    isPremium: false,
    rating: 4.8,
    reviewCount: 38,
    viewsCount: 4120,
    downloadsCount: 1250,
    faqs: [
      { question: 'What is the average AdSense CPM rate?', answer: 'AdSense eCPM ranges from $1.00 to $15.00+ depending on niche, audience geo (Tier 1 vs Tier 3), seasonality, and viewability.' },
      { question: 'How can I increase my website RPM?', answer: 'Optimize ad placement above the fold, use responsive sticky banners, improve page speed, and target high-CPC keywords.' }
    ],
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'AdSense & Website CPM Ad Revenue Forecaster',
    slug: 'adsense-ad-revenue-calculator',
    metaDescription: 'Estimate your website ad revenue based on monthly pageviews, eCPM, CTR, and CPC. Free ad revenue calculator for bloggers and publishers.',
    type: 'calculator',
    category: 'calculators',
    tags: ['AdSense', 'Digital Publishing', 'Monetization', 'CPM', 'Ad Revenue'],
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Forecast monthly and annual website ad earnings across traffic scaling tiers.',
    interactiveConfig: {
      toolType: 'ad-revenue-calculator',
      pageviews: 100000,
      adUnits: 3,
      cpm: 3.50,
      ctr: 1.8,
      cpc: 0.45,
    },
    contentBlocks: [
      { id: 'b1', type: 'heading', content: 'How Website Ad Revenue is Calculated' },
      { id: 'b2', type: 'paragraph', content: 'Website ad income depends on impression volume (Pageviews × Banners per page) combined with CPM (Cost Per Mille) and CPC (Cost Per Click) performance.' }
    ],
  },
  {
    id: 'res-tax-pay-1',
    status: 'published',
    versionHistory: [
      { version: 'v1.0.0', date: '2026-08-01', changes: 'Updated 2026 Federal and State income tax bracket tables', author: 'ResourceHub Tax Division' }
    ],
    isFeatured: true,
    isPremium: false,
    rating: 4.9,
    reviewCount: 56,
    viewsCount: 6200,
    downloadsCount: 2100,
    faqs: [
      { question: 'What is FICA tax?', answer: 'FICA stands for Federal Insurance Contributions Act, consisting of Social Security (6.2%) and Medicare (1.45%). W2 employers match this tax, whereas 1099 contractors pay the full 15.3% self-employment tax.' }
    ],
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'Gross-to-Net Salary & Take-Home Pay Tax Estimator (W2 vs 1099)',
    slug: 'salary-take-home-pay-calculator',
    metaDescription: 'Estimate your net paycheck and take-home pay after Federal income tax, State tax, FICA, and pre-tax deductions. Supports W2 vs 1099 tax comparison.',
    type: 'calculator',
    category: 'calculators',
    tags: ['Tax', 'Personal Finance', 'Salary', 'Take Home Pay', 'Freelance'],
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Calculate monthly and bi-weekly take-home pay with progressive tax brackets.',
    interactiveConfig: {
      toolType: 'salary-tax-calculator',
      grossAnnual: 95000,
      type: 'w2',
      status: 'single',
      stateTax: 5.0,
      preTax: 500,
    },
    contentBlocks: [
      { id: 'b1', type: 'heading', content: 'Understanding Gross vs Net Salary' },
      { id: 'b2', type: 'paragraph', content: 'Gross salary is your total compensation before withholdings. Net salary is the liquid take-home cash deposited into your bank account.' }
    ],
  },
  {
    id: 'res-seo-gen-1',
    status: 'published',
    versionHistory: [
      { version: 'v1.0.0', date: '2026-08-01', changes: 'Released interactive SERP snippet generator and keyword density analyzer', author: 'ResourceHub SEO Team' }
    ],
    isFeatured: true,
    isPremium: false,
    rating: 4.9,
    reviewCount: 31,
    viewsCount: 2950,
    downloadsCount: 880,
    faqs: [
      { question: 'What is the optimal length for an SEO Meta Title?', answer: 'Google displays the first 50–60 characters of a title tag (or up to 580 pixels). Titles beyond 60 characters risk getting truncated with ellipsis (...).' },
      { question: 'What is ideal keyword density?', answer: 'An optimal target keyword density is typically between 1.0% and 2.5%. Avoid keyword stuffing.' }
    ],
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'SEO SERP Simulator, Title Tag & Keyword Density Optimizer',
    slug: 'seo-serp-simulator-meta-optimizer',
    metaDescription: 'Simulate Google search engine results snippets in real-time. Check title pixel width, meta description length, and keyword density.',
    type: 'ai-tool',
    category: 'ai-tools',
    tags: ['SEO', 'Marketing', 'Content Strategy', 'SERP', 'Meta Tags'],
    featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Test title tag pixel truncation, meta description lengths, and SERP cards.',
    interactiveConfig: {
      toolType: 'seo-generator-tool',
      keyword: 'SaaS Financial Calculator',
      title: 'Free SaaS MRR & Revenue Growth Calculator (2026 Interactive Tool)',
      description: 'Calculate Monthly Recurring Revenue (MRR), ARR, and subscriber churn rates instantly. Download free Excel templates and forecast SaaS financial unit economics.',
    },
    contentBlocks: [
      { id: 'b1', type: 'heading', content: 'Mastering On-Page SEO Snippet Optimization' },
      { id: 'b2', type: 'paragraph', content: 'High organic click-through rates (CTR) depend heavily on compelling title tags and meta descriptions that match search intent while staying within Google character limits.' }
    ],
  },
`;

content = content.replace('export const INITIAL_RESOURCES: Resource[] = [', 'export const INITIAL_RESOURCES: Resource[] = [' + newResources);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully added new high-search tools to initialData.ts');
