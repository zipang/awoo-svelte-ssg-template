#!/usr/bin/env node
var path = require("path"),
	awoo = require("awoo"),
	matter = require("awoo-matter"),
	svelte = require("./plugins/awoo-svelte-plugin");


awoo(site => site
	.add({
		source: path.join(__dirname, "../content/"),
		destination: path.join(__dirname, "../public/")
	})
	.add(files => files.filter(file => file.extname === '.md'))
	.add(matter)
	.add(svelte, {
		layouts: path.join(__dirname, "../theme/layouts/")
	})
);
