import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { Table } from "antd";
import toast from "react-hot-toast";
import axios from "../../utills/axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";

function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = React.useState([]);
  const [searhQuery, setSearchQuery] = React.useState(null);
  const navigate = useNavigate();
  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      let apiPath = "/api/student/get-all-students";

      if (searhQuery) apiPath = "/api/student/search/" + searhQuery;

      const response = await axios.post(
        apiPath,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  const deleteStudent = async (rollNo) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/delete-student/${rollNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getStudents();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, [searhQuery]);

  const columns = [
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-2-line"
            onClick={() => {
              deleteStudent(record.rollNo);
            }}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              navigate(`/faculty/students/edit/${record.rollNo}`);
            }}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title="Students" />
      <div className="d-flex justify-content-between align-items-center my-4">
        <input
          type="text"
          className="w-300 px-2"
          placeholder="search students"
          value={searhQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="primary text-white px-3"
          onClick={() => {
            navigate("/faculty/students/add");
          }}
        >
          Add Student
        </button>
      </div>
      <Table columns={columns} dataSource={students} />
    </div>
  );
}

export default Students;
