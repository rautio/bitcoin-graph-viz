import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import logger from './util/logger';

import router from './routes';

/*eslint-disable no-console*/

const port = 3001; //Default port
const server = express();

//Logging
logger.debug("Overriding 'Express' logger");
server.use(morgan("combined",{"stream":logger.stream}));

// Enable CORS from the client

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET, OPTIONS');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials','true');

    // intercept OPTIONS method to allow the preflight request
    if (req.method === 'OPTIONS'){
        res.send(204);
    }
    else{
        next();
    }
});

//Basic middleware
server.use(bodyParser.urlencoded({extended:false})); //Parse urlencoded bodies
server.use(bodyParser.json()); //Send JSON response

//Routes
server.use('/api/v1',router);

server.listen(port, function(err){
    if(err){
        console.log(err);
    }
});
