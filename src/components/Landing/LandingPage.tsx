'use client';

import React from 'react';
import Hero from './Hero';
import NavbarLanding from './NavbarLanding';
import Benefits from './Benefits';
import Services from './Services';
import Partners from './Partners';
import { Next13ProgressBar } from 'next13-progressbar';

const LandingPage = () => {
	return (
		<div>
			<NavbarLanding />
			<Hero />
			<Benefits />
			<Services />
			<Partners />
			<Next13ProgressBar height='2px' color='#FFC72C' options={{ showSpinner: false }} showOnShallow />
		</div>
	);
};

export default LandingPage;
