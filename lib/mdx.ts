import path from "node:path";
import fs from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const mdx = await compileMDX({
    source: rawContent,
    options: { parseFrontmatter: true },
  });
  return { ...mdx, rawContent };
}

async function getMDXData(dir: string) {
  const files = getMDXFiles(dir);
  const promises = files.map(async (file) => {
    const filePath = path.join(dir, file);
    const { frontmatter, rawContent } = await readMDXFile(filePath);
    return {
      slug: file.replace(".mdx", ""),
      frontmatter,
      rawContent,
    };
  });

  const data = await Promise.all(promises);
  return data;
}

export async function getBlogPosts() {
  return await getMDXData(path.join(process.cwd(), "content"));
}
