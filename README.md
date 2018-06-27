# A basic template for awoo + svelte

## awoo
[awoo] is the next generation static site generator for nodebb

Build with Metalsmith as a reference, awoo offers a cleaner, leaner syntax, 
simply letting plugins work on a `files` array instead of an object.
Another goal of awoo is slim its dependancy chain to the minimal 
and to build its source code on next gen javascript features like :
* await/async, 
* inline templates,
* up to date syntax

## svelte
[svelte] is another awesome project that focus on the same goals as awoo : offering a slim dedicated and modern package to build web components witout the weight of a framework
svelte components are compiled to vanilla javascript offering the best ratio
However, in a static site generator svelte components are used for their ability to embark their own style

## Project structure

Content (data files written in markdown + front matter) are located in `/content`

[awoo]:https://github.com/awoojs/awoo
[svelte]:https://svelte.technology/
