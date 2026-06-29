export default function StepIndicator({ step }) {

    const steps = [
        "Livraison",
        "Paiement",
        "Vérification"
    ];

    return (
        <div className="step-indicator">

            {steps.map((label, index) => {

                const current = index + 1;

                return (
                    <div
                        key={label}
                        className={`step ${step === current ? "active" : ""} ${step > current ? "done" : ""}`}
                    >
                        <div className="circle">{current}</div>
                        <p>{label}</p>
                    </div>
                );

            })}

        </div>
    );
}