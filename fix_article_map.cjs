const fs = require('fs');

const path = 'src/components/Articles/ArticleDetail.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacement = `
        {article.contentBlocks.map((block, idx) => {
          let adElement = null;
          // Insert ad after introduction (idx 1), and then every ~4 blocks, max 3 in content
          if (idx === 1 || idx === 5 || idx === 9) {
            adElement = <InContentBanner key={\`ad-\${idx}\`} className="my-8" />;
          }

          let blockElement = null;
          if (block.type === 'heading') {
            blockElement = (
              <h2 key={block.id} className="text-2xl font-bold text-white tracking-tight pt-4">
                {block.content}
              </h2>
            );
          } else if (block.type === 'callout') {
            blockElement = (
              <div key={block.id} className="rounded-xl bg-indigo-950/40 border border-indigo-500/30 p-5 text-sm text-indigo-200 font-medium">
                {block.content}
              </div>
            );
          } else {
            blockElement = (
              <p key={block.id} className="text-zinc-300">
                {block.content}
              </p>
            );
          }

          return (
            <React.Fragment key={block.id}>
              {blockElement}
              {adElement}
            </React.Fragment>
          );
        })}
`;

content = content.replace(/\{article\.contentBlocks\.map\(\(block\) => \{[\s\S]*?\}\)\}/, replacement.trim());

fs.writeFileSync(path, content, 'utf8');
