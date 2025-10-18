import { useState } from "react";
import DynamicFormSection from "./DynamicForm";
import React from "react";


const FlightSummary = () => {
  const [flight, setFlight] = useState({
    flightName: "",
    date: "",
    from: "",
    to: "",
  });

  return (
    <div>
      <DynamicFormSection
        title="Flight Summary ✈️"
        data={flight}
        onChange={(updated) => setFlight(updated)}
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
    </div>
  );
};

export default FlightSummary;
