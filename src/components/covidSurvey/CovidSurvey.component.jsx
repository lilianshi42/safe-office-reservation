import "./CovidSurvey.styles.css";
import { Radio,Button } from "antd";
import {useState} from 'react';

function CovidSurvey({changeAnswer,handleSubmit,handleNavigate}) {
  
  const [value1,setValue1]=useState("True");
  const onChange1 = e => {
    setValue1(e.target.value);
  };

  const [value2,setValue2]=useState("True");
  const onChange2 = e => {
    setValue2(e.target.value);
  };

  const [value3,setValue3]=useState("True");
  const onChange3 = e => {
    setValue3(e.target.value);
  };

  const [value4,setValue4]=useState("True");
  const onChange4 = e => {
    setValue4(e.target.value);
  };

  const [value5,setValue5]=useState("True");
  const onChange5 = e => {
    setValue5(e.target.value);
  };

  const [value6,setValue6]=useState("True");
  const onChange6 = e => {
    setValue6(e.target.value);
  };

  const handleCheckIn = ()=>{
    const answers = [];
    answers.push(value1);
    answers.push(value2);
    answers.push(value3);
    answers.push(value4);
    answers.push(value5);
    answers.push(value6);

    handleSubmit(answers);
  }


  return (
    <div className="covid-survey">

      <div className="covid-survey-container">
        <div className="covid-survey-title">
          <span style={{"textAlign":"center","width":"80%"}}>Questions</span>
          <span style={{"width":"20%"}}>Choose</span>
          
        </div>

          <div className="survey-questions" >
            <p style={{"width":"80%"}}>"Are you fully vaccinated against COVID-19?"</p>
            <Radio.Group style={{"width":"20%"}} onChange={onChange1} value={value1}>
              <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Radio.Group>
          </div>
          <div className="survey-questions" >
            <p style={{"width":"80%"}}>"Are you feeling severe difficulty breathing?"</p>
            <Radio.Group style={{"width":"20%"}} onChange={onChange2} value={value2}>
            <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Radio.Group>
          </div>
          <div className="survey-questions" >
            <p style={{"width":"80%"}}>"Are you feeling severe check pain?"</p>
            <Radio.Group style={{"width":"20%"}} onChange={onChange3} value={value3}>
            <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Radio.Group>
          </div>
          <div className="survey-questions" >
            <p style={{"width":"80%"}}>"In the last 5 days, have you experienced fever and/or chills?"</p>
            <Radio.Group style={{"width":"20%"}} onChange={onChange4} value={value4}>
            <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Radio.Group>
          </div>
          <div className="survey-questions" >
            <p style={{"width":"80%"}}>"Are you fully vaccinated against COVID-19?"</p>
            <Radio.Group style={{"width":"20%"}} onChange={onChange5} value={value5}>
            <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Radio.Group>
          </div>
          <div className="survey-questions" >
            <p style={{"width":"80%"}}>"In the last 5 days, have you experienced cough or barking cough?"</p>
            <Radio.Group style={{"width":"20%"}} onChange={onChange6} value={value6}>
            <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Radio.Group>
          </div>


      </div>

      <div className="buttons-wrapper-in-checkin" style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={handleCheckIn} style={{ marginLeft: "20px"}}>
                  Check In
                </Button>
                <Button onClick={handleNavigate} style={{ marginLeft: "20px" }}>
                  Cancel
                </Button>
              </div>
    </div>
  );
}

export default CovidSurvey;
