import React from "react";
import { arrayOf, func, object } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import dateFns from "date-fns";
import styled, { withTheme } from "styled-components";
import uuid from "uuid/v4";
import chunk from "lodash/chunk";
import { MdClose } from "react-icons/md";
import {
  removeEvent,
  setEventModalColor,
  setEventModalDay,
  setEventModalId,
  setEventModalTitle,
  toggleEventModal,
} from "../store/actions";

const dayFormat = "D";
const daysOfTheWeek = 7;

const Close = styled(MdClose)`
  cursor: pointer;
`;

const Day = styled.div`
  border-right: 1px solid ${({ theme }) => theme.lightGray};
  overflow: hidden;
  width: calc(100% / ${daysOfTheWeek});

  :hover {
    background: ${({ theme }) => theme.lightGray}33;
    cursor: pointer;
  }
`;

const Event = styled.div`
  align-items: center;
  background: red;
  border-radius: 0.125rem;
  color: ${({ theme }) => theme.white};
  display: flex;
  font-size: 0.75rem;
  justify-content: space-between;
  margin: 0 0.125rem 1px 0.125rem;
  padding: 0.125rem 0.25rem;
  text-shadow: 0 1px 1px ${({ theme }) => theme.transparentBlack};
`;

const EventsOfTheDay = styled.div`
  height: calc(100% - 2.5rem);
  overflow-y: auto;
`;

const Week = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  display: flex;
  height: ${({ numberOfWeeks }) => `calc(100% / ${numberOfWeeks})`};

  ${Day}:last-child {
    border-right: 0;
  }
`;

const Month = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${Week}:last-child {
    border-bottom: 0;
  }
`;

const DayHeader = styled.div`
  align-items: center;
  display: flex;
  height: 2.125rem;
  justify-content: center;
  padding: 0.25rem 0;
`;

const DayNumber = styled.h5`
  ${({ isToday, theme }) =>
    isToday
      ? `
      background: ${theme.red};
      border-radius: 50%;
      color: ${theme.white};
    `
      : `color: ${theme.black};`}
  font-variant-numeric: tabular-nums;
  font-weight: 400;
  height: 1.625rem;
  line-height: 1.625rem;
  margin: 0;
  text-align: center;
  width: 1.625rem;
`;

const DaysOfTheMonth = ({
  currentMonth,
  events,
  removeEvent,
  setEventModalColor,
  setEventModalDay,
  setEventModalId,
  setEventModalTitle,
  theme,
  toggleEventModal,
}) => {
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(currentMonth);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const allDaysOfTheMonth = [
    ...Array(dateFns.differenceInDays(endDate, startDate) + 1).keys(),
  ].map((index) => {
    const day = dateFns.addDays(startDate, index);
    const isToday = dateFns.isSameDay(day, new Date());

    const openEditModal = ({ color, date, hour, id, title }) => {
      setEventModalColor({ payload: color });
      setEventModalDay({ payload: date });
      setEventModalId({ payload: id });
      setEventModalTitle({ payload: title });
      toggleEventModal({ payload: true });
    };

    return (
      <Day
        key={uuid()}
        onClick={() => {
          setEventModalDay({ payload: day });
          toggleEventModal({ payload: true });
        }}
      >
        <DayHeader>
          <DayNumber isToday={isToday}>
            {dateFns.format(day, dayFormat)}
          </DayNumber>
        </DayHeader>
        <EventsOfTheDay>
          {events
            .filter((event) => dateFns.isSameDay(day, event.date))
            .map((event) => (
              <Event
                color={event.color}
                key={uuid()}
                onClick={() => openEditModal(event)}
              >
                <span>{event.title}</span>
                <Close
                  color={theme.white}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEvent({ payload: event.id });
                  }}
                />
              </Event>
            ))}
        </EventsOfTheDay>
      </Day>
    );
  });

  return (
    <Month>
      {chunk(allDaysOfTheMonth, daysOfTheWeek).map((week, index, array) => (
        <Week key={uuid()} numberOfWeeks={array.length}>
          {week}
        </Week>
      ))}
    </Month>
  );
};

DaysOfTheMonth.propTypes = {
  currentMonth: object.isRequired,
  events: arrayOf(object).isRequired,
  removeEvent: func.isRequired,
  setEventModalColor: func.isRequired,
  setEventModalDay: func.isRequired,
  setEventModalId: func.isRequired,
  setEventModalTitle: func.isRequired,
  theme: object.isRequired,
  toggleEventModal: func.isRequired,
};

const mapStateToProps = ({ events, months }) => ({
  currentMonth: months.currentMonth,
  events,
});

const mapDispatchToProps = {
  removeEvent,
  setEventModalColor,
  setEventModalDay,
  setEventModalId,
  setEventModalTitle,
  toggleEventModal,
};

export default compose(
  withTheme,
  connect(mapStateToProps, mapDispatchToProps)
)(DaysOfTheMonth);
