const fs = require('fs');

const path = 'src/data/initialData.ts';
let content = fs.readFileSync(path, 'utf8');

const newResources = `
  {
    id: 'res-inv-1',
    title: 'Investment Growth & Compound Interest Calculator',
    slug: 'investment-growth-compound-interest-calculator',
    metaDescription: 'Calculate compound interest and visualize your investment growth over time. Perfect for retirement planning and personal finance.',
    type: 'calculator',
    category: 'calculators',
    tags: ['Personal Finance', 'Investing', 'Retirement', 'Compound Interest'],
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Visualize how your investments grow over time with the power of compound interest.',
    interactiveConfig: {
      toolType: 'investment-calculator',
      initialPrincipal: 10000,
      monthlyContribution: 500,
      years: 15,
      returnRate: 8,
    },
    longDescription: '## The Power of Compound Interest\\nCompound interest is often called the eighth wonder of the world. It is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods.',
    blocks: [
      { id: 'b1', type: 'h2', content: 'Why Use a Compound Interest Calculator?' },
      { id: 'b2', type: 'p', content: 'It helps you set realistic financial goals and see the importance of starting early. Even small monthly contributions can grow into a massive portfolio over decades.' }
    ],
    features: ['Interactive Growth Chart', 'Embeddable Widget for Blogs', 'Monthly Contribution Breakdown'],
    schema: {
      type: 'SoftwareApplication',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any'
    }
  },
  {
    id: 'res-mort-1',
    title: 'Mortgage & Loan Payoff Calculator',
    slug: 'mortgage-loan-payoff-calculator',
    metaDescription: 'Estimate your monthly mortgage payments and total interest with our interactive Mortgage Payoff Calculator.',
    type: 'calculator',
    category: 'calculators',
    tags: ['Real Estate', 'Mortgage', 'Personal Finance', 'Loan'],
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Estimate your monthly mortgage payments, including principal and interest breakdown.',
    interactiveConfig: {
      toolType: 'mortgage-calculator',
      homePrice: 400000,
      downPaymentPct: 20,
      loanTerm: 30,
      interestRate: 6.5,
    },
    longDescription: '## Calculate Your Monthly Payments\\nYour mortgage payment consists of principal and interest. Use this tool to see the true cost of your home and how much you will pay the bank in interest over the life of the loan.',
    blocks: [
      { id: 'b1', type: 'h2', content: 'Understanding Your Mortgage Payment' },
      { id: 'b2', type: 'p', content: 'A significant portion of your early mortgage payments goes entirely towards interest. Play around with the interest rate and down payment to see how it affects your monthly cash flow.' }
    ],
    features: ['Principal vs Interest Breakdown', 'Embeddable Widget for Real Estate Blogs', 'Dynamic Pie Chart'],
    schema: {
      type: 'SoftwareApplication',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any'
    }
  },
  {
    id: 'res-roi-1',
    title: 'Website CRO & ROI Calculator',
    slug: 'website-cro-roi-calculator',
    metaDescription: 'Calculate the potential revenue growth from optimizing your website conversion rate (CRO). Free interactive tool.',
    type: 'calculator',
    category: 'calculators',
    tags: ['Marketing', 'CRO', 'ROI', 'E-commerce'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'See how a small bump in conversion rate can drastically increase your revenue.',
    interactiveConfig: {
      toolType: 'website-roi-calculator',
      monthlyVisitors: 10000,
      currentConvRate: 1.5,
      targetConvRate: 2.5,
      aov: 100,
    },
    longDescription: '## The Value of Conversion Rate Optimization\\nIncreasing your conversion rate from 1% to 2% literally doubles your revenue without spending more on traffic. Use this tool to forecast your revenue growth from CRO.',
    blocks: [
      { id: 'b1', type: 'h2', content: 'Why CRO Matters' },
      { id: 'b2', type: 'p', content: 'Instead of pouring more money into ads to get traffic, optimizing your existing traffic is often the highest ROI activity for any e-commerce or SaaS business.' }
    ],
    features: ['Revenue Impact Comparison', 'Embeddable Widget for Marketing Agencies', 'E-commerce Metric Adjustments'],
    schema: {
      type: 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any'
    }
  },
`;

content = content.replace('export const INITIAL_RESOURCES: Resource[] = [', 'export const INITIAL_RESOURCES: Resource[] = [\n' + newResources);

fs.writeFileSync(path, content, 'utf8');
console.log('Inserted new resources.');
