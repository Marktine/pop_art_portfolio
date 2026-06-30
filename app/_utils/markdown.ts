import path from "path";
import fs from 'fs';
import dayjs from 'dayjs';
import readLine from 'readline';
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { BlogPost, BlogPostMetaData, BlogPriority } from "../_types/blog";

const postDirectory = path.join(process.cwd(), "/blogs");

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContent = fs.readFileSync(fullPath, {
    encoding: "utf8"
  });

  const { data, content } = matter(fileContent);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  const contentHTML = processedContent.toString();

  return {
    slug,
    contentHTML,
    image: data.image,
    title: data.title,
    author: data.author,
    category: data.category,
    description: data.description,
    date: dayjs(data.date).format("YYYY-MM-DD"),
    tags: data.tags,
  }
}

export async function getMarkdownFrontmatter(fileName: string): Promise<BlogPostMetaData> {
  const fullPath = path.join(postDirectory, fileName);
  const readStream = fs.createReadStream(fullPath, { encoding: "utf8" }); 
  const rl = readLine.createInterface({ input: readStream, crlfDelay: Infinity });

  let frontmatterLines: string[] = [];
  let delimiterCount = 0;

  for await (const line of rl) {
    frontmatterLines.push(line);
    if (line.trim() == "---") {
      delimiterCount++
    }
    // already reach the end of frontmatter
    if (delimiterCount == 2) {
      rl.close();
      readStream.destroy();
      break;
    }
  }

  const rawFrontmatter = frontmatterLines.join("\n");
  const parsed = matter(rawFrontmatter, { excerpt: false }).data;

  return {
    slug: fileName.replace(".md", ""),
    priority: parsed.priority satisfies BlogPriority,
    title: parsed.title,
    date: parsed.date,
    category: parsed.category,
    image: parsed.image,
    author: parsed.author,
    description: parsed.description,
    readingTime: parsed.readingTime,
    tags: parsed.tags,
  };
}

export async function getSortedPosts(priority: BlogPriority): Promise<BlogPostMetaData[]> {
  if (!fs.existsSync(postDirectory)) return [];
  // scan blogs directory for posts slug (file_name)
  const posts = fs.readdirSync(postDirectory);
  let sortedPosts: BlogPostMetaData[] = [];
  for await (const postFileName of posts) {
    const postFrontmatter: BlogPostMetaData = await getMarkdownFrontmatter(postFileName) as BlogPostMetaData;
    if (postFrontmatter?.priority === priority) {
      sortedPosts.push({
        ...postFrontmatter,
        date: dayjs(postFrontmatter.date).format("YYYY-MM-DD"),
      });
    } 
  }
  sortedPosts = sortedPosts
    .sort((prev, curr) => dayjs(prev.date).valueOf() - dayjs(curr.date).valueOf());
  return sortedPosts;
}

