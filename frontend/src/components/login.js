import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
export default function App() {
  const navigate = useNavigate();
  const BASE_API_URI = "http://localhost:5000"
  const [showPassword, setShowPassword] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  // const navigate=useNavigate();

  useEffect(() => {
    // Simulate a 2-second delay before showing the card
    const delay = setTimeout(() => {
      setShowCard(true);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  // Define color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const linkColor = useColorModeValue('blue.400', 'blue.200');
  const buttonColor = useColorModeValue('white', 'white');

  const handleSignIn = () => {
    if(email == '') {
      alert("Please enter your email address.");
    }
    else if(password == '') {
      alert("Enter your password");
    }
    const userData = {
      email : email,
      password : password
    }
    axios.post('http://localhost:5000/signin ', userData)
    .then((response) => {
      console.log(response);
      localStorage.setItem('auth',true);
      localStorage.setItem('userEmail', userData.email);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/userdetails');
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
    
   
  };
  return (
    <div>
      {showCard ? (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={bgColor}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={textColor}>
                {/* to enjoy all of our cool <Text color={linkColor}>features</Text> ✌️ */}
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={cardBgColor}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input onChange={e => setEmail(e.target.value)} type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {/* <Input onChange={e => setPassword(e.target.value)} type="password" /> */}
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Text color={linkColor}>Forgot password?</Text>
                  </Stack>
                  <Button
                   bg={'teal'}
                    isLoading={isLoading}
                    loadingText="Signing In"
                    b={linkColor}
                    color={buttonColor}
                    _hover={{
                      bg: 'teal.500',
                    }}
                    onClick={handleSignIn}>
                    Sign in
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    New User? <Link color={'blue'} onClick={()=>navigate('/signup')}>SignUp</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='teal.500'
              size='xl'
            />
            <p> &nbsp; Loading</p>
        </div>
      )}
    </div>
  );
}
