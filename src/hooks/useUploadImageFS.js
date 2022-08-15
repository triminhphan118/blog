import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";

function useUploadImageFS(setValue, getValues, nameImage) {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  if (!setValue && !getValues) return;

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + percent + "% done");

        setProgress(percent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            console.log("Nothing");
        }
      },
      (error) => {
        toast.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    setValue("image", file.name);
    handleUploadImage(file);
  };

  const handleDRemoveImage = (e) => {
    if (nameImage && nameImage.length > 0) {
      setImage("");
      return;
    }
    const storage = getStorage();
    const desertRef = ref(storage, `images/${getValues("image")}`);
    deleteObject(desertRef)
      .then(() => {
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  };

  return {
    setImage,
    setProgress,
    progress,
    image,
    handleSelectImage,
    handleDRemoveImage,
  };
}

export default useUploadImageFS;
