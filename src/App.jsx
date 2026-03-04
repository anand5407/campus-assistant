import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import { CampusMap } from './components/CampusMap';

const campusLocations = [
  {
    id: 'block-a',
    name: 'Block A',
    description: 'Block A provides higher education courses such as: Bachelor of Technology (B.Tech), Master of Business Administration (MBA), Master of Computer Applications (MCA). It houses departments like Computer Science and Engineering (CSE), Electronics and Communication Engineering (ECE), Electrical and Electronics Engineering (EEE), Mechanical Engineering, Civil Engineering, and Master of Business Administration.',
    departments: ['Computer Science and Engineering (CSE)', 'Electronics and Communication Engineering (ECE)', 'Electrical and Electronics Engineering (EEE)', 'Mechanical Engineering', 'Civil Engineering', 'Master of Business Administration (MBA)'],
    timings: '8:00 AM to 4:00 PM',
    type: 'academic'
  },
  {
    id: 'block-b',
    name: 'Block B',
    description: 'Block B offers Diploma courses in the following branches: Civil Engineering, Mechanical Engineering, Electrical Engineering, Electronics and Telecommunication Engineering, and Computer Science. It houses departments for Civil, Mechanical, Electrical, Electronics and Telecommunication, and Computer Science.',
    departments: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electronics and Telecommunication Engineering', 'Computer Science'],
    timings: '8:00 AM to 4:00 PM',
    type: 'academic'
  },
  {
    id: 'block-c',
    name: 'Block C',
    description: 'Block C provides the following courses: Bachelor of Computer Applications (BCA), B.Sc Nursing, JNM, and +3 Programs. It houses departments for BCA, Nursing, and +3 programs.',
    departments: ['Bachelor of Computer Applications (BCA)', 'B.Sc Nursing', 'JNM', '+3 Programs'],
    timings: '8:00 AM to 4:00 PM',
    type: 'academic'
  },
  {
    id: 'boys-hostel',
    name: "Boys' Hostel",
    description: "The boys' hostel is a residential facility within the campus that provides accommodation for male students coming from different cities or states. It offers basic amenities such as furnished rooms, beds, study tables, electricity, water supply, and internet facilities. There is a common mess that provides daily meals, along with recreational areas for indoor games and group activities. The hostel ensures a safe and disciplined environment with rules and supervision by wardens.",
    timings: '6:00 AM to 10:00 PM',
    type: 'residential'
  },
  {
    id: 'girls-hostel',
    name: "Girls' Hostel",
    description: "The girls' hostel is a residential facility within the campus that provides safe and comfortable accommodation for female students from different places. It is designed to offer a secure environment with proper supervision by wardens and strict safety rules. The hostel provides basic facilities such as furnished rooms, beds, study tables, clean washrooms, electricity, water supply, and a common mess that serves nutritious meals. Recreational spaces for indoor activities and group interaction are also available. Security measures like CCTV surveillance and restricted entry timings are maintained to ensure students' safety.",
    timings: '6:00 AM to 10:00 PM',
    type: 'residential'
  },
  {
    id: 'ground',
    name: 'College Ground',
    description: 'The college ground is an open area within the campus used for sports, physical activities, and various events. It provides space for games like cricket, football, volleyball, and athletics. Students use the ground for regular practice, tournaments, physical education classes, and annual sports meets.',
    timings: '8:00 AM to 4:00 PM',
    type: 'sports'
  },
  {
    id: 'canteen',
    name: 'Canteen',
    description: 'Campus cafeteria serving fresh meals and snacks throughout the day.',
    timings: '7:00 AM - 9:00 PM',
    type: 'facility'
  },
  {
    id: 'main-gate',
    name: 'Main Gate',
    description: 'Primary entrance to the campus with security checkpoint.',
    timings: '24/7 Access',
    type: 'entrance'
  },
  {
    id: 'gate-2',
    name: 'Gate 2',
    description: 'Secondary entrance to the campus with security checkpoint and vehicle access.',
    timings: '24/7 Access',
    type: 'entrance'
  },
  {
    id: 'gate-3',
    name: 'Gate 3',
    description: 'Tertiary entrance for auxiliary access with security verification.',
    timings: '24/7 Access',
    type: 'entrance'
  },
  {
    id: 'bus-parking',
    name: 'Bus Parking',
    description: 'Designated parking area for campus buses and transportation vehicles.',
    timings: '6:00 AM - 8:00 PM',
    type: 'facility'
  },
  {
    id: 'student-parking',
    name: 'Student Parking',
    description: 'Designated parking area for students with short-term and long-term bays.',
    timings: '6:00 AM - 10:00 PM',
    type: 'facility'
  },
  {
    id: 'security-room',
    name: 'Security Room',
    description: 'Campus security headquarters and monitoring center for campus safety and emergency response.',
    timings: '24/7 Access',
    type: 'facility'
  },
  {
    id: 'center',
    name: 'Center',
    description: 'Central point of the campus - common meeting area.',
    type: 'landmark'
  },
  {
    id: 'kalam',
    name: 'Kalam Higher Secondary School',
    description: 'Kalam Higher Secondary School provides higher secondary education in the Science stream. It houses departments for Mathematics, Physics, Chemistry, Biology, and Information Technology (IT).',
    departments: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Information Technology (IT)'],
    timings: '8:00 AM to 4:00 PM',
    type: 'academic'
  }
];

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sortedLocations = [...campusLocations].sort((a, b) => a.name.localeCompare(b.name));

  const handleLocationSelect = (locationId) => {
    const location = campusLocations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      // Auto-open sidebar when location is selected
      setSidebarCollapsed(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const found = campusLocations.find(loc => 
        loc.name.toLowerCase().includes(query.toLowerCase())
      );
      if (found) {
        setSelectedLocation(found);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Search Bar */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          locations={sortedLocations}
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Campus Map Area */}
        <CampusMap
          selectedLocation={selectedLocation}
          onLocationClick={handleLocationSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
    </div>
  );
}
