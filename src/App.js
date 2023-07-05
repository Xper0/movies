import logo from "./logo.svg";
import "./App.css";
import Login from "Pages/Login";
import { Route, Routes } from "react-router-dom";
import ToastContainer from "Components/Notifications/ToastContainer";
import SideBar from "Pages/Dashboard/SideBar";
import Profile from "Pages/Dashboard/Profile";
import { AdminProtectedRouter, ProtectedRouter } from "ProtectedRouter";
import Password from "Pages/Dashboard/Password";
import FavoritesMovies from "Pages/Dashboard/FavoritesMovies";

function App() {
  return (
    <div className="App bg-black text-white">
      <ToastContainer />
      <Routes>
        {/* <Route path='/' element={<HomePage} />
        
      <Route path='/abous-us' element={<AboutUs} />
      <Route path='/contact-us' element={<HomePage} />
      <Route path='/movies' element={<HomePage} />
      <Route path='/movie:id' element={<HomePage} />
      <Route path='/watch:id' element={<HomePage} /> */}
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<FavoritesMovies />} />
        <Route element={<ProtectedRouter />} />
        <Route element={<AdminProtectedRouter />} />
        <Route path="/password" element={<Password />} />

        {/* <Route path='/register' element={<HomePage} />
        // private router
      <Route path='/profile' element={<HomePage} />
      <Route path='/password' element={<HomePage} />
      <Route path='/favorites' element={<HomePage} />
         // admin router
      <Route path='/movieslist' element={<HomePage} />
      <Route path='/dashboard' element={<HomePage} />
      <Route path='/categories' element={<HomePage} />
      <Route path='/users' element={<HomePage} />
      <Route path='/addmovie' element={<HomePage} />
      <Route path='/*' element={<HomePage} />
      */}
      </Routes>
    </div>
  );
}

export default App;
