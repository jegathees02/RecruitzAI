import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Button,
  Text,
  Heading,
  Image,
  Progress,
} from "@chakra-ui/react";
import "../styles/CourseCompletionCard.css";

const CourseCompletionCard = () => {
  return (
    <div className="course-completion-card">
      <div className="course-completion-div">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          w="100%"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "90%", sm: "200px" }}
            src="https://wallpaperaccess.com/full/9425008.jpg"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody className="course-card-completion">
              <div className="progress-div">
                <Heading size="md">Fundamentals of C++</Heading>
                <Progress
                  value={45}  
                  size="xs"
                  colorScheme="teal"
                  width="100%"
                />
                <Text py="2">
                  45% <br /> 6hr 30min
                </Text>
              </div>
            </CardBody>
          </Stack>
        </Card>
      </div>
      <div className="course-completion-div">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          w="100%"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "90%", sm: "200px" }}
            src="https://wallpaperaccess.com/full/1398331.jpg"
            alt="Caffe Latte"
          />
          <Stack>
            <CardBody>
              <div className="progress-div">
                <Heading size="md">Introduction to AI</Heading>
                <Progress
                  value={35}
                  size="xs"
                  colorScheme="teal"
                  width="100%"
                />
                <Text py="2">
                  35% <br /> 4hr 30min{" "}
                </Text>
              </div>
            </CardBody>
          </Stack>
        </Card>
      </div>
      
    </div>
    
  );
};

export default CourseCompletionCard;
