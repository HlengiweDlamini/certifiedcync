import { useState, useEffect } from 'react';
import axios from 'axios';
import CertItem from "../certitem/CertItem.css";

const CertPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('');

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/certifications', {
          params: {
            search: searchTerm,
            faculty: facultyFilter,
          },
        });
        setCertifications(response.data.certifications);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };

    fetchCertifications();
  }, [searchTerm, facultyFilter]);

  return (
    <div>
      <h1>Certifications</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name or organization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={facultyFilter}
          onChange={(e) => setFacultyFilter(e.target.value)}
        >
          <option value="">Filter by Faculty</option>
          <option value="Engineering">Engineering</option>
          <option value="Science">Science</option>
        </select>
      </div>
      <div className="certifications-list">
        {certifications.map((certification) => (
          <CertItem key={certification._id} certification={certification} />
        ))}
      </div>
    </div>
  );
};

export default CertPage;
