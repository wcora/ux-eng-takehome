import React from "react";
import styled from "styled-components";

import { getFormattedDateString } from "../utils";
import { Job } from "../types";
import ComputationIcon from "./status-bar/ComputationIcon";
import BiologicalIcon from "./status-bar/BiologicalIcon";
import MechanicalIcon from "./status-bar/MechanicalIcon";

type Props = {
    selectedEventId?: string;
    selectEventId: Function;
    jobs: Job[];
};

const Wrapper = styled.div`
  overflow-y: auto;
  padding: 0.5rem;
  flex-grow: 1;
  align-content: stretch;
  display: flex;
  flex-direction: column;
`;

const SkillWrapper = styled.div`
  display: grid;
  align-items: center;
  column-gap: 0.15rem;
  grid-template-columns: repeat(auto-fill, 20px);
  width: 134px;
`;

const SkillRating = styled.div`
  font-size: 0.9rem;
`;

type JobProps = {
    selected: boolean;
};

const JobCard = styled.div<JobProps>`
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
  border: 2px solid ${(props) => (props.selected ? "#af7f4c" : "rgba(0,0,0,0)")};
  cursor: pointer;
  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.5rem;
  }
  p {
    font-size:0.9rem;
    opacity:0.8;
    margin-bottom: 0 !important;
  }
`;


export default function JobList({selectedEventId,
                                    selectEventId,
                                    jobs,
                                }: Props) {

    return (
        <Wrapper>
            {jobs.map((p) => {
                const { id, estimatedHours, latestStartDate, skillReqs, credits } = p;
                return (
                    <JobCard
                        onClick={(e) => {
                            selectEventId(id)
                        }}
                        selected={selectedEventId === id}
                        key={id}
                        data-name={id}
                    >
                        <h2>{id}</h2>
                        <SkillWrapper>
                            <ComputationIcon />
                            <SkillRating>{skillReqs.computation}</SkillRating>
                            <BiologicalIcon />
                            <SkillRating> {skillReqs.biological}</SkillRating>
                            <MechanicalIcon />
                            <SkillRating>{skillReqs.mechanical}</SkillRating>
                        </SkillWrapper>
                        <p>Credits: {credits} credits</p>
                        <p>Start Date: {getFormattedDateString(latestStartDate)}</p>
                        <p>Estimated Hours: {estimatedHours}</p>

                    </JobCard>
                );
            })}
        </Wrapper>
    );
}
