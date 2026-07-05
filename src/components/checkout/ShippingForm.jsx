import { useState } from "react";

export default function ShippingForm({ data, setData, errors, setErrors }) {
    const [touched, setTouched] = useState({});

    const update = (field, value) => {

        let formattedValue = value;

        if (field === "phone") {
            const digits = value.replace(/\D/g, "").slice(0, 10);

            if (digits.length <= 3) formattedValue = digits;
            else if (digits.length <= 6) formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
            else formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        }

        if (field === "zip") {
            let clean = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);

            formattedValue = clean.length > 3
                ? clean.slice(0, 3) + " " + clean.slice(3)
                : clean;
        }

        setData({ ...data, [field]: formattedValue });

        setTouched(prev => ({ ...prev, [field]: true }));

        validateField(field, formattedValue);
    };

    const validateField = (field, value) => {

        let msg = "";

        if (field === "name" && !value.trim()) msg = "Nom requis.";

        if (field === "email") {
            const ok = /^\S+@\S+\.\S+$/.test(value);
            if (!ok) msg = "Courriel invalide. Format attendu: nom@domaine.com";
        }

        if (field === "phone") {
            if (value.replace(/\D/g, "").length < 10) msg = "Téléphone incomplet.";
        }

        if (field === "address" && !value.trim()) msg = "Adresse requise.";

        if (field === "city" && !value.trim()) msg = "Ville requise.";

        if (field === "zip") {
            const ok = /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(value);
            if (!ok) msg = "Format attendu : A1A 1A1";
        }

        setErrors(prev => ({
            ...prev,
            [field]: msg
        }));
    };

    return (

        <div className="form">

            <h2>Informations de livraison</h2>

            {/* NOM */}
            <div>
                <label>Nom complet <span className="asterix">*</span></label>
                <input
                    name="name"
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                />
                {touched.name && errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            {/* EMAIL */}
            <div>
                <label>Courriel <span className="asterix">*</span></label>
                <input
                    name="email"
                    placeholder="ex: nom@domaine.com"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                />
                {touched.email && errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            {/* PHONE */}
            <div>
                <label>Téléphone <span className="asterix">*</span></label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="(123) 456-7890"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                />
                {touched.phone && errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>

            {/* ADDRESS */}
            <div>
                <label>Adresse <span className="asterix">*</span></label>
                <input
                    name="address"
                    value={data.address}
                    onChange={(e) => update("address", e.target.value)}
                />
                {touched.address && errors.address && <div className="form-error">{errors.address}</div>}
            </div>

            {/* CITY */}
            <div>
                <label>Ville <span className="asterix">*</span></label>
                <input
                    name="city"
                    value={data.city}
                    onChange={(e) => update("city", e.target.value)}
                />
                {touched.city && errors.city && <div className="form-error">{errors.city}</div>}
            </div>

            {/* PROCVINCE */}
            <div>
                <label>Province <span className="asterix">*</span></label>

                <select
                    name="province"
                    value={data.province}
                    onChange={(e) => update("province", e.target.value)}
                >
                    <option>Alberta</option>
                    <option>Colombie-Britannique</option>
                    <option>Île-du-Prince-Édouard</option>
                    <option>Manitoba</option>
                    <option>Nouveau-Brunswick</option>
                    <option>Nouvelle-Écosse</option>
                    <option>Ontario</option>
                    <option>Québec</option>
                    <option>Saskatchewan</option>
                    <option>Terre-Neuve-et-Labrador</option>
                    <option>Nunavut</option>
                    <option>Territoires du Nord-Ouest</option>
                    <option>Yukon</option>
                </select>
            </div>

            {/* ZIP */}
            <div>
                <label>Code postal <span className="asterix">*</span></label>
                <input
                    name="zip"
                    placeholder="A1A 1A1"
                    value={data.zip}
                    onChange={(e) => update("zip", e.target.value)}
                />
                {touched.zip && errors.zip && <div className="form-error">{errors.zip}</div>}
            </div>

        </div>
    );
}