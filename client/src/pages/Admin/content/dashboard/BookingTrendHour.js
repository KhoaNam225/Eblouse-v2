import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";

import bookingsActions from "../../../../redux/actions/bookings.actions";
import LoadingSpinner from "../../../../components/LoadingSpinner";

import "../../../../style/BookingTrendHour.css";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

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

const BookingTrendHour = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const isLoading = useSelector((state) => state.bookings.isLoading);
  const user = useSelector((state) => state.auth.user);

  const svgContainer = useRef(null);

  useEffect(() => {
    dispatch(bookingsActions.getBookingsList(user._id));
  }, [dispatch]);

  useEffect(() => {
    if (
      !isLoading &&
      bookings !== undefined &&
      bookings.length > 0 &&
      svgContainer.current
    ) {
      const dataset = aggregateBookingByHour(bookings);

      const radius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) / 2 - 50;

      const pie = d3.pie().value((data) => data[1]);
      const dataReady = pie(dataset);
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

      const svg = d3.select(svgContainer.current);

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

      const arcs = chart
        .selectAll("arc")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("data-legend", (data) => data.data[0])
        .attr("fill", (data) => color(data.data[0]));

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

      svg
        .selectAll("dots")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", CANVAS_WIDTH - 100)
        .attr("cy", (data, index) => 10 + index * 30)
        .attr("r", 7)
        .style("fill", (data) => color(data[0]));

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

      svg
        .append("text")
        .text(`Total Bookings: ${bookings.length}`)
        .attr("x", CANVAS_WIDTH - 150)
        .attr("y", CANVAS_HEIGHT - 100)
        .style("font-weight", "bold");

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
