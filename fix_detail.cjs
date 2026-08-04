const fs = require('fs');
let content = fs.readFileSync('src/components/Resources/ResourceDetail.tsx', 'utf8');

content = content.replace("import { InvestmentGrowthCalculator } from './InteractiveRunners/InvestmentGrowthCalculator';\nimport { MortgageCalculator } from './InteractiveRunners/MortgageCalculator';\nimport { WebsiteROICalculator } from './InteractiveRunners/WebsiteROICalculator';", "");

content = "import { InvestmentGrowthCalculator } from './InteractiveRunners/InvestmentGrowthCalculator';\nimport { MortgageCalculator } from './InteractiveRunners/MortgageCalculator';\nimport { WebsiteROICalculator } from './InteractiveRunners/WebsiteROICalculator';\n" + content;

fs.writeFileSync('src/components/Resources/ResourceDetail.tsx', content);
