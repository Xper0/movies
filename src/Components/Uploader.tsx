import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";
import { uploadImageService } from "Redux/APIs/ImageUploadService";

const Uploader = ({ setImageUrl }: any) => {
  const [loading, setLoading] = useState(false);
  //upload file
  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = new FormData();

    file.append("file", acceptedFiles[0]);
    const data = await uploadImageService(file, setLoading);
    setImageUrl(data);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });
  return (
    <div className="w-full text-center flex-col gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-b-gray-100 border-dashed bg-main rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 py-8 border-2 border-b-gray-100 border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-col text-red-500 text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Drag your image</p>
          <em className="text-xs text-gray-100">
            {isDragActive
              ? "Drop it like it's hot!"
              : isDragReject
              ? "Unsupported file type..."
              : "only .jpg and .png files will be accepted"}
          </em>
        </div>
      )}
    </div>
  );
};

export default Uploader;
