import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

export default function SubNbButton(props) {
    const { subnbname, onChooseSubNeighbor, id } = props;

    const handleChooseSubNeighbor = event => {
        event.preventDefault();
        onChooseSubNeighbor(id);
    };

    return (
        <FormControlLabel value={subnbname} control={<Radio />} label={subnbname} />
    );
}
