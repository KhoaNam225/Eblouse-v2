import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";

import bookingsActions from "../../../../redux/actions/bookings.actions";
import LoadingSpinner from "../../../../components/LoadingSpinner";

import "../../../../style/BookingTrendMonth.css";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const BAR_WIDTH = CANVAS_WIDTH / 10;
const PADDING = 20;

const aggregateBookingByMonth = (bookings) => {
  const bookingsByMonth = new Map();

  bookings.map((booking) => {
    const date = new Date(booking.startTime);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-1`;
    if (bookingsByMonth.has(key)) {
      bookingsByMonth.set(key, bookingsByMonth.get(key) + 1);
    } else {
      bookingsByMonth.set(key, 1);
    }

    return booking;
  });

  return [...bookingsByMonth];
};

const calculateGrowthVersusLastMonth = (bookings) => {
  const filterByMonth = (bookings, month) => {
    return bookings.filter(
      (booking) => new Date(booking.startTime).getMonth() === month
    );
  };

  const thisMonthBookings = filterByMonth(bookings, new Date().getMonth())
    .length;

  const lastMonthBookings = filterByMonth(bookings, new Date().getMonth() - 1)
    .length;

  let growth = thisMonthBookings / lastMonthBookings - 1;
  growth = Math.round(growth * 100) / 100;

  return [thisMonthBookings, growth];
};

const BookingTrendMonth = () => {
  const dispatch = useDispatch();

  const isLoadingBooking = useSelector((state) => state.bookings.isLoading);
  const bookings = useSelector((state) => state.bookings.bookings);
  const user = useSelector((state) => state.auth.user);
  const [growth, setGrowth] = useState([]);

  const svgContainer = useRef(null);

  useEffect(() => {
    dispatch(bookingsActions.getBookingsList(user._id));
  }, [dispatch]);

  useEffect(() => {
    if (
      !isLoadingBooking &&
      svgContainer.current &&
      bookings !== undefined &&
      bookings.length > 0
    ) {
      const dataset = aggregateBookingByMonth(bookings);
      dataset.sort((a, b) => d3.ascending(new Date(a[0]), new Date(b[0])));
      const svg = d3.select(svgContainer.current);

      // Domain for scaling for X and Y axis
      const maxY = d3.max(dataset, (data) => data[1]);
      const minX = d3.min(dataset, (data) => new Date(data[0]));
      const maxX = d3.max(dataset, (data) => new Date(data[0]));
      console.log(maxX);
      maxX.setDate(maxX.getDate() + 15);
      minX.setDate(minX.getDate() - 15);

      // The actual scale
      const yScale = d3
        .scaleLinear()
        .domain([0, maxY])
        .range([CANVAS_HEIGHT - PADDING, 0]);
      const xScale = d3
        .scaleTime()
        .domain([minX, maxX])
        .range([PADDING, CANVAS_WIDTH - PADDING]);

      const tooltip = d3
        .select("#tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0);

      // Draw the bars using the scale
      const bars = svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width", BAR_WIDTH)
        .attr("height", (data) => CANVAS_HEIGHT - yScale(data[1]))
        .attr("x", (data, index) => xScale(new Date(data[0])) - BAR_WIDTH / 2)
        .attr("y", (data) => yScale(data[1]) - PADDING)
        .attr("class", "month-booking-bars");

      // Add tooltip when hover mouse on bars
      // and remove tooltip on hover mouse out of the bars
      bars
        .on("mouseover", function (event, data) {
          const date = new Date(data[0]);

          tooltip
            .html(
              `<p><strong>Date:</strong> ${date.getMonth()}/${date.getFullYear()}</p>
              <p><strong>Bookings:</strong> ${data[1]}</p>`
            )
            .style("opacity", 0.8)
            .style("left", () => {
              return event.x + 50 + "px";
            })
            .style("top", event.y - 100 + "px");
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });

      // Adding 2 axis the the chart
      // The x-axis should only show month and year
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(d3.timeMonth.every(1))
        .tickSize(0)
        .tickFormat(d3.timeFormat("%m/%Y"));

      // The y-axis should show the number of bookings in each month
      const yAxis = d3.axisLeft(yScale).tickSize(0);

      svg
        .append("g")
        .attr("transform", `translate(0, ${CANVAS_HEIGHT - 20})`)
        .attr("class", "x-axis")
        .call(xAxis);

      svg
        .append("g")
        .attr("transform", `translate(${PADDING}, 0)`)
        .attr("class", "y-axis")
        .call(yAxis);

      svg
        .append("text")
        .text("Total Number of Bookings Each Month")
        .attr("transform", `translate(${CANVAS_WIDTH / 2 - 225}, 20)`)
        .style("font-size", "1.5em")
        .style("font-weight", "bold");
    }

    setGrowth(calculateGrowthVersusLastMonth(bookings));
  }, [bookings]);

  if (isLoadingBooking)
    return <LoadingSpinner animation="border" color="danger" />;

  return (
    <div className="booking-trend-month-wrapper">
      <div className="insight-boxes">
        <div className="insight-box">
          <p className="title">Total Bookings This Month</p>
          <p className="booking-num-growth">{`${growth[0]}`}</p>
        </div>
        <div className="insight-box">
          <p className="title">Growth Versus Last Month</p>
          <p
            className="percent-growth"
            style={{ color: growth[1] > 0 ? "#61b15a" : "##ef4f4f" }}
          >
            {`${growth[1] * 100}`}%{" "}
            {growth[1] > 0 ? (
              <i class="fas fa-arrow-up"></i>
            ) : (
              <i class="fas fa-arrow-down"></i>
            )}
          </p>
        </div>
      </div>
      <div id="tooltip"></div>
      <div className="svg-container">
        <svg
          ref={svgContainer}
          className="d3-canvas"
          id="booking-trend-month-chart"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
    </div>
  );
};

export default BookingTrendMonth;
