import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import cursor from '../../../assets/Images/cursor.png';
import Sidebar from '../DashBoard/Sidebar';

const CreateCourse = () => {
  return (
    <Grid
      style={{ cursor: `url(${cursor}),default`, position: 'relative' }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box></Box>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
