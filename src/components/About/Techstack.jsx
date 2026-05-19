import React from "react";
import { Col, Row } from "react-bootstrap";
import { SiCanva } from "react-icons/si";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiPython,
  DiPhp,
} from "react-icons/di";
import { FaLaravel, FaBootstrap } from "react-icons/fa";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiPhp />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaLaravel />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCanva />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaBootstrap  />
      </Col>
    </Row>
  );
}

export default Techstack;
