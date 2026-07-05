// export default function StepIndicator({ step }) {

//     const steps = [
//         "Livraison",
//         "Paiement",
//         "Vérification"
//     ];

//     return (

//         <div className="step-indicator">

//             {steps.map((label, index) => {

//                 const current = index + 1;

//                 const isDone = step > current;
//                 const isActive = step === current;

//                 return (

//                     <div key={label} className="step-wrapper">

//                         <div className="step">

//                             <div className={`circle ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
//                                 {isDone ? "✔" : current}
//                             </div>

//                             <p className={isActive ? "active-label" : ""}>{label}</p>

//                         </div>

//                         {/* Ligne sauf pour le dernier élément */}
//                         {index < steps.length - 1 && (
//                             <div className={`line ${step > current ? "line-done" : ""}`} />
//                         )}

//                     </div>

//                 );

//             })}

//         </div>

//     );

// }
import { Fragment } from "react";

export default function StepIndicator({ step }) {
    const steps = ["Livraison", "Paiement", "Vérification"];

    return (
        <div className="step-indicator">
            {steps.map((label, index) => {
                const current = index + 1;
                const isDone = step > current;
                const isActive = step === current;

                return (
                    <Fragment key={label}>
                        <div className="step">
                            <div className={`circle ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
                                {isDone ? "✔" : current}
                            </div>

                            <p className={isActive ? "active-label" : ""}>
                                {label}
                            </p>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`line ${step > current ? "line-done" : ""}`} />
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}