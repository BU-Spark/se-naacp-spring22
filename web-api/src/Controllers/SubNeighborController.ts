import { Request, Response } from 'express';

import { models } from '../config/Database';
import {
    downloadFile,
    escapeRegex,
    getQueryOptions,
    isValidId,
    paginate,
    sendJSONResponse,
    slugify,
} from '../utils/helpers';
import logger from '../config/logger';
import errorMessages from '../utils/errorMessages';

const { SubNeighbor } = models;

type SubNeighborQuery = {
    nbid: string;
    createdBy: string;
    nbname?: RegExp;
};

class AuthController {
    static async getSubNeighbors(req: Request, res: Response) {
        const currentUser = req.user!;
        const nbid = '6261b09c0fe72b265b49627e';
        logger.info('attempting to get SubNeighbors for user');
        const { limit, page } = getQueryOptions(req);

        let query: SubNeighborQuery = { createdBy: currentUser.userId, nbid: nbid };
        const offset = (page - 1) * limit;

        if (req.query.q) {
            const searchQuery = escapeRegex(req.query.q.toString());
            logger.info(`Getting SubNeighbors with query (${searchQuery})`);
            query = { ...query, nbname: new RegExp(searchQuery, 'gi') };
        }

        const subNeighborsPromise = SubNeighbor.find(query).sort({ createdAt: 1 }).skip(offset).limit(limit);
        const countPromise = SubNeighbor.countDocuments(query);
        const [subneighbors, count] = await Promise.all([subNeighborsPromise, countPromise]);
        logger.info('neighbors fetched successfully');
        const metaData = paginate(count, limit, offset);
        return sendJSONResponse(res, 200, { subneighbors, metaData }, 'neighbors retrieved successfully');
    }

    static async getSubNeighbor(req: Request, res: Response) {
        logger.info('attempting to get neighbor');
        const { id: subNeighborId } = req.params;

        let subneighbor;
        if (isValidId(subNeighborId)) {
            subneighbor = await SubNeighbor.findById(subNeighborId);
        } else {
            subneighbor = await SubNeighbor.findOne({ slug: subNeighborId });
        }

        if (!subneighbor) {
            logger.warn(`Error getting neighbor with Id ${subNeighborId}. SubNeighbor not found`);
            return sendJSONResponse(res, 404, {}, errorMessages.notFound);
        }

        return sendJSONResponse(res, 200, { subneighbor }, 'subneighbor retrieved successfully');
    }
}

export default AuthController;
