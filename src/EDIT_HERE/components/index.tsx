import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import data from "../data";

import Donut from "./Donut";
import EventList from "./EventList";
import JobList from "./JobList";
import Timeline from "./Timeline.js";
import StatusBar from "./status-bar";
import Tabs from "./Tabs/Tabs";
import Sort from "./Atomics/Sort";

import {scrollTo} from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  color: #ddd;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: auto 1fr;
  box-shadow: 0px 4px 40px 4px rgba(0, 0, 0, 0.9);
  background-color: #252940;
  p {
    margin-bottom: 1rem;
  }
  li {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  label {
    font-size: 0.7rem;
    opacity: 0.8;
  }
`;

const LeftPanel = styled.section`
  background-color: #565979;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

const SortWrapper = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 0.8rem;
  cursor: pointer;
`

const EditThisComponent = () => {
  let [selectedEventId, selectEventId] = useState();
  const [dataToShow, updateData] = useState([...data.parties]);
  const [jobToShow, updateJob] = useState([...data.jobs]);

  const sortData = (order, type) => {
    console.log(order)
    if (type === "parties") {
      if (order[0] === "affinity") {
        /* Sort by average affinity score */
        let ave = (party) => {
          const numPeople = party.people.length;
          const sum = party.people.reduce((acc, cur) => acc+cur.affinityToMe, 5);
          return sum / numPeople; // sort by total affinity score / total number of people in the group
        };
        let newData = data.parties.sort((p1, p2) => ave(p2) - ave(p1));
        updateData(newData);
      } else {
        /* Sort by other rules */
        let newData = _.orderBy(dataToShow, order);
        updateData(newData);
      }
    } else {
      let newData = _.orderBy(jobToShow, order).reverse();
      updateJob(newData);
    }
  }

  const randomEvent = () => {
    const rand = Math.floor(Math.random() * data.parties.length);
    console.log(rand);
    selectedEventId = data.parties[rand].id;
    selectEventId(selectedEventId);
    scrollTo(selectedEventId);
  }

  const eventLabel = { label: "Events" }
  const jobLabel = { label:"Jobs" }

  return (
    <Wrapper>
      <LeftPanel>
        <StatusBar
          skills={data.skills}
          credits={data.credits}
          creditsPerHour={data.creditsPerHour}
        />
        <Donut
          parties={data.parties}
          width={520}
          height={520}
          currentArc={data.currentArc}
          currentRadius={data.currentRadius}
          selectEventId={(id: string) =>
              selectEventId(id === selectedEventId ? null : id)
          }
          selectedEventId={selectedEventId}
        />
        <Timeline findEvent={ randomEvent }/>
      </LeftPanel>

      <Tabs>
        <div {...eventLabel} >
          <EventList
              selectedEventId={selectedEventId}
              selectEventId={(id: string) => selectEventId(id === selectedEventId ? null : id)}
              events={dataToShow}
          />
          <SortWrapper>
            <Sort content="parties" sortBy={sortData}/>
          </SortWrapper>
        </div>

        <div {...jobLabel}>

          <JobList
              selectedEventId={selectedEventId}
              selectEventId={(id: string) => selectEventId(id === selectedEventId ? null : id)}
              jobs={jobToShow}
          />
          <SortWrapper>
            <Sort content="jobs" sortBy={sortData}/>
          </SortWrapper>
        </div>

      </Tabs>



    </Wrapper>
  );
};

export default EditThisComponent;
