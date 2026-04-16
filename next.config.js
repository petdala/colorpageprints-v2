/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/pages/library/', destination: '/coloring-pages/', permanent: true },
      { source: '/pages/library', destination: '/coloring-pages/', permanent: true },
      { source: '/pages/categories/', destination: '/coloring-pages/', permanent: true },
      { source: '/pages/categories', destination: '/coloring-pages/', permanent: true },
      { source: '/pages/freebies/', destination: '/coloring-pages/', permanent: true },
      { source: '/pages/freebies', destination: '/coloring-pages/', permanent: true },
      { source: '/pages/about/', destination: '/about/', permanent: true },
      { source: '/pages/about', destination: '/about/', permanent: true },
      { source: '/pages/quiz/', destination: '/quiz/', permanent: true },
      { source: '/pages/quiz', destination: '/quiz/', permanent: true },
      { source: '/categories/animals/', destination: '/coloring-pages/animals/', permanent: true },
      { source: '/categories/fantasy/', destination: '/coloring-pages/fantasy/', permanent: true },
      { source: '/categories/space/', destination: '/coloring-pages/space/', permanent: true },
      { source: '/categories/holidays/', destination: '/coloring-pages/holidays/', permanent: true },
      { source: '/categories/mandalas/', destination: '/coloring-pages/mandalas/', permanent: true },
      { source: '/categories/education/', destination: '/coloring-pages/educational/', permanent: true },
      { source: '/colors-of-calm/', destination: '/ritual/cozy-girl-self-care/', permanent: true },
      { source: '/colors-of-calm', destination: '/ritual/cozy-girl-self-care/', permanent: true },
      { source: '/moss-loop-custom/', destination: '/custom/', permanent: true },
      { source: '/moss-loop-custom', destination: '/custom/', permanent: true }
    ];
  }
};

module.exports = nextConfig;
