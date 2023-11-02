/* eslint-disable no-unused-vars */
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import SingleImage from "./components/SingleImage/SingleImage";

const images = [
  {
    id: 1,
    url: "../src/assets/images/image-1.webp",
    select: false,
  },
  {
    id: 2,
    url: "../src/assets/images/image-2.webp",
    select: false,
  },
  {
    id: 3,
    url: "../src/assets/images/image-3.webp",
    select: false,
  },
  {
    id: 4,
    url: "../src/assets/images/image-4.webp",
    select: false,
  },
  {
    id: 5,
    url: "../src/assets/images/image-5.webp",
    select: false,
  },
  {
    id: 6,
    url: "../src/assets/images/image-6.webp",
    select: false,
  },
  {
    id: 7,
    url: "../src/assets/images/image-7.webp",
    select: false,
  },
  {
    id: 8,
    url: "../src/assets/images/image-8.webp",
    select: false,
  },
  {
    id: 9,
    url: "../src/assets/images/image-9.webp",
    select: false,
  },
  {
    id: 10,
    url: "../src/assets/images/image-10.jpeg",
    select: false,
  },
  {
    id: 11,
    url: "../src/assets/images/image-11.jpeg",
    select: false,
  },
];

function App() {
  const [allImages, setAllImages] = useState(images);
  const [allSelectedImages, setAllSelectedImages] = useState([]);

// select image handler
  const handleSelectedImg = (id) => {
    
    const updateSelectedImg = allImages.map((img) => {
      return img.id === id ? { ...img, select: !img.select } : img;
    });

    setAllImages(updateSelectedImg);
    const remainingImage = updateSelectedImg.filter(
      (image) => image.select === true
    );
    setAllSelectedImages(remainingImage);
  };

  // reset all selected images handler
  const handleResetAllImage = ()=>{
    const updatedSelectedImg = allImages.map((img) => ({ ...img, select: false }));
    setAllImages(updatedSelectedImg);
    setAllSelectedImages([]);
  }

  // delete btn
  const handleDeleteBtn = () => {
    const remainingImage = allImages.filter(
      (image) => image.select === false
    );
    setAllImages(remainingImage);
    setAllSelectedImages([]);
  };

  const fileInputRef = useRef();

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
    }
  };

  // drag and drop
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
    <div className="bg-green-200">
      <div className="w-[90%] mx-auto bg-white">
        <div className="flex justify-between px-8 py-8">
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-semibold ">Gallery</h3>
            {/* all selected file */}
            {allSelectedImages.length > 0 && (
              <div className="flex items-center gap-2">
                <input
                  defaultChecked
                  onChange={()=>handleResetAllImage()}
                  className="rounded-full h-6 w-6"
                  type="checkbox"
                  name=""
                  id=""
                />
                {allSelectedImages.length === 1 ? (
                  <h3>{allSelectedImages.length} File Selected</h3>
                ) : (
                  <h3>{allSelectedImages.length} Files Selected</h3>
                )}
              </div>
            )}
          </div>
          {/* delete file */}
          {allSelectedImages.length > 0 && (
            <button
              onClick={() => handleDeleteBtn()}
              className="text-2xl text-red-500 font-semibold"
            >
              Delete Files
            </button>
          )}
        </div>
        <hr />
        <div className="grid grid-cols-5 p-8 gap-4 w-[85%] mx-auto">
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
            className="flex flex-col gap-4 border-2 border-dashed rounded-lg items-center justify-center "
          >
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/sf-regular-filled/48/gallery.png"
              alt="gallery"
            />
            <p>Add Images</p>
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
