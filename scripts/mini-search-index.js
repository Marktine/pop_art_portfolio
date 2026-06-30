import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MiniSearch from 'minisearch';

const postsDirectory = path.join(process.cwd(), 'blogs');
const outputDirectory = path.join(process.cwd(), 'public/assets');
const outputFile = path.join(outputDirectory, 'search-index.json');

function buildIndex() {
  if (!fs.existsSync(postsDirectory)) return;

  const fileNames = fs.readdirSync(postsDirectory);

  const documents = fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id: slug,
        title: data.title || 'Untitled',
        tags: Array.isArray(data.tags) ? data.tags.join(' ') : '',
        content: content,
      };
    });
  const miniSearch = new MiniSearch({
    fields: ['title', 'tags', 'content'],
    storeFields: ['title']
  });

  miniSearch.addAll(documents);
  // Ensure the target directory structure exists
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Serialize the completed index to disk
  fs.writeFileSync(outputFile, JSON.stringify(miniSearch.toJSON()), 'utf8');
}

buildIndex();
