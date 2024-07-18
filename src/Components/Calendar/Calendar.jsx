import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "antd";
import { FaCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import { useNavigate } from "react-router-dom";

export function CalendarModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const navigate = useNavigate();
  const { City } = useParams();

  const formattedDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const startDates = formattedDate(dateRange.startDate);
  const endDates = formattedDate(dateRange.endDate);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleDateValues();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  const handleDateValues = () => {
    if (!City) {
      navigate(`/Weather/Tbilisi/${startDates}/${endDates}`);
    } else {
      navigate(`/Weather/${City}/${startDates}/${endDates}`);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <FaCalendarAlt />
      </Button>
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DateRange
          moveRangeOnFirstSelectio={true}
          retainEndDateOnFirstSelection={true}
          ranges={[dateRange]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={true}
          rangeColors={["#3b82f6"]}
        />
      </Modal>
    </>
  );
}
