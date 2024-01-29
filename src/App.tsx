import { useState } from "react";
import "./App.css";
import Select, { SelectOption } from "./components/react-select/Select";

const options = [
  { value: 1, label: "First" },
  { value: 2, label: "Second" },
  { value: 3, label: "Third" },
  { value: 4, label: "Fourth" },
  { value: 5, label: "Fifth" },
];
function App() {
  const [value, setValue] = useState<(typeof options)[0]>(options[1]);
  const handleChange = (value: SelectOption) => {
    setValue(value);
  };
  return (
    <>
      <Select value={value} options={options} onChange={handleChange} />
    </>
  );
}

export default App;
