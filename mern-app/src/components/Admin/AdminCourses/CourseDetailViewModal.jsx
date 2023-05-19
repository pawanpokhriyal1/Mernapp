import {
  Box,
  Button,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const CourseDetailViewModal = ({
  courseTitle,
  id,
  isOpen,
  onClose,
  deleteButtonHandler,
  addLectureHandler,
  lectures = [],
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="16">
            <Grid templateColumns={['1fr', '3fr 1fr']}>
              <Box px={['0', '16']}>
                <Box my={'5'}>
                  <Heading children={courseTitle} />
                  <Heading children={`#${id}`} size="sm" opacity={0.4} />
                  <Heading children={'Lectures'} size={'lg'} />
                  <VideoCard
                    title={'Mern Intro'}
                    description={
                      'This is a intro lecture,where you will know basics of Mern'
                    }
                    num={1}
                    lectureId={'asasa212'}
                    courseId={id}
                    deleteButtonHandler={deleteButtonHandler}
                  />
                </Box>
              </Box>
            </Grid>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default CourseDetailViewModal;

function VideoCard({
  num,
  title,
  description,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      padding={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
