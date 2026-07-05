import SurveyForm from "../components/survey/SurveyForm";
import { useEffect } from "react";

export default function Survey() {
    useEffect(() => {window.scrollTo({ top: 0, behavior: "smooth" });}, []);
    
    return (

        <main className="container section">

            <div className="survey-page">

                <SurveyForm />

            </div>

        </main>

    );

}