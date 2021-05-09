import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import AddEventModal from "./add-event-modal";
import CalendarHeader from "./calendar-header";
import DaysOfTheMonth from "./days-of-the-month";
import DaysOfTheWeek from "./days-of-the-week";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Roboto;
  }
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

const Calendar = () => (
  <>
    <GlobalStyle />
    <Container>
      <AddEventModal />
      <CalendarHeader />
      <CalendarBody>
        <DaysOfTheWeek />
        <DaysOfTheMonth />
      </CalendarBody>
    </Container>
  </>
);

export default Calendar;
