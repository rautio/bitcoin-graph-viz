import axios from 'axios';
import GraphConverter from '../../src/graphConverter';

const converter = new GraphConverter();

export default class BlockchainModel {
    constructor(){
        this.getAddress = this.getAddress.bind(this);
    }

    getAddress(address){
        return new Promise(function(resolve, reject){
            if(address){
                axios.get(`https://blockchain.info/rawaddr/${address}`,{
                    headers: {
                      'Content-Type': 'application/json'
                    }})
                .then(
                  function(response) {
                    resolve(converter.BCToGraph(response.data));
                  }
                )
                .catch(function(err) {
                  reject(err);
                });
            }
            else{
                reject('No address provided');
            }
        });
    }
}
