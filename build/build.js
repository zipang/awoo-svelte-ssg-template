#!/usr/bin/env node
var path = require("path"),
	awoo = require("awoo"),
	matter = require("awoo-matter"),
	svelte = require("./plugins/awoo-svelte-plugin");

matter.name = "awoo-matter";

async function buildLatePlugin() {

	function latePlugin(files) {
		console.log(`I'm the late plugin running now on ${files.length} files`);
		throw new Error(`Oh no latePlugin() failed !`);
		return files;
	}

	throw new Error(`oh no could not init latePlugin`);
	return latePlugin;
	return new Promise(resolve => {
		setTimeout(() => resolve(latePlugin), 2000);
	});
}

awoo(site => {
	site.config({
		source: path.join(__dirname, "../content/"),
		destination: path.join(__dirname, "../public/")
	})
	site.use(matter)
	site.use(buildLatePlugin)
	return site
})

// awoo(site => site
// 	.add({
// 		source: path.join(__dirname, "../content/"),
// 		destination: path.join(__dirname, "../public/")
// 	})
// 	.add(files => files.filter(file => file.extname === '.md'))
// 	.add(matter)
// 	//.add(buildLatePlugin)
// 	.add(svelte, {
// 		layoutsDir: path.join(__dirname, "../theme/layouts/")
// 	})
// );
