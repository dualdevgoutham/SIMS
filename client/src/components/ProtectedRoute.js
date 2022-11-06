import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import { SetFaculty } from "../redux/faculty";
import DefaultLayout from "./DefaultLayout";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = React.useState(false);
  const dispatch = useDispatch();
  const getFacultyData = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      dispatch(HideLoading());
      const response = await axios.post(
        "/api/faculty/get-faculty-by-id",
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(SetFaculty(response.data.data));
        setReadyToRednder(true);
      }
    } catch (error) {
      dispatch(HideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    getFacultyData();
  }, []);

  return readyToRednder && <DefaultLayout>{props.children}</DefaultLayout>;
}

export default ProtectedRoute;
