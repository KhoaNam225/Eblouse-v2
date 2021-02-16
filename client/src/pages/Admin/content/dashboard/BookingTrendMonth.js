/**
 * Author:
 * File name: BookingTrendMonth.js
 * Last Date Modified:
 * Purpose: This component will display a bar chart that helps the user to see the
 *          growth in sale over the last 6 months of the clinic
 */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";

import bookingsActions from "../../../../redux/actions/bookings.actions";
import LoadingSpinner from "../../../../components/LoadingSpinner";

import "../../../../style/BookingTrendMonth.css";

// Some properties of the canvas on which we will draw the chart on
const CANVAS_WIDTH = 800; // The width of the canvas
const CANVAS_HEIGHT = 400; // The height of the canvas
const BAR_WIDTH = CANVAS_WIDTH / 10; // The width of each bar in the chart
const PADDING = 20; // The padding of the canvas

/**
 * This function will take in an array of bookings and calculate how many of bookings were made
 * in each month using the date in the booking object.
 *
 * @param {Array} bookings The array containing all bookings of the clinic in the last 6 months
 * @returns {Array} The array containing each month and the number of bookings in that month
 */
const aggregateBookingByMonth = (bookings) => {
  // This map will contain months as its keys and the number of bookings in each months as values
  const bookingsByMonth = new Map();

  bookings.map((booking) => {
    const date = new Date(booking.startTime);
    // For each booking in the input array
    // We take its month as key, then check if the map already has that key
    // If yes, we increase the count associate with that key by 1
    // Otherwise, we put 1 as the count
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-1`;

    if (bookingsByMonth.has(key)) {
      bookingsByMonth.set(key, bookingsByMonth.get(key) + 1);
    } else {
      bookingsByMonth.set(key, 1);
    }

    return booking;
  });

  // The final output will be in the form:
  // [[month, number_of_bookings_in_that_month], [month, number_of_bookings_in_that_month], ...]
  // for example:
  // [[1, 10], [2, 3], [3, 6]...]
  return [...bookingsByMonth];
};

/**
 * This function will calculate the growth of this month versus last month
 *
 * @param {Array} bookings The array containing all bookings of a clinic
 * @returns {Array} An array in the form [the_number_of_booking_of_the_current_month, growth_vs_last_month]
 */
const calculateGrowthVersusLastMonth = (bookings) => {
  // This function gets all the bookings of the given month
  const filterByMonth = (bookings, month) => {
    return bookings.filter(
      (booking) => new Date(booking.startTime).getMonth() === month
    );
  };

  // Use the above function to count the number of bookings in this month
  const thisMonthBookings = filterByMonth(bookings, new Date().getMonth())
    .length;

  // Calculate the number of bookings of previous month
  const lastMonthBookings = filterByMonth(bookings, new Date().getMonth() - 1)
    .length;

  // Calculate the growth
  let growth = thisMonthBookings / lastMonthBookings - 1;
  growth = Math.round(growth * 100) / 100;

  return [thisMonthBookings, growth];
};

/**
 * This component will show a bar chart showing how many bookings made in each month
 * over the last 6 months
 */
const BookingTrendMonth = () => {
  const dispatch = useDispatch();

  const isLoadingBooking = useSelector((state) => state.bookings.isLoading);
  const bookings = useSelector((state) => state.bookings.bookings); // The bookings of the current clinic
  const user = useSelector((state) => state.auth.user); // The current clinic
  const [growth, setGrowth] = useState([]); // This is the growth versus last month of the clinic

  // This is the canvas where we will draw the chart on
  // We use userRef() because we want the bar chart to persist between component's lifecycle
  // and we can take a reference to the canvas object to perform some drawing on it
  const svgContainer = useRef(null);

  useEffect(() => {
    // When the component is mounted, we begin taking the bookings data
    dispatch(bookingsActions.getBookingsList(user._id));
  }, [dispatch]);

  useEffect(() => {
    // When the data is ready, we begins drawing the canvas
    if (
      !isLoadingBooking &&
      svgContainer.current &&
      bookings !== undefined &&
      bookings.length > 0
    ) {
      // We only need the month and the number of bookings in each month (not the detail of each booking)
      // therefore we translate the raw data into the right format
      const dataset = aggregateBookingByMonth(bookings);

      // Sort the data in ascending order of months
      dataset.sort((a, b) => d3.ascending(new Date(a[0]), new Date(b[0])));

      // selecting the canvas
      const svg = d3.select(svgContainer.current);

      // Domain for scaling for X and Y axis
      const maxY = d3.max(dataset, (data) => data[1]);
      const minX = d3.min(dataset, (data) => new Date(data[0]));
      const maxX = d3.max(dataset, (data) => new Date(data[0]));

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

      // This is the tooltip to show the numbers when we hover each bar in the chart
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

    // Calculate growth versus last month
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
