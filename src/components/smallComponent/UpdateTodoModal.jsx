import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base_url } from "../URLs/based_url";
import { toast } from "react-toastify";

function UpdateTodoModal({ isOpen, onClose, todo, onUpdate, data }) {
  const [updatedText, setUpdatedText] = useState("");

  // jab modal khule tab hi text set ho
  useEffect(() => {
    if (todo) {
      setUpdatedText(todo.text || "");
    }
  }, [todo]);

  const handleUpdate = async (id) => {
    if (updatedText.trim() === "") return;

    try {
      const res = await axios.patch(
        `${base_url}/Data/updateData/${id}`,
        {
          text: updatedText,
          date: new Date().toISOString().split("T")[0],
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        onClose(); // modal band karna
        data();
        toast.success(res.data.message || "Todo updated successfully");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Todo
            </h2>
            <input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Edit your todo..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(todo._id)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UpdateTodoModal;
