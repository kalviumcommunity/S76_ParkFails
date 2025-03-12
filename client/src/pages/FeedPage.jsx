import React from 'react';
import Post from '../components/Post';

const FeedPage = () => {
  // Dummy data array for multiple posts
  const dummyPosts = [
    {
      id: 1,
      username: 'parkingvigilante',
      userAvatar: '/assets/react.svg',
      timestamp: '2025-03-12T08:30:00Z',
      caption: 'Found this beauty taking up TWO spots at the mall today! 🤦‍♂️ #ParkingFail #LearnToPark',
      imageUrl: '/assets/PF1.jpg',
      likes: 42,
      comments: [
        {
          id: 101,
          username: 'carlovers',
          userAvatar: '/assets/react.svg',
          text: 'Classic! Some people just don\'t care about others.',
          timestamp: '2025-03-12T09:15:00Z'
        },
        {
          id: 102,
          username: 'parkingqueen',
          userAvatar: '/assets/react.svg',
          text: 'I saw something similar yesterday. Left them a nice note! 😂',
          timestamp: '2025-03-12T10:22:00Z'
        }
      ],
      currentUserAvatar: '/assets/react.svg'
    },
    {
      id: 2,
      username: 'badparkingcop',
      userAvatar: '/assets/react.svg',
      timestamp: '2025-03-11T15:45:00Z',
      caption: 'This person thought the sidewalk was a valid parking spot 🤔 #SidewalkParking #ParkFails',
      imageUrl: '/assets/PF2.jpg',
      likes: 87,
      comments: [
        {
          id: 201,
          username: 'walkingfan',
          userAvatar: '/assets/react.svg',
          text: 'As a pedestrian, this infuriates me!',
          timestamp: '2025-03-11T16:02:00Z'
        }
      ],
      currentUserAvatar: '/assets/react.svg'
    },
    {
      id: 3,
      username: 'parking_disaster',
      userAvatar: '/assets/react.svg',
      timestamp: '2025-03-10T12:20:00Z',
      caption: 'Someone needs to go back to driving school... 😅 #DiagonalParking #HowNotToPark',
      imageUrl: '/assets/PF3.jpg',
      likes: 135,
      comments: [
        {
          id: 301,
          username: 'drivingteacher',
          userAvatar: '/assets/react.svg',
          text: 'I would fail this student immediately!',
          timestamp: '2025-03-10T13:15:00Z'
        },
        {
          id: 302,
          username: 'geometryexpert',
          userAvatar: '/assets/react.svg',
          text: "That's an interesting angle they chose there...",
          timestamp: '2025-03-10T14:30:00Z'
        }
      ],
      currentUserAvatar: '/assets/react.svg'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">ParkFails Feed</h1>
      <div className="space-y-6">
        {dummyPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
