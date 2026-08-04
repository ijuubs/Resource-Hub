const fs = require('fs');

const path = 'src/data/initialData.ts';
let content = fs.readFileSync(path, 'utf8');

// Find all resources and if they are missing isFeatured, add the defaults.
// The new resources have id: 'res-inv-1', 'res-mort-1', 'res-roi-1'
const toAdd = `
    status: 'published',
    versionHistory: [],
`;

content = content.replace(/id: 'res-inv-1',/g, "id: 'res-inv-1'," + toAdd);
content = content.replace(/id: 'res-mort-1',/g, "id: 'res-mort-1'," + toAdd);
content = content.replace(/id: 'res-roi-1',/g, "id: 'res-roi-1'," + toAdd);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed resources.');
