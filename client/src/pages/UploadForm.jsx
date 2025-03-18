// client/src/pages/UploadForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createParkingFail } from '../services/parkingFailService';

const UploadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    submittedBy: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSuccess(false);

    try {
      // Simple validation
      if (!formData.title || !formData.description || !formData.location || !formData.imageUrl) {
        throw new Error('Please fill all required fields');
      }

      // Submit the form data to our API
      await createParkingFail(formData);
      
      // Clear the form on success
      setFormData({
        title: '',
        description: '',
        location: '',
        imageUrl: '',
        submittedBy: ''
      });
      
      // Show success message
      setIsSuccess(true);
      
      // Scroll to top to see success message
      window.scrollTo(0, 0);
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        {isSuccess ? (
          // Success state
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Successfully Uploaded!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your parking fail has been submitted. Thank you for contributing!
            </p>
            <div className="mt-6 space-y-2">
              <button
                onClick={() => navigate('/')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Home
              </button>
              <button
                onClick={resetForm}
                className="w-full flex justify-center py-2 px-4 border border-indigo-500 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload Another
              </button>
            </div>
          </div>
        ) : (
          // Form state
          <>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900">Upload a Parking Fail</h1>
              <p className="mt-2 text-sm text-gray-600">Share the parking disaster you witnessed!</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 'SUV Parked Across Two Spaces'"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Describe what happened..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 'Mall of America, Minneapolis, MN'"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Please upload your image to an image hosting service and paste the URL here.
                  </p>
                </div>

                <div>
                  <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-700">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="submittedBy"
                    name="submittedBy"
                    value={formData.submittedBy}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Your name or username"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Uploading..." : "Submit Parking Fail"}
                </button>
              </div>
            </form>

            <div className="flex justify-center mt-4">
              <button 
                onClick={() => navigate('/')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
