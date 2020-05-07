class Utils {
  static swap(a, b) {
    let tmp = a.value;
    a.value = b.value;
    b.value = tmp;
  }
}

class Node {
  constructor(value=undefined) {
    this.value = value;
    this.next = null;
    this.before = null;
  }
}

class LinkedList {
  constructor(arr) {
    this.headGuard = new Node();
    if(arr.length === 0){
      return
    }
    this.head = new Node(arr.shift());
    this.headGuard.next = this.head
    this.head.before = this.headGuard
    let currentNode = this.head;
    arr.forEach(i => {
      currentNode.next = new Node(i);
      currentNode.next.before = currentNode;
      currentNode = currentNode.next;
    });
    this.tail = currentNode;
    this.tailGuard = new Node()
    this.tail.next = this.tailGuard
    this.tailGuard.before = this.tail
  }

  print() {
    let start = this.headGuard
    let curNode = start.next
    while (curNode.value !== undefined) {
      console.log(curNode.value);
      curNode = curNode.next;
    }
  }

  insert() {}

  delete() {}

  isEmpty() {
    return this.head;
  }
}

class LinkedListOp {
  static __partitionI(head, tail) {
    // head 作为左边界以及锚点
    // 不遍历tail
    // q：用于遍历
    // p: 用于划分小于等于锚点与大于锚点

    if (head === tail || head === null || tail === null || head === tail.next) {
      return;
    }

    let v = head;
    let q = head.next;
    let p = head;
    // console.log(head.value)
    // console.log(tail.value)
    while (q !== tail.next) {
      if (q.value <= v.value) {
        p = p.next;
        Utils.swap(q, p);
      }
      q = q.next;
    }

    Utils.swap(v, p);

    // this.print(head, tail)
    // console.log(p)
    // console.log("*****")

    LinkedList.__partitionI(head, p.before);
    LinkedList.__partitionI(p.next, tail);
  }

  static quickSortI(linkedList) {
    LinkedList.__partitionI(linkedList.head, linkedList.tail);
  }

  quickSortIII(linkedList) {
    //   [head, lp] 小于基准
    //   (lp, rp] 等于基准
    //   (rp, tail] 大于基准
  }

  static insertNodeAfter(a, b) {
    if (!a || !b) {
      return;
    }
    b.next = a.next;
    a.next.before = b;
    a.next = b;
    b.before = a;
  }

  static insertNodeBefore(a, b) {
    if (!a || !b) {
      return;
    }
    b.before = a.before;
    a.before.next = b;
    b.next = a;
    a.before = b;
  }

  static reverse(linkedList) {
    let preNode = null;
    let nextNode = null;
    let curNode = linkedList.head;

    if (!curNode || !curNode.next) {
      return;
    }

    while (curNode) {
      nextNode = curNode.next;
      curNode.next = preNode;
      curNode.before = nextNode;
      preNode = curNode;
      curNode = nextNode;
    }

    let tmp = linkedList.head;
    linkedList.head = linkedList.tail;
    linkedList.tail = tmp;
  }

  static ifHasRing(linkedList) {}

  // 升序 把b链表合并到a上
  static MergeTwoSortedLinkedList(a, b) {
    // 兼容a,b为空链表的情况
    let pointA = a.head ? a.head : a.headGuard;
    let pointB = b.head ? b.head: b.headGuard;
    let tmp
    let lastPointA = pointA
    while (pointA.value !== undefined && pointB.value !== undefined) {
      if(pointA.next.value === undefined){
        lastPointA = pointA
      }
      if (pointB.value > pointA.value) {
        pointA = pointA.next;
      } else {
        tmp = new Node(pointB.value);
        LinkedListOp.insertNodeBefore(pointA, tmp);
        pointB = pointB.next;
      }
    }

    if(pointA && pointA.value === undefined){
      lastPointA.next = pointB
      if(!pointB){
        return
      }
      pointB.before = lastPointA
    }

  }
}

let linkedListA = new LinkedList([]);

let linkedListB = new LinkedList([1,2,3,4,5])

LinkedListOp.MergeTwoSortedLinkedList(linkedListA,linkedListB)

linkedListA.print()



module.exports = LinkedList;
