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
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const handleChange = (value: SelectOption | undefined) => {
    setValue(value);
  };
  const handleChange1 = (value: SelectOption[]) => {
    setValue1(value);
  };
  return (
    <>
      <Select
        key={"new 1"}
        value={value}
        options={options}
        onChange={handleChange}
      />
      <br />
      <Select
        key={"new 2"}
        multiple
        value={value1}
        options={options}
        onChange={handleChange1}
      />
    </>
  );
}

export default App;
