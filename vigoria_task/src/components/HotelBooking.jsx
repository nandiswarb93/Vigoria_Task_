// import React from 'react'

// import { useState } from "react";
// import DynamicFormSection from "../components/DynamicForm";

// const HotelBooking = () => {
//   return (
//     <div>
//         <DynamicFormSection
//   title="Hotel Booking"
//   data={hotel}
//   onChange={(updated) => setHotel(updated)}
//   fields={[
//     { label: "City", name: "city" },
//     { label: "Check-in", name: "checkIn", type: "date" },
//     { label: "Check-out", name: "checkOut", type: "date" },
//     { label: "Nights", name: "nights", type: "number" },
//     { label: "Hotel Name", name: "hotelName" },
//   ]}
// />
// <button
//         onClick={addHotel}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
//       >
//         + inko Hotel
//       </button>

//     </div>
//   )
// }

// export default HotelBooking

import React, { useState, useEffect } from "react";
import DynamicFormSection from "../components/DynamicForm";

const HotelBooking = () => {
  // State for multiple hotels
  const [hotels, setHotels] = useState([
    { city: "", checkIn: "", checkOut: "", nights: 0, hotelName: "" },
  ]);

  // Save hotels to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("hotels", JSON.stringify(hotels));
  }, [hotels]);

  // Update a single hotel
  const updateHotel = (index, updatedHotel) => {
    const newHotels = [...hotels];
    newHotels[index] = updatedHotel;
    setHotels(newHotels);
  };

  // Add a new hotel
  const addHotel = () => {
    setHotels([
      ...hotels,
      { city: "", checkIn: "", checkOut: "", nights: 0, hotelName: "" },
    ]);
  };

  // Remove a hotel
  const removeHotel = (index) => {
    setHotels(hotels.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hotel Booking 🏨</h1>

      {hotels.map((hotel, index) => (
        <DynamicFormSection
          key={index}
          title={`Hotel ${index + 1}`}
          data={hotel}
          onChange={(updated) => updateHotel(index, updated)}
          onRemove={() => removeHotel(index)}
          fields={[
            { label: "City", name: "city" },
            { label: "Check-in", name: "checkIn", type: "date" },
            { label: "Check-out", name: "checkOut", type: "date" },
            { label: "Nights", name: "nights", type: "number" },
            { label: "Hotel Name", name: "hotelName" },
          ]}
        />
      ))}

      <button
        onClick={addHotel}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        + Add Another Hotel
      </button>
    </div>
  );
};

export default HotelBooking;
