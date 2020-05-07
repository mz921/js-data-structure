

class UnionFind {
    constructor(M,N){
        this.parentList = []
        this.rank = []
         // 维护一个rank数组，rank[id]为以id为根的树的高度
        for(let i = 0; i < M*N; i++){
            this.parentList[i] = i
            this.rank[i] = 1
        }
    }

    union(p,q){
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if(pRoot === qRoot){
            return
        }

        if(this.rank[pRoot] < this.rank[qRoot]){
            this.parentList[pRoot] = qRoot
        }else if(this.rank[qRoot] <this.rank[pRoot]){
            this.parentList[qRoot] = pRoot
        }else{
            this.parentList[pRoot] = qRoot
            this.rank[qRoot]++
        }
    }
// 路径压缩
    find(p) {
        let currentNode = p
        while(currentNode !== this.parentList[currentNode]){
            this.parentList[currentNode] = this.parentList[this.parentList[currentNode]]
            currentNode = this.parentList[currentNode]
        }
        return currentNode
    }

    isConnected(p,q){
       return this.find(p) === this.find(q)
    }


}

module.exports = UnionFind
