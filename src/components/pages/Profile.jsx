import React, { useState, useEffect, useContext } from "react";
import { Card, Avatar, Button, Divider, Tag, Statistic } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LogoutOutlined,
  EditOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { DataContext } from "../../datacontext";
import axios from "axios";
import { base_url } from "../URLs/based_url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ProfileUpdateModal from "../smallComponent/UpdateProfileModal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false); // 👈 logout loader state
  const { Profile, setProfile, todos, setTodos } = useContext(DataContext);
  const navigate = useNavigate();
  const getUser = async () => {
   
    const res = await axios.get(`${base_url}/Users/getUser`, {
      withCredentials: true,
    });
    setProfile(res.data);
    toast.success("edit profile successfully");

  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const rerender = () => {
    if (Profile) {
      console.log("rerender");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    rerender();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // const handleEditProfile = () => {
  //   console.log("Edit profile clicked");
  //   // Add edit functionality
  // };

  const logout = async () => {
    try {
      setLogoutLoading(true); // 👈 start loader

      const res = await axios.post(
        `${base_url}/Auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);

      toast.success("Logout Successfully");
      setProfile("");

      // 3 second baad navigate karega
      setTimeout(() => {
        setLogoutLoading(false);
        navigate("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      setLogoutLoading(false);
      console.log(error);
    }
  };

  // 👇 Agar logout loading hai to loader dikhaye
  if (logoutLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-lg font-semibold text-gray-700">
          Logging out...
        </p>
      </div>
    );
  }

  if (!Profile) return null; // prevent errors if Profile is empty

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Profile</h1>
          <p className="text-gray-600">
            Manage your personal information and track your progress
          </p>
        </motion.div>

        <motion.div variants={cardVariants} className="mb-8">
          <Card
            loading={loading}
            className="shadow-2xl rounded-2xl border-0 overflow-hidden"
          >
            {/* Profile Header */}
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className="mb-4 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ fontSize: "48px" }}
                />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-gray-800 mb-1"
              >
                {Profile.firstname} {Profile.lastname}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 mb-3 flex items-center justify-center"
              >
                <MailOutlined className="mr-2" />
                {Profile.email}
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-gray-500 flex items-center justify-center"
              >
                <CalendarOutlined className="mr-2" />
                Member since{" "}
                {Profile.joinDate
                  ? new Date(Profile.joinDate).toLocaleDateString()
                  : "N/A"}
              </motion.p>
            </div>

            <Divider />

            {/* Bio Section */}
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                About Me
              </h3>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {Profile.bio || "No bio added yet."}
              </p>
            </motion.div>

            <Divider />

            {/* Task Statistics */}
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Task Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="text-center border-0 shadow-md rounded-xl">
                    <Statistic
                      title="Total Tasks"
                      value={todos?.length || 0}
                      valueStyle={{ color: "#3b82f6" }}
                      prefix={<CheckCircleOutlined />}
                    />
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="text-center border-0 shadow-md rounded-xl">
                    <Statistic
                      title="Completed"
                      value={Profile.completedTasks || 0}
                      valueStyle={{ color: "#10b981" }}
                    />
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="text-center border-0 shadow-md rounded-xl">
                    <Statistic
                      title="Pending"
                      value={Profile.pendingTasks || 0}
                      valueStyle={{ color: "#f59e0b" }}
                    />
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            <Divider />

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="large"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 border-0 px-8 h-12 font-semibold rounded-lg"
                >
                  Edit Profile
                </Button>
              </motion.div>
              <ProfileUpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={Profile}
                onUpdate={(updatedUser) => setProfile(updatedUser)}
                getUser={() => getUser()}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  danger
                  icon={<LogoutOutlined />}
                  size="large"
                  onClick={logout}
                  className="px-8 h-12 font-semibold rounded-lg border-red-500 text-red-500 hover:bg-red-50"
                >
                  Logout
                </Button>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="text-center">
          <Tag color="blue" className="text-sm px-4 py-2 rounded-full">
            🚀 Active User
          </Tag>
          <Tag color="green" className="text-sm px-4 py-2 rounded-full ml-2">
            ⭐ Premium Member
          </Tag>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
