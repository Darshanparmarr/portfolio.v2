import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import techupgradlaptop from "../../Assets/Projects/techupgradlaptop.png";
import thirtysixstudiolaptop from "../../Assets/Projects/thirtysixstudiolaptop.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={techupgradlaptop}
              isBlog={false}
              title="TechUpgrad"
              description="Developed a full-featured e-learning portal (online & offline) using Tailwind CSS, PHP, Laravel, and PostgreSQL, focused on delivering seamless user experience, robust course management, and secure data handling."
              ghLink="https://www.techupgrad.in/"            
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={thirtysixstudiolaptop}
              isBlog={false}
              title="Thirtysix-Studios Clone"
              description="Developed a 100% React.js-based website, inspired by an Awwwards-recognized design, focusing on replicating its premium UI/UX, smooth animations, and modern interactive features."
              ghLink="https://thirtysixstudios-pi.vercel.app/"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
