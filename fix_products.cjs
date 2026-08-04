const fs = require('fs');

const path = 'src/data/initialData.ts';
let content = fs.readFileSync(path, 'utf8');

// The lines 1102 to 1163 have missing features: [
content = content.replace(/downloadsCount: 384,\n      'Full Notion Startup/g, "downloadsCount: 384,\n    features: [\n      'Full Notion Startup");
content = content.replace(/downloadsCount: 620,\n      '50-Page PDF Masterclass playbook/g, "downloadsCount: 620,\n    features: [\n      '50-Page PDF Masterclass playbook");
content = content.replace(/downloadsCount: 412,\n      'Google Sheets & Excel versions/g, "downloadsCount: 412,\n    features: [\n      'Google Sheets & Excel versions");

fs.writeFileSync(path, content, 'utf8');
