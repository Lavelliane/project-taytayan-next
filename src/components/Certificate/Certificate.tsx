'use client';

import { fetchImageSize } from '@/utils/fetchImageSize';
import { Document, Image, Page, StyleSheet, Text, View, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HiEmojiSad } from 'react-icons/hi';

const Certificate = ({ uid, eventId }: { uid: string; eventId: string }) => {
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const [certificateTemplate, setCertificateTemplate] = useState('');
	const [userName, setUserName] = useState('');
	const [eventName, setEventName] = useState('');
	const [eventDate, setEventDate] = useState();
	const [validEventAndCert, setValidEventAndCert] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const getImageSize = async (currentCertificateTemplate: string) => {
		const size = await fetchImageSize(currentCertificateTemplate);
		setImageSize(size || { width: 0, height: 0 });
	};

	useEffect(() => {
		setIsLoading(true);
		const checkIfUserAttended = async () => {
			const docRef = doc(db, 'trainings', eventId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const currentData = docSnap.data();
				const validUserandEvent = currentData.trainingRegistrants.some(
					(registrant: any) => registrant.registrantId === uid && registrant.attended === true
				);
				if (validUserandEvent) {
					const userRef = doc(db, 'users', uid);
					const userSnap = await getDoc(userRef);
					const currentUserData = userSnap.data();
					const date =
						currentData.trainingDate.toDate().toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						}) || '';
					setUserName(currentUserData?.firstName);
					setEventName(currentData.trainingName);
					setEventDate(date);
					setCertificateTemplate(currentData.certificateTemplate);
					getImageSize(currentData.certificateTemplate);
					setValidEventAndCert(true);
				} else {
					setValidEventAndCert(false);
				}
			} else {
				setValidEventAndCert(false);
			}
		};
		if (uid) {
			checkIfUserAttended().then(() => setIsLoading(false));
		}
	}, [uid, eventId]);

	const { width, height } = imageSize;
	const scaleFactor = Math.min(width, height) / 1500; // Adjust this factor as needed

	const styles = StyleSheet.create({
		page: {
			flexDirection: 'row',
			backgroundColor: '#ffffff',
		},
		wrapper: {
			flex: 1,
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		image: {
			width: '100%',
			height: '100%',
		},
		textContainer: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		text: {
			textAlign: 'center',
			fontSize: 48 * scaleFactor,
			fontWeight: 'bold',
			color: 'black',
		},
	});

	if (isLoading) {
		return (
			<div className='flex items-center justify-center w-full h-full'>
				<div role='status'>
					<svg
						aria-hidden='true'
						className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-500'
						viewBox='0 0 100 101'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
							fill='currentColor'
						/>
						<path
							d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
							fill='currentFill'
						/>
					</svg>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		);
	}

	if (!validEventAndCert && !isLoading) {
		return (
			<>
				<div className='h-screen'>
					<div className='h-full w-full flex flex-col items-center justify-center gap-3'>
						<div className='flex justify-center items-center border-black border-2 p-10 gap-4 text-lg rounded-xl shadow-lg'>
							<HiEmojiSad size={75} />
							<div className='flex flex-col'>
								<span className='text-2xl font-bold'>{`You seem lost.`}</span>
								<span>{`Invalid event or certificate does not exist :(`}</span>
								<span>{`Please contact the administrators if you think this is a mistake.`}</span>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			{certificateTemplate && userName && imageSize.width && imageSize.height && !isLoading && (
				<div className='h-screen px-28'>
					<div className='h-full w-full flex flex-col items-center justify-center gap-4 py-10'>
						<span className='font-semibold lg:text-lg text-base'>
							✨ Congratulations, {userName} for participating in {eventName} last {eventDate}! ✨
						</span>
						<PDFViewer
							width={'80%'}
							height={'90%'}>
							<Document>
								<Page
									size={[width, height]}
									style={styles.page}>
									<View style={styles.wrapper}>
										<Image
											src={certificateTemplate}
											style={styles.image}
										/>
										<View style={styles.textContainer}>
											<Text style={styles.text}>{userName}</Text>
										</View>
									</View>
								</Page>
							</Document>
						</PDFViewer>
					</div>
				</div>
			)}
		</>
	);
};

export default Certificate;
