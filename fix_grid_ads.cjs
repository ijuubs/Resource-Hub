const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// For resources grid
content = content.replace(
  /\{filteredResources\.map\(\(res\) => \(\n\s*<ResourceCard key=\{res\.id\} resource=\{res\} \/>\n\s*\)\)\}/,
  `{filteredResources.map((res, idx) => (
                  <React.Fragment key={res.id}>
                    <ResourceCard resource={res} />
                    {idx === 2 && <InContentBanner className="col-span-full my-4" />}
                  </React.Fragment>
                ))}
                <NativeAd className="col-span-full mt-4" />`
);

// For articles grid
content = content.replace(
  /\{articles\.map\(\(art\) => \(\n\s*<ArticleCard key=\{art\.id\} article=\{art\} \/>\n\s*\)\)\}/,
  `{articles.map((art, idx) => (
                  <React.Fragment key={art.id}>
                    <ArticleCard article={art} />
                    {idx === 2 && <InContentBanner className="col-span-full my-4" />}
                  </React.Fragment>
                ))}
                <NativeAd className="col-span-full mt-4" />`
);

fs.writeFileSync(path, content, 'utf8');
