const fs = require('fs');

const path = 'src/data/initialData.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/downloadsCount: 620,\n      '68-page PDF/g, "downloadsCount: 620,\n    features: [\n      '68-page PDF");
content = content.replace(/downloadsCount: 412,\n      'Automated Freelance Rate/g, "downloadsCount: 412,\n    features: [\n      'Automated Freelance Rate");

fs.writeFileSync(path, content, 'utf8');
