import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { Table } from "antd";
import toast from "react-hot-toast";
import axios from "../../utills/axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";

function Results() {
  const dispatch = useDispatch();
  const [results, setResults] = React.useState([]);
  const [searhQuery, setSearchQuery] = React.useState(null);
  const navigate = useNavigate();
  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      let apiPath = "/api/results/get-all-results";
      if (searhQuery) apiPath = "/api/results/search/" + searhQuery;
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
        setResults(response.data.data);
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
        getResults();
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
    getResults();
  }, [searhQuery]);

  const columns = [
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Examination",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Date",
      dataIndex: "examDate",
      key: "examDate",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-pencil-line"
            onClick={() => {
              navigate(`/faculty/results/edit/${record._id}`);
            }}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title="Results" />
      <div className="d-flex justify-content-between align-items-center my-4">
        <input
          type="text"
          className="w-300 px-2"
          placeholder="search results"
          value={searhQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="primary text-white px-3"
          onClick={() => {
            navigate("/faculty/results/add");
          }}
        >
          Add Result
        </button>
      </div>
      <Table columns={columns} dataSource={results} />
    </div>
  );
}

export default Results;
