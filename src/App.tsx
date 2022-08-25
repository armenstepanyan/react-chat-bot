import React from 'react';
import Chat from './components/Chat';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  return (

    <div>
      <CssBaseline />
        <AppBar position="relative">
        <Toolbar>          
          <Typography variant="h6" color="inherit" noWrap>
            Chat Bot
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
    >
      <Chat />
      </Box>      
      </main>
      
    </div>
  );
}

export default App;
