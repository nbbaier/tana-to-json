# tana-to-json

This package provides a function to parse Tana Paste format to JSON.

Install:

```
npm install tana-to-json
```

## Usage

```ts
import { tanaToJson } from "./src/index";

const tanaPaste = `
- Hello world #test
  - foo:: bar
  - a non-field child`;

const json = tanaToJson(tanaPaste);

```

The output of the above will be the following object:

```json
[
  {
    "name": "Hello world #test",
    "tags": [
      "test"
    ],
    "type": "node",
    "children": [
      {
        "name": "foo",
        "type": "field",
        "children": [
          {
            "name": "bar",
            "type": "node"
          }
        ]
      },
      {
        "name": "a non-field child",
        
        "type": "node"
      }
    ]
  }
]

```

## Acknowledgements

The code here was adapted from Brett Adam's great [tana-helper](https://github.com/verveguy/tana-helper) suite of tools.
