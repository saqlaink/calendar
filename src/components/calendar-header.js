import React from "react";
import { func, object } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import dateFns from "date-fns";
import styled, { withTheme } from "styled-components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import {
  setNextMonth,
  setPrevMonth,
  setCurrentMonth,
  setPrevYear,
  setNextYear,
} from "../store/actions";

const monthFormat = "MMMM YYYY";

const arrowStyle = (theme) => `
  border-radius: 50%;
  padding: 0.25rem;
  transition: background 200ms ease;
  
  :hover {
    background: ${theme.lightGray};
    cursor: pointer;
  }
`;

const ArrowLeft = styled(MdKeyboardArrowLeft)`
  ${({ theme }) => arrowStyle(theme)}
`;

const ArrowRight = styled(MdKeyboardArrowRight)`
  ${({ theme }) => arrowStyle(theme)}
`;

const CurrentMonth = styled.h2`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  margin: 0;
`;

const StyledCalendarHeader = styled.header`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  display: flex;
  padding: 1rem 2rem;
`;

const CalendarHeader = ({
  currentMonth,
  setNextMonth,
  setPrevMonth,
  setNextYear,
  setPrevYear,
  theme,
}) => (
  <StyledCalendarHeader>
    <CurrentMonth>{dateFns.format(currentMonth, monthFormat)}</CurrentMonth>
    <ArrowLeft color={theme.black} onClick={setPrevYear} size="2rem" />
    <ArrowLeft color={theme.black} onClick={setPrevMonth} size="1.5rem" />
    <ArrowRight color={theme.black} onClick={setNextMonth} size="1.5rem" />
    <ArrowRight color={theme.black} onClick={setNextYear} size="2rem" />
  </StyledCalendarHeader>
);

CalendarHeader.propTypes = {
  currentMonth: object.isRequired,
  setCurrentMonth: func.isRequired,
  setNextMonth: func.isRequired,
  setPrevMonth: func.isRequired,
  theme: object.isRequired,
};

const mapStateToProps = ({ months }) => ({
  currentMonth: months.currentMonth,
});

const mapDispatchToProps = {
  setNextMonth,
  setPrevMonth,
  setCurrentMonth,
  setNextYear,
  setPrevYear,
};

export default compose(
  withTheme,
  connect(mapStateToProps, mapDispatchToProps)
)(CalendarHeader);
