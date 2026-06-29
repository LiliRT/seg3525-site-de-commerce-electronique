import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StepIndicator from "../components/checkout/StepIndicator";
import ShippingForm from "../components/checkout/ShippingForm";
import PaymentForm from "../components/checkout/PaymentForm";
import ReviewOrder from "../components/checkout/ReviewOrder";

import { useCart } from "../context/CartContext";

export default function Checkout() {

    const { clearCart } = useCart();

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [shipping, setShipping] = useState({
        name: "",
        address: "",
        city: "",
        zip: ""
    });

    const [payment, setPayment] = useState({
        card: "",
        exp: "",
        cvc: ""
    });

    const next = () => setStep(step + 1);
    const prev = () => setStep(step - 1);

    const confirmOrder = () => {

        clearCart();

        navigate("/confirmation");
    };

    return (
        <main className="container section">

            <h1>Commande</h1>

            <StepIndicator step={step} />

            {step === 1 && (
                <ShippingForm
                    data={shipping}
                    setData={setShipping}
                />
            )}

            {step === 2 && (
                <PaymentForm
                    data={payment}
                    setData={setPayment}
                />
            )}

            {step === 3 && (
                <ReviewOrder
                    shipping={shipping}
                    payment={payment}
                />
            )}

            <div className="checkout-actions">

                {step > 1 && (
                    <button onClick={prev}>
                        Retour
                    </button>
                )}

                {step < 3 && (
                    <button onClick={next}>
                        Suivant
                    </button>
                )}

                {step === 3 && (
                    <button onClick={confirmOrder}>
                        Confirmer la commande
                    </button>
                )}

            </div>

        </main>
    );
}