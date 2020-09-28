import React from "react";
import styled from "styled-components";
import { getFormattedDateString } from "../utils";
import { Event } from "../types";
import Card from "./card/Card";

type Props = {
  selectedEventId?: string;
  selectEventId: Function;
  events: Event[];
};

const Wrapper = styled.div`
  overflow-y: auto;
  padding: 0.5rem;
  flex-grow: 1;
  align-content: stretch;
  display: flex;
  flex-direction: column;
`;

type EventCardProps = {
  selected: boolean;
};

const EventCard = styled.div<EventCardProps>`
  text-align: left;
  display: grid;
  row-gap: 0.5rem;
  padding: 0.5rem;
  padding-left:1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  background-color: #565979;
  color: #ddd;
  outline: 0;
  border: 2px solid ${(props) => (props.selected ? "#FF9A76" : "rgba(0,0,0,0)")};
  cursor: pointer;
  span {
    display: inline-flex;
    justify-content: space-between;
  };
  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.5rem;
  }
  transition: all 200ms linear;
`;

const MinorText = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
`;

export default function EventList({
  selectedEventId,
  selectEventId,
  events,
}: Props) {

  return (
    <Wrapper>
      {events.map((p) => {
        const { people, starts, duration } = p;
        return (
          <EventCard
            onClick={(e) => {
              selectEventId(p.id)
            }}
            selected={selectedEventId === p.id}
            key={p.id}
            data-name={p.id}
          >
            <span>
              <h2>{p.name}</h2>
              <MinorText>{getFormattedDateString(p.starts)}</MinorText>
            </span>
            <Card
                people={people}
                starts={starts}
                duration={duration}
            />
          </EventCard>
        );
      })}
    </Wrapper>
  );
}
