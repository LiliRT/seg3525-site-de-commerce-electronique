export default function ShippingForm({ data, setData }) {

    return (
        <div className="form">

            <h2>Adresse de livraison</h2>

            <input
                placeholder="Nom complet"
                value={data.name}
                onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                }
            />

            <input
                placeholder="Adresse"
                value={data.address}
                onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                }
            />

            <input
                placeholder="Ville"
                value={data.city}
                onChange={(e) =>
                    setData({ ...data, city: e.target.value })
                }
            />

            <input
                placeholder="Code postal"
                value={data.zip}
                onChange={(e) =>
                    setData({ ...data, zip: e.target.value })
                }
            />

        </div>
    );
}