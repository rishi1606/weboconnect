import React, { useState } from "react";
import { deleteAccount, updateProfile } from "../api/api";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useNavigate } from "react-router";
import AccountDeleteButton from "./AccountDeleteButton";
const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      userId,
      name,
      email,
      gender,
      phone,
    };

    updateProfile(userId, userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
      <ChangePasswordForm userId={userId} />
      <AccountDeleteButton userId={userId} />
      
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default ProfileForm;
