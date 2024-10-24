// FormList.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the form data when the component mounts
    const fetchForms = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://bitcode-backend-task.vercel.app/api/forms');
          
          // Log the entire response to see the structure
          console.log('API response:', response);
      
          const formData = response.data.data || []; // Fallback to an empty array if data is undefined
          setForms(formData);
        } catch (err) {
          setError('Failed to fetch forms.');
          console.error('Error fetching forms:', err);
        } finally {
          setLoading(false);
        }
      };
      

    fetchForms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='text-center'>
      <h2 className='text-center text-3xl font-bold mb-10'>Form List</h2>
      {forms.length === 0 ? (
        <p>No forms available.</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form.id}>
              <strong>Name:</strong> {form.name} <br />
              <strong>Status:</strong> {form.active === 0 ? 'Active' : 'Inactive'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormList;
