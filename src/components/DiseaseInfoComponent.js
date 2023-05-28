import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { API_KEY } from "./Home";
import styled from "styled-components";
import { toast } from 'react-hot-toast';
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 450px;
  width : 400px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  margin-left : 30px;
  min-width: 300px;
`;
const DiseaseName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const DInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  min-width: 2.5%;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
  text-align: center;

  &:hover {
    opacity: 0.5;
    background: black;
    color: white;
  }
`;

const Buttons = styled.div`
    width: 300px;
    display: flex;
`;
const DiseaseInfoComponent = (props) => {
    const [DiseaseInfo, setDiseaseInfo] = useState();
    const { selectedDisease } = props;

    const [JwtToken, setJwtToken] = useState(null);

    const navigate = useNavigate();
    const fetchOneDiseas = async () => {
        var response = await Axios.get(`/api/Diseas/${selectedDisease}`);

        response.data.bodyparts = ""
        response.data.reports = ""
        response.data.medicines = ""

        var bodyparts = await Axios.get(`/api/BodyParts/DiseasId=${selectedDisease}`);

        for (var i = 0; i < bodyparts.data.length - 1; i++) {
            response.data.bodyparts = response.data.bodyparts + bodyparts.data[i].bodypartName + ", ";
        }
        response.data.bodyparts = response.data.bodyparts + bodyparts.data[bodyparts.data.length - 1].bodypartName;


        var reports = await Axios.get(`/api/Reports/DiseasId=${selectedDisease}`);

        for (let i = 0; i < reports.data.length - 1; i++) {
            response.data.reports = response.data.reports + reports.data[i].reportName + ", ";
        }
        response.data.reports = response.data.reports + reports.data[i].reportName;

        var medicines = await Axios.get(`/api/Medicines/DiseasId=${selectedDisease}`);

        console.log(medicines.data)

        for (let i = 0; i < medicines.data.length - 1; i++) {
            response.data.medicines = response.data.medicines + medicines.data[i].medicineName + ", ";
        }
        response.data.medicines = response.data.medicines + medicines.data[i].medicineName;

        setDiseaseInfo(response.data)
    }

    useEffect(() => {
        fetchOneDiseas();
    }, [selectedDisease]);

    useEffect(() => {
        const JwtToken = AuthService.getCurrentUserJWT();
        if (JwtToken != null) {
            setJwtToken(JwtToken);
        }

    }, []);

    const DeleteDisease = async () => {
        await Axios.delete(`/api/DiseasBodyParts/DiseasId=${selectedDisease}`, { headers: authHeader() }).then(async (res) => {
            await Axios.delete(`/api/DiseasMedicines/DiseasId=${selectedDisease}`, { headers: authHeader() }).then(async (res) => {
                await Axios.delete(`/api/DiseasReports/DiseasId=${selectedDisease}`, { headers: authHeader() }).then(async (res) => {
                    await Axios.delete(`/api/Diseas/${selectedDisease}`, { headers: authHeader() }).then((res) => {
                        toast.success("Diseas deleted successfully");
                    });
                });
            });
        });

        window.location.reload();
    }

    const EditDisease = () => {
        navigate(`/Disease/UpdateDisease/${selectedDisease}`);
    }

    return (
        <Container>
            {DiseaseInfo ? (
                <>
                    <CoverImage src={DiseaseInfo?.imageURL} alt={DiseaseInfo?.diseasName} />
                    <InfoColumn>
                        <DiseaseName>
                            <span>{DiseaseInfo?.diseasName}</span>
                        </DiseaseName>
                        <DInfo>
                            Age Range: <span>{DiseaseInfo?.ageRangeStart} - {DiseaseInfo?.ageRangeEnd}</span>
                        </DInfo>
                        <DInfo>
                            Targeted Body Part: <span>{DiseaseInfo?.bodyparts}</span>
                        </DInfo>
                        <DInfo>
                            Reports Tobe Done: <span>{DiseaseInfo?.reports}</span>
                        </DInfo>
                        <DInfo>
                            Medicines: <span>{DiseaseInfo?.medicines}</span>
                        </DInfo>
                        <DInfo>
                            Death Rate: <span>{DiseaseInfo?.deathRate} %</span>
                        </DInfo>
                        <DInfo>
                            Discovery Date: <span>{DiseaseInfo?.discoveryDate}</span>
                        </DInfo>
                        <DInfo>
                            Source: <span>{DiseaseInfo?.diseasSource}</span>
                        </DInfo>
                        <DInfo>
                            Gender: <span>{DiseaseInfo?.gender === "B" ? "Male, Female" : DiseaseInfo?.gender === "M" ? "Male" : "Female"}</span>
                        </DInfo>
                        <DInfo>
                            Infection Rate: <span>{DiseaseInfo?.infectionRate} %</span>
                        </DInfo>
                        <DInfo>
                            Self Curable ? : <span>{DiseaseInfo?.isSelfCurable ? "Yes" : "No"}</span>
                        </DInfo>
                        <DInfo>
                            Precautions: <span>{DiseaseInfo?.precautions}</span>
                        </DInfo>
                        {/* <DInfo>
                            Recovery Time: <span>{DiseaseInfo?.recoveryTime} Days</span>
                        </DInfo>
                        <DInfo>
                            Spreading Ways: <span>{DiseaseInfo?.spreadingWays}</span>
                        </DInfo>
                        <DInfo>
                            Symptoms : <span>{DiseaseInfo?.symptoms}</span>
                        </DInfo>
                        <DInfo>
                            Disease Type: <span>{DiseaseInfo?.typeOfDiseas}</span>
                        </DInfo>
                        <DInfo>
                            Infection Type : <span>{DiseaseInfo?.typeOfInfection}</span>
                        </DInfo>
                        <DInfo>
                            Vaccine Name : <span>{DiseaseInfo?.vaccineName}</span>
                        </DInfo> */}
                    </InfoColumn>
                    <InfoColumn>
                        {/* <DInfo>
                            Self Curable ? : <span>{DiseaseInfo?.isSelfCurable ? "Yes" : "No"}</span>
                        </DInfo> */}
                        <DInfo>
                            Recovery Time: <span>{DiseaseInfo?.recoveryTime} Days</span>
                        </DInfo>
                        <DInfo>
                            Spreading Ways: <span>{DiseaseInfo?.spreadingWays}</span>
                        </DInfo>
                        <DInfo>
                            Disease Type: <span>{DiseaseInfo?.typeOfDiseas}</span>
                        </DInfo>
                        <DInfo>
                            Infection Type : <span>{DiseaseInfo?.typeOfInfection}</span>
                        </DInfo>
                        <DInfo>
                            Symptoms : <span>{DiseaseInfo?.symptoms}</span>
                        </DInfo>
                        <DInfo>
                            Vaccine Name : <span>{DiseaseInfo?.vaccineName}</span>
                        </DInfo>
                        {JwtToken &&
                            <Buttons className="d-flex justify-content-left buttons">
                                <button type="button" className="btn btn-danger mt-3 w-50 p-2" onClick={DeleteDisease}>Delete</button>
                                <button type="button" className="btn btn-secondary mx-3 mt-3 w-50 p-2" onClick={EditDisease}>Edit</button>
                            </Buttons>
                        }
                    </InfoColumn>
                    <Close onClick={() => props.onDiseaseSelect()}>X</Close>
                </>
            ) : (
                "Loading..."
            )}
        </Container>
    );
};
export default DiseaseInfoComponent;