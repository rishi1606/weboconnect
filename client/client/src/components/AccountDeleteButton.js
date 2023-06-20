import React from "react";
import { deleteAccount } from "../api/api";
import { useNavigate } from "react-router";

const AccountDeleteButton = ({ userId }) => {
  
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteAccount(userId)
      .then((response) => {
        navigate("/register");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return <button onClick={handleDelete}>Delete Account</button>;
};

export default AccountDeleteButton;
