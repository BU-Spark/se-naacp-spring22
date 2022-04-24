import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { truncateText } from '../../helpers';

export default function NbButton(props) {
    const { nbname, onChooseNeighbor, id } = props;

    const handleChooseNeighbor = event => {
        event.preventDefault();
        onChooseNeighbor(id);
    };

    return (
        <Button key={id} onClick={handleChooseNeighbor}>{nbname}</Button>
    );
}
