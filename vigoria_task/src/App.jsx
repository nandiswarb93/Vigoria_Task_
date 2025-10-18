// import { useState } from "react";
// import React from "react";

// import FlightSummary from "./components/FlightSummary";
// import InitialInformation from "./components/InitialInformation";
// import HotelBooking from "./components/HotelBooking";
// import InclusionSummary from "./components/InclusionSummary";
// import ActivityTable from "./components/ActivityTable";
// import PaymentPlan from "./components/PaymentPlan";

// function App() {
//   const [tripInfo, setTripInfo] = useState({
//     name: "",
//     howManyDaysPlan: "",
//     departureFrom: "",
//     departureDate: "",
//     arrivalDate: "",
//     destination: "",
//     noOfTravellers: "",
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <InitialInformation info={tripInfo} onChange={setTripInfo} />
//         <FlightSummary />
//         <HotelBooking />
//         <InclusionSummary />
//         <ActivityTable />
//         <PaymentPlan />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react";
import DynamicFormSection from "./components/DynamicForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  // Ref for PDF generation
  const pdfRef = useRef();

  // Main itinerary state
  const [itinerary, setItinerary] = useState({
    overview: {
      tripTitle: "",
      duration: "",
      travelers: "",
      departureFrom: "",
      departureDate: "",
      arrivalDate: "",
      destination: "",
    },
    days: [],
    payments: [],
    inclusions: [],
    exclusions: [],
  });

  // Load from localStorage if exists
  useEffect(() => {
    const saved = localStorage.getItem("itinerary");
    if (saved) setItinerary(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
  }, [itinerary]);

  // ====== Handlers ======
  const updateOverview = (updated) => {
    setItinerary({ ...itinerary, overview: updated });
  };

  const addDay = () => {
    setItinerary({
      ...itinerary,
      days: [
        ...itinerary.days,
        {
          dayNumber: itinerary.days.length + 1,
          title: `Day ${itinerary.days.length + 1}`,
          activities: { morning: "", afternoon: "", evening: "" },
          flights: [],
          hotel: { name: "", checkIn: "", checkOut: "", nights: 0, city: "" },
        },
      ],
    });
  };

  const updateDay = (index, updatedDay) => {
    const newDays = [...itinerary.days];
    newDays[index] = updatedDay;
    setItinerary({ ...itinerary, days: newDays });
  };

  const removeDay = (index) => {
    const newDays = itinerary.days.filter((_, i) => i !== index);
    setItinerary({ ...itinerary, days: newDays });
  };

  const addPayment = () => {
    setItinerary({
      ...itinerary,
      payments: [
        ...itinerary.payments,
        { installment: "", amount: 0, dueDate: "" },
      ],
    });
  };

  const updatePayment = (index, updated) => {
    const newPayments = [...itinerary.payments];
    newPayments[index] = updated;
    setItinerary({ ...itinerary, payments: newPayments });
  };

  const removePayment = (index) => {
    const newPayments = itinerary.payments.filter((_, i) => i !== index);
    setItinerary({ ...itinerary, payments: newPayments });
  };

  const addInclusion = (type) => {
    const list = itinerary[type];
    setItinerary({
      ...itinerary,
      [type]: [...list, { category: "", count: 0, details: "", status: "" }],
    });
  };

  const updateInclusion = (type, index, updated) => {
    const list = [...itinerary[type]];
    list[index] = updated;
    setItinerary({ ...itinerary, [type]: list });
  };

  const removeInclusion = (type, index) => {
    const list = itinerary[type].filter((_, i) => i !== index);
    setItinerary({ ...itinerary, [type]: list });
  };

  // ===== PDF Generation =====
  const generatePDF = () => {
    if (!pdfRef.current) return;

    html2canvas(pdfRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4"); // portrait, points, A4
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${itinerary.overview.tripTitle || "itinerary"}.pdf`);
    });
  };

  // ====== Render ======
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Itinerary Builder</h1>

      {/* Overview */}
      <DynamicFormSection
        title="Tour Overview"
        data={itinerary.overview}
        onChange={updateOverview}
        fields={[
          { label: "Trip Title", name: "tripTitle" },
          { label: "Duration (days)", name: "duration", type: "number" },
          { label: "No. of Travelers", name: "travelers", type: "number" },
          { label: "Departure From", name: "departureFrom" },
          { label: "Departure Date", name: "departureDate", type: "date" },
          { label: "Arrival Date", name: "arrivalDate", type: "date" },
          { label: "Destination", name: "destination" },
        ]}
      />

      {/* Days */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Days</h2>
        {itinerary.days.map((day, index) => (
          <DynamicFormSection
            key={index}
            title={day.title}
            data={day}
            onChange={(updated) => updateDay(index, updated)}
            onRemove={() => removeDay(index)}
            fields={[
              { label: "Morning Activities", name: "activities.morning" },
              { label: "Afternoon Activities", name: "activities.afternoon" },
              { label: "Evening Activities", name: "activities.evening" },
              { label: "Hotel Name", name: "hotel.name" },
              { label: "Hotel Check-In", name: "hotel.checkIn", type: "date" },
              {
                label: "Hotel Check-Out",
                name: "hotel.checkOut",
                type: "date",
              },
              { label: "Nights", name: "hotel.nights", type: "number" },
              { label: "City", name: "hotel.city" },
            ]}
          />
        ))}
        <button
          onClick={addDay}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Day
        </button>
      </div>

      {/* Payments */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Payment Plan</h2>
        {itinerary.payments.map((payment, index) => (
          <DynamicFormSection
            key={index}
            title={`Payment ${index + 1}`}
            data={payment}
            onChange={(updated) => updatePayment(index, updated)}
            onRemove={() => removePayment(index)}
            fields={[
              { label: "Installment", name: "installment" },
              { label: "Amount", name: "amount", type: "number" },
              { label: "Due Date", name: "dueDate", type: "date" },
            ]}
          />
        ))}
        <button
          onClick={addPayment}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Payment
        </button>
      </div>

      {/* Inclusions & Exclusions */}
      {["inclusions", "exclusions"].map((type) => (
        <div key={type}>
          <h2 className="text-2xl font-semibold mb-2">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          {itinerary[type].map((item, index) => (
            <DynamicFormSection
              key={index}
              title={`${type.slice(0, -1)} ${index + 1}`}
              data={item}
              onChange={(updated) => updateInclusion(type, index, updated)}
              onRemove={() => removeInclusion(type, index)}
              fields={[
                { label: "Category", name: "category" },
                { label: "Count", name: "count", type: "number" },
                { label: "Details", name: "details" },
                { label: "Status / Comments", name: "status" },
              ]}
            />
          ))}
          <button
            onClick={() => addInclusion(type)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Add {type.slice(0, -1)}
          </button>
        </div>
      ))}

      {/* Optional: Preview JSON */}
      <div className="bg-gray-100 p-4 rounded mt-6">
        <h3 className="font-medium mb-2">Itinerary JSON Preview:</h3>
        <pre className="text-xs text-gray-800">
          {JSON.stringify(itinerary, null, 2)}
        </pre>
      </div>

      {/* PDF Generation Button (to implement) */}
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          onClick={() => generatePDF()}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}
