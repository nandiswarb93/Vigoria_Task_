// import { useState } from "react";
// import DynamicFormSection from "../components/DynamicForm";
// import React from "react";

// const FlightSummary = () => {
//   const [flight, setFlight] = useState({
//     flightName: "",
//     date: "",
//     from: "",
//     to: "",
//   });
//   console.log("Flight Data:", flight);

//   return (
//     <div>
//       <DynamicFormSection
//         title="Flight Summary ✈️"
//         data={flight}
//         onChange={(updated) => setFlight(updated)}
//         fields={[
//           {
//             label: "Flight Name",
//             name: "flightName",
//             placeholder: "IndiGo 6E-234",
//           },
//           { label: "Date", name: "date", type: "date" },
//           { label: "From", name: "from", placeholder: "Bangalore" },
//           { label: "To", name: "to", placeholder: "Delhi" },
//         ]}
//       />
//     </div>
//   );
// };

// export default FlightSummary;

import { useState } from "react";
import DynamicFormSection from "../components/DynamicForm";
import React from "react";

const FlightSummary = () => {
  const [flights, setFlights] = useState([
    { flightName: "", date: "", from: "", to: "" }, // initial flight
  ]);

  // Update a single flight
  const updateFlight = (index, updatedFlight) => {
    const newFlights = [...flights];
    newFlights[index] = updatedFlight;
    setFlights(newFlights);
  };

  // Add a new flight
  const addFlight = () => {
    setFlights([...flights, { flightName: "", date: "", from: "", to: "" }]);
  };

  // Remove a flight
  const removeFlight = (index) => {
    setFlights(flights.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Flight Summary ✈️</h1>

      {flights.map((flight, index) => (
        <DynamicFormSection
          key={index}
          title={`Flight ${index + 1}`}
          data={flight}
          onChange={(updated) => updateFlight(index, updated)}
          onRemove={() => removeFlight(index)}
          fields={[
            {
              label: "Flight Name",
              name: "flightName",
              placeholder: "IndiGo 6E-234",
            },
            { label: "Date", name: "date", type: "date" },
            { label: "From", name: "from", placeholder: "Bangalore" },
            { label: "To", name: "to", placeholder: "Delhi" },
          ]}
        />
      ))}
      <button
        onClick={addFlight}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        + inko Flight
      </button>
    </div>
  );
};

export default FlightSummary;
