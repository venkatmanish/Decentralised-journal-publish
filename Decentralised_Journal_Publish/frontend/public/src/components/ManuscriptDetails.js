import React, { useEffect, useState } from "react";
import axios from "axios";

const ManuscriptDetails = ({ match }) => {
  const [manuscript, setManuscript] = useState(null);

  useEffect(() => {
    const fetchManuscript = async () => {
      try {
        const response = await axios.get(`/api/manuscripts/${match.params.id}`);
        setManuscript(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManuscript();
  }, [match.params.id]);

  if (!manuscript) {
    return <div>Loading manuscript details...</div>;
  }

  return (
    <div>
      <h2>Manuscript Details</h2>
      <h3>{manuscript.title}</h3>
      <p>Authors: {manuscript.authors}</p>
      {/* Display other manuscript details */}
    </div>
  );
};

export default ManuscriptDetails;
