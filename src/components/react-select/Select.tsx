import styles from "./react-select.module.css";

export type SelectOption = {
  label: string;
  value: any;
};

type SelectPropsType = {
  value: SelectOption;
  options: SelectOption[];
  onChange: (value: SelectOption) => void;
};

const Select = ({ value, options, onChange }: SelectPropsType) => {
  return (
    <div className={styles.container}>
      {value.label}
      <ul className={styles.options}>
        {options?.map((option: SelectOption) => (
          <li onClick={() => onChange(option)} key={option.value}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
