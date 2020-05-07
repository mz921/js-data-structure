class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(arr) {
    this.treeArray = arr;
    this.root = new Node(this.treeArray[0]);
    this.__recurseCreate(this.root, 0);
    this.bstRoot = new Node(this.treeArray.shift());
    this.cache = new Map();
    this.prev = null;
  }

  __recurseCreate(root, index) {
    if (root === null) {
      return;
    }

    if (index * 2 + 1 < this.treeArray.length) {
      root.left = new Node(this.treeArray[index * 2 + 1]);
    }

    if (index * 2 + 2 < this.treeArray.length) {
      root.right = new Node(this.treeArray[index * 2 + 2]);
    }

    this.__recurseCreate(root.left, index * 2 + 1);
    this.__recurseCreate(root.right, index * 2 + 2);
  }
  // 未对重复数据进行处理
  addBSTNode(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (value > root.value) {
      root.right = this.addBSTNode(root.right, value);
    } else if (value < root.value) {
      root.left = this.addBSTNode(root.left, value);
    }

    return root;
  }

  createBST() {
    this.treeArray.forEach(val => {
      this.addBSTNode(this.bstRoot, val);
    });
  }

  // 求一棵树上所有节点的最值
  __getTreeMaxMin(root) {
    if (this.cache.get(root)) return this.cache.get(root);
    let min, max;
    if (!root.left && !root.right) {
      this.cache.set(root, [root.value, root.value]);
      return [root.value, root.value];
    }

    if (root.left) {
      let leftMin, leftMax;
      [leftMin, leftMax] = this.__getTreeMaxMin(root.left);
      min = root.value < leftMin ? root.value : leftMin;
      max = root.value > leftMax ? root.value : leftMax;
    }

    if (root.right) {
      let rightMin, rightMax;
      [rightMin, rightMax] = this.__getTreeMaxMin(root.right);
      min = min < rightMin ? min : rightMin;
      max = max > rightMax ? max : rightMax;
    }

    this.cache.set(root, [min, max]);
    return [min, max];
  }

  // 使用递归以及判断最值的实现，还可以用中序遍历实现
  isBSTByRecursion(root) {
    if (!root || (!root.left && !root.right)) return true;

    if (root.left) {
      let [min, max] = this.__getTreeMaxMin(root.left);
      if (max >= root.value) return false;
    }

    if (root.right) {
      let [min, max] = this.__getTreeMaxMin(root.right);
      if (min <= root.value) return false;
    }

    return this.isBSTByRecursion(root.left) && this.isBSTByRecursion(root.right);
  }

  // 使用递归以及最值判断二叉搜索树的第二种实现，更加简洁有效
  isBSTSimpleRecurse(root, min, max) {
    if (!root) return true;
    if (root.value <= min || root.value >= max) return false;
    return this.isBSTSimpleRecurse(root.left,min,root.value) && this.isBSTSimpleRecurse(root.right,root.value,max)
  }

  // 使用中序遍历实现判断二叉搜索树
  __isBSTByOrder(root) {
    if (!root) return true;
    if (!this.__isBSTByOrder(root.left)) return false;
    if (this.prev && root.value <= this.prev) return false;
    this.prev = root.value;
    return this.__isBSTByOrder(root.right);
  }

  isBSTByOrder(root) {
    this.prev = null;
    return this.__isBSTByOrder(root);
  }

  // 层次遍历打印
  print() {
    let queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      let curEle = queue.shift();
      process.stdout.write(curEle.value + " ");
      if (curEle.left) {
        queue.push(curEle.left);
      }
      if (curEle.right) {
        queue.push(curEle.right);
      }
    }
  }

  printBST() {
    let queue = [];
    queue.push(this.bstRoot);
    while (queue.length !== 0) {
      let curEle = queue.shift();
      process.stdout.write(curEle.value + " ");
      if (curEle.left) {
        queue.push(curEle.left);
      }
      if (curEle.right) {
        queue.push(curEle.right);
      }
    }
  }

  preOrderTraverse(root) {
    if (root === null) {
      return;
    }
    console.log(root.value);
    this.preOrderTraverse(root.left);
    this.preOrderTraverse(root.right);
  }
}

let root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);
root.right.left = new Node(6);
root.right.right = new Node(20);

// testTree.preOrderTraverse(testTree.root)
