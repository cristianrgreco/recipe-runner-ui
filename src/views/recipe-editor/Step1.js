import React from "react";
import { useHistory } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import baseStyles from "./RecipeEditor.module.css";
import styles from "./Step1.module.css";
import { Button } from "../../components/Button";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import Heading from "../../components/Heading";
import { Icon } from "../../components/Icon";

export const BUCKET_NAME = "https://recipe-runner-uploads.s3.eu-west-2.amazonaws.com";
export const PLACEHOLDER_IMAGE = `${BUCKET_NAME}/55994ba0-ef85-11ea-9b02-1f1d8760d3d2.png`;

export default function Step1({
  isEdit,
  name,
  setName,
  description,
  setDescription,
  serves,
  setServes,
  image,
  setImage,
  setImageType,
  crop,
  setCrop,
}) {
  const history = useHistory();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onServesChange = (e) => {
    setServes(Number(e.target.value));
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImage(URL.createObjectURL(image));
      setImageType(image.type);
    }
  };

  const clearImage = () => {
    setImage(PLACEHOLDER_IMAGE);
    setImageType("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    history.push("/recipe-editor/step-2");
  };

  const isFormValid = () => {
    return name !== "" && description !== "" && serves !== "" && image !== "";
  };

  const setNewCrop = (newCrop) => {
    if (newCrop.width > 0 && newCrop.height > 0) {
      setCrop(newCrop);
    }
  };

  const onImageLoaded = (image) => {
    const size = Math.min(image.width, image.height);
    const x = (image.width - size) / 2;
    const y = (image.height - size) / 2;
    setCrop({ aspect: 1, x, y, width: size, height: size, keepSelection: true });
    return false;
  };

  return (
    <div className={baseStyles.Container}>
      <form onSubmit={onSubmit}>
        <div className={baseStyles.Heading}>
          <Heading>{isEdit ? "Edit Recipe" : "Create Recipe"} (1/5)</Heading>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Input id="name" type="text" autoFocus={true} required value={name} onChange={onNameChange} />
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l6">
            <Input id="serves" type="number" required min="0" step="1" value={serves} onChange={onServesChange} />
            <label htmlFor="serves">Serves</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Textarea required id="description" value={description} onChange={onDescriptionChange} />
            <label htmlFor="description">Description</label>
          </div>
        </div>
        <div className="row">
          <div className="file-field input-field col s12 m12 l6">
            <Button secondary>
              <span>Image</span>
              <Input type="file" onChange={onImageChange} />
            </Button>
            {!image.startsWith(BUCKET_NAME) && (
              <span className={styles.DeleteImageButton}>
                <Button floating danger onClick={clearImage}>
                  <Icon name="delete" />
                </Button>
              </span>
            )}
          </div>
        </div>
        {image !== "" && (
          <div className="row">
            <div className="col s12 m12 l6">
              <ReactCrop src={image} crop={crop} onChange={setNewCrop} onImageLoaded={onImageLoaded} />
            </div>
          </div>
        )}
        <div className="row">
          <div className="input-field col s12">
            <Button disabled={!isFormValid()} type="submit">
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
