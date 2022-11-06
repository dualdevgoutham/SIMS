import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

function FacultyHome() {
  const navigate = useNavigate();
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <div
            className="p-5 secondary-border card w-300 cursor-pointer d-flex align-items-center justify-content-cente gap-3"
            onClick={() => {
              navigate("/faculty/students");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              height={50}
              width={50}
            />
            <h1>Students</h1>
          </div>
        </Col>
        <Col span={12}>
          <div
            className="p-5 secondary-border card w-300 cursor-pointer d-flex align-items-center justify-content-center gap-3"
            onClick={() => {
              navigate("/faculty/results");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2065/2065214.png"
              height={50}
              width={50}
            />
            <h1>Results</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FacultyHome;
