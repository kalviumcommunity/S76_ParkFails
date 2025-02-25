import { Camera, MessageSquare, Users } from 'lucide-react';
import PF1 from '../assets/PF1.jpg';
import PF2 from '../assets/PF2.jpg';
import PF3 from '../assets/PF3.jpg';
import PF4 from '../assets/PF4.jpg';
import PF5 from '../assets/PF5.jpg';

const failImages = [
  { id: 1, image: PF1, user: 'JohnD' },
  { id: 2, image: PF2, user: 'ParkingPro' },
  { id: 3, image: PF3, user: 'SpotFinder' },
  { id: 4, image: PF4, user: 'CarLover' }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full h-full overflow-hidden font-sans">
      
      <section className="bg-yellow-400 min-h-[600px] flex items-center w-full">
        <div className="container mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 ml-[40px]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Laugh at the Worst Parking Fails!
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              Join ParkFails, where users share and react to hilarious parking disasters!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors ml-[100px] mt-[50px]" >
              View Fails →
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center h-[300px]">
            <img 
              src={PF5} 
              alt="Parking Fail Example" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>  
      </section>


      <section className="py-16 w-full bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-200 p-8 rounded-xl text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Upload Funny Parking Pics</h3>
              <p className="text-gray-600">Share the most ridiculous parking situations you encounter!</p>
            </div>
            <div className="bg-gray-200 p-8 rounded-xl text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">React & Comment</h3>
              <p className="text-gray-600">Engage with the community through reactions and comments.</p>
            </div>
            <div className="bg-gray-200 p-8 rounded-xl text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Join a Fun Community</h3>
              <p className="text-gray-600">Connect with others who appreciate parking humor!</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 w-full bg-gray-400">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Recent Fails from Our Community</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {failImages.map((fail) => (
              <div key={fail.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={fail.image}
                  alt={`Parking fail ${fail.id}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-600">Posted by {fail.user}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Join the Fun!
            </button>
          </div>
        </div>
      </section>


      <footer className="bg-gray-900 text-white py-8 w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 ParkFails. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
