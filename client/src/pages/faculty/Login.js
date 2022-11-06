import { Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "../../utills/axios";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/faculty/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/faculty");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen">
      <Form layout="vertical w-400 white p-4" onFinish={onFinish}>
        <h1 className="text-medium">Faculty - LOGIN</h1>
        <hr />
        <Form.Item name="facultyId" label="Faculty ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <button className="primary text-white px-5 my-2 w-100">Login</button>
        <Link to="/register" className="text-mini text-black">
          Not yet Registered , Click Here To Register
        </Link>
      </Form>
    </div>
  );
}

export default Login;
