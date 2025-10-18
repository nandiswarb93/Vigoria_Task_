import React, { useState, useEffect } from "react";
import DynamicFormSection from "../components/DynamicForm";

const ActivityTable = () => {
  const [activities, setActivities] = useState([
    { city: "", activity: "", type: "", timeRequired: "" },
  ]);

  // Save activities to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Update a single activity
  const updateActivity = (index, updatedActivity) => {
    const newActivities = [...activities];
    newActivities[index] = updatedActivity;
    setActivities(newActivities);
  };

  // Add a new activity
  const addActivity = () => {
    setActivities([
      ...activities,
      { city: "", activity: "", type: "", timeRequired: "" },
    ]);
  };

  // Remove an activity
  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Activity Details 🗺️</h1>

      {activities.map((activity, index) => (
        <DynamicFormSection
          key={index}
          title={`Activity ${index + 1}`}
          data={activity}
          onChange={(updated) => updateActivity(index, updated)}
          onRemove={() => removeActivity(index)}
          fields={[
            { label: "City", name: "city" },
            { label: "Activity", name: "activity" },
            { label: "Type", name: "type" },
            { label: "Time Required", name: "timeRequired" },
          ]}
        />
      ))}

      <button
        onClick={addActivity}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        + Add Another Activity
      </button>
    </div>
  );
};

export default ActivityTable;
