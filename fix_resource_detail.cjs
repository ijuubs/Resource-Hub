const fs = require('fs');
const path = 'src/components/Resources/ResourceDetail.tsx';
let content = fs.readFileSync(path, 'utf8');

// I'll just restore the correct closing tags.
content = content.replace(/      \/>\n    <\/div>\n  \);\n};/, `      />\n      </div>\n      <div className="hidden lg:block">\n        <SidebarBanner />\n      </div>\n    </div>\n  );\n};`);

fs.writeFileSync(path, content, 'utf8');
