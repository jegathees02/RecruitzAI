import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/navbar";
import ApexChart from "../Charts/linechart";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Player } from "@lordicon/react";
import AOS from "aos";
import { Spinner } from "@chakra-ui/react";
import "aos/dist/aos.css";
import coin from "../assets/wired-lineal-298-coins.gif";
import rank from "../assets/wired-flat-153-bar-chart.gif";
import gift from "../assets/wired-flat-412-gift.gif";
import profile from "../assets/wired-outline-261-emoji-smile.gif"
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [name,setName] = useState('');
  const [lname,setlName] = useState('');
  const [coins,setCoins] = useState(0);
  const [level,setLevel] = useState(0);
  const[scoreData,setscoreData]=useState([]);
  const [series, setSeries] = useState([]);
  const [seriesA, setSeriesA] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsA, setOptionsA] = useState([]);
  const eyecontactArray = [];
  const boldnessArray = [];
  const clarityArray = [];
  const confidenceArray = [];
  const timestampArray = [];
  const overallArray = [];
  // State to store selected date

  const [selectedDate, setSelectedDate] = useState(""); // State to store selected date

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filterDataByDate = () => {
    return selectedDate ? scoreData.filter((item) => item.timestamp.includes(selectedDate)) : scoreData;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage.setItem('userEmail', 'newuser@gmail.com');
        const userEmail = localStorage.getItem('userEmail');
        const response = await fetch(`http://localhost:5000/get/dashboard/${userEmail}`);
        const data = await response.json();
        // console.log(data);
        setName(data.firstName);
        setCoins(data.coins);
        setLevel(data.level);
        setlName(data.lastName);
        // Update the dashboardData state with the fetched data
        setDashboardData([data]);
        setscoreData(data.score);
        console.log("Score",scoreData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Score", scoreData);

    if (scoreData.length > 0) {

      scoreData.forEach(item => {
        eyecontactArray.push(item.eye_contact);
        boldnessArray.push(item.boldness);
        clarityArray.push(item.clarity);
        confidenceArray.push(item.confidence);
        timestampArray.push(item.timestamp);
        overallArray.push(item.overall);
      });

      setSeriesA([
        {
          name: "Performance",
          data: overallArray,
        },
      ])

      setSeries([
        {
          name: "Eye Contact",
          data: eyecontactArray,
        },
        {
          name: "Confidence",
          data: confidenceArray,
        },
        {
          name: "Boldness",
          data: boldnessArray,
        },
        {
          name: "Clarity",
          data: clarityArray,
        },
      ]);
    }
  }, [scoreData]);

  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    // Format the date as "YYYY-MM-DD" for the input element
    const formattedTomorrow = tomorrow.toISOString().split("T")[0];

    // Set tomorrow's date as the maximum date for the date picker
    setMaxDate(formattedTomorrow);
  }, []);
 
  
  

  // useEffect(() => {
  //   console.log("confidence graph", confidencegraph);
  // }, [confidencegraph]);
  console.log(dashboardData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false); 
      AOS.init({
        duration: 1500,
      });
    }, 1000); 
  }, []);
  const generateData = (count, range) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: i + 1,
        y: Math.floor(Math.random() * (range.max - range.min + 1)) + range.min,
      });
    }
    return data;
  };

  useEffect(() => {
    setOptions({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        
        colors: ["#008ffb", "#00e396","#feb019","#ff4560"],  
        
      },
      title: {
        text: "Analysis",
        align: "center",
        style: {
          color: "#0f766e", // Set the title color here
        },  
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: timestampArray,
      },
    });
    
  },[]);


    useEffect(() => {
    setOptionsA({
      chart: {
        height: 350,
        // width:350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#14b8a6"], 
      },
      title: {
        text: "Overall Percentage",
        align: "center",
        style: {
          color: "#0f766e", // Set the title color here
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.9,
        },
      },
      xaxis: {
        categories: timestampArray
      },
    })
  }, []);

  const [chartData, setChartData] = useState({
    series: [
      { name: "Sun", data: generateData(52, { min: 0, max: 90 }) },
      { name: "Mon", data: generateData(52, { min: 0, max: 90 }) },
      { name: "Tue", data: generateData(52, { min: 0, max: 90 }) },
      { name: "Wed", data: generateData(52, { min: 0, max: 90 }) },
      { name: "Thu", data: generateData(52, { min: 0, max: 90 }) },
      { name: "Fri", data: generateData(52, { min: 0, max: 90 }) },
      { name: "Sat", data: generateData(52, { min: 0, max: 90 }) },
    ],
    options: {
      chart: {
        height: 350,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#52BE80"],
      title: {
        text: "HeatMap Chart (Single color)",
        align: "center",
        style: {
          color: "#0f766e", // Set the title color here
        },
      },
    },
  });

  return (
    <div>
      {loading ? (
        // Show loader while data is being fetched or processed
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
        <NavBar />
        
        <div className="w-[calc(100%-72px)] h-[260px] sm:h-[160px] bg-gray-200 mx-auto mt-[8px] rounded-lg border border-borders">
          <div id="main" className="flex flex-col sm:flex-row h-fit">
            <div id="porfile-pic">
              <div className="w-[80px] h-[80px] mt-[40px] border border-borders sm:ml-[50px] mx-auto rounded-lg  items-center justify-center flex">
              <img src={profile} alt="logo" className="w-15" />
              </div>
            </div>
            <div className="flex flex-col w-[280px] text-center sm:text-left mx-auto sm:ml-0">
              <div
                id="username"
                className="text-[28px] font-bold mt-[20px] sm:mt-[40px] text-teal-500 sm:ml-[30px] ml-0"
              >
                {name+" "+lname}
              </div>
              <div
                id="username"
                className="text-[18px] mt-[6px] text-text_2 sm:ml-[30px] ml-0 text-black"
              >
                Rank: 9090
              </div>
            </div>
            <div className="md:flex hidden flex-row absolute right-[90px] mt-[1.6rem]">
            <div className="w-[80px] h-[80px] mt-[40px] border border-borders ml-[20px]     rounded-lg relative flex items-center justify-center">
                <img src={coin} alt="logo" className="w-12" />
                <i className="bi bi-x-lg font-bold text-borders absolute left-1/2 -translate-x-1/2 top-[-0.5rem] -translate-y-1/2">
                  {coins}
                </i>
              </div>
              <div className="w-[80px] h-[80px] mt-[40px] border border-borders ml-[20px]     rounded-lg relative flex items-center justify-center">
                <img src={rank} alt="logo" className="w-12" />
                <i className="bi bi-x-lg font-bold text-borders absolute left-1/2 -translate-x-1/2 top-[-0.5rem] -translate-y-1/2">
                  {level}
                </i>
              </div>
              <div className="w-[80px] h-[80px] mt-[40px] border border-borders ml-[20px]     rounded-lg relative flex items-center justify-center">
                <img src={gift} alt="logo" className="w-12" />
                <i className="bi bi-x-lg font-bold text-borders absolute left-1/2 -translate-x-1/2 top-[-0.5rem] -translate-y-1/2">
                  Try Now!  
                </i>
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row sm:flex-col flex-col w-[calc(100%-72px)] mx-auto gap-4 justify-between">
          <div className="lg:w-[358px] sm:w-full h-[506px] bg-gray-200 mt-[8px] rounded-lg border border-borders">
            <div className="text-[22px] font-bold mt-[40px] text-teal-500 ml-[50px]">
              Community Stats
            </div>
            <div className="mt-[18px] text-[14px] ml-[50px]  text-white">
              <span className="text-text_2 font-bold  text-black">Views:</span>{" "}
              <span className="text-text_2 font-bold text-teal-700">679</span>
            </div>
            <div className="mt-[18px] text-[14px] ml-[50px]  text-white">
              <span className="text-text_2 font-bold text-black">
                Solutions:
              </span>{" "}
              <span className="text-text_2 font-bold text-teal-700">709</span>
            </div>
            <div className="mt-[18px] text-[14px] ml-[50px] mb-[40px]  text-white">
              <span className="text-text_2 font-bold text-black">
                Reputation:
              </span>{" "}
              <span className="text-text_2 font-bold text-teal-700">798</span>
            </div>
          </div>
          <div className="lg:w-full sm:w-full sm: h-[506px] h-[506px] bg-gray-200 mt-[8px] rounded-lg border border-borders relative">
            <div className="flex sm:flex-row flex-col ml-[30px]">
              <div className="flex flex-col relative mr-[50px] mt-[40px] w-[200px] sm:w-[280px] ml-[50px] sm:ml-0">
                <div id="chart">
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={450}
                    width={450}
                  />
                </div>
              </div>
              <div className="flex flex-col relative mr-[20px] mt-[40px] w-[200px] sm:w-[280px]  sm:ml-0">
                <div className="text-black mt-1 ml-[17.5rem]">
                  <div id="chart">
                    <ReactApexChart
                      options={optionsA}
                      series={seriesA}
                      type="area"
                      height={450}
                      width={450}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Heat Map */}
        <div className="w-[calc(100%-72px)] h-full sm:h-full bg-gray-200 mx-auto mt-[8px] rounded-lg border border-borders" data-aos="fade-left">
          <div id="chart">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="heatmap"
              height={350}
            />
          </div>
        </div>
        {/* Table */}
        <div className="w-[calc(100%-72px)] h-full sm:h-full bg-gray-200 mx-auto mt-[8px] rounded-lg border border-borders hover:shadow-xl" data-aos="fade-right">
        <div className="flex flex-col items-center">
          <label htmlFor="datePicker" className="text-lg font-bold mb-2 text-teal-500">Select Date:</label>
          <input
            type="date"
            id="datePicker"
            value={selectedDate}
            onChange={handleDateChange}
            max={maxDate} 
            className="border border-gray-400 px-3 py-1 rounded-md mb-4"
            />
        </div>
            {filterDataByDate().length === 0 ? (
               <div className="w-[calc(100%-72px)] h-full sm:h-full bg-gray-200 mx-auto mt-[8px] rounded-lg border border-borders hover:shadow-xl" >
              <div className="text-center text-red-600 text-2xl mt-4 font-extrabold">No data available for the selected date.</div>
              </div>
            ) : (
        <table className="w-full caption-bottom text-sm border-collapse">
  <thead className="border-b text-teal-500 font-bold">
    <tr className="border-b border-gray-400 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <th className="h-12 px-4 text-middle align-middle font-bold text-xl text-muted-foreground max-w-[150px]">
        S.NO
      </th>
      <th className="h-12 px-4 text-middle align-middle font-bold text-xl text-muted-foreground hidden md:table-cell">
        Timestamp
      </th>
      <th className="h-12 px-4 text-middle align-middle font-bold text-xl text-muted-foreground hidden md:table-cell">
        Eye Contact
      </th>
      <th className="h-12 px-4 text-middle align-middle font-bold text-xl text-muted-foreground">
        Confidence
      </th>
      <th className="h-12 px-4 text-middle align-middle font-bold text-xl text-muted-foreground">
        Clarity
      </th>
      <th className="h-12 px-4 align-middle text-center font-bold text-xl text-muted-foreground">
        Boldness
      </th>
      <th className="h-12 px-4 align-middle text-center font-bold text-xl text-muted-foreground">
        Overall Score
      </th>
    </tr>
  </thead>
  <tbody className="[&amp;_tr:last-child]:border-0">
            {filterDataByDate().map((item, index) => (
              <tr key={index} className="border-b border-gray-400 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                {/* ... (existing code) */}
                <td className="p-4 align-middle text-center font-medium">
          {index + 1}
        </td>
        <td className="p-4 align-middle text-center hidden md:table-cell">
          {item.timestamp}
        </td>
        <td className="p-4 align-middle text-center">
          {item.eye_contact}
        </td>
        <td className="p-4 align-middle text-center">
          {item.confidence}
        </td>
        <td className="p-4 align-middle text-center">
          {item.clarity}
        </td>
        <td className="p-4 align-middle text-center">
          {item.boldness}
        </td>
        <td className="p-4 align-middle text-center">
          {item.overall}
        </td>
              </tr>
            ))}
          </tbody>
 
</table>

)}  
        </div>
      </>
      )}
    </div>
  );
};

export default Dashboard;