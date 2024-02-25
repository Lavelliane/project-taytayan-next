import FeedbackFormModal from '@/components/Feedback/FeedbackFormModal';
import React from 'react';

const page = () => {
	return (
		<div className='h-screen '>
			<div>
				<FeedbackFormModal addFeedbackOpen={true} />
			</div>
		</div>
	);
};

export default page;
