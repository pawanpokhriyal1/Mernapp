import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import cursor from '../../../assets/Images/cursor.png';
import Sidebar from '../DashBoard/Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import poster from '../../../assets/Images/logo.jpg';
import CourseDetailViewModal from './CourseDetailViewModal';
const AdminCourses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseTitle, setCourseTitle] = useState('');
  const [courseId, setCourseId] = useState('');

  const courses = [
    {
      _id: 'dsfsf',
      title: 'Mern',
      category: 'Web Development',
      poster: { url: poster },
      createdBy: 'Pawan Pokhriyal',
      views: 123,
      numOfVideos: 12,
    },
    {
      _id: 'dsfsf',
      title: 'Mern',
      category: 'Web Development',
      poster: { url: `${poster}` },
      createdBy: 'Pawan Pokhriyal',
      views: 123,
      numOfVideos: 12,
    },
  ];
  const courseDetailViewHandler = item => {
    setCourseTitle(item.title);
    setCourseId(item._id);
    onOpen();
  };
  const deleteButtonHandler = id => {
    console.info('delete', id);
  };
  const deleteLecturButtoneHandler = (courseId, lectureId) => {
    console.info('courseId', courseId);
    console.info('lectureId', lectureId);
  };
  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };
  return (
    <Grid
      style={{ cursor: `url(${cursor}),default`, position: 'relative' }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption children="All Available Courses" />
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Category</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  courseDetailViewHandler={courseDetailViewHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseDetailViewModal
          isOpen={isOpen}
          onClose={onClose}
          courseTitle={courseTitle}
          id={courseId}
          deleteButtonHandler={deleteLecturButtoneHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailViewHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.createdBy}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailViewHandler(item)}
            variant={'outline'}
            color={'purple.500'}
          >
            View Lecture
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
