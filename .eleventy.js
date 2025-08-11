module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "site/images": "images" });
  eleventyConfig.addPassthroughCopy({ "site/icons": "icons" });
  eleventyConfig.addPassthroughCopy({ "site/js": "js" });
  eleventyConfig.addPassthroughCopy({ "site/css": "css" });
  eleventyConfig.addPassthroughCopy({ "site/manifest.webmanifest": "manifest.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "site/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "site/shin-favicon.svg": "shin-favicon.svg" });

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
    dir: { input: "site", output: "_site", includes: "../_includes" }
  };
};
