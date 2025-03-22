import { Link } from 'react-router-dom';

const FailPost = ({ fail }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={fail.imageUrl} 
        alt={fail.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{fail.title}</h3>
        <p className="text-gray-600">{fail.description}</p>
        <p className="text-gray-500 mt-2">Posted by {fail.user}</p>
        
        <div className="mt-4 flex justify-end">
          <Link 
            to={`/update/${fail.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FailPost;