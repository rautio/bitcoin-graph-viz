import express from 'express';

import BlockchainController from '../api/controllers/blockchainController';

const bcCtrl = new BlockchainController();

const router = express();

router.get('/address', bcCtrl.getAddress);

export default router;
