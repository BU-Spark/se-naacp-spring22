import { Document, Schema, model } from 'mongoose';

import { IUserDocument } from './User';

export interface INeighborDocument extends Document {
    id: string;
    _id: string | object;
    nbname: string;
    createdBy: IUserDocument | string | undefined;
    documentUrl: string;
    createdAt: Date;
    updatedAt: Date | number;
}

const NeighborSchema: Schema<INeighborDocument> = new Schema(
    {
        nbname: {
            type: String,
            trim: true,
            required: true,
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

NeighborSchema.index({ createdAt: 1 });

export const Neighbor = model<INeighborDocument>('Neighbor', NeighborSchema);
