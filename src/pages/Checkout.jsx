import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StepIndicator from "../components/checkout/StepIndicator";
import ShippingForm from "../components/checkout/ShippingForm";
import PaymentForm from "../components/checkout/PaymentForm";
import ReviewOrder from "../components/checkout/ReviewOrder";

import { useCart } from "../context/CartContext";

export default function Checkout() {

    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    useEffect(() => {window.scrollTo({ top: 0, behavior: "smooth" });}, []);
    
    // ===========================
    // Livraison
    // ===========================

    const [shipping, setShipping] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        apartment: "",
        city: "",
        province: "Ontario",
        zip: "",
        receiveEmail: true,
        billingSame: true,
        billingAddress: "",
        billingCity: "",
        billingProvince: "Ontario",
        billingZip: ""
    });

    // ===========================
    // Paiement
    // ===========================

    const [payment, setPayment] = useState({
        type: "credit",
        holder: "",
        card: "",
        exp: "",
        cvc: ""
    });

    const [shippingErrors, setShippingErrors] = useState({});
    const [paymentErrors, setPaymentErrors] = useState({});

    // ===========================
    // Validation livraison
    // ===========================

    const validateShipping = () => {

        const errors = {};

        if (!shipping.name.trim()) errors.name = "Veuillez entrer votre nom complet.";

        if (!shipping.email.trim()) errors.email = "Veuillez entrer une adresse courriel.";
        else if (!/^\S+@\S+\.\S+$/.test(shipping.email)) errors.email = "Veuillez entrer une adresse courriel valide.";

        if (!shipping.phone.trim()) errors.phone = "Veuillez entrer un numéro de téléphone.";

        if (!shipping.address.trim()) errors.address = "Veuillez entrer votre adresse.";

        if (!shipping.city.trim()) errors.city = "Veuillez entrer votre ville.";

        if (!shipping.zip.trim()) errors.zip = "Veuillez entrer un code postal.";

        if (!shipping.billingSame) {
            if (!shipping.billingAddress.trim()) errors.billingAddress = "Veuillez entrer une adresse de facturation.";

            if (!shipping.billingCity.trim()) errors.billingCity = "Veuillez entrer une ville.";

            if (!shipping.billingZip.trim()) errors.billingZip = "Veuillez entrer un code postal.";
        }

        setShippingErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // ===========================
    // Validation paiement
    // ===========================

    const validatePayment = () => {

        const errors = {};

        if (!payment.holder.trim()) errors.holder = "Veuillez entrer le nom du titulaire.";

        const cardNumber = payment.card.replace(/\s/g, "");

        if (!cardNumber) errors.card = "Veuillez entrer un numéro de carte.";
        else if (!/^\d{16}$/.test(cardNumber)) errors.card = "Le numéro doit contenir 16 chiffres.";

        if (!payment.exp.trim()) errors.exp = "Veuillez entrer une date d'expiration.";
        else if (!/^\d{2}\/\d{2}$/.test(payment.exp)) errors.exp = "Format attendu : MM/AA.";

        if (payment.type === "credit") {
            if (!payment.cvc.trim()) {
                errors.cvc = "Veuillez entrer le code de sécurité.";
            } else if (!/^\d{3}$/.test(payment.cvc)) {
                errors.cvc = "Le CVC doit contenir 3 chiffres.";
            }
        }

        setPaymentErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // ===========================
    // Navigation
    // ===========================

    const next = () => {

        if (step === 1) {
            const ok = validateShipping();
            if (!ok) {
                return;
            }
        }

        if (step === 2) {
            const ok = validatePayment();
            if (!ok) {
                return;
            }
        }

        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: "smooth"});
    };

    const prev = () => {
        setStep(step - 1);

        window.scrollTo({ top: 0, behavior: "smooth"});
    };

    // ===========================
    // Confirmation
    // ===========================

    const confirmOrder = () => {
        if (cart.length === 0) return;

        clearCart(false);

        navigate("/confirmation");
    };

    useEffect(() => {

        const allErrors = step === 1 ? shippingErrors : paymentErrors;

        const order = [
            "name", "email", "phone", "address", "city", "zip",
            "billingAddress", "billingCity", "billingZip",
            "holder", "card", "exp", "cvc"
        ];

        const first = order.find(f => allErrors[f]);

        if (first) {
            const el = document.querySelector(`[name="${first}"]`);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            el?.focus();
        }

    }, [shippingErrors, paymentErrors]);

    return (
        <main className="container section">

            <h1>Passer une commande</h1>

            <div className="checkout-step-indicator"><StepIndicator step={step} /></div>

            {step === 1 && (
                <ShippingForm data={shipping} setData={setShipping} errors={shippingErrors} setErrors={setShippingErrors}/>
            )}

            {step === 2 && (
                <PaymentForm data={payment} setData={setPayment} errors={paymentErrors} setErrors={setPaymentErrors}/>
            )}

            {step === 3 && (
                <ReviewOrder shipping={shipping} payment={payment}/>
            )}

            <div className="checkout-actions">
                {step > 1 && (
                    <button className="btn btn-secondary" onClick={prev}>Retour</button>
                )}

                {step < 3 && (
                    <button className="btn btn-primary ms-auto" onClick={next}>Suivant</button>
                )}

                {step === 3 && (
                    <button className="btn btn-primary" onClick={confirmOrder}>Confirmer la commande</button>
                )}
            </div>

        </main>
    );
}