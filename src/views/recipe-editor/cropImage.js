const createImageObject = (imageUrl) =>
  new Promise((resolve) => {
    const imageObject = new Image();
    imageObject.onload = () => resolve(imageObject);
    imageObject.crossOrigin = "anonymous";
    imageObject.src = imageUrl;
  });

const createCroppedImageBlob = (imageObject, crop, cropScale) => {
  const canvas = document.createElement("canvas");

  const scaleX = cropScale.x;
  const scaleY = cropScale.y;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    imageObject,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob)));
};

export const getCroppedImageBlob = async (imageUrl, crop, cropScale) => {
  const imageObject = await createImageObject(imageUrl);
  return await createCroppedImageBlob(imageObject, crop, cropScale);
};
