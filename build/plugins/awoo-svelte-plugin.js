var path = require("path"),
	fs = require("fs-extra"),
	Store = require("svelte/store.umd.js").Store;

/**
 * Try different paths on an object to access a property that should be here...
 * @example
 * @param {Object} obj
 * @param {Array[String]} paths Every path can be a deep path like : `site.title`
 */
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

/**
 * This is the default configuration of our svelte plugin
 */
const _DEFAULTS = {
	layoutsDir: process.cwd() + "/layouts",
	getLayoutName: file => tryPaths(file, ["layout", "metadata.layout", "data.layout"]),
	layoutsExt: ".html"
}

/**
 * Give us some optional conf and gain a ready-to-use svelte plugin
 * able to render content files into html through svelte templates
 * @param {Object} opts
 */
async function prepareSveltePlugin(opts = {}) {

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

	function getLayout(file, debug) {
		try {
			let layoutName = conf.getLayoutName(file);
			if (!layouts[layoutName]) {
				layouts[layoutName] = require(path.join(conf.layoutsDir, layoutName + conf.layoutsExt))
			}
			return layouts[layoutName];

		} catch (err) {
			debug(`Loading template for file ${file.path} failed`);
			throw err;
		}
	}

	function renderFile(file, site, debug) {
		let layout = getLayout(file, debug);
		try {
			let ctx = {
				store: new Store(
					Object.assign({site : site}, file.metadata)
				)
			}
			file.contents = layout.render(file, ctx).html;
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
	function svelteRender(files, site, debug) {
		return files.map(file => renderFile(file, site, debug));
	}
	return svelteRender;

}

module.exports = prepareSveltePlugin;
