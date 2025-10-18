import React, { useState, useEffect } from "react";
import DynamicFormSection from "./DynamicForm";

const PaymentPlan = () => {
  const [payments, setPayments] = useState([
    { installment: "", amount: 0, dueDate: "" },
  ]);

  // Save payments to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  // Update a single payment
  const updatePayment = (index, updatedPayment) => {
    const newPayments = [...payments];
    newPayments[index] = updatedPayment;
    setPayments(newPayments);
  };

  // Add a new payment
  const addPayment = () => {
    setPayments([...payments, { installment: "", amount: 0, dueDate: "" }]);
  };

  // Remove a payment
  const removePayment = (index) => {
    setPayments(payments.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Plan 💰</h1>

      {payments.map((payment, index) => (
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
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        + Add Another Payment
      </button>
    </div>
  );
};

export default PaymentPlan;
