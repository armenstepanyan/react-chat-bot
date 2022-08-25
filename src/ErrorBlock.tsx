import React, { FunctionComponent } from 'react'
import Typography from "@mui/material/Typography";

const ErrorBlock:FunctionComponent<{ message?: string }> = ({ message }) => {
  return (
    <Typography variant="h4" sx={{ color: "red" }}>           
       { message || 'Something went wrong' }
   </Typography>
  )
}

export default ErrorBlock