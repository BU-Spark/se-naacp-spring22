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

const { Neighbor } = models;

type NeighborQuery = {
    createdBy: string;
    title?: RegExp;
};

class AuthController {
    static async getNeighbors(req: Request, res: Response) {
        const currentUser = req.user!;
        logger.info('attempting to get Neighbors for user');
        const { limit, page } = getQueryOptions(req);

        let query: NeighborQuery = { createdBy: currentUser.userId };
        const offset = (page - 1) * limit;

        if (req.query.q) {
            const searchQuery = escapeRegex(req.query.q.toString());
            logger.info(`Getting Neighbors with query (${searchQuery})`);
            query = { ...query, title: new RegExp(searchQuery, 'gi') };
        }

        const neighborsPromise = Neighbor.find(query).sort({ createdAt: 1 }).skip(offset).limit(limit);
        const countPromise = Neighbor.countDocuments(query);
        const [neighbors, count] = await Promise.all([neighborsPromise, countPromise]);
        logger.info('neighbors fetched successfully');
        const metaData = paginate(count, limit, offset);
        return sendJSONResponse(res, 200, { neighbors, metaData }, 'neighbors retrieved successfully');
    }

    static async createNeighbor(req: Request, res: Response) {
        const { title, content, documentUrl } = req.body;
        const currentUser = req.user!;
        logger.info(`attempting to create neighbor with title ${title}`);

        let slug = slugify(title);

        // TODO: swtich to pub sub model to extract text and generate topics
        const parsedContentPromise = downloadFile(documentUrl);
        const exisitngNeighborsPromise = Neighbor.find({ slug: new RegExp(slug, 'gi') }).sort({ createdAt: -1 });
        const [exisitngNeighbors, parsedContent] = await Promise.all([exisitngNeighborsPromise, parsedContentPromise]);

        if (exisitngNeighbors.length > 0) {
            slug = `${slug}-${exisitngNeighbors.length + 1}`;
        }

        const neighbor = new Neighbor({
            title,
            slug,
            content: parsedContent || content,
            documentUrl,
            createdBy: currentUser.userId,
        });

        const createdNeighbor = await neighbor.save();

        logger.info(`Neighbor ${title} created successfully`);

        return sendJSONResponse(
            res,
            201,
            {
                neighbor: createdNeighbor,
            },
            'neighbor created successfully',
        );
    }

    static async getNeighbor(req: Request, res: Response) {
        logger.info('attempting to get neighbor');
        const { id: neighborId } = req.params;

        let neighbor;
        if (isValidId(neighborId)) {
            neighbor = await Neighbor.findById(neighborId);
        } else {
            neighbor = await Neighbor.findOne({ slug: neighborId });
        }

        if (!neighbor) {
            logger.warn(`Error getting neighbor with Id ${neighborId}. Neighbor not found`);
            return sendJSONResponse(res, 404, {}, errorMessages.notFound);
        }

        return sendJSONResponse(res, 200, { neighbor }, 'neighbor retrieved successfully');
    }

    static async deleteNeighbor(req: Request, res: Response) {
        logger.info('attempting to delete neighbor');
        const currentUser = req.user!;
        const { id: neighborId } = req.params;
        const neighbor = await Neighbor.findById(neighborId);
        if (!neighbor) {
            logger.warn(`Error getting neighbor with id (${neighborId})`);
            return sendJSONResponse(res, 404, {}, 'neighbor not found.');
        }
        await neighbor.remove();

        logger.info(`neighbor ${neighbor.title} deleted by ${currentUser.email} successfully`);
        return sendJSONResponse(res, 204, {}, 'neighbor deleted successfully');
    }
}

export default AuthController;
