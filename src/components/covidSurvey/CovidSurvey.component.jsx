import { Checkbox } from "antd";
import "./CovidSurvey.styles.css";

function CovidSurvey({changeAnswer}) {

  function onChange(checkedValues) {
    changeAnswer(checkedValues);
  }
  
  const questions = [
    { label: "Are you fully vaccinated against COVID-19?", value: 1 },
    { label: "Are you feeling severe difficulty breathing?", value: 2 },
    { label: "Are you feeling severe check pain?", value: 3 },
    { label: "In the last 14 days, have you travelled outside of Canada?", value: 4},
    { label: "In the last 5 days, have you experienced fever and/or chills?", value: 5 },
    { label: "In the last 5 days, have you experienced cough or barking cough?", value: 6 }
  ];


  return (
    <div className="covid-survey">
      {/* <h3>Covid Survey</h3> */}
      <div className="covid-survey-container">
        <div className="covid-survey-title">
          <span style={{"width":"10%"}}>Choose</span>
          <span style={{"textAlign":"center","width":"90%"}}>Questions</span>
        </div>
          <Checkbox.Group
            options={questions}
            onChange={onChange}
          />
      </div>
    </div>
  );
}

export default CovidSurvey;
