import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Box, Spinner } from '@chakra-ui/react';
import NavBar from '../components/navbar';
import '../styles/result.css'; // Import the CSS file for styling
import { ArrowBackIcon ,ArrowForwardIcon} from '@chakra-ui/icons';
import { FcIdea } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Heading,
  useColorModeValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

// var ec = 0;
// var bold = 0;
// var con = 0;
// var cl = 0;



const App = () => {
  const [backend_data, setBackend_data] = useState([{}]);
  const [output_data,setOutput_data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingTexts = ["Processing your video...", "Analyzing your face...", "Analyzing your voice...", "Generating insights..."];
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/get_result');

        // const allValuesAreOne = Object.values(response.data).every(
        //   (value) => value === 1
        // );
        
        if(response.data.eye_contact === 1 && response.data.confidence === 1 && response.data.clarity === 1 && response.data.boldness == 1) {
          setLoading(false);
          setShowRetakeModal(true);
        } else {
          // Update the state if values are not all 1
          setBackend_data(response.data);
          localStorage.setItem('eye', JSON.stringify(response.data.eye_contact));
          localStorage.setItem('conf', JSON.stringify(response.data.confidence));
          localStorage.setItem('clarity', JSON.stringify(response.data.clarity));
          localStorage.setItem('boldness',JSON.stringify(response.data.boldness));
          localStorage.setItem('overall',JSON.stringify(response.data.overall));
          console.log('response',response.data);
          const scores = {
            timestamp : new Date(),
            confidence: localStorage.getItem('conf'),
            eye_contact: localStorage.getItem('eye'),
            clarity: localStorage.getItem('clarity'),
            boldness: localStorage.getItem('boldness'),
            overall: localStorage.getItem('overall')
          }
          setLoading(false);
          try {
            const userEmail = localStorage.getItem('userEmail'); // Replace with the actual user email
            const response = await axios.put(`http://localhost:5000/update/update_scores/${userEmail}/scores`, {
              score: [scores]
            });
      
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }

          // setTimeout(() => {
            
          // }, 12000);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if(response.data.eye_contact === 1 && response.data.confidence === 1 && response.data.clarity === 1 && response.data.boldness == 1) {
  //     setLoading(false);
  //     setShowRetakeModal(true);
  //   }
  // }, []);
  // var bgColor = useColorModeValue('','');
  // var bgColor1 = useColorModeValue('#33b894', 'teal');
  // const totalHistogramPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
  // var score = totalHistogramPercentage / data.length;


  // var score = backend_data.overall;
  if(backend_data.eye_contact >= 100 ) {
    backend_data.eye_contact = 96;
  }
  if(backend_data.clarity >= 100 ) {
    backend_data.clarity = 96;
  }
  if(backend_data.boldness >= 100 ) {
    backend_data.boldness = 96;
  }
  if(backend_data.confidence >= 100 ) {
    backend_data.confidence = 96;
  }
  const navigate = useNavigate();
  // const getRandomValue = () => Math.floor(Math.random() * 31) + 60;
  const data = [
    { name: 'Eye-Contact', percentage: backend_data.eye_contact },
    { name: 'Confidence', percentage: backend_data.confidence },
    { name: 'Clarity', percentage: backend_data.clarity },
    { name: 'Boldness', percentage: backend_data.boldness }
  ];
  // if(backend_data.eye_contact === 1) {
  //   const data = [
  //     { name: 'Eye-Contact', percentage: backend_data.eye_contact },
  //   { name: 'Confidence', percentage: 1 },
  //   { name: 'Clarity', percentage: 1 },
  //   { name: 'Boldness', percentage: 1}
  //   ]
  // }
  // else{
  //   const data = [
  //     { name: 'Eye-Contact', percentage: backend_data.eye_contact },
  //     { name: 'Confidence', percentage: backend_data.confidence },
  //     { name: 'Clarity', percentage: backend_data.clarity },
  //     { name: 'Boldness', percentage: backend_data.boldness }
  //   ];
  // }
  // const totalHistogramPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
  const totalHistogramPercentages = data.reduce((sum, item) => sum + item.percentage, 0);
  const totalHistogramPercentage = Math.round(totalHistogramPercentages);
  var score = totalHistogramPercentage / data.length;
  const scorechart = [
    { name: 'Success', percentage: score },
    { name: 'Failure', percentage: 100 - score }
  ];
  const totalPercentage = scorechart.reduce((sum, item) => sum + item.percentage, 0);
  const isSuccess = score >= 50;
  var bgColor = useColorModeValue('#4682B4', '#2C3863');
  var bgColor1 = useColorModeValue(isSuccess ? '#33b894' : 'red', isSuccess ? 'teal' :'#B90E0A');
  const textColor = useColorModeValue(isSuccess ? 'teal' : 'red', isSuccess ? 'teal' : '#B90E0A');
  // const textColor = useColorModeValue('black', 'white');
  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // Simulating a 2-second loading delay

  //   return () => clearTimeout(delay); // Clear the timeout if the component unmounts
  // }, []);

  

  const { isOpen, onOpen, onClose } = useDisclosure();
  // localStorage.setItem(backend_data,backend_data);


  return (
    <>
     

      {loading ? (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <Spinner
           thickness='4px'
           speed='0.6s'
           emptyColor='gray.200'
           color='teal.500'
           size='xl'
         />
         <p style={{ fontSize: '20px', marginLeft: '10px' }}>{loadingTexts[loadingTextIndex]}</p>
       </div>
      ) : (
        
        <>
        {showRetakeModal && (
          <AlertDialog
            isOpen={showRetakeModal}
            leastDestructiveRef={undefined}
            onClose={() => setShowRetakeModal(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Retake the Test
                </AlertDialogHeader>

                <AlertDialogBody>
                  It seems that all values are 1. Please retake the test to get accurate results.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="teal" onClick={() => navigate('/camera')}>
                    Retake
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      
            <NavBar />
            <Box>
              <Button variant={'outline'} borderColor={'teal'} marginLeft={5} marginTop={5} onClick={() => navigate('/camera')}>
                <ArrowBackIcon /> Back
              </Button>
              <Button variant={'outline'} borderColor={'teal'} marginLeft={"80%"} marginTop={5} onClick={() => navigate('/feedback')}>
                Get From AI <ArrowForwardIcon /> 
              </Button>
            </Box>
        <div className="main-container">
          <div className="chart-container" style={{ marginLeft: '10%', marginRight: 'auto' }}>
            <ResponsiveContainer width="90%" height={500} >
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                {/* <YAxis tickFormatter={(value) => `${value}%`} /> */}
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill=" #2C3863 " />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="svg-heading-container">
            <div className="svg-container">
              <svg width="400" height="400">
                {scorechart.map((item, index) => {
                  const startAngle = index === 0 ? 0 : scorechart.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.percentage / totalPercentage) * 360, 0);
                  const endAngle = (item.percentage / totalPercentage) * 360 + startAngle;
                  const color = isSuccess ? (index === 0 ? `${bgColor1}` : `${bgColor}`) : (index === 0 ? `${bgColor1}` : `${bgColor}`);
                  const startAngleRadians = (startAngle - 90) * (Math.PI / 180);
                  const endAngleRadians = (endAngle - 90) * (Math.PI / 180);
                  const startX = Math.cos(startAngleRadians) * 100 + 200;
                  const startY = Math.sin(startAngleRadians) * 100 + 200;
                  const endX = Math.cos(endAngleRadians) * 100 + 200;
                  const endY = Math.sin(endAngleRadians) * 100 + 200;

                  return (
                    <path
                      key={item.name}
                      d={`M${startX} ${startY} A 100 100 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${endX} ${endY}`}
                      fill="none"
                      stroke={color}
                      strokeWidth="20"
                      strokeLinecap="square"
                      strokeOpacity="1" // Set the border color and opacity here
                      style={{
                        animation: `fillAnimation${index} 2s forwards, rotateAnimation 2s linear infinite`,
                        animationDelay: `${index * 0.9}s`,
                      }}
                    />
                  );
                })}
                <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fontSize="29" fill={`${textColor}`}>
                  {score}%
                </text>
              </svg>
            </div>
            <div className="assessment-heading">
              <Heading
                padding={5}
                textAlign={'center'}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '4xl' }}
                lineHeight={'110%'}>
                Your{' '}
                <Text as={'span'} color={'teal.600'}>
                  Personality
                </Text>
                <br />
                Assessment Score :{' '}
                <Text as={'span'} color={isSuccess ? 'teal.600' : 'red.500'}>
                  {` ${score}%`}
                </Text>
              </Heading>
            </div>
            <Box style={{ display:'flex',justifyContent:'center'}}>
            <Button
              variant={'outline'}
              borderColor={'teal'}
              marginTop={2}
              size="md"
              onClick={onOpen}
              width="150px"
              // marginLeft={250}
            >
              <FcIdea />
              Suggestions
            </Button>
            </Box>
            <SuggestionsModal isOpen={isOpen} onClose={onClose} />
          </div>
        </div>
        </>
      )}
      <style>
        {scorechart.map((item, index) => (
          `@keyframes fillAnimation${index} {
            0% {
              stroke-dasharray: 0 1000;
            }
            100% {
              stroke-dasharray: ${(item.percentage / totalPercentage) * 720} 100;
            }
          }`
        ))}
      </style>
      <style>
  {`
    .typing-animation {
      position: relative;
    }
    
    .blinking-cursor {
      animation: blink-animation 0.7s step-end infinite;
    }
    
    @keyframes blink-animation {
      0%, 100% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }
    
    
    
  `}
</style>
    </>
  );
};

const TypingAnimation = ({ children }) => {
  const textToType = React.Children.toArray(children).join('');
  const [typedText, setTypedText] = useState('');
  // const [showCursor, setShowCursor] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setTypedText(textToType.substring(0, currentIndex + 1)+'|');
        setCurrentIndex(currentIndex + 1);
      }, 100); // Adjust the typing speed as needed

      return () => clearTimeout(timeout);
    } else {
      // setShowCursor(true);
    }
  }, [currentIndex, textToType]);

  return (
    <span className="typing-animation">
      {typedText}
      
    </span>
  );
};



