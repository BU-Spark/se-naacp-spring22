import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import neighborService from '../../services/neighborService';
import NbList from '../secondary/NbList';
import NbButton from '../secondary/NbButton';

import MaterialUIPickers from '../primary/MaterialUIPickers';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function Home() {
  const [apiLoading, setApiLoading] = useState(false);
  const [neighbors, setNeighbors] = useState([]);
  const [subneighbors, setSubNeighbors] = useState([]);

  const router = useRouter();
  const { query } = router;

  async function getNeighbors(query) {
    try {
      setApiLoading(true);
      const response = (await neighborService.getNeighbors({ query, limit: 10, page: 1 })).data;
      setNeighbors(response.neighbors);
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
    }
  }
  useEffect(() => {
    getNeighbors(query.query);
  }, [query.query]);

  const handleChooseNeighbor = async id => {
    try {
      setApiLoading(true);
      const response = (await neighborService.getNeighbor({ query, id: id, limit: 10, page: 1 })).data;
      setNeighbors(response.subneighbors);
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
    }
  };


  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-32 py-8">
      <h3 className="text-2xl text-hint-nav">WGBH Dashboard</h3>

      <MaterialUIPickers label="From" />
      <MaterialUIPickers label="To" />
      <Button variant="contained">Search</Button>

      <h3>Top Neighborhoods Covered</h3>
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
          {neighbors.length > 0 && (
            <>
              {neighbors.map((neighbor) => (
                <NbButton
                  key={neighbor._id}
                  id={neighbor._id}
                  nbname={neighbor.nbname}
                  onChooseNeighbor={handleChooseNeighbor}
                />
              ))}
            </>
          )}
        </ButtonGroup>
      </Box>

    </div>
  );
}
