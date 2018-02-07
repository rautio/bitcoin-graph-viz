import sigma from 'sigma';
import fetch from 'whatwg-fetch';
//This will be requested from the backend in the future
const temp_addr = '1NfRMkhm5vjizzqkp2Qb28N7geRQCa4XqC';
// console.log("sending fetch: ", temp_addr)
// fetch(`https://blockchain.info/rawaddr/${temp_addr}`,{
//     method: 'GET',
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json'
//     }})
// .then(
//   function(response) {
//       console.log(response)
//     if (response.status !== 200) {
//       console.log('Looks like there was a problem. Status Code: ' +
//         response.status);
//       return;
//     }

//     // Examine the text in the response
//     response.json().then(function(data) {
//       console.log(data);
//     });
//   }
// )
// .catch(function(err) {
//   console.log('Fetch Error :-S', err);
// });

let g  ={
    "nodes": [
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
    ],
    "edges":[
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
    ]
};

// Instantiate sigma:
const s = new sigma({
    graph: g,
    container: 'container'
});

s.settings({
    defaultNodeColor: '#0047AB',
    defaultEdgeColor: '#999'
});

s.refresh();
