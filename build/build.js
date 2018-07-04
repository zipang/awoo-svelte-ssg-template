#!/usr/bin/env node
var path     = require("path"),
	vavawoo  = require("awoo"),
	matter   = require("awoo-matter"),
	markdown = require("awoo-markdown"),
	svelte   = require("./plugins/awoo-svelte-plugin");

vavawoo.build(site =>
	site({
		title: "My beautiful site",
		lang: "en",
		content_files: [".md"],
		media_files: [".jpg", ".png", ".gif", ".svg", ".txt"],
		exclude: ["_drafts/"],
		source: path.join(__dirname, "../content/"),
		destination: path.join(__dirname, "../public/")
	})
	//.use("excludeJunkFiles", files => files.filter(file => file.extname === '.md'))
	.use("awoo-matter", matter, {test: [".md"]})
	.use("markdown", markdown, {test: [".md"]})
	.use("svelte", svelte, {
		layoutsDir: path.join(__dirname, "../theme/layouts/")
	})
);
