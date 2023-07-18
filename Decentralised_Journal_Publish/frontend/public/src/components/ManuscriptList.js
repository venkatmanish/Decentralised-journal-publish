import React, { useEffect, useState } from "react";
import axios from "axios";

const ManuscriptList = () => {
  const [manuscripts, setManuscripts] = useState([]);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const response = await axios.get("/api/manuscripts");
        setManuscripts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManuscripts();
  }, []);

  return (
    <div>
      <h2>Manuscript List</h2>
      {manuscripts.map((manuscript) => (
        <div key={manuscript._id}>
          <h3>{manuscript.title}</h3>
          <p>Authors: {manuscript.authors}</p>
          {/* Display other manuscript details */}
        </div>
      ))}
    </div>
  );
};

export default ManuscriptList;
