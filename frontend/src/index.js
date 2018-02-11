import sigma from 'sigma';
import axios from 'axios';
import '../lib/plugins.js';
let s = new sigma({
  container: 'container',
  settings:{
    defaultNodeColor: '#0047AB',
    defaultEdgeColor: '#999',
    animationsTime: 1000,
    labelThreshold: 20
  }
});

function createGraph(data){
  s.graph.read(data);
  s.startForceAtlas2({worker: true, barnesHutOptimize: false});
  // Configure the noverlap layout:
  // const noverlapListener = s.configNoverlap({
  //   nodeMargin: 0.1,
  //   scaleNodes: 1.05,
  //   gridSize: 75,
  //   easing: 'quadraticInOut', // animation transition function
  //   duration: 1000   // animation duration. Long here for the purposes of this example only
  // });
  // // Bind the events:
  // noverlapListener.bind('start stop interpolate', function(e) {
  //   console.log(e.type);
  //   if(e.type === 'start') {
  //     console.time('noverlap');
  //   }
  //   if(e.type === 'interpolate') {
  //     console.timeEnd('noverlap');
  //   }
  // });
}


//This will be requested from the backend in the future
const temp_addr = '1NfRMkhm5vjizzqkp2Qb28N7geRQCa4XqC';
document.getElementById("search-submit").onclick = function(){
  const addr = document.getElementById('search-box').value;
  fetch(`http://localhost:3001/api/v1/address?address=${addr}`,{
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
        createGraph(data);
      }.bind(this));
    }.bind(this)
  )
  .catch(function(err) {
    // console.log('Fetch Error :-S', err);
  });

  //Sample animation:
  // sigma.plugins.animate(
  //   s,
  //   {
  //     size: 'big_size',
  //     color: 'hover_color',
  //   },
  //   {
  //     easing: 'cubicInOut',
  //     duration: 1000,
  //     onComplete: function() {
  //       // do stuff here after animation is complete
  //       // Start the ForceAtlas2 algorithm:
  //     }
  //   }
  // );
};

//Temporary starting points
document.getElementById('search-box').value = "1NfRMkhm5vjizzqkp2Qb28N7geRQCa4XqC";
document.getElementById('search-submit').click();
