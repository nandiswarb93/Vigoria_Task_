import React from "react";

export default function InitialInformation({ info, onChange }) {
  const update = (key, value) => {
    onChange({ ...info, [key]: value });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🧳 Trip Overview
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter trip name"
            value={info.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Number of Days
          </label>
          <input
            type="number"
            placeholder="e.g. 5"
            value={info.howManyDaysPlan || ""}
            onChange={(e) => update("howManyDaysPlan", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Departure From
          </label>
          <input
            type="text"
            placeholder="e.g. Bangalore"
            value={info.departureFrom || ""}
            onChange={(e) => update("departureFrom", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Departure Date
          </label>
          <input
            type="date"
            value={info.departureDate || ""}
            onChange={(e) => update("departureDate", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Arrival Date
          </label>
          <input
            type="date"
            value={info.arrivalDate || ""}
            onChange={(e) => update("arrivalDate", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Destination
          </label>
          <input
            type="text"
            placeholder="e.g. Manali"
            value={info.destination || ""}
            onChange={(e) => update("destination", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            No. of Travellers
          </label>
          <input
            type="number"
            placeholder="e.g. 4"
            value={info.noOfTravellers || ""}
            onChange={(e) => update("noOfTravellers", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
