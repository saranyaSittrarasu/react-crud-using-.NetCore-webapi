import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const User = () => {
  const userData = [
    { id: 1, name: "mark", age: 23, isActive: 0 },
    { id: 2, name: "mark2", age: 32, isActive: 1 },
    { id: 3, name: "mark3", age: 33, isActive: 1 },
  ];
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleClose = () => setShow(false);
  const handleEdit = (id) => {
    setShow(true);
    const userEditData = data.find((user) => user.id === id);
    if (userEditData) {
      setAge(userEditData.age);
      setName(userEditData.name);
      setIsActive(userEditData.isActive);
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?") === true) {
      setData(data.filter((user) => user.id !== id));
    }
  };
  const handleUpdate = () => {};
  const handleSubmit = () => {
    console.log(name, age, isActive);
  };

  useEffect(() => {
    setData(userData);
  }, []);
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label>isActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>IsActive</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.isActive}</td>
                  <td colSpan={2}>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No data</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid="md">
            <Row>
              <Col>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label>isActive</label>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default User;
