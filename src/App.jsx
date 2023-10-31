import { useRef } from "react";

const images = [
  {
    id: 1,
    url: "../src/assets/images/image-1.webp",
  },
  {
    id: 2,
    url: "../src/assets/images/image-2.webp",
  },
  {
    id: 3,
    url: "../src/assets/images/image-3.webp",
  },
  {
    id: 4,
    url: "../src/assets/images/image-4.webp",
  },
  {
    id: 5,
    url: "../src/assets/images/image-5.webp",
  },
  {
    id: 6,
    url: "../src/assets/images/image-6.webp",
  },
  {
    id: 7,
    url: "../src/assets/images/image-7.webp",
  },
  {
    id: 8,
    url: "../src/assets/images/image-8.webp",
  },
  {
    id: 9,
    url: "../src/assets/images/image-9.webp",
  },
  {
    id: 10,
    url: "../src/assets/images/image-10.jpeg",
  },
  {
    id: 11,
    url: "../src/assets/images/image-11.jpeg",
  },
];

function App() {
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

  return (
    <div className="bg-green-200">
      <div className="w-[85%] mx-auto bg-white">
        <div className="flex justify-between px-8 py-8">
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-semibold ">Gallery</h3>
            <div className="flex items-center gap-2">
              <input
                className="rounded-full h-6 w-6"
                type="checkbox"
                name=""
                id=""
              />
              <h3>Files Selected</h3>
            </div>
          </div>
          <button className="text-2xl text-red-500 font-semibold">
            Delete Files
          </button>
        </div>
        <hr />
        <div className="grid grid-cols-5 p-8 gap-4">
          {images?.map((image, index) => {
            return (
              <>
                <div
                  key={image.id}
                  className={`${
                    index === 0
                      ? "row-span-2 col-span-2 border-2 rounded-lg"
                      : "border-2 rounded-lg"
                  } relative cursor-pointer`}
                >
                  <img src={image.url} alt="" />{" "}
                  <div className="bg-slate-400 absolute h-full w-full top-0 left-0 right-0 bottom-0 opacity-0 transition-all hover:opacity-30"></div>
                  <input
                    className="absolute top-6 left-6 rounded-full h-5 w-5"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </div>
              </>
            );
          })}
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