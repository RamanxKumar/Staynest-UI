import React, { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import {
  Col,
  Row,
  Table,
  Spinner,
  Alert,
  Button,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMessage(`Room No ${roomId} was deleted.`);
        fetchRooms();
      } else {
        console.error(`Error deleting room: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <Container className="mt-5 mb-5 p-4 shadow-lg rounded bg-light">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" role="status" />
          <p className="mt-3">Loading existing rooms...</p>
        </div>
      ) : (
        <section>
          {/* Header */}
          <Row className="mb-4 align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h2 className="text-primary fw-bold">Existing Rooms</h2>
            </Col>
            <Col md={6} className="text-md-end text-center mt-3 mt-md-0">
              <Link to="/add-rooms" className="btn btn-success d-inline-flex align-items-center p-2">
                <FaPlus className="me-2" />
                Add Room
              </Link>
            </Col>
          </Row>

          {/* Filter */}
          <Row className="mb-4">
            <Col md={6}>
              <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
            </Col>
          </Row>

          {/* Table */}
          <div className="table-responsive">
            <Table bordered hover className="text-center table-striped shadow-sm rounded-3 bg-white">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>₹{room.roomPrice}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                          <Link to={`/edit-room/${room.id}`} className="btn btn-outline-info btn-sm">
                            <FaEye />
                          </Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                          <Link to={`/edit-room/${room.id}`} className="btn btn-outline-warning btn-sm">
                            <FaEdit />
                          </Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(room.id)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </Container>
  );
};

export default ExistingRooms;
