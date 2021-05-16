// 无向图
const matrix_a = [
    [0, 1, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0]
]

// 有向图
const matrix_b = [
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

// 邻接表

let visited = [];
let len = matrix_a.length;
for(let i = 0; i < len; i++) {
    visited.push(0);
}

function DFS(v) {
    console.log("The vertex is: " + v);
    visited[v] = 1;
    for(let i = 0; i < len; i++) {
        if(matrix_b[v][i] === 1 && visited[i] === 0) {
            DFS(i);
        }
    }
}
let queue = [];
function BFS(v) {
    console.log("The vertex is : " + v);
    queue.push(v);
    visited[v] = 1;
    while(queue.length > 0) {
        let cur = queue.shift();
        for(let i = 0; i < len; i++) {
            if(matrix_b[cur][i] === 1 && visited[i] === 0) {
                console.log("The vertex is : " + i);
                visited[i] = 1;
                queue.push(i);
            }
        }
    }
}

// DFS(0);
BFS(0)