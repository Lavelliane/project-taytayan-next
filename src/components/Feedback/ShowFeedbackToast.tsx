'use client';
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

interface ShowFeedbackType {
	isToastVisible: boolean;
	showToast: () => void;
	hideToast: () => void;
}

const ShowFeedbackToast = createContext<ShowFeedbackType>({
	isToastVisible: false,
	showToast: () => {},
	hideToast: () => {},
});

export const useToast = () => useContext(ShowFeedbackToast);

export const useFeedbackModal = () => useContext;

export const GlobalFeedbackToastProvider = ({ children }: any) => {
	const [isToastVisible, setIsToastVisible] = useState(false);

	useEffect(() => {
		const storedToastVisibility = localStorage.getItem('toastVisibility');
		if (storedToastVisibility) {
			setIsToastVisible(JSON.parse(storedToastVisibility));
		}
	}, []);

	const showToast = () => {
		setIsToastVisible(true);
		localStorage.setItem('toastVisibility', JSON.stringify(true));
	};

	const hideToast = () => {
		setIsToastVisible(false);
		localStorage.setItem('toastVisibility', JSON.stringify(false));
	};

	const contextValue = useMemo(
		() => ({
			isToastVisible,
			showToast,
			hideToast,
		}),
		[isToastVisible]
	);

	return <ShowFeedbackToast.Provider value={contextValue}>{children}</ShowFeedbackToast.Provider>;
};
