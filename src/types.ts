/**
 * ResourceHub SaaS Platform Type Definitions
 */

export type UserRole = 'guest' | 'user' | 'editor' | 'admin' | 'superadmin';

export type ResourceType = 
  | 'ai-tool' 
  | 'calculator' 
  | 'template' 
  | 'guide' 
  | 'download' 
  | 'checklist' 
  | 'spreadsheet' 
  | 'prompt-library' 
  | 'course' 
  | 'toolkit';

export type PublishStatus = 'draft' | 'review' | 'published' | 'archived';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  bookmarks: string[]; // resource IDs
  purchases: string[]; // product IDs
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'callout' | 'code' | 'quote' | 'image' | 'list';
  content: string;
  level?: number;
  listItems?: string[];
  caption?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface VersionHistoryItem {
  version: string;
  date: string;
  changes: string;
  author: string;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  type: ResourceType;
  category: string;
  tags: string[];
  featuredImage: string;
  shortSummary: string;
  contentBlocks: ContentBlock[];
  faqs: FAQItem[];
  canonicalUrl?: string;
  isFeatured: boolean;
  isPremium: boolean;
  rating: number;
  reviewCount: number;
  viewsCount: number;
  downloadsCount: number;
  affiliateLinks?: string[]; // AffiliateLink IDs
  relatedResourceIds?: string[];
  downloads?: {
    fileType: 'pdf' | 'zip' | 'docx' | 'xlsx' | 'pptx';
    fileName: string;
    fileSize: string;
    downloadUrl: string;
  }[];
  versionHistory: VersionHistoryItem[];
  status: PublishStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  // Custom metadata for interactive runner configuration
  interactiveConfig?: {
    toolType?: 'mrr-calculator' | 'investment-calculator' | 'mortgage-calculator' | 'website-roi-calculator' | 'freelance-calculator' | 'breakeven-calculator' | 'prompt-generator' | 'email-writer' | 'notion-template' | 'checklist-runner' | 'cac-ltv-calculator' | 'ad-revenue-calculator' | 'salary-tax-calculator' | 'seo-generator-tool' | 'pdf-invoice-generator' | 'pdf-markdown-converter' | 'json-yaml-converter' | 'sql-formatter-tool' | 'cron-parser-tool' | 'unix-timestamp-tool' | 'jwt-decoder-tool' | 'base64-hash-uuid-tool' | 'regex-tester-tool' | 'diff-checker-tool' | 'text-case-converter' | 'wcag-color-contrast-tool' | 'image-compressor-converter' | 'opengraph-card-generator';
    defaultState?: Record<string, any>;
    checklistItems?: { id: string; text: string; category?: string }[];
    promptTemplates?: { title: string; prompt: string; targetModel?: string }[];
    [key: string]: any;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readingTimeMinutes: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  contentBlocks: ContentBlock[];
  faqs: FAQItem[];
  relatedResourceIds: string[];
  status: PublishStatus;
  viewsCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  resourceCount: number;
  featuredColor: string;
}

export interface DigitalProduct {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  compareAtPrice?: number;
  format: 'PDF' | 'ZIP' | 'DOCX' | 'XLSX' | 'PPTX' | 'BUNDLE';
  fileSize: string;
  featuredImage: string;
  version: string;
  salesCount: number;
  rating: number;
  status: PublishStatus;
  downloadsCount: number;
  features: string[];
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  productId: string;
  productTitle: string;
  amount: number;
  currency: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  downloadToken: string;
  createdAt: string;
}

export interface DownloadLog {
  id: string;
  resourceOrProductId: string;
  itemTitle: string;
  userEmail?: string;
  ipAddress: string;
  timestamp: string;
}

export interface AffiliateLink {
  id: string;
  partnerName: string;
  productTitle: string;
  targetUrl: string;
  commissionRate: string;
  badgeText?: string;
  description: string;
  ctaText: string;
  clickCount: number;
  category: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
  status: 'active' | 'unsubscribed';
  tags: string[];
}

export interface AnalyticsSummary {
  totalVisitors: number;
  pageViews: number;
  searchQueriesCount: number;
  toolUsages: number;
  totalDownloads: number;
  emailSignups: number;
  affiliateClicks: number;
  totalSalesRevenue: number;
  bounceRate: number;
  conversionRate: number;
  topResources: { title: string; views: number; slug: string }[];
  searchKeywords: { keyword: string; count: number }[];
  dailyTraffic: { date: string; visitors: number; pageViews: number }[];
  revenueByMonth: { month: string; amount: number }[];
}

export interface ContentIdea {
  id: string;
  title: string;
  targetKeywords: string[];
  estimatedSearchVolume: string;
  contentType: ResourceType | 'article';
  priority: 'low' | 'medium' | 'high';
  status: 'idea' | 'generating' | 'review' | 'published';
  createdAt: string;
}

export interface SEOReport {
  id: string;
  urlOrTitle: string;
  score: number;
  issues: string[];
  recommendations: string[];
  missingKeywords: string[];
  schemaValid: boolean;
  generatedAt: string;
}

export interface SystemSettings {
  siteName: string;
  siteUrl: string;
  currencySymbol: string;
  currencyCode: string;
  monetization: {
    enableAds: boolean;
    enableAffiliates: boolean;
    enableProducts: boolean;
    enableNewsletterPopup: boolean;
    adClientHeaderCode?: string;
  };
  seoDefaults: {
    defaultMetaDescription: string;
    ogImageDefault: string;
    twitterHandle: string;
  };
  aiConfig: {
    modelName: string;
    temperature: number;
    requireHumanApproval: boolean;
  };
}

export interface AIGeneratorState {
  isGenerating: boolean;
  activeModule: 'resource' | 'article' | 'seo' | 'email' | 'social' | 'product' | 'prompt' | 'grammar';
  promptInput: string;
  generatedContent: string | null;
  error: string | null;
}
