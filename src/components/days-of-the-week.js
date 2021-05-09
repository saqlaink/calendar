import React from "react";
import { object } from "prop-types";
import { connect } from "react-redux";
import dateFns from "date-fns";
import styled from "styled-components";
import uuid from "uuid/v4";

const dayFormat = "ddd";
const daysOfTheWeek = 7;

const DayOfTheWeek = styled.h4`
  border-right: 1px solid ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.gray};
  flex-grow: 1;
  font-size: 0.75rem;
  font-weight: 400;
  margin: 0;
  padding: 0.25rem 0;
  text-align: center;
  text-transform: uppercase;
  width: calc(100% / ${daysOfTheWeek});
`;

const StyledDaysOfTheWeek = styled.div`
  display: flex;

  ${DayOfTheWeek}:last-child {
    border-right: 0;
  }
`;

const DaysOfTheWeek = ({ currentMonth }) => (
  <StyledDaysOfTheWeek>
    {[...Array(daysOfTheWeek).keys()].map(day => (
      <DayOfTheWeek key={uuid()}>
        {dateFns.format(
          dateFns.addDays(dateFns.startOfWeek(currentMonth), day),
          dayFormat
        )}
      </DayOfTheWeek>
    ))}
  </StyledDaysOfTheWeek>
);

DaysOfTheWeek.propTypes = {
  currentMonth: object.isRequired
};

const mapStateToProps = ({ months }) => ({
  currentMonth: months.currentMonth
});

export default connect(mapStateToProps)(DaysOfTheWeek);
