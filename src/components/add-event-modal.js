import React, { useEffect, useRef } from "react";
import { any, bool, func, object, string } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import dateFns from "date-fns";
import styled, { withTheme } from "styled-components";
import { MdDelete, MdEvent } from "react-icons/md";
import uuid from "uuid/v4";
import Button from "./button";
import {
  addEvent,
  editEvent,
  removeEvent,
  setEventModalColor,
  setEventModalId,
  setEventModalTitle,
  toggleEventModal,
} from "../store/actions";

const dateFormat = "D MMM YYYY";

const ActionsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

const ColorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.625rem;
`;

const Day = styled.span`
  color: ${({ theme }) => theme.gray};
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

const DateContainer = styled.div`
  align-items: center;
  display: flex;
`;

const DateWrapper = styled.section`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  justify-content: space-between;
`;

const EventModal = styled.dialog`
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0.125rem 1rem 0.25rem ${({ theme }) => theme.transparentBlack};
  box-sizing: border-box;
  width: 24rem;

  ::backdrop {
    background: ${({ theme }) => theme.transparentBlack};
  }
`;

const Input = styled.input`
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  border-left: 0;
  border-right: 0;
  border-top: 0;
  font-size: 1.25rem;
  font-weight: 500;
  display: block;
  margin: 1rem 0 1px 0;
  padding: 0.125rem;
  width: 100%;

  :focus {
    border-bottom: 2px solid ${({ theme }) => theme.blue};
    margin-bottom: 0;
    outline: 0;
  }
`;

const AddEventModal = ({
  addEvent,
  color,
  day,
  editEvent,
  id,
  open,
  removeEvent,
  setEventModalColor,
  setEventModalId,
  setEventModalTitle,
  theme,
  title,
  toggleEventModal,
}) => {
  const modal = useRef(null);

  useEffect(() => {
    if (open) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [open]);

  const addNewEvent = (e) => {
    e.preventDefault();
    addEvent({
      payload: {
        color,
        date: day,
        id: uuid(),
        title,
      },
    });
    resetEvent();
    toggleEventModal({ payload: false });
  };

  const editExistingEvent = (e) => {
    e.preventDefault();
    editEvent({
      payload: {
        color,
        date: day,
        id,
        title,
      },
    });
    resetEvent();
    toggleEventModal({ payload: false });
  };

  const resetEvent = () => {
    setEventModalColor({ payload: "blue" });
    setEventModalId({ payload: null });
    setEventModalTitle({ payload: "" });
  };

  const saveEvent = (e) => {
    if (id !== null) {
      editExistingEvent(e);
    } else {
      addNewEvent(e);
    }
  };

  return (
    <EventModal ref={modal}>
      <form onSubmit={saveEvent}>
        <Input
          autoFocus
          maxLength={24}
          onChange={(e) => setEventModalTitle({ payload: e.target.value })}
          placeholder="Add title"
          required
          value={title}
        />
        <DateWrapper>
          <DateContainer>
            <MdEvent color={theme.gray} size="1.5rem" />
            <Day>{dateFns.format(day, dateFormat)}</Day>
          </DateContainer>
        </DateWrapper>
        <ColorsContainer>
          {id && (
            <MdDelete
              color={theme.gray}
              onClick={() => {
                toggleEventModal({ payload: false });
                removeEvent({ payload: id });
              }}
              size="1.5rem"
            />
          )}
        </ColorsContainer>
        <ActionsContainer>
          <Button
            onClick={(e) => {
              e.preventDefault();
              toggleEventModal({ payload: false });
              resetEvent();
            }}
          >
            Cancel
          </Button>
          <Button primary type="submit">
            Save
          </Button>
        </ActionsContainer>
      </form>
    </EventModal>
  );
};

AddEventModal.propTypes = {
  addEvent: func.isRequired,
  color: string.isRequired,
  day: object.isRequired,
  editEvent: func.isRequired,
  id: any,
  open: bool.isRequired,
  removeEvent: func.isRequired,
  setEventModalColor: func.isRequired,
  setEventModalId: func.isRequired,
  setEventModalTitle: func.isRequired,
  theme: object.isRequired,
  title: string.isRequired,
  toggleEventModal: func.isRequired,
};

const mapStateToProps = ({ eventModal }) => ({
  color: eventModal.color,
  day: eventModal.day,
  id: eventModal.id,
  open: eventModal.open,
  title: eventModal.title,
});

const mapDispatchToProps = {
  addEvent,
  editEvent,
  removeEvent,
  setEventModalColor,
  setEventModalId,
  setEventModalTitle,
  toggleEventModal,
};

export default compose(
  withTheme,
  connect(mapStateToProps, mapDispatchToProps)
)(AddEventModal);
