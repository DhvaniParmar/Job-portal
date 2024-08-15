import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import Dashboard from "./pages/Dashboard";
import LocomotiveScroll from "locomotive-scroll";
import Search from "./pages/Search";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import CompanyDetails from "./pages/CompanyDetails";
import HomeComponent from "./components/dashboard/HomeComponent";
import Me from "./components/dashboard/Me";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "./redux/progress/progressSlice";

const App = () => {
  const progress = useSelector((state) => state.progress.value);
  const dispatch = useDispatch();

  const locomotiveScroll = new LocomotiveScroll()
  return (
    <BrowserRouter>
    <LoadingBar color='gray' progress={progress} onLoaderFinished={()=> dispatch(setProgress(0))}/>
      <Routes>
      
        {/* Dashboard */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard" element={<HomeComponent />} />
          <Route path='me' element={<Me />} />
          <Route path="profile" element={<Profile />} />
          <Route path='search' element={<Search />} />
        </Route>

        {/* Job Routes */}
        <Route path='/jobs/:id' element={<JobDetails />} />
        <Route path='/companies/:company' element={<CompanyDetails />} />

        {/* Not Found */}
        <Route path="*" element={<div>Not Found</div>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
