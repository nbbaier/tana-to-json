import { tanaToJson } from "./src/index";

const tanaPaste = `
- Hello world #test
  - foo:: bar
  - a non-field child`;

const json = tanaToJson(tanaPaste);
console.log(JSON.stringify(json, null, 2));
