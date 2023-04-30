import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import introVideo from '../../assets/Videos/introvideo.mp4';

const CourseDetailPage = () => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectureTitle = 'Lecture Title';
  const lectures = [
    {
      _id: 'sadsd',
      title: 'sample',
      description: 'Sample scuff hfjjsh sdfhkf',
      video: { url: 'sdfhjfds' },
    },
    {
      _id: 'sadsdgdfg',
      title: 'sample1',
      description: 'Sample scuff hfjjsh sdfhkf',
      video: { url: 'sdfhjfds' },
    },
    {
      _id: 'sadsd322',
      title: 'sample2',
      description: 'Sample scuff hfjjsh sdfhkf',
      video: { url: 'sdfhjfds' },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          controls
          src={introVideo}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
        <Heading
          m={'4'}
          children={`# ${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        />
        <Heading m={'4'} children={'Description'} />
        <Text m={'4'} children={lectures[lectureNumber].description} />
      </Box>
      <VStack>
        {lectures.map((element, index) => (
          <button
            key={element._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
            onClick={() => setLectureNumber(index)}
          >
            <Text noOfLines={1}>
              #{index + 1}
              {element.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CourseDetailPage;
