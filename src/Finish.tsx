import React from 'react'
import Typography from "@mui/material/Typography";
import { Grow } from '@mui/material';

const Finish = () => {
  return (
    <Grow in={true}>
    <Typography variant="h5" sx={{ color: "rgb(25, 118, 210)" }}>
      Herzlichen Dank für Ihre Angaben
    </Typography>
    </Grow>
  )
}

export default Finish