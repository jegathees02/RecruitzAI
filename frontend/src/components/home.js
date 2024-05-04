  import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
  } from "@chakra-ui/react";
  import Typewriter from "typewriter-effect";
  import NavBar from "./navbarhome";
  import { useNavigate } from "react-router-dom";
  import AOS from "aos";
  import "aos/dist/aos.css";
  import { useEffect } from "react";
  import picture from "../assets/undraw_online_test_re_kyfx.svg";
  export default function CallToActionWithAnnotation() {
    useEffect(() => {
      // console.log("AOS initializing...");
      AOS.init({
        duration: 2000,
      });
    }, []);
    const navigate = useNavigate();
    localStorage.setItem("auth", false);
    return (
      <>
        <NavBar />
        <section class="w-full xl:pb-[8.2rem] pt-16  bg-white">
          <div class="container px-4 md:px-6">
            <div class="grid gap-6 ">
              <div class="flex flex-col space-y-8 ">
                <div className="flex">
                  {/* Gif Section */}
                  <div className="absolute right-[22px] w-auto h-auto text-white">
                    <img src={picture} alt="GIF" className="w-full h-auto" />
                  </div>

                  <div className="space-y-2 xl:pt-[8rem]">
                    <h1 className="text-3xl ml-[5rem] font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-400">
                      <Typewriter
                        onInit={(typewriter) => {
                          typewriter
                            .typeString("Unlock Your Full Potential")
                            .pauseFor(2000)

                            .start();
                        }}
                      />{" "}
                      <div className="ml-[12rem]">
                        <Typewriter
                          onInit={(typewriter) => {
                            typewriter
                              .typeString("With Recruitz")
                              .pauseFor(2000)

                              .start();
                          }}
                        />
                      </div>
                    </h1>
                    <br></br>
                    <p className="text-black w-[49.25rem] md:text-xl dark:text-black-900 ">
                      Recruitz is your key to mastering interviews and honing the
                      soft skills that set you apart. Sign up now and take the
                      first step towards a more confident, skilled, and successful
                      you.
                    </p>
                  </div>
                </div>
                <div className="bg-teal-500 w-[10.5rem] rounded-xl hover:bg-teal-600 ml-[20.25rem] h-[4rem] flex items-center justify-center">
                  <a
                    className="italic text-white"
                    href="/signup"
                  >
                    Get started
                  </a>
                          
                </div>
                {/* Features Section */}
                <div>
                  <div class="w-full  max-w-full xl:pt-72 space-y-4 mx-auto text-center">
                    <div class="text-center">
                      <h1 class="text-5xl font-bold text-gray-600 mb-4 subpixel-antialiased tracking-tighter ">
                        We came up with
                      </h1>
                    </div>
                    <br></br>
                    <div class="grid grid-cols-3 gap-8" data-aos="fade-up">
                      <div className="bg-opacity-50  bg-gray-50 rounded-lg shadow-lg p-5  backdrop-filter hover:shadow-2xl">
                        <div class="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                          <div class="p-2 bg-gray bg-opacity-50 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="text-black h-6 w-6 mb-2 opacity-75"
                            >
                              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                            </svg>
                          </div>
                          <h2 class="text-xl font-bold  text-teal-500">
                            AI-Powered
                          </h2>
                          <p class="text-black-200 dark:text-black-100">
                            Our advanced AI algorithms analyze industry trends and
                            tailor interview simulations to your specific job
                            role.
                          </p>
                        </div>
                      </div>
                      <div className="bg-opacity-50  bg-gray-50 rounded-lg shadow-lg p-5  backdrop-filter hover:shadow-2xl">
                        <div class="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                          <div class="p-2 bg-gray bg-opacity-50 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="text-black h-6 w-6 mb-2 opacity-75"
                            >
                              <path d="m8 6 4-4 4 4"></path>
                              <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"></path>
                              <path d="m20 22-5-5"></path>
                            </svg>
                          </div>
                          <h2 class="text-xl font-bold  text-teal-500">
                            Personalized Feedback
                          </h2>
                          <p class="text-black-200 dark:text-black-100">
                            Receive instant feedback on your responses,
                            highlighting areas for improvement and providing
                            actionable insights.
                          </p>
                        </div>
                      </div>
                      <div className="bg-opacity-50   bg-gray-50 rounded-lg shadow-lg p-5  backdrop-filter hover:shadow-2xl">
                        <div class="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                          <div class="p-2 bg-gray bg-opacity-50 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="text-black h-6 w-6 mb-2 opacity-75"
                            >
                              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </div>
                          <h2 class="text-xl font-bold  text-teal-500">
                            Comprehensive Soft Skills Courses
                          </h2>
                          <p class="text-black-200 dark:text-black-100">
                            Access a comprehensive library of soft skills courses
                            designed by industry experts, covering essential
                            topics
                          </p>
                        </div>
                      </div>
                      <div className="bg-opacity-50  bg-gray-50 rounded-lg shadow-lg p-5  backdrop-filter hover:shadow-2xl">
                        <div class="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                          <div class="p-2 bg-gray bg-opacity-50 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="text-black h-6 w-6 mb-2 opacity-75"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <path d="m21 21-4.3-4.3"></path>
                            </svg>
                          </div>
                          <h2 class="text-xl font-bold text-teal-500">
                            Adaptive Learning Pathways
                          </h2>
                          <p class="text-black-200 dark:text-black-100">
                            Recruitz adapts to your learning style and progress,
                            ensuring a personalized and efficient learning
                            experience.
                          </p>
                        </div>
                      </div>
                      <div className="bg-opacity-50  bg-gray-50 rounded-lg shadow-lg p-5  backdrop-filter hover:shadow-2xl">
                        <div class="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                          <div class="p-2 bg-gray bg-opacity-50 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="text-black h-6 w-6 mb-2 opacity-75"
                            >
                              <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          </div>
                          <h2 class="text-xl font-bold text-teal-500">
                            Reliable Security
                          </h2>
                          <p class="text-black-200 dark:text-black-100">
                            With Reliable Security, your data is always safe and
                            protected.
                          </p>
                        </div>
                      </div>
                      <div className="bg-opacity-50 bg-gray-50 rounded-lg shadow-lg p-5  backdrop-filter hover:shadow-2xl">
                        <div class="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                          <div class="p-2 bg-gray bg-opacity-50 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="text-black h-6 w-6 mb-2 opacity-75"
                            >
                              <path d="m8 6 4-4 4 4"></path>
                              <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"></path>
                              <path d="m20 22-5-5"></path>
                            </svg>
                          </div>
                          <h2 class="text-xl font-bold text-teal-500">
                            Community Support
                          </h2>
                          <p class="text-black-200 dark:text-black-100">
                            Connect with a vibrant community of learners and
                            professionals. Share insights, participate in forums,
                            and learn from the experiences of others.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
