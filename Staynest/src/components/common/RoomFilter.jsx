import React, { useState } from "react";
import { FaFilter, FaTimesCircle } from "react-icons/fa";

const RoomFilter = ({ data = [], setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setFilter(selectedType);

    if (selectedType === "") {
      setFilteredData(data);
    } else {
      const filteredRooms = Array.isArray(data)
        ? data.filter((room) =>
            room?.roomType?.toLowerCase().includes(selectedType.toLowerCase())
          )
        : [];

      setFilteredData(filteredRooms);
    }
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const roomTypes = Array.isArray(data)
    ? [...new Set(data.map((room) => room?.roomType).filter(Boolean))]
    : [];

  return (
    <div className="mb-4">
      <div
        className="card shadow-sm border-0 rounded-4 p-4 bg-light d-flex justify-content-center"
        style={{ minHeight: "20px" }} // 👈 increased height
      >
        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
          <div className="d-flex align-items-center gap-4">
            <FaFilter className="text-primary fs-5" />
            <label className="form-label fw-semibold m-0">
              Filter rooms by type:
            </label>
          </div>

          <select
            className="form-select rounded-3 shadow-sm"
            value={filter}
            onChange={handleSelectChange}
            style={{ maxWidth: "250px" }}
          >
            <option value="">Select a room type...</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={String(type)}>
                {String(type)}
              </option>
            ))}
          </select>

          <button
            className="btn btn-outline-danger d-flex align-items-center gap-1"
            onClick={clearFilter}
          >
            <FaTimesCircle />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;
