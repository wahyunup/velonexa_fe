import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import Search from "./pages/_search/Search";
import Message from "./pages/_message/Message";
import Explore from "./pages/_explore/Explore";
import Reels from "./pages/_reels/Reels";
import Notification from "./pages/_notification/Notification";
import CurentUserDetail from "./pages/_userDetail/CurentUserDetail";
import Profile from "./pages/_settings/Profile/Profile";

import Fallback from "./pages/fallback/Fallback";
import UserDetail from "./pages/_userDetail/UserDetail";


function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curentuserdetail" element={<CurentUserDetail />} />
          <Route path="/userdetail/:id" element={<UserDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/message" element={<Message />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/notification" element={<Notification />} />

          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/setting">
            <Route path="profile" element={<Profile/>}/>
            {/* <Route path="account" element={<Account/>}/>
            <Route path="block" element={<Block/>}/>
            <Route path="appearance" element={<Appearance/>}/>
            <Route path="language" element={<Language/>}/>
            <Route path="support" element={<Support/>}/> */}
          </Route>

          <Route path="*" element={<Fallback/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
