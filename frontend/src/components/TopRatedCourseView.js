// import React, { useEffect } from 'react'
import { Heading, Text, Image, Divider, Badge, Card, CardHeader, Stack, CardBody, StackDivider, Box, Link } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import NavBar from '../components/navbar';
import '../styles/TopRatedCourseView.css';
import React, { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
const TopRatedCourseView = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const delay = 500; // 5 seconds

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, delay);

        // Clear the timeout to avoid memory leaks
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        
        return () => clearTimeout(timeoutId);
    }, []);

    const { id } = useParams();
    var link = "";
    var course_name = "";
    var description = "";
    var course_link = "";
    var head = "";

    if (id == 1) {
        link = "https://imgs.search.brave.com/F1eNcoDOWEUL3wK-X-swMjG7ei-88BnpCeKIr8z6Yes/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuamF2YXRwb2lu/dC5jb20vc3ByaW5n/Ym9vdC9pbWFnZXMv/c3ByaW5nLWJvb3Qt/dHV0b3JpYWwuanBn";
        course_name = "SpringBoot";
        description = "Spring Boot is an open source Java-based framework used to create a micro Service. It is developed by Pivotal Team and is used to build stand-alone and production ready spring applications. This chapter will give you an introduction to Spring Boot and familiarizes you with its basic concepts.    ";
        course_link = "https://www.coursera.org/learn/spring-mvc-rest-controller";
        head = "Spring Boot"
    }
    else if (id == 2) {
        link = "https://imgs.search.brave.com/NM6wLqFI67ami13vM2Y4rABXihpEGRQJ9hdmvi3bcCg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMCphVGJiNWhI/THpnSHdRQlpu";
        course_name = "React";
        description = "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.";
        course_link = "https://www.coursera.org/learn/react-basics";
        head = "React Basics"
    } else if (id == 3) {
        link = "https://imgs.search.brave.com/VAytmxI6gjjVt5nT_iqTOxz7vRoz2yQF7nIfwnI2BD8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMTkw/NjI2MTIzOTI3L3Vu/dGl0bHNzc3NzZWQu/cG5n";
        course_name = "FullStack Development";
        description = "Full stack web developers have the ability to design complete web applications and websites. They work on the frontend, backend, database and debugging of web applications or websites.";
        course_link = "https://www.coursera.org/learn/the-full-stack";
        head = "The Full Stack"
    }

    return (
        <>
            <NavBar />
            {isLoading ? (
                // Display a loader while waiting
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
            ) : (
            <div className='top-rated-course-container'>
                <div className='top-rated-course-root'>
                    <div className='top-rated-course-left'>
                        <div style={{ marginBottom: "20px" }}>
                            <Heading fontSize={50}>
                                {course_name}
                            </Heading>
                            <Badge variant='solid' colorScheme='yellow'>
                                Top Rated
                            </Badge>
                        </div>
                        <Divider height={1} bg="blue.500" width="50%" />
                        <div>
                            <p className='course-description'>{description}</p>
                        </div>
                    </div>
                    <div className='top-rated-course-right'>
                        <div className='top-rated-course-image-div'>
                            <Image src={link} width="100%" alt={course_name}></Image>
                        </div>
                    </div>
                </div>
                <div className='course-video'>
                    <div className='course-video-inner'>
                        <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                            frameborder='0'
                            allow='autoplay; encrypted-media'
                            allowfullscreen
                            title='video'
                            width='100%'
                            height='600'
                        />
                    </div>
                </div>
                <div>
                    <Heading fontSize={50}>
                        E - Books
                    </Heading>
                    <Divider height={1} bg="blue.500" width="18%" style={{marginBottom:"20px"}}/>
                    <Box display="flex" justifyContent="space-evenly">
                        <Card width={500}>
                            <CardHeader>
                                <Heading size='md'>Ebooks Links</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            <Link color='teal.500' href='https://z-lib.is/book/data-analytics'>
                                                Zlib
                                            </Link>
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            The world's largest ebook library.
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            <Link color='teal.500' href='https://z-lib.is/book/data-analytics'>
                                                ManyBooks
                                            </Link>
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            ManyBooks is a free ebook download website that mostly features works of classic literature.
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            <Link color='teal.500' href='https://z-lib.is/book/data-analytics'>
                                                Open Library
                                            </Link>
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            See a detailed analysis of all your business clients.
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                        <Card width={500}>
                            <CardHeader>
                                <Heading size='md'>Course Link</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            <Link color='teal.500' href={course_link}>
                                                Coursera
                                            </Link>
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {head}
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                </div>
            </div >
        )}
        </>
    )
}

export default TopRatedCourseView