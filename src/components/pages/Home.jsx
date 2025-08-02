import React, { useContext, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Avatar, Input, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Signupmodal } from "../signup/Signupmodal";
import { Loginmodal } from "../login/loginmodal";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, Route, Routes } from "react-router";
import { DataContext } from "../../datacontext";
// import { datacontext } from "../../../datacontext";
function Home() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const { opensignup, setopensignup } = useContext(DataContext);
  const { openLogin, setopenLogin } = useContext(DataContext);
  const { User, setUser } = useContext(DataContext);
  console.log(openLogin);
  
  const getUser = async () => {
    if (User) {
      return;
    }
    const res = await axios.get("http://localhost:3000/Users/getUser", {
      withCredentials: true,
    });
    setUser(res.data);
    toast.success("login successfully");
  };
  console.log(User);
  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/Auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);

      toast.success("Logout Successfully");
      setUser("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleToggle = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
    );
    setTodos(updated);
  };

  const addTodo = () => {
    if (!User) {
      setopenLogin(true);
    } else {
      if (text.trim() === "") return;
      const newTodo = {
        task: text,
        date: new Date().toISOString().split("T")[0],
        expanded: false,
      };

      setTodos([newTodo, ...todos]);
      setText("");
    }
  };

  const signup = () => {
    setopensignup(true);
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
            <h1 className="flex items-center font-bold text-md sm:text-xl">
              TODO APP
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            {User.length !== 0 ? (
              <>
                <div className=" flex items-center gap-2 sm:gap-4">
                  <p className="text-xl sm:text-2xl font-extralight sm:font-bold">
                    {User.firstname}
                  </p>
                  <NavLink to={"/profile"}>
                    <Avatar
                      style={{ backgroundColor: "#0200FF	" }}
                      icon={<UserOutlined />}
                      size={30}
                    />
                  </NavLink>

                  {/* <Button size="lg" onClick={logout}>
                    Sign Out
                  </Button> */}
                </div>
              </>
            ) : (
                
              <>
                <Button size="sm" onClick={login}>
                  Sign In
                </Button>
                <Button size="sm" onClick={signup}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-2xl sm:text-4xl font-bold">
          Welcome to the Todo App
        </h1>
        <p className="text-xl mt-5">Manage your tasks efficiently!</p>
      </div>

      <div className="flex flex-col items-center mt-10 p-2">
        <Space.Compact className=" w-full md:w-[50em] ">
          <Input
            className="text-xl h-10 sm:h-15 shadow-2xl rounded-2xl "
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
      </div>

      <div className="w-full flex flex-col items-center mt-10 px-6">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="mt-5 border border-gray-300 shadow-2xl w-full sm:w-2xl rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div className="text-lg sm:text-xl">{todo.task}</div>
              <button
                className="text-blue-600 text-lg"
                onClick={() => handleToggle(todo.id)}
              >
                {todo.expanded ? "see more" : "see less"}
              </button>
            </div>

            {todo.expanded && (
              <div className="flex justify-between items-center text-[14px] md:text-[20px] mt-4">
                <p className="font-bold">Date: {todo.date}</p>
                <div className="flex gap-4">
                  <Button className="text-red-600 bg-transparent hover:bg-red-600 hover:text-white border-2 text-sm md:text-base">
                    Delete
                  </Button>
                  <Button className="text-sm md:text-base">Update</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
