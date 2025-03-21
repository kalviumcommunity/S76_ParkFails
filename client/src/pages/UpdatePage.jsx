import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateForm from '../components/UpdateForm';

const UpdatePage = () => {
  const { id } = useParams();
  const [parkingFail, setParkingFail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchParkingFail = async () => {
      try {
        const response = await axios.get(`/api/parkingfails/${id}`);
        setParkingFail(response.data);
      } catch (err) {
        setError('Failed to fetch parking fail details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchParkingFail();
  }, [id]);
  
  const handleUpdate = async (formData) => {
    // Create a FormData object to handle file uploads
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.image && formData.image instanceof File) {
      data.append('image', formData.image);
    }
    
    try {
      await axios.put(`/api/parkingfails/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Update failed');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }
  
  if (!parkingFail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Parking fail not found</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <UpdateForm
          id={id}
          initialData={{
            title: parkingFail.title,
            description: parkingFail.description,
            // Don't set the image here as we can't pre-populate file inputs
          }}
          onSubmit={handleUpdate}
          entityName="Parking Fail"
        />
      </div>
    </div>
  );
};

export default UpdatePage;