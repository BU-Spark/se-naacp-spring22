import { Document, Schema, model } from 'mongoose';

import { IUserDocument } from './User';
import { INeighborDocument } from './Neighbor';

export interface ISubNeighborDocument extends Document {
    id: string;
    _id: string | object;
    nbid: INeighborDocument | string | undefined;
    subnbname: string;
    createdBy: IUserDocument | string | undefined;
    documentUrl: string;
    createdAt: Date;
    updatedAt: Date | number;
}

const SubNeighborSchema: Schema<ISubNeighborDocument> = new Schema(
    {
        subnbname: {
            type: String,
            trim: true,
            required: true,
        },
        nbid: {
            type: Schema.Types.ObjectId,
            ref: 'Neighbor',
            required: 'You must supply a Neighbor',
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: 'You must supply a user',
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
);

SubNeighborSchema.index({ createdAt: 1 });

export const SubNeighbor = model<ISubNeighborDocument>('SubNeighbor', SubNeighborSchema);
