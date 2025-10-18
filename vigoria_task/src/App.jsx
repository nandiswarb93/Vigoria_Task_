import DynamicFormSection from "./components/dynamicForm";
import FlightSummary from "./components/FlightSummary";

function App() {

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Hello Nandiswar 👋</h1>
        <p className="text-gray-600 mb-6">Welcome to the Vigovia Task!</p>
        <FlightSummary/>
      </div>
    </div>
  );
}

export default App;
