import React from "react";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    onClickRemove = () => {},
    ...rest
  } = props;
  return (
    <label
      htmlFor={props.id || name}
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border-2 border-dashed w-full h-[250px] rounded-lg ${className} relative overflow-hidden group`}
      onClick={(e) => {
        if (image) e.preventDefault();
      }}
    >
      <input
        disabled={!!image}
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        id={name}
        {...rest}
      />
      {progress !== 0 && !image && (
        <div className="w-10 h-10 border-8 border-blue-500 rounded-full border-t-transparent border-b-transparent absolute transition-all animate-spin"></div>
      )}
      {!image && progress === 0 && (
        <>
          <div className="flex flex-col items-center text-center pointer-events-none">
            <img
              src="/img-upload.png"
              alt="upload-img"
              className="max-w-[80px] mb-5"
            />
            <p className="font-semibold">Choose photo</p>
          </div>
        </>
      )}
      {image && (
        <>
          <img src={image} className="w-full h-full object-cover" alt="" />
          <div
            className="absolute p-4 bg-gray-300 rounded-full text-red-500 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100  transition-all"
            onClick={onClickRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </>
      )}
      {!image && (
        <div
          className="absolute w-10 h-1 bg-blue-500 bottom-0 left-0 transition-all image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
