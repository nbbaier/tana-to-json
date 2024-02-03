import { type Node } from "./types";

const INDENT_REGEX = /\s*/g;
const BULLET_REGEX = /\s*-/g;
const TAG_REGEX = /#(\w+)/g;

function rtrim(x: string) {
  return x.replace(/\s+$/gm, "");
}

function extractTags(line: string) {
  let tags: string[] = [];
  const matches = line.match(TAG_REGEX);
  if (matches) {
    tags.push(...matches.map((tag) => tag.replace("#", "")));
  }
  return tags;
}

function createNode(line: string, isField: boolean, tags: string[]): Node {
  if (isField) {
    const [fieldName, fieldValue = ""] = line
      .split("::")
      .map((str) => str.trim());
    return {
      name: fieldName,
      type: "field",
      children: [
        {
          name: fieldValue,
          ...(tags.length > 0 && { tags }),
          type: "node",
        },
      ],
    };
  } else {
    return {
      name: line,
      ...(tags.length > 0 && { tags }),
      type: "node",
    };
  }
}

export function tanaToJson(tanaPaste: string) {
  let stack: Node[] = [];
  const top: Node = { name: "ROOT", type: "node" };
  let current: Node = top;
  stack.push(top);
  let currentLevel = 1;

  for (const line of tanaPaste.split("\n")) {
    const trimmedLine = rtrim(line);

    if (trimmedLine === "" || trimmedLine === "-") {
      continue;
    }
    const match = trimmedLine.match(INDENT_REGEX);
    const level = match ? match[0].length / 2 + 1 : 1;
    const lineWithoutBullet = trimmedLine.replace(BULLET_REGEX, "").trim();

    const isField = lineWithoutBullet.includes("::");
    const tags = extractTags(lineWithoutBullet);
    const newNode = createNode(lineWithoutBullet, isField, tags);

    // if (level < currentLevel) {
    //   stack.splice(level - currentLevel);
    //   current = stack[stack.length - 1];
    // } else if (level > currentLevel) {
    //   stack.push(current);
    // }

    function addChild(parent: Node, child: Node) {
      if (!("children" in parent)) {
        parent.children = [];
      }
      parent.children?.push(child);
    }

    if (level < currentLevel) {
      stack = stack.slice(0, level - currentLevel);
      addChild(stack[stack.length - 1], newNode);
      current = newNode;
      currentLevel = level;
    } else if (level > currentLevel) {
      addChild(current, newNode);
      stack.push(current);
      current = newNode;
      currentLevel = level;
    } else {
      addChild(stack[stack.length - 1], newNode);
      current = newNode;
    }
  }

  return top.children;
}
