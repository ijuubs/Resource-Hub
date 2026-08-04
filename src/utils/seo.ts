/**
 * Utility function to programmatically update document head meta tags dynamically
 * based on the current active view (e.g., ResourceDetail, ArticleDetail, Catalog)
 * for search engine indexing and social sharing preview.
 */

export interface MetaOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  keywords?: string[];
}

export function updateMetaTags(options: MetaOptions): void {
  if (typeof document === 'undefined') return;

  const {
    title = 'ResourceHub | AI SaaS Tools & Digital Resource Directory',
    description = 'Explore 50+ SaaS calculators, prompt generators, Notion operating systems, and developer playbooks.',
    canonicalUrl = window.location.href,
    ogType = 'website',
    ogImage = '/favicon.svg',
    keywords = ['SaaS', 'AI Tools', 'Calculators', 'Notion Templates', 'Prompt Library'],
  } = options;

  // 1. Title Tag
  document.title = title.includes('ResourceHub') ? title : `${title} | ResourceHub`;

  // 2. Helper to get or create a meta/link tag
  const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
    let element = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Update Standard Meta Tags
  setMeta('meta[name="description"]', 'name', 'description', description);
  setMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));

  // 4. Update OpenGraph Tags
  setMeta('meta[property="og:title"]', 'property', 'og:title', document.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

  // 5. Update Twitter Card Tags
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', document.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

  // 6. Update Canonical URL
  let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
}
