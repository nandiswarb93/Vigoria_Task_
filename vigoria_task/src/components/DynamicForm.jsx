// import React from "react";

// export default function DynamicFormSection({ title, fields, data, onChange, onRemove }) {
//   const update = (key, value) => {
//     onChange({ ...data, [key]: value });
//   };

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//         {onRemove && (
//           <button
//             onClick={onRemove}
//             className="text-red-500 hover:text-white hover:bg-red-500 transition-all px-3 py-1 rounded-md border border-red-500 text-sm"
//           >
//             Remove
//           </button>
//         )}
//       </div>

//       {/* Input Fields */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {fields.map((field) => (
//           <div key={field.name} className="flex flex-col">
//             <label className="text-sm font-medium text-gray-600 mb-1">
//               {field.label}
//             </label>
//             <input
//               type={field.type || "text"}
//               placeholder={field.placeholder || ""}
//               value={data[field.name] || ""}
//               onChange={(e) => update(field.name, e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function DynamicFormSection({
  title,
  fields,
  data,
  onChange,
  onRemove,
  addButtonText, // new prop: text for add button
  onAdd, // new prop: callback for add button
}) {
  const update = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-white hover:bg-red-500 transition-all px-3 py-1 rounded-md border border-red-500 text-sm"
            >
              Remove
            </button>
          )}
          {onAdd && addButtonText && (
            <button
              onClick={onAdd}
              className="text-green-500 hover:text-white hover:bg-green-500 transition-all px-3 py-1 rounded-md border border-green-500 text-sm"
            >
              {addButtonText}
            </button>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              value={data[field.name] || ""}
              onChange={(e) => update(field.name, e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
