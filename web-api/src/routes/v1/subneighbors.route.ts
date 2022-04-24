import express from 'express';

import SubNeighborController from '../../Controllers/SubNeighborController';
import { catchErrors } from '../../utils/helpers';
import { authenticate } from '../../middlewares/authentication';

const router = express.Router();

router.get('/me', authenticate, catchErrors(SubNeighborController.getSubNeighbors));
router.get('/:id', authenticate, catchErrors(SubNeighborController.getSubNeighbor));

export default router;
