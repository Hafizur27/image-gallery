/* eslint-disable react/prop-types */

const SingleImage = ({
  image,
  index,
  handleDragStart,
  handleDrop,
  handleSelectedImg,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={(e) => e.preventDefault()}
      className={`${
        index === 0 ? "md:row-span-2 md:col-span-2 lg:row-span-2 lg:col-span-2" : "row-span-1 col-span-1"
      } relative cursor-pointer border-2 border-neutral-600 rounded-lg `}
    >
      <img
        className="h-full w-full rounded-lg"
        draggable="true"
        src={image.url}
        alt=""
      />{" "}
      <div
        className={
          image.select
            ? "bg-stone-300 absolute h-full w-full left-0 top-0 bottom-0 right-0  transition-all opacity-50"
            : "bg-slate-400 absolute h-full w-full top-0 left-0 right-0 bottom-0 opacity-0 transition-all hover:opacity-30"
        }
      >
        <input
          checked={image.select}
          onChange={() => handleSelectedImg(image.id)}
          className="absolute top-6 left-6 rounded-full h-5 w-5"
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default SingleImage;
