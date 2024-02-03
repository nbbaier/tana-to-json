import { tanaToJson } from "./src/index";

const tanaPaste = `- Hello world #test
  - Foo:: bar
  - A child
  `;

const json = tanaToJson(tanaPaste);
console.log(JSON.stringify(json, null, 2));
