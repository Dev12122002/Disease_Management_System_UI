import React from "react";
import styled from "styled-components";
import Axios from "axios";

const DiseaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const DiseaseName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DiseaseInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const DiseaseComponent = (props) => {
  const { diseasName, typeOfDiseas, imageURL, diseasId } = props.Disease;

  return (
    <DiseaseContainer
      onClick={() => {
        props.onDiseaseSelect(diseasId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={imageURL} alt={diseasName} />
      <DiseaseName>{diseasName}</DiseaseName>
      <InfoColumn>
        <DiseaseInfo>Type : {typeOfDiseas}</DiseaseInfo>
      </InfoColumn>
    </DiseaseContainer>
  );
};
export default DiseaseComponent;