import { Document, Schema, model } from 'mongoose';

import { IUserDocument } from './User';

export interface INeighborDocument extends Document {
    id: string;
    _id: string | object;
    title: string;
    slug: string;
    content: string;
    createdBy: IUserDocument | string | undefined;
    documentUrl: string;
    createdAt: Date;
    updatedAt: Date | number;
}

const NeighborSchema: Schema<INeighborDocument> = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        slug: {
            type: String,
            trim: true,
            required: true,
        },
        content: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: 'You must supply a user',
        },
        documentUrl: { type: String, default: '', trim: true },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
);

NeighborSchema.index({ createdAt: 1 });

export const Neighbor = model<INeighborDocument>('Neighbor', NeighborSchema);
