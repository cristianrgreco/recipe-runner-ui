const IMAGE_SIZE = 1024;
const IMAGE_QUALITY = 1;
const THUMBNAIL_SIZE = IMAGE_SIZE / 2;
const THUMBNAIL_QUALITY = 0.85;

const createImageObject = (imageUrl) =>
  new Promise((resolve) => {
    const imageObject = new Image();
    imageObject.onload = () => resolve(imageObject);
    imageObject.crossOrigin = "anonymous";
    imageObject.src = imageUrl;
  });

const createCroppedImageBlob = (imageObject, crop, cropScale, quality, size) => {
  const canvas = document.createElement("canvas");

  const scaleX = cropScale.x;
  const scaleY = cropScale.y;

  canvas.width = size.width;
  canvas.height = size.height;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    imageObject,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    size.width,
    size.height
  );

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality));
};

export const getCroppedImageBlob = async (imageUrl, crop, cropScale) => {
  const imageObject = await createImageObject(imageUrl);
  return await createCroppedImageBlob(imageObject, crop, cropScale, IMAGE_QUALITY, {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  });
};

export const getCroppedImageThumbnailBlob = async (imageUrl, crop, cropScale) => {
  const imageObject = await createImageObject(imageUrl);
  return await createCroppedImageBlob(imageObject, crop, cropScale, THUMBNAIL_QUALITY, {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
  });
};
