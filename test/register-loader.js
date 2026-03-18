import { register } from "node:module";

// Given that the code is built for Astro/vite, it uses extensionless imports.
// These fail in `node:test`, so we use this tiny custom resolver to work around that.
register("./resolve-ts.js", import.meta.url);
