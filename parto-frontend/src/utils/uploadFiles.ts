import axios from "axios";

const uploadFiles = async (formData) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    },
  };

  const response = await axios.post("/api/upload-files", formData, config);

  return response;
};

export { uploadFiles };
