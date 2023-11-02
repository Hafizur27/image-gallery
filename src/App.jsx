/* eslint-disable no-unused-vars */

import { useRef, useState } from "react";
import SingleImage from "./components/SingleImage/SingleImage";
import { imageGallery } from "./components/ImageGallery/ImageGallery";
import fileUpload from '../public/images/fileUpload.gif';


function App() {
  const images = imageGallery;
  const [allImages, setAllImages] = useState(images);
  const [allSelectedImages, setAllSelectedImages] = useState([]);

  // select image handler
  const handleSelectedImg = (id) => {
    const updateSelectedImg = allImages.map((image) => {
      return image.id === id ? { ...image, select: !image.select } : image;
    });
    setAllImages(updateSelectedImg);
    const remainingImage = updateSelectedImg.filter(
      (image) => image.select === true
    );
    setAllSelectedImages(remainingImage);
  };

  // reset all selected images handler
  const handleResetAllImage = () => {
    const updatedSelectedImg = allImages.map((image) => ({
      ...image,
      select: false,
    }));
    setAllImages(updatedSelectedImg);
    setAllSelectedImages([]);
  };

  // delete btn handler
  const handleDeleteBtn = () => {
    const remainingImage = allImages.filter((image) => image.select === false);
    setAllImages(remainingImage);
    setAllSelectedImages([]);
  };
// add image part
  const fileInputRef = useRef();

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files[0])
   
      const file = files[0];
      const id = allImages.length + 1;
    
      const img_path = URL.createObjectURL(file);
      const newImage = { id, url: img_path, select: false };
      setAllImages(() => [...allImages, newImage]);

    e.target.value = null;
  };
 

  // drag and drop handler part
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };
  const handleDrop = (e, newIndex) => {
    const startIndex = e.dataTransfer.getData("index");
    const updatedBoxes = [...allImages];
    const [draggedBox] = updatedBoxes.splice(startIndex, 1);
    updatedBoxes.splice(newIndex, 0, draggedBox);
    setAllImages(updatedBoxes);
  };

  return (
    <div className="bg-teal-100 py-4">
      <div className="w-[75%] mx-auto bg-white rounded-lg py-4">
        {/* header part starts here */}
        <header className="flex flex-col md:flex-col lg:flex-row lg:justify-between px-8 py-8">
          <div>
            {allSelectedImages.length > 0 ? (
              ""
            ) : (
              <h3 className="text-3xl font-semibold ">Gallery</h3>
            )}
            {/* all selected file  */}
            {allSelectedImages.length > 0 && (
              <div className="flex items-center gap-3">
                <input
                  defaultChecked
                  onChange={() => handleResetAllImage()}
                  className="rounded-full h-5 w-5"
                  type="checkbox"
                />
                {allSelectedImages.length === 1 ? (
                  <h3 className="font-semibold text-3xl ">
                    {allSelectedImages.length} File Selected
                  </h3>
                ) : (
                  <h3 className="font-semibold text-3xl ">
                    {allSelectedImages.length} Files Selected
                  </h3>
                )}
              </div>
            )}
          </div>
          {/* delete file */}
          {allSelectedImages.length > 0 && (
            <div>
              {allSelectedImages.length === 1 ? (
                <button
                  onClick={() => handleDeleteBtn()}
                  className="text-2xl text-red-500 font-semibold"
                >
                  Delete File
                </button>
              ) : (
                <button
                  onClick={() => handleDeleteBtn()}
                  className="text-2xl text-red-500 font-semibold"
                >
                  Delete Files
                </button>
              )}
            </div>
          )}
        </header>
        <hr className="h-px bg-gray-200 border-2 dark:bg-gray-700" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-6 gap-4 w-[85%] mx-auto">
          {allImages?.map((image, index) => (
            <SingleImage
              key={image.id}
              image={image}
              index={index}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleSelectedImg={handleSelectedImg}
            />
          ))}
          <div
            onClick={() => handleImageUploadClick()}
            className="flex flex-col gap-4 border-2 border-neutral-600 border-dashed rounded-lg items-center justify-center "
          >
            <img
              width="1200"
              height="1200"
              src={fileUpload}
              alt="gallery"
            />
            {/* <p>Add Image</p> */}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
