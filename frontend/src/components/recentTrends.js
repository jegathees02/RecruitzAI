import React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
export default function RecentTrends() {
  const [loading, setLoading] = useState(true);

  // Simulate a delay for loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
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
        <>
          <h1 className="m-9 text-center font-bold text-3xl text-gradient-to-r from-blue-500 to-teal-700">
            Recent Trends
          </h1>
          <div class="mt-[4.5rem]   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center p-6 hover:shadow-2xl"
              data-v0-t="card"
            >
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
                class="h-12 w-12 mb-4 text-gray-900 dark:text-teal-600"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
              </svg>
              <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Cloud Computing
              </h3>
              <br></br>
              <p class="text-sm text-muted-foreground text-center">
                A model for delivering information technology services where
                resources are retrieved from the internet through web-based
                tools.
              </p>
              <a
                href="https://cloud.google.com/gcp/?utm_source=bing&utm_medium=cpc&utm_campaign=japac-IN-all-en-dr-skws-all-all-trial-b-dr-1009882&utm_content=text-ad-none-none-DEV_c-CRE_-ADGP_Hybrid+%7C+SKWS+-+PHR+%7C+Txt+~+Compute+~+Compute+Engine_cloud+computing-general-KWID_43700071934414751-kwd-75248096663907:loc-90&userloc_155461-network_o&utm_term=KW_cloud+computing&gclid=60d3f08e1866150eca5a9538166034db&gclsrc=3p.ds&&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-black hover:underline hover:text-teal-600"
              >
                Learn More
              </a>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center p-6 hover:shadow-2xl"
              data-v0-t="card"
            >
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
                class="h-12 w-12 mb-4 text-gray-900 dark:text-teal-600"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Machine Learning
              </h3>
              <br></br>
              <p class="text-sm text-muted-foreground text-center">
                An application of artificial intelligence (AI) that provides
                systems the ability to automatically learn and improve from
                experience.
              </p>
              <a
                href="https://www.tensorflow.org/resources/learn-ml/basics-of-machine-learning"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-black hover:underline hover:text-teal-600"
              >
                Learn More
              </a>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center p-6 hover:shadow-2xl"
              data-v0-t="card"
            >
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
                class="h-12 w-12 mb-4 text-gray-900 dark:text-teal-600"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                <path d="M3 12A9 3 0 0 0 21 12"></path>
              </svg>
              <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Big Data
              </h3>
              <br></br>
              <p class="text-sm text-muted-foreground text-center">
                Extremely large data sets that may be analysed computationally
                to reveal patterns, trends, and associations.
              </p>
              <a
                href="https://www.guru99.com/what-is-big-data.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-black hover:underline hover:text-teal-600"
              >
                Learn More
              </a>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center p-6 hover:shadow-2xl"
              data-v0-t="card"
            >
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
                class="h-12 w-12 mb-4 text-gray-900  dark:text-teal-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Internet of Things
              </h3>
              <br></br>
              <p class="text-sm text-muted-foreground text-center">
                A system of interrelated computing devices, mechanical and
                digital machines provided with unique identifiers and the
                ability to transfer data over a network.
              </p>
              <a
                href="https://learn.rumie.org/jR/bytes/learn-about-the-internet-of-things-io-t-in-3-minutes/?utm_source=bing&utm_medium=cpc&utm_campaign=RumieLearn-Bytes%20(non-NA)&utm_term=what%20iot&utm_content=TS%20-%20What%20Uses%20Iot "
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-black hover:underline hover:text-teal-600"
              >
                Learn More
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
