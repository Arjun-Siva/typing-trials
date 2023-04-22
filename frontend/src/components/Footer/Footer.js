import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Footer = () => {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <div>© Typing Trials. All rights reserved</div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
