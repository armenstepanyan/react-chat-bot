import React, { FunctionComponent, useState } from 'react'
import Typography from "@mui/material/Typography";
import { Grow } from '@mui/material';
import { AnswerItem } from '../interfaces';
import useFetch from '../hooks/useFetch';
import ErrorBlock from './ErrorBlock';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";


const Loader: FunctionComponent<{ message: string }> = ({ message }) => {
  return (
    <Box >
      <Typography variant='body2'>{message}</Typography>
      <CircularProgress />
    </Box>
  );
}

const Finish: FunctionComponent<{ list: Array<AnswerItem>; }> = ({ list }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { loading, error } = useFetch<any>( 'https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation', [], { method: 'PUT', body: JSON.stringify(list)}, toggle );
   
  return (
    <Grow in={true}>
      <div>
        <Typography variant="h5" sx={{ color: "rgb(25, 118, 210)" }}>
          Herzlichen Dank für Ihre Angaben
        </Typography>
        <div>
          {loading ? (
            <Loader message="Sending data..." />
          ) : error ? (
            <>
              <ErrorBlock message="Unable to send request" />
              <Button
                variant="contained"
                onClick={() => setToggle((prev) => !prev)}
              >
                Retry
              </Button>
            </>
          ) : (
            <Typography variant="subtitle1"> Success </Typography>
          )}
        </div>
      </div>
    </Grow>
  );
}

export default Finish