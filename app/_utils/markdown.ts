import path from "path";
import fs from 'fs';
import dayjs from 'dayjs';
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { BlogPost } from "../_types/blog";
import rehypeStringify from "rehype-stringify";

const postDirectory = path.join(process.cwd(), "/blogs");

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postDirectory, `${slug}.md`);
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
  }
}
