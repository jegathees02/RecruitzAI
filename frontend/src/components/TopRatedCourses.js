import React, { useEffect } from "react";
import {
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    Image,
    Button,
    Box,
    Divider,
    CardFooter,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
} from "@chakra-ui/react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

const TopRatedCourses = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Box
            w="100%"
            color="white"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <div data-aos="zoom-in-up" data-aos-duration="1500">
                <div className="course-card">
                    <Card w={320} >
                        <CardBody>
                            <Image
                                src="https://imgs.search.brave.com/F1eNcoDOWEUL3wK-X-swMjG7ei-88BnpCeKIr8z6Yes/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuamF2YXRwb2lu/dC5jb20vc3ByaW5n/Ym9vdC9pbWFnZXMv/c3ByaW5nLWJvb3Qt/dHV0b3JpYWwuanBn"
                                alt="springboot"
                                borderRadius="lg"
                                height={150}
                                width={470}
                            />
                            <Stack mt="6" spacing="3">
                                <Heading size="md">SpringBoot</Heading>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Impressions</StatLabel>
                                        <StatNumber>345,670</StatNumber>
                                        <StatHelpText>
                                            <StatArrow type='increase' />
                                            Free
                                        </StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Enrolled</StatLabel>
                                        <StatNumber>147,800</StatNumber>
                                        <StatHelpText>
                                            {/* <StatArrow type='increase' />
                                            11.05% */}
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link to={`/top-rated-courses/1`}>
                                <Button variant="solid" colorScheme="teal" >
                                    Have a Look
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div data-aos="zoom-in-up" data-aos-duration="1500">
                <div className="course-card">
                    <Card w={320}>
                        <CardBody>
                            <Image
                                src="https://imgs.search.brave.com/NM6wLqFI67ami13vM2Y4rABXihpEGRQJ9hdmvi3bcCg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMCphVGJiNWhI/THpnSHdRQlpu"
                                alt="react"
                                borderRadius="lg"
                            />
                            <Stack mt="6" spacing="3">
                                <Heading size="md">React</Heading>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Impressions</StatLabel>
                                        <StatNumber>300,570</StatNumber>
                                        <StatHelpText>
                                            <StatArrow type='increase' />
                                            Free
                                        </StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Enrolled</StatLabel>
                                        <StatNumber>197,122</StatNumber>
                                        <StatHelpText>
                                            {/* <StatArrow type='increase' />
                                            10.05% */}
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link to={`/top-rated-courses/2`}>
                                <Button variant="solid" colorScheme="teal">
                                    Have a Look
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div data-aos="zoom-in-up" data-aos-duration="1500">
                <div className="course-card">
                    <Card w={320}>
                        <CardBody>
                            <Image
                                src="https://imgs.search.brave.com/VAytmxI6gjjVt5nT_iqTOxz7vRoz2yQF7nIfwnI2BD8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMTkw/NjI2MTIzOTI3L3Vu/dGl0bHNzc3NzZWQu/cG5n"
                                alt="full stack"
                                borderRadius="lg"
                            />
                            <Stack mt="6" spacing="3">
                                <Heading size="md">FullStack Development</Heading>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Impressions</StatLabel>
                                        <StatNumber>405,123</StatNumber>
                                        <StatHelpText>
                                            <StatArrow type='increase' />
                                            Paid
                                        </StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Enrolled</StatLabel>
                                        <StatNumber>244,233</StatNumber>
                                        <StatHelpText>
                                            {/* <StatArrow type='increase' />
                                            50.05% */}
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link to={`/top-rated-courses/3`}>
                                <Button variant="solid" colorScheme="teal">
                                    Have a Look
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Box>
    );
};

export default TopRatedCourses;
