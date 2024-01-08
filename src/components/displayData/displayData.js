import React, { useEffect, useState } from "react";
import axios from "axios";

// ... (previous imports)

function DisplayData() {
  const [profiles, setProfiles] = useState([]);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profiles from the server on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Function to fetch profiles from the server
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/log");
      setProfiles(res.data); // Update local state with fetched data
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to handle profile deletion
  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/log/${id}`);
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile._id !== id)
      );
      alert(`The profile with ID ${id} has been deleted.`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to handle entering edit mode for a profile
  const handleEditProfile = (profile) => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  // Function to handle input changes for the edited profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Function to handle updating the profile
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/log/${editedProfile._id}`,
        editedProfile
      );
      const updatedProfile = response.data.updatedProfile;
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === updatedProfile._id ? updatedProfile : profile
        )
      );
      setIsEditing(false);
      setEditedProfile(null);
      alert(`The profile has been updated.`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to cancel editing and reset editedProfile state
  const cancelEdit = () => {
    setIsEditing(false);
    setEditedProfile(null);
  };

  return (
    <div className="Front">
      <h1>Worker profiles</h1>
      {profiles.length > 0 ? (
        profiles.map((worker) => (
          <div className="worker-preview" key={worker._id}>
            {isEditing && editedProfile._id === worker._id ? (
              <div style={{margin:10}}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                  style={{width:'100%', height:'5vh'}}
                />
                <br />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  value={editedProfile.dateOfBirth}
                  onChange={handleInputChange}
                  style={{width:'100%', height:'5vh'}}
                />
                <br />
                <input
                  type="text"
                  placeholder="Biography"
                  name="biography"
                  value={editedProfile.biography}
                  onChange={handleInputChange}
                  style={{width:'100%', height:'5vh'}}
                />
                <br />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  style={{width:'100%', height:'5vh'}}
                />
                <br />
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={editedProfile.phoneNumber}
                  onChange={handleInputChange}
                  style={{width:'100%', height:'5vh'}}
                />
                <br />
                <select
                  placeholder="Job Position"
                  name="jobPosition"
                  value={editedProfile.jobPosition}
                  onChange={handleInputChange}
                  style={{width:'100%', height:'5vh'}}
                >
                  <option>CEO</option>
                  <option>Manager</option>
                  <option>Secretary</option>
                  <option>Intern</option>
                </select>
                <br />
                <div style={{width:'100%', height:'5vh',display:'flex',justifyContent:"center"}}>
                <button style={{height:'5vh',width:'10vw',borderRadius:5,border:"1px black solid",margin:2}} onClick={handleUpdateProfile}>Update</button>
                <button style={{height:'5vh',width:'10vw',borderRadius:5,border:"1px black solid",margin:2}} onClick={cancelEdit}>Cancel</button>
                </div>
                
              </div>
            ) : (
              <div style={{padding:10, backgroundColor:"#FEFFEC",margin:10}}>
                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-between",margin:10}}>
                  <p>
                    Name and Surname:
                  </p>
                  <p>
                    {worker.surname} {worker.name}
                  </p>
                </div>
                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-between",margin:10}}>
                  <p>
                    Date of birth:
                  </p>
                  <p>{worker.dateOfBirth}</p>
                </div>
                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-between",margin:10}}>
                  <p>
                    Biography:
                  </p>
                  <div style={{marginLeft:10}}>
                  <p>{worker.biography}</p>
                  </div>
                  
                </div>
                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-between",margin:10}}>
                  <p>
                    Email:
                  </p>
                  <p>{worker.email}</p>
                </div>
                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-between",margin:10}}>
                  <p>
                    Phone number:
                  </p>
                  <p>{worker.phoneNumber}</p>
                </div>
                <div style={{display:"flex", flexDirection:'row',justifyContent:"space-between",margin:10}}>
                  <p>
                    Position:
                  </p>
                  <p>{worker.jobPosition}</p>
                </div>
                <div style={{display:'flex',justifyContent:"center"}}>
                  <button style={{height:'5vh',width:'10vw',borderRadius:5,border:"1px black solid",margin:2}} onClick={() => handleEditProfile(worker)}>Edit</button>
                  <button style={{height:'5vh',width:'10vw',borderRadius:5,border:"1px black solid",margin:2}} onClick={() => handleDeleteProfile(worker._id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No profiles found.</p>
      )}
    </div>
  );
}

export default DisplayData;
