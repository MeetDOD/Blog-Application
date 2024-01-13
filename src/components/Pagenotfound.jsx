import React from 'react';
import './page.css';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
	return (
		<div>
			<div id="notfound">
				<div class="notfound">
					<div class="notfound-404">
						<h1>4<span>0</span>4</h1>
					</div>
					<h2>the page you requested could not found</h2>
					<Box textAlign='center'>
						<Button variant="contained" ><Link style={{ textDecoration: 'none', color: 'white' }} to={'/diaries'}>Back to Home</Link></Button>
					</Box>
				</div>
			</div>
		</div>
	)
}

export default Pagenotfound

