# A basic template for awoo + svelte

## awoo
[awoo] is the next generation static site generator for nodebb

Build with Metalsmith as a reference, awoo offers a cleaner, leaner syntax, 
simply letting plugins work on a `files` array instead of an object.
Another goal of awoo is to embark only the minimal dependancies to let builds run at the speed of light
and to build its code source on next gen javascript features like :
* await/async, 
* inline templates,
* up to date syntax

## svelte
[svelte] is another awesome project that focus on the same goals as awoo : offering a slim dedicated and modern package to build web components without the weight of a framework  
svelte components are compiled to vanilla javascript offering the best ratio of features vs package size  
However, in a static site generator svelte components are mostly used for their ability to embark their own style

## Project structure

* Content (data files written in markdown + front matter) is located in `/content` (^1)
* The build script itself is located in `/build/build.js` but can be launched as `yarn run build` (or `npm run build` if you haven't switched yet to yarn (^2))
* By default, the site is generated inside `/public` (^3)
* Templates used for the build are located inside `/theme/layouts` (^4)


[awoo]:https://github.com/awoojs/awoo
[svelte]:https://svelte.technology/

(1): How original is that ?  
(2): side note : you should  
(3): Unless you change this destination inside `/build/settings.json`  
(4): yeah.. we had to do something fancy in this config or else there would be no point at reading this README  
(5): It should be noted that i don't know how to do footnotes in markdown.. *_O  
