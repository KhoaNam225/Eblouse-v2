/**
 * Author:
 * File name: BookingTrendHour.js
 * Last date modified:
 * Purpose: This component will show a pie chart the trend in booking in terms of time frame.
 */
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";

import bookingsActions from "../../../../redux/actions/bookings.actions";
import LoadingSpinner from "../../../../components/LoadingSpinner";

import "../../../../style/BookingTrendHour.css";

// Some properties of the canvas
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

/**
 * Given all bookings of a clinic, returns an array containing each time frame and the number
 * of bookings made in each of them.
 *
 * @param {Array} bookings The array containing all bookings
 * @returns {Array} An array containing each time frame and the number of booking in each of them in the form
 *                [[time, number_of_bookings], [...], ...]
 */
const aggregateBookingByHour = (bookings) => {
  const map = new Map();

  bookings.map((booking) => {
    const startTime = new Date(booking.startTime);
    const hour = startTime.getHours();

    if (map.has(hour)) {
      const bookingNum = map.get(hour);
      map.set(hour, bookingNum + 1);
    } else {
      map.set(hour, 1);
    }

    return booking;
  });

  return [...map].sort((a, b) => d3.ascending(a[0], b[0]));
};

/**
 * This component will display a pie chart
 */
const BookingTrendHour = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings); // All bookings of that clinic
  const isLoading = useSelector((state) => state.bookings.isLoading);
  const user = useSelector((state) => state.auth.user); // The current clinic

  // This is the canvas where we will draw the chart on
  // We use userRef() because we want the bar chart to persist between component's lifecycle
  // and we can take a reference to the canvas object to perform some drawing on it
  const svgContainer = useRef(null);

  useEffect(() => {
    // When the page is loaded, we start getting data from the server
    dispatch(bookingsActions.getBookingsList(user._id));
  }, [dispatch]);

  useEffect(() => {
    // Once we have the data, we will draw the chart
    if (
      !isLoading &&
      bookings !== undefined &&
      bookings.length > 0 &&
      svgContainer.current
    ) {
      // From all bookings, we count how many bookings made in each time frame
      // We don't need the detail of each booking
      const dataset = aggregateBookingByHour(bookings);

      // The radius of the chart, this control how big the chart will be
      const radius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) / 2 - 50;

      // Convert the data source to the right format used by the pie chart
      // This will be done by d3 itself
      const pie = d3.pie().value((data) => data[1]);
      const dataReady = pie(dataset);

      // This is all the color used to distinguish the different timeframes
      const color = d3
        .scaleOrdinal()
        .domain(dataset.map((data) => data[0]))
        .range([
          "#ef4f4f",
          "#61b15a",
          "#e27802",
          "#23689b",
          "#ffc75f",
          "#845ec2",
        ]);

      // The canvas where we will draw the chart on
      const svg = d3.select(svgContainer.current);

      // The tooltip to show detail numbers when hover over each part of the pie chart
      const tooltip = d3
        .select("#tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0);

      const chart = svg
        .append("g")
        .attr(
          "transform",
          `translate(${CANVAS_WIDTH / 2}, ${CANVAS_HEIGHT / 2 - 20})`
        );

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      // For each time frame, draw an arc according to the number of bookings in each time frame
      const arcs = chart
        .selectAll("arc")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("data-legend", (data) => data.data[0])
        .attr("fill", (data) => color(data.data[0]));

      // Show the tooltip when hover over each part of the chart
      // and hide it when hover the mouse out of the chart
      arcs
        .on("mouseover", (event, data) => {
          const time = data.data[0];
          const bookingsNum = data.data[1];

          const timeString = time < 12 ? time + ":00 AM" : time + ":00 PM";

          tooltip
            .html(
              `
          <p><strong>Time: </strong>${timeString}</p>
          <p><strong>Bookings: </strong> ${bookingsNum}</p>
        `
            )
            .style("opacity", 0.8)
            .style("left", () => event.x + 50 + "px")
            .style("top", event.y - 100 + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

      // Drawing the legen for the chart
      // First, we draw a dot for each time frame, each with a different color
      svg
        .selectAll("dots")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", CANVAS_WIDTH - 100)
        .attr("cy", (data, index) => 10 + index * 30)
        .attr("r", 7)
        .style("fill", (data) => color(data[0]));

      // Then we write some text indicating which time frame correspond to which color
      svg
        .selectAll("legend-text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", CANVAS_WIDTH - 80)
        .attr("y", (data, index) => 16 + index * 30)
        .text((data) => {
          if (data[0] < 12) {
            return data[0] + ":00 AM";
          } else {
            return data[0] + ":00 PM";
          }
        })
        .style("fill", (data) => color(data[0]))
        .style("font-weight", "bold");

      // The total bookings we are considering in our dataset
      svg
        .append("text")
        .text(`Total Bookings: ${bookings.length}`)
        .attr("x", CANVAS_WIDTH - 150)
        .attr("y", CANVAS_HEIGHT - 100)
        .style("font-weight", "bold");

      // The label of the chart
      svg
        .append("text")
        .text("Percentage of Bookings By Hours")
        .attr("x", CANVAS_WIDTH / 2 - 125)
        .attr("y", CANVAS_HEIGHT - 10)
        .style("font-weight", "bold")
        .style("font-size", "1.1em");
    }
  }, [bookings]);

  if (isLoading) return <LoadingSpinner animation="border" color="danger" />;

  return (
    <div className="booking-trend-hour-wrapper">
      <div id="tooltip"></div>
      <div className="svg-container">
        <svg
          ref={svgContainer}
          className="d3-canvas"
          id="booking-trend-hour-chart"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
    </div>
  );
};

export default BookingTrendHour;
