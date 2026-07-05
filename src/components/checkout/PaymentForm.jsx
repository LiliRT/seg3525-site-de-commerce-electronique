import { useState } from "react";

export default function PaymentForm({ data, setData, errors, setErrors }) {

    const [touched, setTouched] = useState({});

    const update = (field, value) => {

        let v = value;

        if (field === "card") {
            const digits = value.replace(/\D/g, "").slice(0, 16);
            v = digits.replace(/(.{4})/g, "$1 ").trim();
        }

        if (field === "exp") {
            v = value.replace(/\D/g, "").slice(0, 4);
            if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
        }

        if (field === "cvc") {
            v = value.replace(/\D/g, "").slice(0, 3);
        }

        if (field === "type" && value === "debit") {
            setData({...data, type: value, cvc: ""});

            setErrors(prev => ({...prev, cvc: ""}));

            setTouched(prev => ({...prev, type: true}));
            
            return;
        }

        setData({ ...data, [field]: v });

        setTouched(prev => ({ ...prev, [field]: true }));

        validateField(field, v);
    };

    const validateField = (field, value) => {

        let msg = "";

        if (field === "holder" && !value.trim()) msg = "Nom requis.";

        if (field === "card") {
            if (value.replace(/\D/g, "").length < 16) msg = "Numéro de carte incomplet.";
        }

        if (field === "exp") {
            const ok = /^\d{2}\/\d{2}$/.test(value);
            if (!ok) msg = "Format attendu : MM/AA";
        }

        if (field === "cvc") {
            if (value.replace(/\D/g, "").length < 3) msg = "CVC incomplet.";
        }

        setErrors(prev => ({
            ...prev,
            [field]: msg
        }));
    };

    const showError = (field) => touched[field] && errors[field];

    const isDebit = data.type === "debit";

    return (

        <div className="form">

            <h2>Paiement</h2>

            {/* TYPE */}
            <div>
                <label>Type de carte <span className="asterix">*</span></label>

                <select name="type" value={data.type} onChange={(e) => update("type", e.target.value)}>
                    <option value="credit">Carte de crédit</option>
                    <option value="debit">Carte de débit</option>
                </select>
            </div>

            {/* HOLDER */}
            <div>
                <label>Titulaire <span className="asterix">*</span></label>

                <input
                    name="holder"
                    value={data.holder}
                    onChange={(e) => update("holder", e.target.value)}
                />

                {showError("holder") && <div className="form-error">{errors.holder}</div>}
            </div>

            {/* CARD */}
            <div>
                <label>Numéro de carte <span className="asterix">*</span></label>

                <input
                    inputMode="numeric"
                    name="card"
                    value={data.card}
                    onChange={(e) => update("card", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                />

                {showError("card") && <div className="form-error">{errors.card}</div>}
            </div>

            {/* EXP */}
            <div>
                <label>Date d'expiration <span className="asterix">*</span></label>

                <input
                    inputMode="numeric"
                    name="exp"
                    value={data.exp}
                    onChange={(e) => update("exp", e.target.value)}
                    placeholder="MM/AA"
                />

                {showError("exp") && <div className="form-error">{errors.exp}</div>}
            </div>

            {/* CVC */}
            {!isDebit && (
                <div>
                    <div className="cvc">
                        <label>CVC <span className="asterix">*</span></label>

                        <div className="cvc-tooltip">
                            <i className="bi bi-info-circle" style={{ cursor: "help" }}></i>

                            <div className="cvc-tooltip-content">
                                <strong>CVC</strong>
                                <p>Le CVC est le code de sécurité à 3 chiffres au dos de votre carte.</p>
                            </div>
                        </div>
                    </div>

                    <input
                        inputMode="numeric"
                        name="cvc"
                        value={data.cvc}
                        onChange={(e) => update("cvc", e.target.value)}
                        placeholder="123"
                    />

                    {showError("cvc") && <div className="form-error">{errors.cvc}</div>}
                </div>
            )}

        </div>

    );
}