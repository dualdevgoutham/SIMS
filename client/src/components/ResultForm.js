import { Col, Form, Row, Space } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";
import axios from "./axios";

function ResultForm() {
  const navigate = useNavigate();
  const { faculty } = useSelector((state) => state.faculty);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.createdBy = faculty._id;
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/results/add-result", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} initialValues={null}>
        <Row gutter={[10, 10]}>
          <Col span={16}>
            <Form.Item label="Examination Name" name="examName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Form.Item label="Examination Date" name="examDate">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Branch" name="branch">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Year" name="year">
              <input type="number" min={1} max={4} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Semester" name="semester">
              <input type="number" min={1} max={8} />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Form.List name="subjects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "subjectCode"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input placeholder="subject Code" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "subjectName"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input placeholder="subject Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "totalMarks"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input placeholder="total Marks" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "passMarks"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input placeholder="pass Marks" />
                  </Form.Item>
                  <i
                    className="ri-delete-bin-2-line"
                    onClick={() => remove(name)}
                  ></i>
                </Space>
              ))}

              <button
                className="secondary  px-4"
                type="dashed"
                onClick={() => add()}
              >
                Add Subject
              </button>
            </>
          )}
        </Form.List>
        <div className="d-flex justify-content-end mt-2">
          <button className="primary text-white px-5">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default ResultForm;
