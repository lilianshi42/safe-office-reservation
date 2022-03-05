import { Form } from "antd";
import "./CovidSurvey.styles.css";

function CovidSurvey() {
  const questions = [
    "Are you fully vaccinated against COVID-19?",
    "Are you feeling severe difficulty breathing?",
    "Are you feeling severe check pain?",
    "In the last 14 days, have you travelled outside of Canada?",
    "In the last 5 days, have you experienced fever and/or chills?",
    "In the last 5 days, have you experienced cough or barking cough?",
  ];

  return (
    <div className="covid-survey">
      <h3>Covid Survey</h3>
      <div className="covid-survey-container">
        <Form></Form>
      </div>
    </div>
  );
}

export default CovidSurvey;
