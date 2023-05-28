import React from 'react'
import Axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
// import Dropdown from 'react-bootstrap/Dropdown';
import { Multiselect } from 'multiselect-react-dropdown';
import { toast } from 'react-hot-toast';
import { useParams } from "react-router";
// import cloudinary from "cloudinary/lib/cloudinary";
// import DateTimeField from 'react-bootstrap-datetimepicker';

// import {
//     MDBBtn,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBInput,
//     MDBCheckbox,
//     MDBTextArea
// }
//     from 'mdb-react-ui-kit';

import "./AddDisease.css"

export default function AddDisease() {

    const navigate = useNavigate();

    const inputFile = React.createRef();

    const [medicines, setMedicines] = useState();

    const [reports, setReports] = useState();

    const [bodyparts, setBodyParts] = useState();

    const [selectedImage, setSelectedImage] = useState(null);

    const [publicId, setPublicId] = useState(null);
    // const [imageUrl, setImageUrl] = useState("https://cdn.pixabay.com/photo/2017/01/18/17/39/cloud-computing-1990405__340.png");
    let { id } = useParams();

    const [formValue, setFormValue] = useState({
        imageURL: 'https://cdn.pixabay.com/photo/2017/01/18/17/39/cloud-computing-1990405__340.png',
        diseasName: '',
        symptoms: '',
        gender: '',
        ageRangeStart: 1,
        ageRangeEnd: 100,
        discoveryDate: "2023-04-02T06:48:04.506Z",
        infectionRate: 0,
        deathRate: 0,
        spreadingWays: '',
        typeOfInfection: '',
        typeOfDiseas: '',
        isSelfCurable: false,
        vaccineName: '',
        recoveryTime: 1,
        diseasSource: '',
        precautions: '',
    });

    const [selectedMedicines, setSelectedMedicines] = useState();
    const [selectedReports, setSelectedReports] = useState();
    const [selectedBodyParts, setSelectedBodyParts] = useState();
    const [preBodyParts, setPreBodyParts] = useState();
    const [preMedicines, setPreMedicines] = useState();
    const [preReports, setPreReports] = useState();

    const onSubmit = async (e) => {
        // console.log(selectedBodyParts);
        // console.log("formValue", formValue)
        // console.log("selectedMedicines", selectedMedicines)
        // console.log("selectedReports", selectedReports)

        if (id == undefined && selectedImage == null) {
            toast.error("Please select Disease image");
            return;
        }
        else if (formValue.diseasName == '') {
            toast.error("Disease Name is required");
            return;
        }
        else if (formValue.symptoms == '') {
            toast.error("Symptoms are required");
            return;
        }
        else if (formValue.gender == '') {
            toast.error("Gender is required");
            return;
        }

        else if (formValue.spreadingWays == '') {
            toast.error("Spreading Ways are required");
            return;
        }
        else if (formValue.typeOfInfection == '') {
            toast.error("Infection Type is required");
            return;
        }
        else if (formValue.typeOfDiseas == '') {
            toast.error("Disease Type is required");
            return;
        }

        else if (formValue.vaccineName == '') {
            toast.error("Vaccine names are required");
            return;
        }
        else if (formValue.recoveryTime == '') {
            toast.error("Recovery time is required");
            return;
        }
        else if (formValue.diseasSource == '') {
            toast.error("Disease source is required");
            return;
        }
        else if (formValue.precautions == '') {
            toast.error("Precautions are required");
            return;
        }
        else if (formValue.ageRangeStart == '' || formValue.ageRangeEnd == '') {
            toast.error("Age range is required");
            return;
        }
        else if (formValue.ageRangeStart > formValue.ageRangeEnd) {
            toast.error("Incorrect starting and ending age range");
            return;
        }
        else if (selectedMedicines == null) {
            toast.error("Please select Medicines");
            return;
        }
        else if (selectedReports == null) {
            toast.error("Please select Reports");
            return;
        }
        else if (selectedBodyParts == null) {
            toast.error("Please select Body parts");
            return;
        }

        if (id !== undefined) {
            await Axios.put(`/api/Diseas/${id}`, formValue, { headers: authHeader() }).then((response) => {
                console.log(response);
            });

            await Axios.delete(`/api/DiseasMedicines/DiseasId=${id}`, { headers: authHeader() }).then(async (res) => {
                await Axios.delete(`/api/DiseasReports/DiseasId=${id}`, { headers: authHeader() }).then(async (res) => {
                    await Axios.delete(`/api/DiseasBodyParts/DiseasId=${id}`, { headers: authHeader() }).then((res) => {
                        // toast.success("Diseas deleted successfully");
                    });
                });
            });

            selectedBodyParts.map(async (BodyPart, index) => {
                const response1 = await Axios.post("/api/DiseasBodyParts", { "diseasId": id, "bodypartId": BodyPart.bodypartId }, { headers: authHeader() }).catch((error) => {
                    toast.error("Something went wrong");
                });
                console.log(response1);
            });

            selectedReports.map(async (Report, index) => {
                const response1 = await Axios.post("/api/DiseasReports", { "diseasId": id, "reportId": Report.reportId }, { headers: authHeader() }).catch((error) => {
                    toast.error("Something went wrong");
                });
                console.log(response1);
            });

            selectedMedicines.map(async (Medicine, index) => {
                const response1 = await Axios.post("/api/DiseasMedicines", { "diseasId": id, "medicineId": Medicine.medicineId }, { headers: authHeader() }).catch((error) => {
                    toast.error("Something went wrong");
                });
                console.log(response1);
            });
            toast.success("Diseas Updated Successfully");
        }
        else {
            const response = await Axios.post("/api/Diseas", formValue, { headers: authHeader() }).then((response) => {
                console.log(response);

                selectedBodyParts.map(async (BodyPart, index) => {
                    const response1 = await Axios.post("/api/DiseasBodyParts", { "diseasId": response.data.diseasId, "bodypartId": BodyPart.bodypartId }, { headers: authHeader() }).catch((error) => {
                        toast.error("Something went wrong");
                    });
                    console.log(response1);
                });

                selectedReports.map(async (Report, index) => {
                    const response1 = await Axios.post("/api/DiseasReports", { "diseasId": response.data.diseasId, "reportId": Report.reportId }, { headers: authHeader() }).catch((error) => {
                        toast.error("Something went wrong");
                    });
                    console.log(response1);
                });

                selectedMedicines.map(async (Medicine, index) => {
                    const response1 = await Axios.post("/api/DiseasMedicines", { "diseasId": response.data.diseasId, "medicineId": Medicine.medicineId }, { headers: authHeader() }).catch((error) => {
                        toast.error("Something went wrong");
                    });
                    console.log(response1);
                });
                toast.success("Diseas Added Successfully");
            }).catch((error) => {
                toast.error("Something went wrong");
            });
        }

    }

    const changeImage = async (e) => {

        setFormValue({ ...formValue, "imageURL": "/react-Disease-app/loading.gif" });

        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'disease-uploads');
        console.log("submit");
        const data = await fetch('https://api.cloudinary.com/v1_1/dgvfrughp/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json()).catch((error) => {
            toast.error("Something went wrong");
        });

        setFormValue({ ...formValue, "imageURL": data.secure_url });
        setSelectedImage(e.target.files[0])

        console.log(data);

        // if (publicId != null) {
        //     cloudinary.v2.uploader.destroy(publicId, function (error, result) {
        //         console.log(result, error)
        //     })
        //         .then(resp => console.log(resp))
        //         .catch(_err => console.log("Something went wrong, please try again later."));
        // }

        setPublicId(data.public_id);
    }

    const fetchData = async () => {
        if (id != undefined) {
            console.log("id", id);
            const disease = await Axios.get(`/api/Diseas/${id}`);
            console.log(disease["data"]);
            setFormValue(disease["data"]);

            var bparts = await Axios.get(`/api/BodyParts/DiseasId=${id}`);
            // console.log(preBodyParts["data"]);
            setPreBodyParts(bparts["data"]);

            var reports = await Axios.get(`/api/Reports/DiseasId=${id}`);
            // console.log(reports["data"]);
            setPreReports(reports["data"]);

            var medicines = await Axios.get(`/api/Medicines/DiseasId=${id}`);
            // console.log(medicines["data"]);
            setPreMedicines(medicines["data"]);

            setSelectedBodyParts(bparts["data"]);
            setSelectedMedicines(medicines["data"]);
            setSelectedReports(reports["data"]);
        }
        const BodyParts = await Axios.get("/api/BodyParts");
        // console.log(BodyParts["data"]);
        setBodyParts(BodyParts["data"]);

        const Medicines = await Axios.get("/api/Medicines");
        // console.log(Medicines["data"]);
        setMedicines(Medicines["data"]);

        const Reports = await Axios.get("/api/Reports");
        // console.log(Reports["data"]);
        setReports(Reports["data"]);
    };

    useEffect(() => {
        const JwtToken = AuthService.getCurrentUserJWT();
        // console.log("token", JwtToken)
        if (JwtToken == null) {
            navigate("/login");
        }

        fetchData();


    }, [])

    // useEffect(() => {
    //     if (selectedImage) {
    //         // setImageUrl(URL.createObjectURL(selectedImage));
    //         setFormValue({ ...formValue, "imageURL": URL.createObjectURL(selectedImage) });
    //     }
    // }, [selectedImage]);

    const onSelectReport = (selectedList, selectedItem) => {
        // console.log("selectedList", selectedList)
        setSelectedReports(selectedList)
    }

    const onRemoveReport = (selectedList, removedItem) => {
        // console.log("selectedList", selectedList)
        setSelectedReports(selectedList)
    }
    const onSelectMedicine = (selectedList, selectedItem) => {
        console.log("selectedList", selectedList)
        setSelectedMedicines(selectedList)
    }

    const onRemoveMedicine = (selectedList, removedItem) => {
        // console.log("selectedList", selectedList)
        setSelectedMedicines(selectedList)
    }
    const onSelectBodypart = (selectedList, selectedItem) => {
        // console.log("selectedList", selectedList)
        setSelectedBodyParts(selectedList)
    }

    const onRemoveBodypart = (selectedList, removedItem) => {
        // console.log("selectedList", selectedList)
        setSelectedBodyParts(selectedList)
    }

    const openFileBrowser = () => {
        // console.log("open file browser")
        inputFile.current.click();
    }

    const onChange = (e) => {
        var value = e.target.value;

        if (e.target.name == "ageRangeStart" || e.target.name == "ageRangeEnd" || e.target.name == "recoveryTime") {
            value = parseInt(value);
        }
        if (e.target.name == "infectionRate" || e.target.name == "deathRate") {
            value = parseFloat(value);
        }
        setFormValue({ ...formValue, [e.target.name]: value });
    };

    const changeSwitch = (e) => {
        setFormValue({ ...formValue, "isSelfCurable": e.target.checked });
    }

    const genderChange = (e) => {
        // let isChecked = e.target.checked;
        // console.log(e.target.value)
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Header />

            <div className="container-fluid py-5 h-100 add-diseas-container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="card-body p-md-5 mx-md-4">

                                        <input
                                            type="file"
                                            name="imageURL"
                                            className="custom-file-input"
                                            id="inputGroupFile01"
                                            aria-describedby="inputGroupFileAddon01"
                                            hidden={true}
                                            accept="image/png, image/jpeg, , image/jpg"
                                            ref={inputFile}
                                            onChange={changeImage}
                                        />

                                        <div className="text-center imgselect">
                                            <img src={formValue.imageURL} className="DiseasImg" alt="logo" onClick={openFileBrowser} />
                                            {!selectedImage && <p className="mt-1 mb-3 pb-1">Select Diseas Image</p>}
                                        </div>

                                        <form>
                                            <div className="form-floating mb-4">
                                                <input type="text" id="dName" className="form-control"
                                                    placeholder="Disease Name" onChange={onChange} value={formValue.diseasName} name="diseasName" />
                                                <label className="form-label" for="dName">Disease Name</label>
                                            </div>
                                            <div className="form-floating mb-4">
                                                <label for="symptoms" className="form-label">Symptoms</label>
                                                <textarea className="form-control" placeholder="Symptoms" id="symptoms" rows="3" onChange={onChange} value={formValue.symptoms} name="symptoms" ></textarea>
                                            </div>

                                            {/* <div className="form-floating mb-4">
                                                <input type="text" id="infectionrate" className="form-control"
                                                    placeholder="Infection Rate" onChange={onChange} name="infectionRate" value={formValue.infectionRate} />
                                                <label className="form-label" for="infectionrate">Infection Rate</label>
                                            </div> */}

                                            {/* <div className="form-floating mb-4">
                                                <input type="text" id="deathrate" className="form-control"
                                                    placeholder="Death Rate" onChange={onChange} name="deathRate" value={formValue.deathRate} />
                                                <label className="form-label" for="deathrate">Death Rate</label>
                                            </div> */}

                                            <div className="form-floating mb-4">
                                                <input type="text" id="sWays" className="form-control"
                                                    placeholder="Spreading Ways" onChange={onChange} name="spreadingWays" value={formValue.spreadingWays} />
                                                <label className="form-label" for="sWays">Spreading Ways</label>
                                            </div>

                                            <div className="form-floating mb-4">
                                                <input type="text" id="infectionType" className="form-control"
                                                    placeholder="Infection Type" onChange={onChange} name="typeOfInfection" value={formValue.typeOfInfection} />
                                                <label className="form-label" for="infectionType">Infection Type</label>
                                            </div>

                                            <div className="form-floating mb-4">
                                                <input type="text" id="diseaseType" className="form-control"
                                                    placeholder="Disease Type" onChange={onChange} name="typeOfDiseas" value={formValue.typeOfDiseas} />
                                                <label className="form-label" for="diseaseType">Disease Type</label>
                                            </div>

                                            {/* <div className="form-floating mb-4">
                                                <input type="text" id="isSelfCurable" className="form-control"
                                                    placeholder="Is Self Curable(y or n)" onChange={onChange} name="isSelfCurable" value={formValue.isSelfCurable} />
                                                <label className="form-label" for="isSelfCurable">Is Self Curable(y or n)</label>
                                            </div> */}


                                            <div className="form-floating mb-4">
                                                <input type="text" id="vName" className="form-control"
                                                    placeholder="Vaccine Name" onChange={onChange} name="vaccineName" value={formValue.vaccineName} />
                                                <label className="form-label" for="vName">Vaccine Name</label>
                                            </div>

                                            <div className="form-floating mb-4">
                                                <input type="text" id="dSource" className="form-control"
                                                    placeholder="Disease Source" onChange={onChange} name="diseasSource" value={formValue.diseasSource} />
                                                <label className="form-label" for="dSource">Disease Source</label>
                                            </div>
                                        </form>

                                        <div className="form-floating mb-4">
                                            <label for="precautions" className="form-label">Precautions</label>
                                            <textarea className="form-control" placeholder="Precautions" id="precautions" rows="3" onChange={onChange} name="precautions" value={formValue.precautions}></textarea>
                                        </div>

                                        {/* <div className="form-floating mb-4">
                                            <input type="text" id="rTime" className="form-control"
                                                placeholder="Recovery Time (Days)" onChange={onChange} name="recoveryTime" value={formValue.recoveryTime} />
                                            <label className="form-label" for="rTime">Recovery Time (Days)</label>
                                        </div> */}
                                        <div className='d-flex rate'>
                                            <div className='d-flex rate-in'>
                                                <div className="form-floating-block mb-4 label">
                                                    <label className="form-label">Recovery Time : </label>
                                                </div>
                                                <div className="form mb-4 check">
                                                    <input type="number" min={1} id="recoveryTime" className="form-control w-100"
                                                        onChange={onChange} name="recoveryTime" value={formValue.recoveryTime} />
                                                    <label className="form-label" for="recoveryTime"></label>
                                                </div>
                                            </div>
                                            <div className='d-flex rate-in'>
                                                <div className="form-floating-block mb-4 label">
                                                    <label className="form-label">Infection Rate : </label>
                                                </div>
                                                <div className="form mb-4 check number">
                                                    <input type="number" min={1} max={100} id="infectionRate" className="form-control w-100"
                                                        onChange={onChange} name="infectionRate" value={formValue.infectionRate} />
                                                    <label className="form-label" for="infectionRate"></label>
                                                </div>
                                            </div>
                                            <div className='d-flex rate-in'>
                                                <div className="form-floating-block mb-4 label">
                                                    <label className="form-label">Death Rate : </label>
                                                </div>
                                                <div className="form mb-4 check number">
                                                    <input type="number" min={1} max={100} id="deathRate" className="form-control w-100"
                                                        onChange={onChange} name="deathRate" value={formValue.deathRate} />
                                                    <label className="form-label" for="deathRate"></label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex rate-in'>
                                                <div className="form-floating-block mb-4">
                                                    <label className="form-label">Gender :</label>
                                                </div>

                                                <div className='d-block check'>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" checked={id && formValue.gender == "M"} type="radio" name="gender" id="male" value="M" onChange={e => genderChange(e)} />
                                                        <label className="form-check-label" for="gender" >
                                                            Male
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" checked={id && formValue.gender == "F"} type="radio" name="gender" id="female" value="F" onChange={e => genderChange(e)} />
                                                        <label className="form-check-label" for="gender">
                                                            Female
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" checked={id && formValue.gender == "B"} type="radio" name="gender" id="both" value="B" onChange={e => genderChange(e)} />
                                                        <label className="form-check-label" for="gender" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-check form-check-inline d-flex mt-1 rate-in">
                                                <div className><label className="form-check-label" for="isSelfCurable" >Is Self Curable :</label></div>
                                                <div className="form-check form-switch check">
                                                    <input className="form-check-input" checked={id && formValue.isSelfCurable} onChange={changeSwitch} name="isSelfCurable" type="checkbox" role="switch" id="isSelfCurable" />
                                                </div>
                                            </div>

                                            <div className='d-flex rate-in'>
                                                <div className="form-floating-block mt-2">
                                                    <label className="form-label">Age Range :</label>
                                                </div>
                                                <div className='check d-flex'>
                                                    <div className="form mb-4">
                                                        <input type="number" min={1} max={100} id="ageRangeStart" className="form-control"
                                                            placeholder="" onChange={onChange} name="ageRangeStart" value={formValue.ageRangeStart} />
                                                        <label className="form-label" for="ageRangeStart"></label>
                                                    </div>
                                                    <div className="form-floating-block m-2">
                                                        <label className="form-label">To</label>
                                                    </div>
                                                    <div className="form mb-4">
                                                        <input type="number" min={1} max={100} id="ageRangeEnd" className="form-control"
                                                            placeholder="" onChange={onChange} name="ageRangeEnd" value={formValue.ageRangeEnd} />
                                                        <label className="form-label" for="ageRangeEnd"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-4">
                                                <Multiselect
                                                    options={medicines} // Options to display in the dropdown
                                                    placeholder="Slelct Medicines"
                                                    showCheckbox={true}
                                                    displayValue="medicineName" // Property name to display in the dropdown options
                                                    onSelect={onSelectMedicine} // Function will trigger on select event
                                                    onRemove={onRemoveMedicine} // Function will trigger on remove event
                                                    selectedValues={preMedicines}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <Multiselect
                                                    options={reports} // Options to display in the dropdown
                                                    placeholder="Slelct Reports"
                                                    showCheckbox={true}
                                                    displayValue="reportName" // Property name to display in the dropdown options
                                                    onSelect={onSelectReport} // Function will trigger on select event
                                                    onRemove={onRemoveReport} // Function will trigger on remove event
                                                    selectedValues={preReports}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <Multiselect
                                                    options={bodyparts} // Options to display in the dropdown
                                                    placeholder="Slelct Bodyparts"
                                                    showCheckbox={true}
                                                    displayValue="bodypartName" // Property name to display in the dropdown options
                                                    onSelect={onSelectBodypart} // Function will trigger on select event
                                                    onRemove={onRemoveBodypart} // Function will trigger on remove event
                                                    selectedValues={preBodyParts}
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center pt-1 mb-2 pb-1">
                                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-0 mt-5 w-100 mx-auto" type="button" onClick={onSubmit}>{id ? "Update Diseas" : "Add Disease"}</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
