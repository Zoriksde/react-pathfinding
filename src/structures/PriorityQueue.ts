import { Node } from "../strategies/Node";

type ComparatorFunction = (a: PQEntry, b: PQEntry) => boolean;

interface PQEntry {
  node: Node;
  priority: number;
}

export enum PQType {
  MIN,
  MAX,
}

const root = 0;
const parent = (i: number): number => ((i + 1) >>> 1) - 1;
const left = (i: number): number => (i << 1) + 1;
const right = (i: number): number => (i + 1) << 1;

export class PriorityQueue {
  private heap: PQEntry[];
  private comparator: ComparatorFunction;

  constructor(pqType: PQType = PQType.MIN) {
    this.heap = [];
    this.comparator =
      pqType === PQType.MIN
        ? (a: PQEntry, b: PQEntry) => a.priority < b.priority
        : (a: PQEntry, b: PQEntry) => a.priority > b.priority;
  }

  push(entry: PQEntry): void {
    this.heap.push(entry);
    this.siftUp();
  }

  poll(): PQEntry {
    const polledNode = this.heap[root];
    const bottom = this.heap.length - 1;

    if (bottom > root) this.swap(bottom, root);
    this.heap.pop();
    this.siftDown();

    return polledNode;
  }

  private siftUp(): void {
    let currentNode = this.heap.length - 1;

    while (
      currentNode > root &&
      this.comparator(this.heap[currentNode], this.heap[parent(currentNode)])
    ) {
      this.swap(currentNode, parent(currentNode));
      currentNode = parent(currentNode);
    }
  }

  private siftDown(): void {
    let currentNode = root;

    while (
      (left(currentNode) < this.heap.length &&
        this.comparator(
          this.heap[left(currentNode)],
          this.heap[currentNode]
        )) ||
      (right(currentNode) < this.heap.length &&
        this.comparator(this.heap[right(currentNode)], this.heap[currentNode]))
    ) {
      let currentChild =
        right(currentNode) < this.heap.length &&
        this.comparator(
          this.heap[right(currentNode)],
          this.heap[left(currentNode)]
        )
          ? right(currentNode)
          : left(currentNode);
      this.swap(currentNode, currentChild);
      currentNode = currentChild;
    }
  }

  private swap(first: number, second: number): void {
    [this.heap[first], this.heap[second]] = [
      this.heap[second],
      this.heap[first],
    ];
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
