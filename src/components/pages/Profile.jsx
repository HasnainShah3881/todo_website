import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Upload,
  message,
  Switch,
  Progress,
  Badge,
  Spin,
  Divider,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  LockOutlined,
  MailOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  NotificationOutlined,
  SafetyOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { datacontext } from "../../../datacontext";
import { useNavigate } from "react-router";

const { TabPane } = Tabs;
const { TextArea } = Input;

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { User, setUser } = useContext(datacontext);
  const navigate = useNavigate()
  if(!User){
      navigate("/")
  }

  // Dynamic notifications state
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklyDigest: true,
    taskReminders: true,
    productivityReports: false,
  });

  // Mock user stats
  const [userStats, setUserStats] = useState({
    totalTasks: 128,
    completedTasks: 96,
    overdueTasks: 12,
    completionRate: 75,
    productivityScore: 82,
    streakDays: 5,
  });

  // Fetch profile data (simulated)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProfileData({
        name: "Jane Doe",
        email: "jane.doe@example.com",
        bio: "I love organizing my tasks and being productive!",
        role: "Todo Enthusiast",
        joinDate: "Joined January 2023",
      });
      setAvatarUrl("https://randomuser.me/api/portraits/women/44.jpg");
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onFinishProfile = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProfileData({
        ...profileData,
        ...values,
      });
      setLoading(false);
      setIsEditing(false);
      message.success("Profile updated successfully!");
    }, 1500);
  };

  const onFinishPassword = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success("Password changed successfully!");
      form.resetFields();
    }, 1500);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setAvatarUrl(imageUrl);
        message.success("Avatar uploaded successfully");
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleNotificationChange = (key, checked) => {
    setNotifications({
      ...notifications,
      [key]: checked,
    });
    message.success(`Notification settings updated!`);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      form.setFieldsValue({
        name: profileData.name,
        email: profileData.email,
        bio: profileData.bio,
      });
    }
  };

  const renderStatCard = (icon, value, label, color) => (
    <motion.div
      whileHover={{ scale: 1.3 }}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center`}
    >
      <div className={`text-2xl mb-2 text-${color}-500`}>{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </motion.div>
  );

  if (loading && !profileData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 3, y: 0 }}
        transition={{ duration: 2 }}
      >
        <Card className="shadow-lg border-0">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Avatar and Stats */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleAvatarChange}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess("ok");
                    getBase64(file, (imageUrl) => setAvatarUrl(imageUrl));
                    message.success("Avatar uploaded successfully");
                  }, 0);
                }}
              >
                <div className="relative group cursor-pointer">
                  <Badge
                    count={<EditOutlined className="text-xs" />}
                    offset={[-10, 100]}
                    className="transform hover:scale-105 transition-transform"
                  >
                    <Avatar
                      size={160}
                      src={avatarUrl}
                      icon={<UserOutlined />}
                      className="border-4 border-blue-100 hover:border-blue-200 transition-all"
                    />
                  </Badge>
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <UploadOutlined className="text-white text-2xl" />
                  </div>
                </div>
              </Upload>

              <h2 className="text-2xl font-bold mt-4">{profileData?.name}</h2>
              <p className="text-gray-500">{profileData?.role}</p>
              <p className="text-gray-400 text-sm mt-1">
                {profileData?.joinDate}
              </p>

              <Divider className="my-4" />

              <div className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {renderStatCard(
                    <CheckCircleOutlined />,
                    userStats.completedTasks,
                    "Completed",
                    "green"
                  )}
                  {renderStatCard(
                    <ClockCircleOutlined />,
                    userStats.overdueTasks,
                    "Overdue",
                    "red"
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Task Completion</span>
                    <span className="text-sm font-medium">
                      {userStats.completionRate}%
                    </span>
                  </div>
                  <Progress
                    percent={userStats.completionRate}
                    strokeColor="#3B82F6"
                    size={8}
                    showInfo={false}
                    className="mb-4"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Productivity Score
                    </span>
                    <span className="text-sm font-medium">
                      {userStats.productivityScore}%
                    </span>
                  </div>
                  <Progress
                    percent={userStats.productivityScore}
                    strokeColor="#10B981"
                    size={8}
                    showInfo={false}
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                  <TrophyOutlined className="text-blue-500 text-xl mr-3" />
                  <div>
                    <div className="font-medium">Current Streak</div>
                    <div className="text-sm text-gray-600">
                      {userStats.streakDays} days
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Tabs */}
            <div className="w-full md:w-2/3">
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                className="w-full"
                tabBarExtraContent={
                  activeTab === "profile" && (
                    <Button
                      icon={<EditOutlined />}
                      type="text"
                      onClick={toggleEdit}
                      className="flex items-center"
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  )
                }
              >
                <TabPane
                  tab={
                    <span className="flex items-center">
                      <UserOutlined className="mr-2" />
                      Profile
                    </span>
                  }
                  key="profile"
                >
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinishProfile}
                    disabled={!isEditing}
                  >
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please input your name!" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please input your email!" },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </Form.Item>

                    <Form.Item label="Bio" name="bio">
                      <TextArea
                        rows={4}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </Form.Item>

                    {isEditing && (
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          className="w-full md:w-auto"
                        >
                          Save Changes
                        </Button>
                      </Form.Item>
                    )}
                  </Form>
                </TabPane>

                <TabPane
                  tab={
                    <span className="flex items-center">
                      <SafetyOutlined className="mr-2" />
                      Security
                    </span>
                  }
                  key="security"
                >
                  <Form layout="vertical" onFinish={onFinishPassword}>
                    <Form.Item
                      label="Current Password"
                      name="currentPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your current password!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                      />
                    </Form.Item>

                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your new password!",
                        },
                        {
                          min: 8,
                          message: "Password must be at least 8 characters!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Confirm New Password"
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The two passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full md:w-auto"
                      >
                        Update Password
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>

                <TabPane
                  tab={
                    <span className="flex items-center">
                      <NotificationOutlined className="mr-2" />
                      Notifications
                    </span>
                  }
                  key="notifications"
                >
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.01 }}
                        className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                      >
                        <div>
                          <h4 className="font-medium">
                            {key.split(/(?=[A-Z])/).join(" ")}
                          </h4>
                          <p className="text-gray-500 text-sm">
                            {key === "email" &&
                              "Receive notifications via email"}
                            {key === "push" &&
                              "Receive notifications on your device"}
                            {key === "weeklyDigest" &&
                              "Get a weekly summary of your activity"}
                            {key === "taskReminders" &&
                              "Reminders for upcoming tasks"}
                            {key === "productivityReports" &&
                              "Monthly productivity insights"}
                          </p>
                        </div>
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          checked={value}
                          onChange={(checked) =>
                            handleNotificationChange(key, checked)
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
