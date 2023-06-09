import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentSucces from './components/Payments/PaymentSucces';
import PaymentFailed from './components/Payments/PaymentFailed';
import CourseDetailPage from './components/CoursePage/CourseDetailPage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import DashBoard from './components/Admin/DashBoard/DashBoard';
import Users from './components/Admin/Users/Users';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // })
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseDetailPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/request' element={<Request />} />
        <Route path='/about' element={<About />} />
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/paymentsuccess' element={<PaymentSucces />} />
        <Route path='/paymentfailed' element={<PaymentFailed />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        {/*Admin Routes */}
        <Route path='/admin/dashboard' element={<DashBoard />} />
        <Route path='/admin/courses' element={<AdminCourses />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/createcourse' element={<CreateCourse />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
