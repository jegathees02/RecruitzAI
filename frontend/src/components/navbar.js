import React, { useState } from 'react';
import logo from '../assets/depression.png';
import { Link } from 'react-router-dom';
import profile from '../assets/undraw_pic_profile_re_7g2h.svg';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  useColorMode,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
interface Props {
  children: React.ReactNode;
}
// const Links = ['Home', 'About', 'Feedback',];
const Links = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Interview', path: '/camera' },
  {label:'Recent Trends', path:'/recent'},  
];
const Links1 = ['HOME', 'COURSES', 'Feedback','SignUp','Login'];
const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};
const email=localStorage.getItem('userEmail');
console.log("Email",email);
const response = await fetch(`http://localhost:5000/get/dashboard/${email}`);
const data = await response.json();

export default function WithAction() {
  // const confirmLogout = () => {
  //   const userConfirmed = window.confirm('Are you sure you want to logout?');
  //   if (userConfirmed) {
  //     handleLogout();
  //   }
  // };
  // const handleLogout = () => {
   
  //   navigate('/');
  // };
const navigate=useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isNavOpen, setNavOpen] = useState(false); // State for responsive navigation
  const toggleNav = () => {setNavOpen(!isNavOpen);navigate('/login')};
  const toggleNav1 = () => {setNavOpen(!isNavOpen);navigate('/signup')};
  const [isLogoutAlertOpen, setLogoutAlertOpen] = useState(false);

  const cancelLogout = () => setLogoutAlertOpen(false);
  const confirmLogout = () => {
    setLogoutAlertOpen(true);
  };

  const handleLogout = () => {
    // Perform logout actions here
    navigate('/');
  };
  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box display={'flex'}>
              <img src={logo} alt='logo' width={50} />
              <Text mt={2} fontFamily={'fantasy'} fontSize={'2xl'}>&nbsp;Recruitz</Text>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
  {Links.map((link) => (
    <Button key={link.label} variant={'link'} padding={5} onClick={() => navigate(link.path)}>
      {link.label}
    </Button>
  ))}
</HStack>
          </HStack>
          <HStack alignItems={'center'} spacing={10}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {!localStorage.getItem('auth')?(
              <>
            <Button
              variant={'link'}
              colorScheme={'teal'}
              size={'sm'}
              display={{ base: 'none', md: 'block' }} // Responsive display
              onClick={toggleNav1}
            >
              SignUp
            </Button>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              display={{ base: 'none', md: 'block' }} // Responsive display
              onClick={toggleNav}
            >
              Login
            </Button>
            </>
            ) : (<> </>)
}
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={profile}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Box textAlign="center">
                  <Avatar
                    size={'2xl'}
                    src={profile}
                  />
                </Box>
                <br />
                <Center>
                  <Text>{data.firstName+" "+data.lastName}</Text>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem onClick={()=>{navigate('/dashboard')}}>Dashboard</MenuItem>
                <MenuItem onClick={()=>{navigate('/edit')}}>Account Settings</MenuItem>
                <MenuItem onClick={()=>{navigate('/feedbackuser')}}>Report</MenuItem>
                <MenuItem onClick={confirmLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        {isOpen || isNavOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links1.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <AlertDialog
        isOpen={isLogoutAlertOpen}
        leastDestructiveRef={undefined}
        onClose={cancelLogout}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={cancelLogout} mr={3}>Cancel</Button>
              <Button colorScheme="red" onClick={() => { cancelLogout(); handleLogout(); }}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
