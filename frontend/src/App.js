import './App.css';
import CameraApp from './components/detecting';
import Result from './components/resultHistogram'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/home'
import Login from'./components/login'
import Signup from'./components/signup'
import Feedback from './components/feedback';
import Edit from './components/edit'
import Feedbackuser from './components/feedbackuser';
import Userdetails from './components/userdetails';
import Dashboard from './components/dashboard';
import Course from './components/courses';
import RecentTrends from './components/recentTrends';
import TopRatedCourseView from './components/TopRatedCourseView';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/result'element={<Result/>}/>
        <Route path='/camera'element={<CameraApp/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<Signup/>}/>
        <Route path='/feedback'element={<Feedback/>}/>
        <Route path='/edit' element={<Edit/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/courses' element={<Course/>} />
        <Route path="/top-rated-courses/:id" element={<TopRatedCourseView />} />
        <Route path='/feedbackuser' element={<Feedbackuser/>} />
        <Route path='/recent' element={<RecentTrends/>} />
        <Route path='/userdetails' element={<Userdetails/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
