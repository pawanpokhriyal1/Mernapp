import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { RiDashboardFill, RiLogoutBoxLine, RiMenuFill } from 'react-icons/ri';
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = true;
  const user = {
    role: 'admin',
  };
  const LogOutHandler = () => {
    console.info('logout');
    onClose();
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        width="12"
        height={'12'}
        rounded={'full'}
        top={'6'}
        left={'6'}
        zIndex={'overlay'}
      >
        <RiMenuFill />
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay /*backdropFilter={"blur(2px)"}*/ />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton onClose={onClose} url={'/'} title="Home" />
              <LinkButton
                onClose={onClose}
                url={'/courses'}
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url={'/request'}
                title="Request a course"
              />
              <LinkButton
                onClose={onClose}
                url={'/contact'}
                title="Contact Us"
              />
              <LinkButton onClick={onClose} url={'/about'} title="About" />
              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to="/profile">
                          <Button
                            onClick={onClose}
                            variant={'ghost'}
                            colorScheme="yellow"
                          >
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={LogOutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard">
                          <Button
                            onClick={onClose}
                            colorScheme={'purple'}
                            variant={'ghost'}
                          >
                            <RiDashboardFill style={{ margin: '12px' }} />
                            DashBoard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button onClick={onClose} colorScheme="yellow">
                        Login
                      </Button>
                    </Link>
                    <p>OR</p>
                    <Link to="/register">
                      <Button onClick={onClose} colorScheme="yellow">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
export const LinkButton = ({ url = '/', title = 'Home', onClose }) => {
  return (
    <Link to={url}>
      <Button onClick={onClose} variant={'ghost'}>
        {title}
      </Button>
    </Link>
  );
};
