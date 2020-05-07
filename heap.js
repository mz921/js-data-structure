const assert = require("assert");

class IndexMinHeap {
  constructor() {
    // 下标均从1开始
    this.data = [];
    this.index = [];
    // reverse是index数组下标和值的反转,reverse的值是index的下标
    this.reverse = [];
    this.count = 0;
  }

  __shiftUp(k) {
    while (
      k > 1 &&
      this.data[this.index[k >> 1]] > this.data[this.index[k]]
    ) {
      [this.index[k >> 1], this.index[k]] = [
        this.index[k],
        this.index[k >> 1]
      ];
      this.reverse[this.index[k >> 1]] = k >> 1;
      this.reverse[this.index[k]] = k;
      k >>= 1;
    }
  }

  __shiftDown(k) {
    while (2 * k <= this.count) {
      let j = k * 2;
      if (j + 1 <= this.count && this.data[this.index[j]] > this.data[this.index[j + 1]]) {
        j++;
      }
      if (this.data[this.index[j]] >= this.data[this.index[k]]) break;

      [this.index[j], this.index[k]] = [this.index[k], this.index[j]];
      this.reverse[this.index[j]] = j;
      this.reverse[this.index[k]] = k;
      k = j;
    }
  }

  // 插入到data数组的index位置,这个index可以理解成元素的id，依赖这个id去寻找该元素
  insert(data, index) {
    assert(index >= 1 && this.data[index] === undefined);

    this.data[index] = data;
    this.index[this.count + 1] = index;
    this.reverse[index] = this.count + 1;

    this.count++;

    this.__shiftUp(this.count);
  }

  extraMin() {
    assert(count > 0);
    let min = this.data[this.index[1]]; 
    [this.index[1], this.index[this.count]] = [this.index[this.count], this.index[1]];

    this.reverse[this.index[1]] = 1;

    this.reverse[this.index[this.count]] = 0;

    this.count--;
    this.__shiftDown(1)

    return min;
  }

  extraMinIndex() {
    assert(this.count > 0);

    let minIndex = this.index[1];
    [this.index[1], this.index[this.count]] = [this.index[this.count], this.index[1]];

    this.reverse[this.index[1]] = 1;

    this.reverse[this.index[this.count]] = 0;

    this.count--;

    this.__shiftDown(1)

    return minIndex;
  }

  contain(index){
    return this.reverse[index] !== 0 && this.reverse[index] !== undefined
  }

  change(data, index){

    assert(this.contain(index))

    this.data[index] = data
    this.__shiftDown(this.reverse[index])
    this.__shiftUp(this.reverse[index])
  }

  isEmpty(){
    return this.count === 0
  }

  peekMin(){
    return this.data[this.index[1]]
  }

  peekMinIndex(){
      return this.index[1]
  }
}

module.exports = IndexMinHeap