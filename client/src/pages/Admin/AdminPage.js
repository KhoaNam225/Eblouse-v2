import React, { useState } from "react";

import BookingContent from "./content/booking/BookingContent";
import DashboardContent from "./content/DashboardContent";
import MessageContent from "./content/MessageContent";
import TabPane from "./TabPane";

import "../../style/AdminPage.css";

export const SHOW_BOOKING = 1;
export const SHOW_MESSAGE = 2;
export const SHOW_DASHBOARD = 3;

const AdminPage = () => {
  const [showMode, setShowMode] = useState(SHOW_DASHBOARD);

  return (
    <div className="admin-page-wrapper">
      <TabPane showMode={showMode} setShowMode={setShowMode} />
      <div className="content-wrapper">
        {showMode === SHOW_BOOKING ? (
          <BookingContent />
        ) : showMode === SHOW_DASHBOARD ? (
          <DashboardContent />
        ) : (
          <MessageContent />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
