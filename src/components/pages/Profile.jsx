import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Card, Form, Input, Button, Progress, Tabs, Badge, Tag } from 'antd';
import { UserOutlined, EditOutlined, CheckOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Profile = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'Productivity enthusiast and todo list master',
    stats: {
      tasksCompleted: 128,
      tasksPending: 12,
      productivityScore: 87
    }
  });

  const [activeTab, setActiveTab] = useState('overview');

  const onFinish = (values) => {
    setProfile({ ...profile, ...values });
    setEditMode(false);
  };

  const recentTasks = [
    { id: 1, title: 'Complete project proposal', completed: true },
    { id: 2, title: 'Schedule team meeting', completed: true },
    { id: 3, title: 'Review code changes', completed: false },
    { id: 4, title: 'Update documentation', completed: false },
  ];

  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: (
        <div className="space-y-4">
          <Card title="Activity Stats" className="shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Progress type="circle" percent={profile.stats.productivityScore} width={80} />
                <p className="mt-2 font-medium">Productivity</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">
                  {profile.stats.tasksCompleted}
                </div>
                <p className="mt-1 font-medium">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">
                  {profile.stats.tasksPending}
                </div>
                <p className="mt-1 font-medium">Pending</p>
              </div>
            </div>
          </Card>

          <Card title="Recent Tasks" className="shadow-sm">
            <div className="space-y-3">
              {recentTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center">
                    {task.completed ? (
                      <CheckCircleOutlined className="text-green-500 mr-2" />
                    ) : (
                      <ClockCircleOutlined className="text-yellow-500 mr-2" />
                    )}
                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                      {task.title}
                    </span>
                  </div>
                  <Tag color={task.completed ? 'green' : 'orange'}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'settings',
      label: 'Settings',
      children: (
        <Card title="Account Settings" className="shadow-sm">
          <Form form={form} layout="vertical" onFinish={onFinish} initialValues={profile}>
            <Form.Item label="Avatar" className="mb-6">
              <div className="flex items-center space-x-4">
                <Avatar size={64} icon={<UserOutlined />} />
                <Button type="primary" ghost>Change Avatar</Button>
              </div>
            </Form.Item>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>
            
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            
            <Form.Item name="bio" label="Bio">
              <Input.TextArea rows={3} />
            </Form.Item>
            
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>Save Changes</Button>
            </div>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Sidebar */}
        <motion.div 
          className="w-full md:w-1/3 lg:w-1/4"
          whileHover={{ scale: 1.02 }}
        >
          <Card className="shadow-sm sticky top-4">
            <div className="flex flex-col items-center text-center">
              <Avatar size={120} icon={<UserOutlined />} className="mb-4" />
              
              {editMode ? (
                <Form form={form} onFinish={onFinish} initialValues={profile}>
                  <div className="space-y-2 w-full">
                    <Form.Item name="firstName" className="mb-2">
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item name="lastName" className="mb-2">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </div>
                </Form>
              ) : (
                <div className="mb-2">
                  <h2 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-gray-500">{profile.email}</p>
                </div>
              )}
              
              <p className="text-gray-600 my-3">{profile.bio}</p>
              
              <Button 
                type={editMode ? 'primary' : 'default'} 
                icon={editMode ? <CheckOutlined /> : <EditOutlined />}
                onClick={() => editMode ? form.submit() : setEditMode(true)}
                className="mt-2"
              >
                {editMode ? 'Save Profile' : 'Edit Profile'}
              </Button>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tasks Completed</span>
                <Badge count={profile.stats.tasksCompleted} style={{ backgroundColor: '#52c41a' }} />
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Pending Tasks</span>
                <Badge count={profile.stats.tasksPending} style={{ backgroundColor: '#faad14' }} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Productivity</span>
                <span className="font-medium">{profile.stats.productivityScore}%</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={tabItems}
            animated
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;