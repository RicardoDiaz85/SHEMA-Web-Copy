module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "SHEMA copy/images": "images" });
  eleventyConfig.addPassthroughCopy({ "SHEMA copy/icons": "icons" });
  eleventyConfig.addPassthroughCopy({ "SHEMA copy/js": "js" });
  eleventyConfig.addPassthroughCopy({ "SHEMA copy/css": "css" });
  eleventyConfig.addPassthroughCopy({ "SHEMA copy/manifest.webmanifest": "manifest.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "SHEMA copy/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "SHEMA copy/shin-favicon.svg": "shin-favicon.svg" });

  function urlJoin(base, path) {
    if (!base) return path;
    if (/^https?:\/\//i.test(path)) return path;
    return base.replace(/\/+$/, "") + "/" + (path || "").replace(/^\/+/, "");
  }

  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    return urlJoin(base, path);
  });

  eleventyConfig.addJavaScriptFunction("urlJoin", urlJoin);

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: "SHEMA copy",
      includes: "../_includes",
      output: "_site"
    },
    templateFormats: ["html", "njk", "md", "txt"]
  };
};
