import { X_OK } from "constants";

export default class GraphConverter{
    constructor(){
        this.BCToGraph = this.BCToGraph.bind(this);
    }

    BCToGraph (data){
        const txs = data.txs;
        let nodes = [];
        let edges = [];
        //Format:
        // node = {
        //     id,
        //     label,
        //     x,
        //     y,
        //     size
        // }
        // edge = {
        //     id,
        //     source,
        //     target
        // }
        for(let t in txs){
            if(txs.hasOwnProperty(t)){
                //Brute force conversion for now
                let hash = txs[t].hash;
                let from = txs[t].inputs.map(function(i){return i.prev_out.addr;});
                let to = txs[t].out.map(function(o){return o.addr;});
                // console.log(to)
                nodes.push({
                    id: hash,
                    label: hash,
                    size:Math.random()*3,
                    x: Math.random()*2,
                    y: Math.random()*2
                });
                nodes = nodes.concat(from.map(function(f){
                    return {
                        id:f,
                        label:f,
                        size:Math.random()*3,
                        x: Math.random()*2,
                        y: Math.random()*2
                    };
                }));  
                nodes = nodes.concat(to.map(function(t){
                    return {
                        id:t,
                        label:t,
                        size:Math.random()*3,
                        x: Math.random()*2,
                        y: Math.random()*2
                    };
                }));  
                edges = edges.concat(from.map(function(f){
                    return {
                        id:f+''+hash,
                        source:f,
                        target:hash,
                        color:'red',
                        size:Math.random()*3
                    };
                }));
                edges = edges.concat(to.map(function(f){
                    return {
                        id:hash+''+f,
                        source:hash,
                        target:f,
                        color:'green',
                        size:Math.random()*3
                    };
                }));
                //Remove duplicate nodes and edges
                let seenNode = [];
                let seenEdge = [];
                nodes = nodes.filter(function(n){
                    if(seenNode.indexOf(n.id) < 0){
                        seenNode.push(n.id);
                        return true;
                    }
                    return false;
                }.bind(this));
                edges = edges.filter(function(e){
                    if(seenEdge.indexOf(e.id) < 0){
                        seenEdge.push(e.id);
                        return true;
                    }
                    return false;
                }.bind(this));
            }
        }
        return {nodes:nodes,edges:edges};
    }
}
