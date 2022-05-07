import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import neighborService from '../../services/neighborService';
import subNeighborService from '../../services/subNeighborService';
import NbButton from '../secondary/NbButton';
import SubNbButton from '../secondary/SubNbButton';

import MaterialUIPickers from '../primary/MaterialUIPickers';
import EnhancedTable from '../primary/StickyHeadTable';
import PieChartRace from '../primary/PieChartRace';
import PieChartGender from '../primary/PieChartGender';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [apiLoading, setApiLoading] = useState(false);
  const [neighborId, setNeighborId] = useState('');
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
      setNeighborId(id);
      getSubNeighbors();
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
    }
  };

  async function getSubNeighbors(query) {
    try {
      setApiLoading(true);
      const response = (await subNeighborService.getSubNeighbors({ query, limit: 10, page: 1 })).data;
      setSubNeighbors(response.subneighbors.filter((subneighbor) => subneighbor.nbid === neighborId));
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
    }
  }
  useEffect(() => {
    getSubNeighbors(query.query);
  }, [query.query]);

  const handleChooseSubNeighbor = async id => {
    try {
      setApiLoading(true);
      const response = (await subNeighborService.getSubNeighbor({ query, id: id, limit: 10, page: 1 })).data;
      setSubNeighbors(response.subneighbors);
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-32 py-8">
      <h3 className="text-2xl text-hint-nav">WGBH Dashboard</h3>

      <div className="absolute right-0 ">
        <div className="mx-2.5 inline">
          <MaterialUIPickers label="From" />
        </div>
        <div className="mx-2.5 inline">
          <MaterialUIPickers label="To" />
        </div>
        <div className="mx-2.5 inline">
          <Button variant="contained">Search</Button>
        </div>
      </div>

      <div className="mt-24">

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Item>
                <h1>Top Neighborhoods Covered</h1>

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
              </Item>
            </Grid>
            <Grid item xs>
              <Item>

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Sub-Neighborhoods</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {subneighbors.length > 0 && (
                      <>
                        {subneighbors.map((subneighbor) => (
                          <SubNbButton
                            key={subneighbor._id}
                            id={subneighbor._id}
                            subnbname={subneighbor.subnbname}
                            onChooseSubNeighbor={handleChooseSubNeighbor}
                          />
                        ))}
                      </>
                    )}
                  </RadioGroup>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <h1>Articles on Downtown</h1>
                <EnhancedTable />
              </Item>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs>
              <Item>
                <h1>Map</h1>
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <h1>Ranking of Topics Tagged this Week</h1>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <div className="h-3 w-3 inline">
                  <PieChartRace />
                  <PieChartGender />
                </div>
                <div className="h-3 w-3 inline">
                  <PieChartGender />
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>

      </div>

    </div >
  );
}
