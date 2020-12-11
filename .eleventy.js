const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);  
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("./src/**/*.jpg");
    eleventyConfig.addPassthroughCopy("./src/**/*.png");
    eleventyConfig.addPassthroughCopy("./src/**/*.gif");
    eleventyConfig.addPassthroughCopy("./src/**/*.mp4");
    eleventyConfig.addPassthroughCopy("./src/**/*.pdf");
    eleventyConfig.addPassthroughCopy("./src/**/*.mmd");
    eleventyConfig.addPassthroughCopy("./src/**/*.xml");
    eleventyConfig.addPassthroughCopy("./src/**/*.xslx");

   
    eleventyConfig.addFilter("dateToYear", function (date) {
        return moment(date).format("YYYY");
    });

    // add support for syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addShortcode("getURLsFromSources", function(sourceObjs) {
        //console.log(sourceObjs);
        let justUrls = sourceObjs.sources.map((source)=>{
            if(typeof source.speedlifyUrl === "string"){
            return source.speedlifyUrl;
            }
        });
        justUrls = justUrls.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
        justUrls = justUrls.filter((url)=>{
            if(url){
                return true;
            }
        });
        justUrls.push("https://community.servicenow.com/");
        return JSON.stringify(justUrls);
    });

    const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
	eleventyConfig.addNunjucksAsyncShortcode("myImage", async function(src, alt, outputFormat = "jpeg") {
		let stats = await Image(src, {
			formats: [outputFormat],
			widths: [360, null],
			urlPath: "/img/",
			outputDir: "img/",
		});
		let props = stats[outputFormat].pop();
		if (alt === undefined) {
			throw new Error(`Missing \`alt\` on myImage from: ${src}`);
		}
		return `<img src="${props.src}" width="${props.width}" height="${props.height}" alt="${alt}">`;
	});
};

    return {
        addPassthroughCopy: true,
        markdownTemplateEngine: "njk",
        templateFormats: ["njk", "md"],
        dir: {
            input: "src", // html and layouts for project
            output: "_site",
            include: "includes",
            data: "_data"
        }
    }
}