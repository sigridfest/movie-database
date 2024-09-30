import './Sidebar.css'
import { Button,  Drawer, IconButton, styled } from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useState } from 'react'
import Slider from '@mui/material/Slider';
import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// This component is no longer in use

const marks = [
    {
      value: 1,
      label: '1/5',
    },
    {
      value: 2,
      label: '2/5',
    },
    {
      value: 3,
      label: '3/5',
    },
    {
      value: 4,
      label: '4/5',
    },
    {
        value: 5,
        label: '5/5',
      },
  ];

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4),
    ...theme.mixins.toolbar,
    justifyContent: 'right',
  }));
  
const drawerWidth = 320;

function Sidebar() {
    const [value, setValue] = React.useState<number[]>([0, 5]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };

    console.log(value);
    
    return (
        <div>
        <DrawerHeader>
        <IconButton 
          size='medium' 
          edge='start' 
          color='inherit' 
          onClick={() => setIsDrawerOpen(true)}>

        <FilterAltIcon
          fontSize='large'/> 
        </IconButton>
        </DrawerHeader>

        <Drawer
            PaperProps={{
                sx: {
                    height: 'calc(100% - 160px)', top: 120,
                    width: 250,
                    padding: 6,
                    backgroundColor: '#A3A3A3',
                    borderRadius: '0 12px 12px 0'
                }
            }} 
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                },
            }}
            anchor='left' 
            open={isDrawerOpen} 
            variant='temporary'
            onClose={() => setIsDrawerOpen(false)}>
            

        <p> Filter on reviews </p> 
        <Slider
            value={value}
            aria-label="Custom marks"
            defaultValue={0}
            step={null}
            onChange={handleChange}
            valueLabelDisplay="auto"
            marks={marks}
            min={1}
            max={5}
        /> 
        <p> Filter on genre </p> 
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Horror" />
            <FormControlLabel control={<Checkbox />} label="Comedy" />
            <FormControlLabel control={<Checkbox />} label="Thriller" />
            <FormControlLabel control={<Checkbox />} label="Action" />
            <FormControlLabel control={<Checkbox />} label="Drama" />
            <FormControlLabel control={<Checkbox />} label="Science fiction" />
        </FormGroup>

        

        <IconButton 
          size='large' 
          edge='start' 
          color='inherit' 
          onClick={() => setIsDrawerOpen(false)}>
        <FilterAltOffIcon/> 
        </IconButton>

        <Button onClick={() => setIsDrawerOpen(false)}> Apply filter </Button> 
        </Drawer>
        </div>
    );

}


export default Sidebar;
