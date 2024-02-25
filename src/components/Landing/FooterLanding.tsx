import React from 'react';
import {
	Footer,
	FooterBrand,
	FooterCopyright,
	FooterDivider,
	FooterIcon,
	FooterLink,
	FooterLinkGroup,
	FooterTitle,
} from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';

export default function FooterLanding() {
	return (
		<Footer
			container
			theme={{
				root: {
					base:
						'w-full bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-gray-800 md:flex md:items-center md:justify-between',
				},
			}}
		>
			<div className='w-full'>
				<div className='grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1'>
					<Link href='/' className='flex items-center space-x-3 rtl:space-x-reverse font-lexendDeca'>
						<Image
							src='/taytayan-logo.svg'
							className='h-6 sm:h-12'
							alt='Project taytayan Logo'
							width={200}
							height={200}
							style={{ width: 'auto', height: '50px', objectFit: 'fill' }}
						/>
						<span className='flex flex-col items-start justify-center'>
							<span className='text-sm font-light whitespace-nowrap dark:text-white'>PROJECT</span>
							<span className='text-lg font-regular whitespace-nowrap dark:text-white'>taytayan</span>
						</span>
					</Link>
					<div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
						<div>
							<FooterTitle title='about' />
							<FooterLinkGroup col>
								<FooterLink href='#benefits'>PROJECT taytayan</FooterLink>
								<FooterLink href='#services'>Services</FooterLink>
								<FooterLink href='#be-a-partner'>Partners</FooterLink>
							</FooterLinkGroup>
						</div>
						<div>
							<FooterTitle title='Follow us' />
							<FooterLinkGroup col>
								<FooterLink href='#'>Github</FooterLink>
								<FooterLink href='#'>Discord</FooterLink>
							</FooterLinkGroup>
						</div>
						<div>
							<FooterTitle title='Legal' />
							<FooterLinkGroup col>
								<FooterLink href='#'>Privacy Policy</FooterLink>
								<FooterLink href='#'>Terms &amp; Conditions</FooterLink>
							</FooterLinkGroup>
						</div>
					</div>
				</div>
				<FooterDivider />
				<div className='w-full sm:flex sm:items-center sm:justify-between'>
					<FooterCopyright href='#' by='PROJECT TAYTAYAN' year={2024} />
					<div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
						<FooterIcon href='#' icon={BsLinkedin} />
						<FooterIcon href='#' icon={BsFacebook} />
						<FooterIcon href='#' icon={BsInstagram} />
						<FooterIcon href='#' icon={BsTwitter} />
						<FooterIcon href='#' icon={BsGithub} />
					</div>
				</div>
			</div>
		</Footer>
	);
}
