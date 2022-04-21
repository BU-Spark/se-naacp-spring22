import express from 'express';

import NeighborController from '../../Controllers/NeighborController';
import { catchErrors } from '../../utils/helpers';
import { authenticate } from '../../middlewares/authentication';

const router = express.Router();

router.get('/me', authenticate, catchErrors(NeighborController.getNeighbors));
router.get('/:id', authenticate, catchErrors(NeighborController.getNeighbor));

export default router;
