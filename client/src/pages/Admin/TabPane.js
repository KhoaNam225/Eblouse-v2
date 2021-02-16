/**
 * Author:
 * Last Date Modified:
 * Purpose: This component will be used in the AdminPage, it will help the user to display the content of that page
 * by clicking an appropriate mode.
 */
import React from "react";
import { SHOW_BOOKING, SHOW_DASHBOARD } from "./AdminPage";

/**
 * This component will be used in the AdminPage, it will help the user to display the content of that page
 * by clicking an appropriate mode
 *
 * @param {Number} showMode The mode of displaying the content,
 *                          the mode will be either SHOW_BOOKING for showing the list of bookings for the clinic
 *                          or SHOW_DASHBOARD for showing some visualizations of the sales of clinic
 * @param {Function} setShowMode Switching the display mode between SHOW_BOOKING and SHOW_DASHBOARD
 */
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
    </div>
  );
};

export default TabPane;
