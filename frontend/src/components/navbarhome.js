  import React, { useState } from "react";
  import logo from "../assets/depression.png";
  import { Link } from "react-router-dom";

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
  } from "@chakra-ui/react";
  import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
  import { useNavigate } from "react-router-dom";
  interface Props {
    children: React.ReactNode;
  }
  // const Links = ['Home', 'About', 'Feedback',];
  const Links = [
    { label: "", path: "/" },
    { label: "", path: "/" },
    { label: "", path: "/" },
  ];
  const Links1 = ["HOME", "COURSES", "Feedback", "SignUp", "Login"];
  const NavLink = (props: Props) => {
    const { children } = props;
    return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={"#"}
      >
        {children}
      </Box>
    );
  };

  export default function NavbarHome() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const [isNavOpen, setNavOpen] = useState(false); // State for responsive navigation
    const toggleNav = () => {
      setNavOpen(!isNavOpen);
      navigate("/login");
    };
    const toggleNav1 = () => {
      setNavOpen(!isNavOpen);
      navigate("/signup");
    };
    return (
      <>
        <Box bg={useColorModeValue("white", "gray.900")} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box display={"flex"}>
                <img src={logo} alt="logo" width={50} />
                <Text mt={2} fontFamily={"fantasy"} fontSize={"2xl"}>
                  &nbsp;Recruitz
                </Text>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <Button
                    key={link.label}
                    variant={"link"}
                    padding={5}
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </Button>
                ))}
              </HStack>
            </HStack>
            <HStack alignItems={"center"} spacing={10}>
              <div className="mr-6 bg-teal-400 w-28 h-10 flex justify-center items-center rounded-xl hover:bg-teal-600"><a className="text-white font-bold" href="/login">Login</a></div>
              
              
            </HStack>
          </Flex>

          {isOpen || isNavOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links1.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    );
  }
