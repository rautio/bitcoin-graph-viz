import sigma from 'sigma';
const s = new sigma('container');
let nodes  = [
    {
      "id": "n0",
      "label": "A node",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n1",
      "label": "Another node",
      "x": 3,
      "y": 1,
      "size": 2
    },
    {
      "id": "n2",
      "label": "And a last one",
      "x": 1,
      "y": 3,
      "size": 1
    }
];
let edges = [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e1",
      "source": "n1",
      "target": "n2"
    },
    {
      "id": "e2",
      "source": "n2",
      "target": "n0"
    }
];

for(let i = 0; i < nodes.length; i++){
    s.graph.addNode(nodes[i]);
}
for(let i = 0; i < edges.length; i++){
    s.graph.addEdge(edges[i]);
}

s.settings({
    defaultNodeColor: '#0047AB',
    defaultEdgeColor: '#999'
});

s.refresh();
