import React, { useContext, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Avatar, Input, Space } from "antd";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Signupmodal } from "../signup/Signupmodal";
import { Loginmodal } from "../login/loginmodal";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, Route, Routes } from "react-router";
import { DataContext } from "../../datacontext";
import { base_url } from "../URLs/based_url";
import UpdateTodoModal from "../smallComponent/UpdateTodoModal";
// import { datacontext } from "../../../datacontext";
function Home() {
  // const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const { todos, setTodos } = useContext(DataContext);

  const { openSignup, setopenSignup } = useContext(DataContext);
  const { openLogin, setopenLogin } = useContext(DataContext);
  const { Profile, setProfile } = useContext(DataContext);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [error, setError] = useState(""); // 👈 error state

  useEffect(() => {
    getUser();
    getData();
  }, []);
  const getUser = async () => {
    if (Profile) {
      return ;
    }
    const res = await axios.get(`${base_url}/Users/getUser`, {
      withCredentials: true,
    });
    setProfile(res.data);
    toast.success("login successfully");
  };
  // console.log("profile in home page", Profile);

  const getData = async () => {
    const res = await axios.get(`${base_url}/Data/getAlldata`, {
      withCredentials: true,
    });
    setTodos(res.data);
    toast.success(res.data.message);
    // console.log("data in home page", res.data);
  };
  // console.log(Profile);
  const logout = async () => {
    try {
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = (id) => {
    const updated = todos.map((todo) =>
      todo._id === id ? { ...todo, expanded: !todo.expanded } : todo
    );
    setTodos(updated);
  };

  const addTodo = async () => {
    // Validation first
    if (text.trim().length < 3) {
      setError("Task must be at least 3 characters.");
      return;
    }
    if (text.trim().length > 30) {
      setError("Task cannot be more than 30 characters.");
      return;
    }

    setError(""); // ✅ clear error agar valid hai

    if (!Profile) {
      setopenLogin(true);
    } else {
      const res = await axios.post(
        `${base_url}/Data/addData`,
        {
          text: text,
          email: Profile.email,
          date: new Date().toISOString().split("T")[0],
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        getData();
        toast.success(res.data.message);
        setText(""); // ✅ clear input
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const deleteTodo = async (id) => {
    const res = await axios.delete(`${base_url}/Data/deleteData/${id}`, {
      withCredentials: true,
    });
    if (res.status !== 200) {
      toast.error(res.data.message);
    } else {
      getData();
      toast.success(res.data.message);
    }
  };

  const signup = () => {
    setopenSignup(true);
  };
  const login = () => {
    setopenLogin(true);
  };

  return (
    <>
      <Signupmodal />
      <Loginmodal />

      <div className="p-3 sm:p-5 w-auto">
        <div className="flex justify-between p-3 sm:p-5 border-3 rounded-2xl shadow-2xl font-serif">
          <div className="flex gap-2">
            <img
              className=" w-8  sm:w-12 h-8  sm:h-12"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVDeuGpvOV-mC2G7-hBaEAeqtCbaTF4TMkTQ&s"
              alt="Todo App"
            />
            <h1 className="flex items-center font-bold text-sm sm:text-xl">
              TODO APP
            </h1>
          </div>
          <div className="flex gap-1 sm:gap-2 items-center">
            {Profile.length !== 0 ? (
              <>
                <div className=" flex items-center gap-2 sm:gap-4">
                  <p className="text-xl sm:text-2xl font-extralight sm:font-bold">
                    {Profile.firstname}
                  </p>
                  <NavLink to={"/profile"}>
                    <Avatar
                      style={{ backgroundColor: "#0200FF	" }}
                      icon={<UserOutlined />}
                      size={35}
                    />
                  </NavLink>

                </div>
              </>
            ) : (
              <>
                <Button
                  className="text-[12px] sm:text-lg"
                  size="sm"
                  onClick={login}
                >
                  Sign In
                </Button>
                <Button
                  className="text-[12px] sm:text-lg"
                  size="sm"
                  onClick={signup}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-xl sm:text-4xl font-bold">
          Welcome to the Todo App
        </h1>
        <p className="text-[15px] sm:text-xl mt-5">Manage your tasks efficiently!</p>
      </div>

      <div className="flex flex-col items-center mt-10 p-2">
        <Space.Compact className=" w-full md:w-[50em] ">
          <Input
            className={`text-xl h-10 sm:h-15 shadow-2xl rounded-2xl ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Add a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            className="ms-3 text-xl h-10 sm:h-15 px-5 sm:px-10"
            type="primary"
            onClick={addTodo}
          >
            Add
          </Button>
        </Space.Compact>

        {/* error message show karega */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="w-full flex flex-col items-center mt-10 px-2 sm:px-6">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 200 }} // delete hone par right side slide
              transition={{ duration: 0.5 }}
              className="mt-5 border border-gray-300 shadow-2xl w-full sm:w-2xl rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg sm:text-xl font-bold">{todo.text}</div>
                <button
                  className="text-blue-600 text-lg hover:font-bold hover:text-blue-800"
                  onClick={() => handleToggle(todo._id)}
                >
                  {todo.expanded ? "see less" : "see more"}
                </button>
              </div>
              {todo.expanded && (
                <div className="flex justify-between items-center text-[14px] md:text-[20px] mt-6">
                  <p className="font-bold">Date: {todo.Date}</p>
                  <div className="flex gap-2 sm:gap-4">
                    <Button
                      size="sm"
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-600 bg-transparent hover:bg-red-600 hover:text-white border-2 text-sm md:text-base"
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      className="text-sm md:text-base"
                      onClick={() => {
                        setSelectedTodo(todo);
                        setIsModalOpen(true);
                      }}
                    >
                      update
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <UpdateTodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          todo={selectedTodo}
          data={getData}
        />
      </div>
    </>
  );
}

export default Home;
