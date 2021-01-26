import React from "react";
import { SHOW_BOOKING, SHOW_DASHBOARD, SHOW_MESSAGE } from "./AdminPage";

const TabPane = ({ showMode, setShowMode }) => {
  return (
    <div className="tab-pane">
      <div
        className={
          showMode === SHOW_DASHBOARD ? "tab-item selected-tab" : "tab-item"
        }
        onClick={() => setShowMode(SHOW_DASHBOARD)}
      >
        Dashboard
      </div>
      <div
        className={
          showMode === SHOW_BOOKING ? "tab-item selected-tab" : "tab-item"
        }
        onClick={() => setShowMode(SHOW_BOOKING)}
      >
        Booking
      </div>
      <div
        className={
          showMode === SHOW_MESSAGE ? "tab-item selected-tab" : "tab-item"
        }
        onClick={() => setShowMode(SHOW_MESSAGE)}
      >
        Message
      </div>
    </div>
  );
};

export default TabPane;
