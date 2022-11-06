import { Col, Form, Row } from "antd";
import React from "react";
import { HideLoading, ShowLoading } from "./../redux/alerts";
import axios from "./axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function StudentForm({ student, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "edit") {
        response = await axios.post(
          `/api/student/update-student/${student.rollNo}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post("/api/student/add-student", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/faculty/students");
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
      <Form layout="vertical" onFinish={onFinish} initialValues={student}>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Last Name" name="lastName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Roll Number" name="rollNo">
              <input type="text" disabled={type === "edit" ? true : false} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Branch" name="branch">
              <input type="text" disabled={type === "edit" ? true : false} />
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
          <Col span={8}>
            <Form.Item label="Email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-2">
          <button className="primary text-white px-5">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default StudentForm;
