import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from '@mui/material';

const linksArr = ["diaries", "auth"];
const loggedinlinks = ["diaries", "addpost", "profile"];

const Header = () => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const [value, setvalue] = useState();

  return (
    <>
      <AppBar className='mb-3' sx={{ bgcolor: "white", position: 'sticky' }}>
        <Toolbar>
          <Typography variant='h6'><Link style={{ textDecoration: 'none', color: 'black' }} to={'/diaries'} className='ps-3'>Blog📲</Link></Typography>
          <Tabs value={value} onChange={(e, val) => setvalue(val)} sx={{ ml: "auto", textDecoration: "none" }}>
            {isLoggedIn ?
              loggedinlinks.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`${link === "home" ? "" : link}`}
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "undserline",
                      textUnderlineOffset: "7px"
                    }
                  }}
                  key={link}
                  label={link} />
              ))
              :
              linksArr.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`${link === "home" ? "" : link}`}
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                      textUnderlineOffset: "7px"
                    }
                  }}
                  key={link}
                  label={link} />
              ))
            }
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
