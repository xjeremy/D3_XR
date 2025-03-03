// js/data.js
// Generates a sample hierarchical tree with a target number of nodes.
export function generateTree(targetCount = 100, maxChildren = 3) {
  let count = 0;
  function createNode() {
    if (count >= targetCount) return null;
    count++;
    const node = { name: "Node " + count, children: [] };
    // Randomly decide number of children (0 to maxChildren)
    const numChildren = Math.floor(Math.random() * maxChildren);
    for (let i = 0; i < numChildren; i++) {
      if (count < targetCount) {
        const child = createNode();
        if (child) node.children.push(child);
      }
    }
    // Remove empty children array for leaf nodes
    if (node.children.length === 0) {
      delete node.children;
    }
    return node;
  }
  return createNode();
}
