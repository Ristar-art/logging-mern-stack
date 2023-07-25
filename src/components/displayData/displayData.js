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
              <>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  value={editedProfile.dateOfBirth}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Biography"
                  name="biography"
                  value={editedProfile.biography}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={editedProfile.phoneNumber}
                  onChange={handleInputChange}
                />
                <br />
                <select
                  placeholder="Job Position"
                  name="jobPosition"
                  value={editedProfile.jobPosition}
                  onChange={handleInputChange}
                >
                  <option>CEO</option>
                  <option>Manager</option>
                  <option>Secretary</option>
                  <option>Intern</option>
                </select>
                <br />
                <button onClick={handleUpdateProfile}>Update</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <div className="Name">
                  <p>
                    {worker.surname}-{worker.name}
                  </p>
                </div>
                <div className="dateOfBirth">
                  <p>Born in {worker.dateOfBirth}</p>
                </div>
                <div className="biography">
                  <p>{worker.biography}</p>
                </div>
                <div className="email">
                  <p>Email-{worker.email}</p>
                </div>
                <div className="phoneNumber">
                  <p>Call-{worker.phoneNumber}</p>
                </div>
                <div className="Position">
                  <p>{worker.jobPosition}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEditProfile(worker)}>Edit</button>
                  <button onClick={() => handleDeleteProfile(worker._id)}>
                    Delete
                  </button>
                </div>
              </>
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
