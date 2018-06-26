#!/usr/bin/env node
var path = require("path"),
	awoo = require("awoo"),
	matter = require("awoo-matter"),
	svelte = require("./plugins/awoo-svelte-plugin");

awoo.build(site => site
	.use({
		title: "My beautiful site",
		lang: "en",
		source: path.join(__dirname, "../content/"),
		destination: path.join(__dirname, "../public/")
	})
	.use(files => files.filter(file => file.extname === '.md'))
	.use(matter)
	.use(svelte, {
		layoutsDir: path.join(__dirname, "../theme/layouts/")
	})
);
