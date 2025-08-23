// src/components/NeumoniaForm.jsx
import React, { useState } from "react";

const NeumoniaForm = () => {
  const [form, setForm] = useState({
    NN: "",
    NAC: "",
    NAC_TR: "",
    NAN: "",
    NAN_TR: "",
    NBA: "",
    NBA_TR: "",
    DIAS_VM: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-blue-100 text-blue-900">
          <tr>
            <th
              colSpan={2}
              className="border border-gray-300 px-3 py-2 text-lg text-left font-bold"
            >
              Neumonía
            </th>
            <th
              colSpan={2}
              className="border border-gray-300 px-3 py-2 text-lg text-center font-bold"
            >
              Terapeuta Respiratoria
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr>
            <th className="bg-gray-50 border border-gray-300 px-3 py-2">NN</th>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="NN"
                value={form.NN}
                onChange={handleChange}
                className="w-full text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
            <th className="bg-gray-50 border border-gray-300 px-3 py-2">
              Días en VM
            </th>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="DIAS_VM"
                value={form.DIAS_VM}
                onChange={handleChange}
                className="w-20 text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
          </tr>

          <tr>
            <th className="bg-gray-50 border border-gray-300 px-3 py-2">NAC</th>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="NAC"
                value={form.NAC}
                onChange={handleChange}
                className="w-full text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
            <td className="border border-gray-300 px-3 py-2 font-medium text-center">
              Mañana
            </td>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="NAC_TR"
                value={form.NAC_TR}
                onChange={handleChange}
                className="w-full text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
          </tr>

          <tr>
            <th className="bg-gray-50 border border-gray-300 px-3 py-2">NAN</th>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="NAN"
                value={form.NAN}
                onChange={handleChange}
                className="w-full text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
            <td className="border border-gray-300 px-3 py-2 font-medium text-center">
              Tarde
            </td>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="NAN_TR"
                value={form.NAN_TR}
                onChange={handleChange}
                className="w-full text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
          </tr>

          <tr>
            <th className="bg-gray-50 border border-gray-300 px-3 py-2">NBA</th>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="NBA"
                value={form.NBA}
                onChange={handleChange}
                className="w-full text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
            <td className="border border-gray-300 px-3 py-2 font-medium text-center">
              Noche
            </td>
            <td className="border border-gray-300 px-3 py-2">
              <input
                type="text"
                name="NBA_TR"
                value={form.NBA_TR}
                onChange={handleChange}
                className="w-full text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NeumoniaForm;
