import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
const Userdetails = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState('');
  const [experience, setExperience] = useState('');
  const [assessmentLevel, setAssessmentLevel] = useState('');
  const [internDuration, setInternDuration] = useState('');
  const [fullTimeExperience, setFullTimeExperience] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !resume) {
      showToastError('Resume is required.');
      return;
    }
    if (step === 2 && !experience) {
      showToastError('Experience is required.');
      return;
    }
    if (step === 3) {
      if (experience === 'intern' && !internDuration) {
        showToastError('Intern duration is required.');
        return;
      }
      if (experience === 'fullTime' && !fullTimeExperience) {
        showToastError('Full-time experience is required.');
        return;
      }
    }
    if (step === 4 && !assessmentLevel) {
      showToastError('Assessment Level is required.');
      return;
    }

    setStep(step + 1);
    setProgress(progress + 25);
  };

  const handleBack = () => {
    setStep(step - 1);
    setProgress(progress - 25);
  };

  const showToastError = (message) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };
  
  const handleSubmit = () => {
    // Handle form submission
    toast({
      title: 'Form submitted.',
      description: 'Your form has been submitted successfully.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
    window.localStorage.setItem("level",assessmentLevel);
    window.localStorage.setItem("experience",experience);
    navigate('/camera');
  };

  return (
    <>
    <NavBar/>
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br>
    <div>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={8}
        m="10px auto"
        as="form"
        
      >
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>

        {step === 1 && (
          <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
              Resume Upload
            </Heading>
            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
              <FormLabel htmlFor="resume">Resume <pre>docx/pdf/txt &nbsp;&nbsp;&nbsp;maxsize-2MB</pre></FormLabel>
              <Input
                type="file"
                name="resume"
                id="resume"
                autoComplete="resume"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
                onChange={(e) => setResume(e.target.value)}
              />
            </FormControl>
          </>
        )}

        {step === 2 && (
          <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
              Job Experience
            </Heading>
            <FormControl mt="2%">
              {/* <FormLabel htmlFor="experience">Experience (in Years)</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  placeholder="Enter your Experience"
                  onChange={(e) => setExperience(e.target.value)}
                />
                <InputRightElement width="4.5rem"></InputRightElement>
              </InputGroup> */}
              <FormLabel htmlFor="assessmentLevel">Job type</FormLabel>
               <Select
                placeholder="Select your job type"
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="Intern">Intern</option>
                <option value="FullTime">Full time</option>
                <option value="Student">Student</option>
              
              </Select>
            </FormControl>
          </>
        )}
         {step === 3 && experience === 'Intern' && (
            <>
              <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Intern Duration
              </Heading>
              <FormControl mt="2%">
                <FormLabel htmlFor="internDuration">Intern Duration</FormLabel>
                <Select
                  placeholder="Select intern duration"
                  onChange={(e) => setInternDuration(e.target.value)}
                >
                  <option value="1Month">1 Month</option>
                  <option value="2Months">2 Months</option>
                  <option value="3Months">3 Months</option>
                  <option value=">6Months">Greater than 6</option>

          
                </Select>
              </FormControl>
            </>
          )}

          {step === 3 && experience === 'FullTime' && (
            <>
              <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Full-Time Experience
              </Heading>
              <FormControl mt="2%">
                <FormLabel htmlFor="fullTimeExperience">Full-Time Experience (in Years)</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    placeholder="Enter your Full-Time Experience"
                    onChange={(e) => setFullTimeExperience(e.target.value)}
                  />
                  <InputRightElement width="4.5rem"></InputRightElement>
                </InputGroup>
              </FormControl>
            </>
          )}

          {step === 3 && experience === 'Student' && (
                      <>
                        <Heading w="100%" textAlign={'center'} fontWeight="normal">
                          Pass Out Year
                        </Heading>
                        <FormControl mt="2%">
                          <FormLabel htmlFor="fullTimeExperience">Pass out Year</FormLabel>
                          <InputGroup size="md">
                            <Input
                              pr="4.5rem"
                              placeholder="Enter your Full-Time Experience"
                              onChange={(e) => setFullTimeExperience(0)}
                            />
                            <InputRightElement width="4.5rem"></InputRightElement>
                          </InputGroup>
                        </FormControl>
                      </>
                    )}
        {step === 4 && (
          <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal">
              Select the Level of Assessment
            </Heading>
            <FormControl mt="2%">
              <FormLabel htmlFor="assessmentLevel">Assessment Level</FormLabel>
              <Select
                placeholder="Select assessment level"
                onChange={(e) => setAssessmentLevel(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </FormControl>
          </>
        )}

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={handleBack}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                onClick={step === 4 ? handleSubmit : handleNext}
                colorScheme="teal"
                variant={step === 3 ? 'solid' : 'outline'}
              >
                {step === 4 ? 'Submit' : 'Next'}
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
      </div>
      </div>
    </>
  );
};

export default Userdetails;
