import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SchemaMarkup: React.FC = () => {
  const { activeTab, selectedResourceSlug, selectedArticleSlug, resources, articles } = useApp();

  const activeResource = resources.find((r) => r.slug === selectedResourceSlug);
  const activeArticle = articles.find((a) => a.slug === selectedArticleSlug);

  useEffect(() => {
    // 1. Base Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ResourceHub',
      url: window.location.origin,
      logo: `${window.location.origin}/logo.svg`,
      sameAs: [
        'https://twitter.com/resourcehub',
        'https://github.com/resourcehub',
        'https://linkedin.com/company/resourcehub',
      ],
      description: 'Premier AI SaaS platform providing interactive calculators, prompt engineering recipes, Notion toolkits, and growth playbooks.',
    };

    // 2. WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ResourceHub SaaS Directory',
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    const schemasToInject: object[] = [organizationSchema, websiteSchema];

    // 3. Contextual SoftwareApplication Schema (when viewing a Resource or resource list)
    if (activeResource) {
      const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: activeResource.title,
        description: activeResource.shortSummary,
        applicationCategory: activeResource.type === 'ai-tool' ? 'BusinessApplication' : 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: activeResource.isPremium ? '19.00' : '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: activeResource.rating,
          reviewCount: activeResource.reviewCount,
          bestRating: '5',
          worstRating: '1',
        },
      };
      schemasToInject.push(softwareSchema);
    }

    // 4. Contextual Article Schema (when viewing an Article)
    if (activeArticle) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: activeArticle.title,
        description: activeArticle.metaDescription,
        image: activeArticle.featuredImage,
        datePublished: activeArticle.createdAt,
        dateModified: activeArticle.updatedAt,
        author: {
          '@type': 'Person',
          name: activeArticle.author.name,
        },
        publisher: {
          '@type': 'Organization',
          name: 'ResourceHub',
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/logo.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${window.location.origin}/#article-${activeArticle.slug}`,
        },
      };
      schemasToInject.push(articleSchema);
    }

    // Inject into head
    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(schemasToInject, null, 2);
  }, [activeTab, selectedResourceSlug, selectedArticleSlug, activeResource, activeArticle]);

  return null; // Side-effect component rendering head markup script
};
