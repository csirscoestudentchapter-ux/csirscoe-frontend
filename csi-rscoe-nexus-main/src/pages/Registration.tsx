import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import { useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate('/');
  };
  
  const handleSuccess = () => {
    // Additional success handling if needed
  };
  
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Join CSI RSCOE</h1>
          <p className="text-gray-600">
            Become a member of the Computer Society of India - RSCOE Chapter and get access to exclusive events, 
            workshops, and networking opportunities.
          </p>
        </div>
        
        <RegistrationForm 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
          standalone={true} 
        />
      </div>
    </div>
  );
};

export default Registration;