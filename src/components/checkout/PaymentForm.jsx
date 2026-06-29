export default function PaymentForm({ data, setData }) {

    return (
        <div className="form">

            <h2>Paiement (simulation)</h2>

            <input
                placeholder="Numéro de carte"
                value={data.card}
                onChange={(e) =>
                    setData({ ...data, card: e.target.value })
                }
            />

            <input
                placeholder="MM/AA"
                value={data.exp}
                onChange={(e) =>
                    setData({ ...data, exp: e.target.value })
                }
            />

            <input
                placeholder="CVC"
                value={data.cvc}
                onChange={(e) =>
                    setData({ ...data, cvc: e.target.value })
                }
            />

        </div>
    );
}