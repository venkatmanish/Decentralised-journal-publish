import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorsChange = (e) => {
    setAuthors(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authors", authors);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/manuscripts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // Reset form fields
      setTitle("");
      setAuthors("");
      setFile(null);
      // Show success message or redirect to the manuscript details page
    } catch (error) {
      console.error(error);
      // Show error message
    }
  };

  return (
    <div>
      <h2>Upload Manuscript</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Authors:</label>
          <input type="text" value={authors} onChange={handleAuthorsChange} />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
