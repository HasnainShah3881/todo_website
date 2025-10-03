import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { base_url } from "../URLs/based_url";

function ProfileUpdateModal({ isOpen, onClose, user, onUpdate, getUser }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
  });
  // jab modal khule to user data set ho
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleUpdate = async (id) => {
    try {
      const res = await axios.patch(
        `${base_url}/Users/updateUser/${id}`,
        { firstname: formData.firstname, lastname: formData.lastname, bio: formData.bio },
        { withCredentials: true }
      );

      if (res.status === 200) {
        onUpdate(res.data); // parent ko data bhejna
        onClose();
        getUser(); // updated user data fetch karna
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white m-auto rounded-2xl shadow-xl w-full max-w-lg p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-2xl w-full text-center font-bold text-gray-800 mb-6">
              Update Profile
            </h2>

            {/* First Name */}
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
            />

            {/* Last Name */}
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
            />

            {/* Bio */}
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Write a short bio..."
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(user._id)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProfileUpdateModal;
