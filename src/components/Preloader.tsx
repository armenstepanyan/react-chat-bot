import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Preloader = () =>  {
  return (
    <Stack spacing={1}>
        <Skeleton variant="rectangular" height={20}></Skeleton>
        <Skeleton variant="rectangular" height={40}></Skeleton>
    </Stack>
  )
}

export default Preloader