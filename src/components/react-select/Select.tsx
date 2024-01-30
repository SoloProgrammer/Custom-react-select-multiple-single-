import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./react-select.module.css";

type SelectOption = {
  label: string;
  value: any;
};

type MultiSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};
type SingleSelectProps = {
  multiple?: false;
  value: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (MultiSelectProps | SingleSelectProps);

const Select = ({ multiple, value, options, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const clearValue = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  };
  const handleSelect = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else {
        onChange([...value, option]);
      }
    } else onChange(option);
  };

  const isSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : value === option;
  };

  const [highligtedIndex, setHighligtedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          setIsOpen(prev => !prev)
          break
        case "Backspace":
          {
            if (multiple) {
              const lastItem = value[value.length - 1];
              onChange(value.filter((val) => val !== lastItem));
            } else onChange(undefined);
          }
          break;
        case "ArrowDown":
        case "ArrowUp":
          {
            const newIndexVal =
              highligtedIndex + (e.code === "ArrowDown" ? 1 : -1);
            newIndexVal >= 0 &&
              newIndexVal < options.length &&
              setHighligtedIndex(newIndexVal);
          }
          break;
        case "Enter":
          {
            if (multiple) {
              handleSelect(options[highligtedIndex]);
            } else onChange(options[highligtedIndex]);
          }
          break;
        default:
          break;
      }
    };
    if (containerRef.current) {
      containerRef.current.addEventListener("keydown", handler);
    }
    return () => containerRef?.current?.removeEventListener("keydown", handler);
  }, [options, value, highligtedIndex]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      {/* value */}
      <div className={styles.value}>
        {multiple ? (
          <>
            {value.map((val) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(val);
                }}
                className={styles.chip}
                key={val.value}
              >
                {val.label} <span>&times;</span>
              </button>
            ))}
          </>
        ) : (
          value?.label
        )}
      </div>
      {/* actions */}
      <div className={styles.actions}>
        <span onClick={(e) => clearValue(e)} className={styles["clear-btn"]}>
          &times;
        </span>
        <span className={styles["divider"]}></span>
        <span className={styles["caret"]}></span>
      </div>
      {/* options */}
      {isOpen && (
        <ul className={styles.options}>
          {options?.map((option, index) => (
            <li
              onClick={() => handleSelect(option)}
              className={`${styles.option} ${
                isSelected(option) ? styles.selected : ""
              } ${highligtedIndex === index ? styles.highlighted : ""}`}
              key={option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
