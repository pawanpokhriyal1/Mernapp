import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import cursor from '../../../assets/Images/cursor.png';
import Sidebar from '../DashBoard/Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const Users = () => {
  const users = [
    {
      _id: 'dsfsf',
      name: 'Pawan',
      email: 'pp@gmail.com',
      role: 'Admin',
      subscription: { status: 'active' },
    },
    {
      _id: '333ff',
      name: 'Raman',
      email: 'rwap@gmail.com',
      role: 'employee',
      subscription: { status: 'not Active' },
    },
  ];
  const updateHandler = id => {
    console.info('update', id);
  };
  const deleteButtonHandler = id => {
    console.info('delete', id);
  };
  return (
    <Grid
      style={{ cursor: `url(${cursor}),default`, position: 'relative' }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '16']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption children="All Available Users" />
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  updateHandler={updateHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription.status === 'active' ? 'Active' : 'Not Active'}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color={'purple.500'}
          >
            Change Role
          </Button>
          <Button
            color="purple.600"
            onClick={() => deleteButtonHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
