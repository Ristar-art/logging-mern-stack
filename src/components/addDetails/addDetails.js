import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProfile } from './addDetailsSlice';
import axios from 'axios';

function AddDetails() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [biography, setBiography] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const profile = {
    name,
    surname,
    dateOfBirth,
    biography,
    email,
    phoneNumber,
    jobPosition,
    //image,
  };
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);
  
    // // Step 1: Upload the image to the server
    // const formData = new FormData();
    // formData.append('image', image);
    // const uploadResponse = await fetch('http://localhost:8000/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // });
  
    // const uploadData = await uploadResponse.json();
    // const imagePath = uploadData.imagePath;
  
    // Step 2: Send the profile data with the image path to /api/log
    const profile = {
      name,
      surname,
      dateOfBirth,
      biography,
      email,
      phoneNumber,
      jobPosition,
     // image: imagePath,
    };  
    const response = await fetch('http://localhost:8000/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
  
    const data = await response.json();
    console.log(data);
  
    setIsPending(false);
    dispatch(addProfile(profile));
   
    setIsFormSubmitted(true); // Set the flag to indicate form submission
  };

  useEffect(() => {
    if (isFormSubmitted) {
      window.location.reload(); // Refresh the screen after the form submission is complete
    }
  }, [isFormSubmitted]);

  return (
    <div>
      <h1>Log your profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Surname"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <br />
        <input
          type="date"
          placeholder="Date of birth"
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Biography"
          required
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Phone Number"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br />
        
          <select placeholder='Job Position' value={jobPosition} onChange={(e) => setJobPosition(e.target.value)}>
            <option >CEO</option>
            <option>Manager</option>
            <option>Secretary</option>
            <option>Intern</option>
          </select>
        <br />        
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        /> */}
        <br />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Loading...' : 'Load details'}
        </button>
      </form>
    </div>
  );
}

export default AddDetails;
