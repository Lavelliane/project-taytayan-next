'use client';
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

interface ShowFeedbackType {
	isModalVisible: boolean;
	showModal: () => void;
	hideModal: () => void;
}

const ShowFeedbackModal = createContext<ShowFeedbackType>({
	isModalVisible: false,
	showModal: () => {},
	hideModal: () => {},
});

export const useModal = () => useContext(ShowFeedbackModal);

export const useFeedbackModal = () => useContext;

export const GlobalFeedbackModalProvider = ({ children }: any) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		const storedModalVisibility = localStorage.getItem('modalVisibility');
		if (storedModalVisibility) {
			setIsModalVisible(JSON.parse(storedModalVisibility));
		}
	}, []);

	const showModal = () => {
		setIsModalVisible(true);
		localStorage.setItem('modalVisibility', JSON.stringify(true));
	};

	const hideModal = () => {
		setIsModalVisible(false);
		localStorage.setItem('modalVisibility', JSON.stringify(false));
	};

	const contextValue = useMemo(
		() => ({
			isModalVisible,
			showModal,
			hideModal,
		}),
		[isModalVisible]
	);

	return <ShowFeedbackModal.Provider value={contextValue}>{children}</ShowFeedbackModal.Provider>;
};
