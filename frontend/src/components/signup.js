import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
//   CircularProgress,
  Spinner
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
// import {TextToSpeech, talk} from 'text-to-speech-js';
function SignupCard() {
  const BASE_API_URI = "http://localhost:5000"
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
   const navigate=useNavigate();
   const handleSubmit = () => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
  
    axios.post(`${BASE_API_URI}/signup`, userData)
      .then((response) => {
        console.log(response);
        // TextToSpeech.talk("Signup successful");
        localStorage.setItem('auth', true);
        setIsLoading(true);
        localStorage.setItem('userEmail',userData.email);
        // Simulate a 2-second delay for signing up
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login');
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };
  

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {/* to enjoy all of our cool features ✌️ */}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <FormControl id="firstName" isRequired>
                <FormLabel >First Name</FormLabel>
                <Input onChange={e => setFirstName(e.target.value)} type="text" />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel >Last Name</FormLabel>
                <Input onChange={e => setLastName(e.target.value)} type="text" />
              </FormControl>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input  onChange={e => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel >Password</FormLabel>
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
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading}
                loadingText="Signing Up"
                size="lg"
                bg={'teal'}
                color={'white'}
                _hover={{
                  bg: 'teal.500',
                }}
                onClick={handleSubmit}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'teal'} onClick={()=>navigate('/login')}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default function App() {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Simulate a 2-second delay before showing the signup component
    const delay = setTimeout(() => {
      setShowSignup(true);
    }, 300);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {showSignup ? (
        <SignupCard />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='teal.500'
              size='xl'
            />
      </div>
      )}
    </div>
  );
}
