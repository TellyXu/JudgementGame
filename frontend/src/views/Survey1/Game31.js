// src/components/GandhiSurvey.js
import React, { useState } from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col
} from 'reactstrap';
import { useNavigate } from "react-router-dom";


function Game61() {
    const [select1, setSelect1] = useState('');
    const [select2, setSelect2] = useState(-1);
    const arrs = [1, 2, 3, 4, 5, 6]
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [resultData, setResultData] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!select1) {
            alert('Please select data')
            return
        }

        const data = {
            Q1: select1, // q1 是value
            Q2: select2,
            survey_number: 6, // survey_num是第几个survey
            version: 1 // version是第几个group
        };

        try {
            const response = await fetch('http://localhost:8000/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Survey submitted successfully!');
                // navigate('/');
                setSubmitDisabled(true)
                getResult()
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getResult = async () => {
        fetch("http://localhost:8000/find", { method: 'POST' })
            .then((response) => response.json())
            .then(({ data, code }) => {
                console.log('data' + code, data)
                if (code === 200) {
                    setResultData(data.filter(item => item.survey_num === 6 && item.version === 1))
                    return
                }
                alert('Data loading error')

            });
    }

    const getAvg = (values) => {
        try {
            if (values.length === 0) {
                return ''
            }
            const sum = values.reduce((previous, current) => current += previous);
            const avg = sum / values.length;
            return avg
        } catch (error) {
            return ''
        }
    }

    return (
        <form onSubmit={handleSubmit} className="gandhi-survey-form" style={{ padding: '30px' }}>
            <Label>
                MedCo Inc. just developed a breakthrough therapy for a rare disease and did a study on its effectiveness. 100 patients took the medicine and 70 patients got better.
            </Label>
            <Label>
                6-point scale, very good to very bad
            </Label>
            <Row>
                <Col className="ml-auto mr-auto" >
                    <FormGroup>
                        <Label htmlFor="ageComparisonDropdown">

                            <Label style={{ marginBottom: '0', fontWeight: 'weight' }}>
                                How would you evaluate the drug’s effect?
                            </Label>
                        </Label>
                        <UncontrolledDropdown>
                            <DropdownToggle caret color="primary">
                                {select1 ? select1 : 'Select Value'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    arrs.map(item => (
                                        <DropdownItem key={item} onClick={() => setSelect1(item)}>{item}</DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </FormGroup>
                </Col>
            </Row>

            <div style={{ textAlign: 'center', padding: '0 40px', display: submitDisabled ? 'block' : 'none' }}>
                <h3>Result</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>Average score:&nbsp;&nbsp;</p>
                    <p style={{ fontWeight: 'bold' }}>{Math.round(getAvg(resultData.map(item => item.Q1_Answer)))}</p>
                </div>
            </div>

            <Button className="btn-round pull-right" disabled={submitDisabled ? true : false}
                color="info"
                type="submit"
                style={{ marginRight: '20px', display: submitDisabled ? 'none' : 'block' }} >Submit</Button>

            <Button className="btn-round pull-right"
                    color="info"
                    type="button"
                    onClick={e=>{
                        e.preventDefault()
                        getResult()
                    }}
                    style={{ marginRight: '20px', display: submitDisabled ? 'block' : 'none' }} >Refresh result</Button>

            <Button className="btn-round pull-right"
                    color="info"
                    style={{ marginRight: '20px', display: submitDisabled ? 'block' : 'none' }}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/presentation');
                    }}>
                Home Page
            </Button>
        </form>
    );
}

export default Game61;
