import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function DefaultLayout(props) {
  const { faculty } = useSelector((state) => state.faculty);
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white">
          {"   "}
          <b className="secondary-text">SIMS</b> UNIVERSITY{" "}
        </h1>
        <div>
          <h1 className="text-white text-small">{faculty?.name}</h1>
          <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </h1>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
