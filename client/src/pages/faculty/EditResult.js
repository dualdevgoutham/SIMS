import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import toast from "react-hot-toast";
import axios from "../../utills/axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { useParams } from "react-router-dom";
import { Modal, Table } from "antd";

function EditResult() {
  const [obtainedMarks, setObtainedMarks] = React.useState(null);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showStudentsModal, setShowStudentsModal] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/get-result/${params.resultId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResult(response.data.data);
        const tempObtainedMarks = {};
        response.data.data.subjects.forEach((subject) => {
          tempObtainedMarks[subject.subjectName] = 0;
        });
        setObtainedMarks(tempObtainedMarks);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {
          semester: result.semester,
        },
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

  const saveStudentResult = async (values) => {
    let verdict = "pass";
    Object.keys(obtainedMarks).forEach((key) => {
      const subjectName = key;
      const marks = obtainedMarks[key];
      const passMarks = result.subjects.find(
        (subject) => subject.subjectName === subjectName
      ).passMarks;
      if (Number(marks) < Number(passMarks)) {
        verdict = "fail";
      }
      return;
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/save-student-result",
        {
          resultId: params.resultId,
          examName: result.examName,
          studentId: selectedStudent._id,
          obtainedMarks: obtainedMarks,
          verdict,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setObtainedMarks(null);
        setSelectedStudent(null);
        getStudents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const columns = [
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
  ];

  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);

  useEffect(() => {
    if (result) {
      getStudents();
    }
  }, [result]);

  return (
    <div>
      <PageTitle title="Result Info" />
      {result && (
        <>
          <div className="mt-3">
            <h1 className="text-small">Name : {result.examName}</h1>
            <h1 className="text-small">Branch : {result.branch}</h1>
            <h1 className="text-small">Semester : {result.semester}</h1>
            <h1 className="text-small">Date : {result.examDate}</h1>
          </div>
          <hr />
          {!selectedStudent ? (
            <button
              className="secondary px-4"
              onClick={() => {
                setShowStudentsModal(true);
              }}
            >
              Add Student
            </button>
          ) : (
            <>
              <hr />
              <div className="d-flex justify-content-between align-items-center card flex-row p-2">
                <h1 className="text-small">
                  Name : {selectedStudent?.firstName}{" "}
                  {selectedStudent?.lastName}
                </h1>
                <i
                  className="ri-close-line"
                  onClick={() => {
                    const tempObtainedMarks = {};
                    result.subjects.forEach((subject) => {
                      tempObtainedMarks[subject.subjectName] = 0;
                    });
                    setObtainedMarks(tempObtainedMarks);
                    setSelectedStudent(null);
                  }}
                ></i>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject</th>
                    <th>Total Marks</th>
                    <th>Obtained Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.subjects?.map((subject, index) => (
                    <tr>
                      <td>{subject?.subjectCode}</td>
                      <td>{subject?.subjectName}</td>
                      <td>{subject?.totalMarks}</td>
                      <td>
                        <input
                          type="text"
                          className="w-120"
                          value={obtainedMarks[subject.subjectName]}
                          onChange={(e) => {
                            const tempOtainedMarks = { ...obtainedMarks };
                            tempOtainedMarks[subject.subjectName] =
                              e.target.value;
                            console.log(tempOtainedMarks);
                            setObtainedMarks(tempOtainedMarks);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={saveStudentResult}
                className="primary text-white px-5"
              >
                Save
              </button>
            </>
          )}
        </>
      )}

      <Modal
        title="Select Student"
        open={showStudentsModal}
        onCancel={() => {
          setShowStudentsModal(false);
        }}
      >
        <Table
          className="cursor-pointer"
          columns={columns}
          dataSource={students}
          onRow={(record) => {
            return {
              onClick: () => {
                console.log(record);
                setSelectedStudent(record);
                const resultExists = record.results.find(
                  (result) => result.resultId === params.resultId
                );
                if (resultExists) {
                  setObtainedMarks(resultExists.obtainedMarks);
                }
                setShowStudentsModal(false);
              },
            };
          }}
        />
      </Modal>
    </div>
  );
}

export default EditResult;
