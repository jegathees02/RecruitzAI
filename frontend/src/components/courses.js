import React, { useEffect, useState } from "react";
import { Text, Spinner, Heading, Card } from "@chakra-ui/react";
// import CourseCarousel from "./CourseCarousel";
import CourseCompletionCard from "./CourseCompletionCard";
import CircularProgressTemplate from "./CircularProgressTemplate";
import TopRatedCourses from "./TopRatedCourses";
import NavBar from "./navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Courses.css";
import { useLocation } from "react-router-dom";
const Course = () => {
  const [showCard, setShowCard] = useState(false);
  const location = useLocation();
  const score = 74;
  useEffect(() => {
    AOS.init();
    const delay = setTimeout(() => {
      setShowCard(true);
    }, 1500);
    return () => clearTimeout(delay);
  }, []);

  const courses = [
    { title: "Course 1", description: "Description 1" },
    { title: "Course 2", description: "Description 2" },
  ];

  return (
    <>
      <NavBar />
      {showCard ? (
        <div className="dashboard-container">
          <div className=" bg-gray-100 mt-[8px]  rounded-lg border border-borders">
            <div className="dashboard-container-upper">
              <div
                className="left-half"
                data-aos="zoom-in-right"
                data-aos-duration="3000"
              >
                <Heading fontSize="30px" m="20px" className="italic text-teal-700">
                  My Learnings
                </Heading>
                <CourseCompletionCard />
              </div>
              
              <div
                className="right-half"
                data-aos="zoom-in-left"
                data-aos-duration="3000"
                style={{ 
                  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                 }}
                >
                <Card
                 direction={{ base: "column", sm: "row" }}
                 overflow="hidden"
                 variant="outline"
                 w="100%">
                <div className="ml-[8rem] mt-5">
                  <CircularProgressTemplate value="65" color="green.400" />
                  <Text m="20px" fontSize="20px" as="i" >
                    Course Progression
                  </Text>
                </div>
                <div className="mt-5">
                  <CircularProgressTemplate value={score} color="green.400" />
                  <Text m="20px" fontSize="20px" as="i">
                    Assesment Progression
                  </Text>
                </div>
              </Card>
              </div>
            </div>
          </div>
          <div>
            <div className=" bg-gray-100 m-5 h-full mt-[8px] rounded-lg border border-borders">
              <Heading fontSize="30px" m="20px" marginBottom={50} className="italic  text-teal-700  ">
                Recommended Courses
              </Heading>
              <TopRatedCourses />
            </div>
            <div>
              {/* <Heading fontSize="30px" m="20px" color="black">
                Top rated Courses
              </Heading> */}
              {/* <CourseCarousel courses={courses} /> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
          <p> &nbsp; Loading</p>
        </div>
      )}
    </>
  );
};

export default Course;
