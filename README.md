# tana-to-json

This package provides a function to parse Tana Paste format to JSON.

## Usage

```ts
import { tanaToJson } from "./src/index";

const tanaPaste = `- Hello world #test
  - Foo:: bar
  - A child
  `;

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
        "name": "Foo",
        "type": "field",
        "children": [
          {
            "name": "bar",
            "type": "node"
          },
          {
            "name": "A child",
            "type": "node"
          }
        ]
      }
    ]
  }
]
```
