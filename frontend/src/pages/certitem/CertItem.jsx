
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CertItem = ({ certification }) => {
  const [certificationDetails, setCertificationDetails] = useState(null);

  useEffect(() => {
    const fetchCertificationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/certification/${certification._id}`);
        setCertificationDetails(response.data.certification);
      } catch (error) {
        console.error('Error fetching certification details:', error);
      }
    };

    fetchCertificationDetails();
  }, [certification._id]);

  if (!certificationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="certification-item">
      <h3>{certificationDetails.name}</h3>
      <p>Organisation: {certificationDetails.organisation}</p>
      <p>Description: {certificationDetails.description}</p>
      <p>Link: {certificationDetails.link}</p>
      <p>Faculty: {certificationDetails.faculty}</p>
    </div>
  );
};

CertItem.propTypes = {
  certification: PropTypes.object.isRequired,
};

export default CertItem;
