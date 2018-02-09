import BlockchainModel from '../models/blockchainModel';

const BC = new BlockchainModel();

export default class BlockchainController {
    constructor(){
        this.getAddress = this.getAddress.bind(this);
    }

    getAddress (req, res, next){
        const address = req.params.address || req.query.address;
        if(address){
            BC.getAddress(address)
                .then(function(data){
                    res.send(data);
                })
                .catch(function(err){
                    res.status(500).send(err);
                });
        }
        else{
            res.status(500).send("No address provided");
        }
    }
}
