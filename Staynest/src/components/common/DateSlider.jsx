import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange(ranges.selection);
    onDateChange(startDate, endDate);
    onFilterChange(startDate, endDate);
  };

  const handleClearFilter = () => {
    const resetRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    setDateRange(resetRange);
    onDateChange(null, null);
    onFilterChange(null, null);
  };

  return (
    <div className="bg-light p-4 rounded shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0 text-dark">📅 Filter Bookings by Date</h5>
        <button
          className="btn btn-sm btn-outline-danger px-3"
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>
      </div>

      <div className="d-flex justify-content-center ">
        <div className="border rounded p-2 bg-white shadow-sm">
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleSelect}
            months={1}
            direction="horizontal"
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            className="w-100"
          />
        </div>
      </div>
    </div>
  );
};

export default DateSlider;
