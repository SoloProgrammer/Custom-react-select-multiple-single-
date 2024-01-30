import { useState } from "react";
import "./App.css";
import Select from "./components/react-select/Select";

const options = [
  { value: 1, label: "First" },
  { value: 2, label: "Second" },
  { value: 3, label: "Third" },
  { value: 4, label: "Fourth" },
  { value: 5, label: "Fifth" },
];
function App() {
  const [value, setValue] = useState<(typeof options)[0] | undefined>(
    options[0]
  );

  const [value1, setValue1] = useState<typeof options>([options[0]]);
  return (
    <>
      <Select
        key={new Date().getTime()}
        value={value}
        options={options}
        onChange={(o) => setValue(o)}
      />
      <br />
      <Select
        key={new Date().getTime() + 1}
        multiple
        value={value1}
        options={options}
        onChange={(o) => setValue1(o)}
      />
    </>
  );
}

export default App;
