export type NodeType = "node" | "field";

export interface BaseNode {
  name: string;
  children?: Node[];
}

export type PlainNode = {
  type: "node";
  tags?: string[];
} & BaseNode;

export type FieldNode = {
  type: "field";
} & BaseNode;

export type Node = FieldNode | PlainNode;
