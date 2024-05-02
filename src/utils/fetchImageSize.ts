export const fetchImageSize = async (certificateTemplate: string) => {
  const img = new Image();
  img.src = certificateTemplate;
  try {
    await img.decode();
    return { width: img.width, height: img.height };
  } catch (error) {
    console.error("Failed to decode the image", error);
    // Return a default size or handle the error as needed
    return { width: 0, height: 0 };
  }
};
