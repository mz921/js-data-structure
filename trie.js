class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.endFlag = false;
    this.wordCount = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode("/");
  }

  insertText(text) {
    let curNode = this.root;
    text.forEach(i => {
      let index = i.charCodeAt() - "a".charCodeAt();
      if (!curNode.children[index]) {
        curNode.children[index] = new TrieNode(i);
      }
      curNode = curNode.children[index];
    });
    curNode.endFlag = true;
    curNode.wordCount++;
  }

  queryText(text) {
    let curNode = this.root;
    for (let i = 0; i < text.length; i++) {
      let index = text[i].charCodeAt() - "a".charCodeAt();
      if (!curNode.children[index]) {
        return false;
      }
      curNode = curNode.children[index];
    }
    if(!curNode.endFlag){
        return false;
    }
  }
}
