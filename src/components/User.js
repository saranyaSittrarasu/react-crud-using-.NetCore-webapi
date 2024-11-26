import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [editAge, setEditAge] = useState("");
  const [editName, setEditName] = useState("");
  const [editIsActive, setEditIsActive] = useState(false);
  const [editId, setEditId] = useState("");
  const handleClose = () => setShow(false);
  const handleEdit = (id) => {
    setShow(true);
    const userEditData = data.find((user) => user.id === id);
    if (userEditData) {
      setEditAge(userEditData.age);
      setEditName(userEditData.name);
      setEditIsActive(userEditData.isActive);
      setEditId(id);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?") === true) {
      await axios
        .delete(`https://localhost:7265/api/User/${id}`)
        .then((res) => {
          toast.success("User deleted successfully");
        });
      setData(data.filter((user) => user.id !== id));
    }
  };
  const handleUpdate = async () => {
    await axios
      .put(`https://localhost:7265/api/User/${editId}`, {
        id: editId,
        name: editName,
        age: editAge,
        isActive: editIsActive,
      })
      .then((res) => {
        toast.success("User updated successfully");
        setShow(false);
        getData();
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      name: name,
      age: age,
      isActive: isActive,
    };
    await axios
      .post("https://localhost:7265/api/User", postData)
      .then((res) => {
        setData([...data, res.data]);
        setName("");
        setAge("");
        setIsActive(false);
        toast.success("User added successfully");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const getData = async () => {
    await axios
      .get("https://localhost:7265/api/User")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ToastContainer />
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
            <button
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
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
                  <td>{user.isActive === true ? "Yes" : "No"}</td>
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
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  placeholder="Enter age"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editIsActive}
                  onChange={(e) => setEditIsActive(e.target.checked)}
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
