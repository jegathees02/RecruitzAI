'use client'
import NavBar from '../components/navbar';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'
import { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Feedbackuser() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4g99txq', 'template_7301zqd', form.current, 'vBlEXb3XiiYBGcs9Z')
      .then((result) => {
          console.log(result.text);
          window.location.reload(false);
          // formData.from_name = '';
          // formData.user_email = '';
          // formData.message = '';
      }, (error) => {
          console.log(error.text);
      });
  };

  const [formData, setFormData] = useState({
    from_name: '',
    user_email: '',
    message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form data submitted:', formData);
    // You can make an API call, send the data to a server, etc.
  };
  return (
    <>
      <NavBar />
    <Container bg="#ffffff" maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="teal"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.300">
                    Fill up the form below to report
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid ' }}
                        leftIcon={<MdPhone color="black" size="20px" />}>
                        +91-9445983356
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="250px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid ' }}
                        leftIcon={<MdEmail color="black" size="20px" />}>
                        recurutiz.queries@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="220px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid' }}
                        leftIcon={<MdLocationOn color="black" size="20px" />}>
                        Coimbatore, TamilNadu
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start">
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#ffffff' }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#ffffff' }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#ffffff' }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                <form ref={form} onSubmit={sendEmail}>
      <Box m={8} color="#0B0E3F">
        <VStack spacing={5}>
          <FormControl id="from_name">
            <FormLabel>Your Name</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement pointerEvents="none">
                <BsPerson color="gray.800" />
              </InputLeftElement>
              <Input
                type="text"
                size="md"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="user_email">
            <FormLabel>Mail</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement pointerEvents="none">
                <MdOutlineEmail color="gray.800" />
              </InputLeftElement>
              <Input
                type="text"
                size="md"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="message">
            <FormLabel>Message</FormLabel>
            <Textarea
              borderColor="gray.300"
              _hover={{
                borderRadius: 'gray.300',
              }}
              placeholder="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="submit" float="right">
            <Button type="submit" variant="solid" bg="teal" color="white">
              Send Message
            </Button>
          </FormControl>
        </VStack>
      </Box>
    </form>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
    </>
  )
}