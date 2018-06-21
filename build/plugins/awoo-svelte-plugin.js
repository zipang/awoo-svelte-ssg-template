var path = require("path"),
	fs = require("fs-extra");

function tryPaths(obj, paths) {
	let val, path, paths = paths.map(p => p.split("."));

	while (path = paths.shift() && !val) {
		// path is an array of property names
		let o = path.reduce((o, key) => (key in o) ? o[key] : undefined, obj);
		if (typeof o !== undefined) val = o;
	}
	return val;
}

const _DEFAULTS = {
	layoutsDir = process.cwd() + "/layouts",
	getLayoutName: file => tryPaths(file, "layout", "metadata.layout", "data.layout"),
	latoutsExt = [".html", ".htm", ".svelte"]
}

function buildSveltePlugin(opts = {}) {

	const conf = Object.assign({}, _DEFAULTS, opts);

	// Check the configuration
	if (!fs.pathExistsSync(conf.layoutsDir)) {
		throw new Error(`Svelte directory for layouts doesn't exist : ${conf.layoutsDir}`);
	}

	// register the svelte loader, allowing us to require() a svelte template
	require("svelte/ssr/register")({
		extensions: conf.layoutsExt
	});

	const layouts = []; // store for the compiled layouts

	function getLayout(file) {
		let layoutName = conf.getLayoutName(file);
		if (!layouts[layoutName]) {
			layouts[layoutName] = require(path.join(conf.layoutsDir, layoutName))
		}
		return layouts[layoutName];
	}

	async function renderFile(file) {
		try {
			let layout = getLayout(file);
			file.contents = layout.render(file);
			file.extname = ".html";
		} catch (err) {
			debug(`Loading template for file ${file.path} failed`);
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
