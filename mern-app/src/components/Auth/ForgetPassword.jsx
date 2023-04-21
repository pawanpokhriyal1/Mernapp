import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <Container
      py={'16'}
      height={'90'}
      style={{
        position: 'relative',
        marginBottom: '472px',
      }}
    >
      <form style={{ position: 'absolute', top: '0' }}>
        <Heading
          children="Forget Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button type="submit" w={'full'} colorScheme="yellow">
            Send Request Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
