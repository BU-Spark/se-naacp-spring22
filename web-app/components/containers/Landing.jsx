import React from 'react';

import MaterialUIPickers from '../primary/MaterialUIPickers';
import EnhancedTable from '../primary/StickyHeadTable';

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

export default function Landing() {
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

                    <Button size="large">Neighbor1</Button>
                    <Button>Neighbor2</Button>
                    <Button>Neighbor3</Button>
                    <Button>Neighbor4</Button>
                    <Button>Neighbor5</Button>

                  </ButtonGroup>
                </Box>
              </Item>
            </Grid>
            <Grid item xs>
              <Item>

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Sub-Neighborhoods in Downtown</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SubNeighbor1" control={<Radio />} label="SubNeighbor1" />
                    <FormControlLabel value="SubNeighbor2" control={<Radio />} label="SubNeighbor2" />
                    <FormControlLabel value="SubNeighbor3" control={<Radio />} label="SubNeighbor3" />
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
        </Box>

      </div>



    </div >
  );
}
