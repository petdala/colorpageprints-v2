import type { MetadataRoute } from "next";
import { getBlogPosts, getBooks, getCollections, getColoringPages } from "@/lib/data";

const BASE_URL = "https://www.colorpageprints.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/shop/",
    "/coloring-pages/",
    "/blog/",
    "/about/",
    "/quiz/",
    "/custom/"
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now
  }));

  const bookUrls = getBooks().map((book) => ({
    url: `${BASE_URL}/shop/${book.slug}/`,
    lastModified: now
  }));

  const coloringPageUrls = getColoringPages().map((page) => ({
    url: `${BASE_URL}/coloring-pages/${page.category}/${page.slug}/`,
    lastModified: now
  }));

  const collectionUrls = getCollections().map((collection) => ({
    url: `${BASE_URL}/collections/${collection.slug}/`,
    lastModified: now
  }));

  const blogUrls = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}/`,
    lastModified: now
  }));

  return [...staticUrls, ...bookUrls, ...coloringPageUrls, ...collectionUrls, ...blogUrls];
}
