import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import StudentForm from "../../components/StudentForm";

function AddStudent() {
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Add Student" />
      <img
        src="https://cdn-icons-png.flaticon.com/512/7218/7218043.png"
        height={100}
        width={100}
        className="my-2"
      />
      <StudentForm />
    </div>
  );
}

export default AddStudent;
