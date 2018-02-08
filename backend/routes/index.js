import express from 'express';

const router = express();

router.use('*',function(req,res,next){
    res.send("TEST");
});

export default router;
