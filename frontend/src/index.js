import sigma from 'sigma';
import axios from 'axios';
//This will be requested from the backend in the future
const temp_addr = '1NfRMkhm5vjizzqkp2Qb28N7geRQCa4XqC';

// Let's first initialize sigma:
let s = new sigma('container');

// Finally, let's ask our sigma instance to refresh:
// s.refresh();
s.settings({
  defaultNodeColor: '#0047AB',
  defaultEdgeColor: '#999'
});
// s.configNoverlap({
//   nodeMargin: 3.0,
//   scaleNodes: 1.3
// });

function updateGraph(data){
  s.graph.read(data);
  s.refresh();
  // s.startNoverlap();
}

s.refresh();
fetch(`http://localhost:3001/api/v1/address?address=${temp_addr}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
.then(
  function(response) {
    if (response.status !== 200) {
      // console.log('Looks like there was a problem. Status Code: ' +
      //   response.status);
      return;
    }

    // Examine the text in the response
    response.json().then(function(data) {
      updateGraph(data);
    }.bind(this));
  }.bind(this)
)
.catch(function(err) {
  // console.log('Fetch Error :-S', err);
});
s.refresh();
