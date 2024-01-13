import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AddPost from './components/AddPost';
import Profile from './components/Profile'
import Pr from './components/Pr';
import Login from './components/Login';
import Updatepost from './components/Updatepost';
import { authActions } from './redux';
import Pagenotfound from './components/Pagenotfound';

function App() {
  
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
    
  return (
      <Router>
      <Header/>
        <Routes>
            <Route path='/' element={<Pr />} />
            <Route path='/diaries' element={<Pr />} />
            <Route path='/auth' element={<Login />} />
            <Route path='*' element={<Pagenotfound />} />
            {isLoggedIn && (
            <>
            <Route path='/addpost' element={<AddPost />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/posts/:id' element={<Updatepost/>} />{" "}
            </>
  )}
        </Routes>
      <Footer/>
      </Router>
  );
}

export default App;
