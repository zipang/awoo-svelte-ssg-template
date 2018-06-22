
function buildMetalsmithAdapterPlugin(opts = {}) {

	if (!opts.plugin) {
		throw new Error(`The metalsmth plugin adapter for awoo must receive a {plugin: metalSmithPlugin} config object`);
	}

	let metalSmithPlugin = opts.plugin;

	let pluginAdapter = async function (files) {
		// build a metalsmith-compatible representation of the files
		let filesObject = files.reduce((obj, file) => {
			obj[file.path] = file;
			return obj;
		}, {});

		// run the metalsmith plugin on it
		filesObject = metalSmithPlugin(filesObject);

		// and then de-serialize it again....
		return Object.keys(filesObject).map(key => filesObject[key]);
	}
	pluginAdapter.name = `${metalSmithPlugin.name}-adapter`;

	return pluginAdapter;
}

module.exports = buildMetalsmithAdapterPlugin;