const SuggestionsModal = ({ isOpen, onClose }) => {
  let backend_data = [];
  backend_data = localStorage.getItem(backend_data);
  const [eyeSuggestion,setEyeSuggestion] = useState("");
  const [claritySuggestion,setClaritySuggestion] = useState("");
  const [boldenessSuggestion,setBoldnessSuggestion] = useState("");
  const [confidenceSuggeston,setConfidenceSuggestion] = useState("");
  var eye = localStorage.getItem(eye);
  var conf = localStorage.getItem(conf);
  // let bold = localStorage.getItem(boldness);
  let bold = 20;  
  console.log(bold);
  // let bold = 20;
  var clarity = localStorage.getItem(clarity);
  var confidence_str;
  var clarity_str = '';
  var eyecontact_str = '';
  var boldness_str = '';
  switch(eye) {
    case eye > 90 : 
    setEyeSuggestion('Optimal eye contact is achieved when you confidently maintain eye contact throughout the interview, with occasional breaks to ensure the conversation remains comfortable. This level of engagement underscores your authenticity and the depth of your interpersonal skills. By actively listening, responding with conviction, and connecting with the interviewer, you create a lasting impression that can greatly influence the outcome of the interview.');
    break;
    case eye > 80 : 
    setEyeSuggestion("As you approach near-constant eye contact, you convey your dedication and genuine interest in the role. Show your enthusiasm by actively listening and responding with thoughtful insights. Use eye contact to underscore how your experiences align with the company's goals and to make a memorable impact on the interviewer.");
    break;
    case eye > 70 : 
    setEyeSuggestion("Maintaining strong eye contact indicates that you're a focused and capable communicator. During the interview, keep your gaze fixed on the interviewer while occasionally glancing away to avoid appearing overly intense. This balance highlights your interpersonal skills and reinforces your suitability for the role.");
    break;
    case eye > 60 : 
    setEyeSuggestion("Reaching this stage demonstrates a high level of confidence and involvement in the conversation. As you discuss specific examples of your work experience that align with the company's requirements, maintain consistent eye contact. This approach solidifies your credibility and showcases how you can contribute effectively to the team.");
    break;
    case eye > 50 : 
    setEyeSuggestion("Strive for a well-rounded approach to eye contact, alternating between the interviewer's eyes and their facial expressions. This approach lets you connect on a personal level while conveying professionalism. Use this level of engagement to emphasize your motivations for joining the company and your understanding of its values and goals.");
    break;
    case eye > 40 : 
    setEyeSuggestion("Balancing your eye contact during the conversation is crucial. Maintaining eye contact while discussing various topics shows that you are not only confident but also genuinely interested in the company and the opportunity. Remember, effective eye contact is a two-way interaction—it helps you gauge the interviewer's reactions and allows them to see your enthusiasm and passion.");
    break;
    case eye > 30 : 
    setEyeSuggestion("At this stage, consistent but moderate eye contact indicates that you are actively engaged in the interview. When discussing your accomplishments, skills, and how they align with the position, maintain eye contact with the interviewer. This level of connection demonstrates your genuine interest in the role and your potential contributions to the company.");
    break;
    case eye > 20 : 
    setEyeSuggestion("Advancing to this level signifies a growing comfort with eye contact. During key moments of the interview—such as explaining your relevant skills or sharing anecdotes from your work history—maintain eye contact to emphasize your points. This not only showcases your confidence but also helps the interviewer remember your responses more effectively.");
    break;
    case eye > 10 : 
    setEyeSuggestion("As you progress from minimal eye contact, start focusing on increasing the duration. During moments when you're discussing your qualifications and experiences, make a conscious effort to maintain eye contact. This communicates your attentiveness and willingness to actively participate in the interview. Remember, eye contact is not just about looking at someone; it's about showing that you're truly present and interested in the interaction.");
    break;
    case eye >= 0 : 
    setEyeSuggestion("Limited eye contact during an interview can unintentionally send negative signals. It might indicate a lack of interest, shyness, or nervousness, which could impact your chances of leaving a positive impression. To improve your initial eye contact, practice maintaining eye contact for a few seconds when introducing yourself or during greetings. By doing so, you demonstrate that you are engaged in the conversation and convey a level of confidence.");
    break;
  }
  switch(bold) {
    case bold > 90 :
      boldness_str = "";
      break;
      case bold > 80 :
      boldness_str = "";
      break;
      case bold > 70 :
      boldness_str = "";
      break;
      case bold > 60 :
      boldness_str = "";
      break;
      case bold > 50 :
      boldness_str = "";
      break;
      case bold > 40 :
      boldness_str = "";
      break;
      case bold > 30 :
      boldness_str = "";
      break;
      case bold > 20 :
      boldness_str = "";
      break;
      case bold > 10 :
      boldness_str = "";
      break;
      case bold > 0 :
      boldness_str = "";
      break;
  }
  // console.log(confidence_str);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Suggestions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size={'sm'} color={'blackAlpha.800'}>
            Eye Contact
          </Heading>
          {/* <TypingAnimation>When engaging in a conversation, make an effort to maintain steady eye contact with the person you are speaking to. This shows that you are actively engaged and interested in the conversation. Avoid looking around too much or letting your gaze wander.</TypingAnimation> */}
          {/* <TypingAnimation>{eyeSuggestion}</TypingAnimation>  */}
          {/* <Text>Eye</Text> */}
          {/* <Text>{eyeSuggestion}</Text> */}
          <h1>{eyeSuggestion}</h1>
          <br />
          <br/>
          <Heading size={'sm'} color={'blackAlpha.800'}>
            Clarity
          </Heading>
          <TypingAnimation> Incorporate well-timed pauses into your speech. Pauses give your audience time to process what you're saying and emphasize key points. They also provide you with a moment to gather your thoughts, enhancing overall clarity.</TypingAnimation>
          <Heading size={'sm'} color={'blackAlpha.800'}>
            Confidence
          </Heading>
          {/* <TypingAnimation>{confidence_str}</TypingAnimation> */}
          <TypingAnimation>When engaging in a conversation, make an effort to maintain steady eye contact with the person you are speaking to. This shows that you are actively engaged and interested in the conversation. Avoid looking around too much or letting your gaze wander.</TypingAnimation>
          <br />
          <br/>
          <Heading size={'sm'} color={'blackAlpha.800'}>
            Boldness
          </Heading>
          <TypingAnimation>When engaging in a conversation, make an effort to maintain steady eye contact with the person you are speaking to. This shows that you are actively engaged and interested in the conversation. Avoid looking around too much or letting your gaze wander.</TypingAnimation>
          <br />
          <br/>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default App;