import React, { useState, useEffect } from "react";
import DynamicFormSection from "../components/DynamicForm";

const InclusionSummary = () => {
  const [inclusions, setInclusions] = useState([
    { category: "", count: 0, details: "", status: "" },
  ]);

  // Save inclusions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("inclusions", JSON.stringify(inclusions));
  }, [inclusions]);

  // Update a single inclusion
  const updateInclusion = (index, updatedInclusion) => {
    const newInclusions = [...inclusions];
    newInclusions[index] = updatedInclusion;
    setInclusions(newInclusions);
  };

  // Add a new inclusion
  const addInclusion = () => {
    setInclusions([
      ...inclusions,
      { category: "", count: 0, details: "", status: "" },
    ]);
  };

  // Remove an inclusion
  const removeInclusion = (index) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Inclusions Summary ✅</h1>

      {inclusions.map((inclusion, index) => (
        <DynamicFormSection
          key={index}
          title={`Inclusion ${index + 1}`}
          data={inclusion}
          onChange={(updated) => updateInclusion(index, updated)}
          onRemove={() => removeInclusion(index)}
          fields={[
            { label: "Category", name: "category" },
            { label: "Count", name: "count", type: "number" },
            { label: "Details", name: "details" },
            { label: "Status / Comments", name: "status" },
          ]}
        />
      ))}

      <button
        onClick={addInclusion}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        + Add Another Inclusion
      </button>
    </div>
  );
};

export default InclusionSummary;
