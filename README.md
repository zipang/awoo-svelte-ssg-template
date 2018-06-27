# A basic template for awoo + svelte

## awoo
[awoo] is the next generation static site generator for nodebb

Build with Metalsmith as a reference, awoo offers a cleaner, leaner syntax, 
simply letting plugins work on a `files` array instead of an object.
Another goal of awoo is to embark only the minimal dependancies to let builds run at speed the light
and to base its source code on next gen javascript features like :
* await/async, 
* inline templates,
* up to date syntax

## svelte
[svelte] is another awesome project that focus on the same goals as awoo : offering a slim dedicated and modern package to build web components without the weight of a framework  
svelte components are compiled to vanilla javascript offering the best ratio of features/package size  
However, in a static site generator svelte components are mostly used for their ability to embark their own style

## Project structure

Content (data files written in markdown + front matter) are located in `/content`

[awoo]:https://github.com/awoojs/awoo
[svelte]:https://svelte.technology/
