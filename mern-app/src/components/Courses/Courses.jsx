import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import sampleimg from '../../assets/Images/sample1.jpg';

export const CourseCart = ({
  views,
  title,
  imageSrc,
  id,
  addToPlayListHandler = () => {},
  creator,
  description,
  lectureCount,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={'3'}
        children={title}
      />
      <Text noOfLines={'2'} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>
      <HStack>
        <Heading
          textAlign={'center'}
          size={'xs'}
          children={`Lectures - ${lectureCount}`}
          textTransform={'uppercase'}
        />
        <Heading
          size={'xs'}
          children={`views - ${views}`}
          textTransform={'uppercase'}
        />
      </HStack>
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/courses/${id}`}>
          <Button colorScheme="yellow" textDecoration={'none'}>
            Watch Now
          </Button>
          <Button
            variant={'ghost'}
            colorScheme="yellow"
            onClick={addToPlayListHandler(id)}
            textDecoration="none"
          >
            Add To PlayList
          </Button>
        </Link>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyWord, setKeyWord] = useState('');
  const [category, setCategory] = useState('');
  const categories = [
    'Web development',
    'Artificial Intelligence',
    'Data Structures & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];
  const addToPlayListHandler = () => console.info('added to playlist');
  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyWord}
        onChange={e => setKeyWord(e.target.value)}
        placeholder="Search your course..."
        type="text"
        focusBorderColor="yellow.500"
      />
      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {categories.map((item, index) => (
          <Button key={index} minW={'60'} onClick={() => setCategory(item)}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <CourseCart
          title={'Sample1'}
          description={'Sample1'}
          views={23}
          imageSrc={sampleimg}
          creator={'sampl1 boy'}
          lectureCount={2}
          addToPlayListHandler={addToPlayListHandler}
        />
      </Stack>
    </Container>
  );
};

export default Courses;
