import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import { SetFaculty } from "../redux/faculty";
import DefaultLayout from "./DefaultLayout";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

function PublicRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/faculty");
    }
  }, []);

  return <>{props.children}</>;
}

export default PublicRoute;
