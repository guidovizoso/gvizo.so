import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { config } from "@/config";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
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

export function getURLForMetadata() {
  if (process.env.NODE_ENV === "production") {
    return config.domain;
  } else {
    return "http://localhost:4500";
  }
}
