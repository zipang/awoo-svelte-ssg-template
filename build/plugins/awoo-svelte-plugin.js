var path = require("path"),
	fs = require("fs-extra"),
	Store = require("svelte/store.umd.js").Store;

function tryPaths(obj, paths) {
	let val, path;
	paths = paths.map(p => p.split("."));

	while ( (path = paths.shift()) && !val ) {
		// path is an array of property names
		let o = path.reduce((o, key) => (key in o) ? o[key] : undefined, obj);
		if (typeof o !== undefined) val = o;
	}
	return val;
}

const _DEFAULTS = {
	layoutsDir: process.cwd() + "/layouts",
	getLayoutName: file => tryPaths(file, ["layout", "metadata.layout", "data.layout"]),
	layoutsExt: ".html"
}

function buildSveltePlugin(opts = {}) {

	const conf = Object.assign({}, _DEFAULTS, opts);

	// Check the configuration
	if (!fs.existsSync(conf.layoutsDir)) {
		throw new Error(`Svelte directory for layouts doesn't exist : ${conf.layoutsDir}`);
	}
	if (typeof conf.layoutsExt !== "string" || !conf.layoutsExt[0] === '.') {
		throw new Error(`Layouts extension (layoutsExt) should be a string beginning with a dot like : '.html'`);
	}

	// register the svelte loader, allowing us to require() a svelte template
	require("svelte/ssr/register")({
		extensions: [conf.layoutsExt]
	});

	const layouts = []; // store for the compiled layouts

	function getLayout(file) {
		let layoutName = conf.getLayoutName(file);
		if (!layouts[layoutName]) {
			layouts[layoutName] = require(path.join(conf.layoutsDir, layoutName + conf.layoutsExt))
		}
		return layouts[layoutName];
	}

	async function renderFile(file) {
		try {
			let layout = getLayout(file);
			let metadatas = new Store(
				Object.assign({}, conf.globals, file.metadata)
			)
			file.contents = layout.render(file, metadatas).html;
			file.extname = ".html";
		} catch (err) {
			console.error(`Loading template for file ${file.path} failed`);
			console.error(err);
		}
		return file;
	}

	/**
	 * That's the plugin function itself that renders every files
	 * with the svelte template found in file.metadata.layout
	 */
	return files => Promise.all(files.map(renderFile));

}

module.exports = buildSveltePlugin;
