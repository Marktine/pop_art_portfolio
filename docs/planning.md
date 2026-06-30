# Pop art portfolio planning

## Stack:
- Front-end: NextJS, tailwindcss
- Back-end: Use NextJS api to parse and serve markdown content.
- Pipeline: Github action.
- infra: cloudflare worker.

## 2026-06-26

### TODO:
- [x] Initialize the frontend.
- [x] Write a markdown parser utility. (Use gray-matter unified remark-parse remark-rehype rehype-stringify)
- [x] Optimize parsed HTML from markdown content to use (<Image />)

## 2026-06-27

### TODO:
- [x] Get list of posts by scanning blogs directory.
- [x] Decide blog post placing positions by priority. (enum)
- [x] Search blog by tags. (Add tags).

## 2026-07-01

### TODO: 
- [x] Enhance blog posts search with minisearch.
- [ ] Making carousel for normal blog posts section.
- [ ] Make markdown table works.
- [ ] Responsive for image. (Check mobile display).
