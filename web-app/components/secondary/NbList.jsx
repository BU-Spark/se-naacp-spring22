import React from 'react';
import Link from 'next/link';
import { truncateText } from '../../helpers';

export default function NbList(props) {
    const { nbname, className, onChooseNeighbor, id } = props;

    const handleChooseNeighbor = event => {
        event.preventDefault();
        onChooseNeighbor(id);
    };

    return (
        <div className={`pt-4 pb-6 px-4 bg-white bg-opacity-20 border border-gray-600 rounded-3xl ${className}`}>
            <div className="card-body" onClick={handleChooseNeighbor}>
                <h5 className="mt-2 mb-4 text-xl font-medium">{truncateText(nbname, 24)}</h5>
            </div>
        </div>
    );
}
