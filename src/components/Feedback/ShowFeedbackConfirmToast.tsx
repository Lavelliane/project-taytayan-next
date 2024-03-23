'use client';
import React, { createContext, useContext, useState, useMemo } from 'react';

interface ShowFeedbackConfirmType {
	isConfirmToastVisible: boolean;
	showConfirmToast: () => void;
	hideConfirmToast: () => void;
}

const ShowFeedbackConfirmConfirmToast = createContext<ShowFeedbackConfirmType>({
	isConfirmToastVisible: false,
	showConfirmToast: () => {},
	hideConfirmToast: () => {},
});

export const useConfirmToast = () => useContext(ShowFeedbackConfirmConfirmToast);

export const useFeedbackConfirmModal = () => useContext;

export const GlobalFeedbackConfirmConfirmToastProvider = ({ children }: any) => {
	const [isConfirmToastVisible, setIsConfirmToastVisible] = useState(false);

	const showConfirmToast = () => {
		setIsConfirmToastVisible(true);
	};

	const hideConfirmToast = () => {
		setIsConfirmToastVisible(false);
	};

	const contextValue = useMemo(
		() => ({
			isConfirmToastVisible,
			showConfirmToast,
			hideConfirmToast,
		}),
		[isConfirmToastVisible]
	);

	return (
		<ShowFeedbackConfirmConfirmToast.Provider value={contextValue}>{children}</ShowFeedbackConfirmConfirmToast.Provider>
	);
};
