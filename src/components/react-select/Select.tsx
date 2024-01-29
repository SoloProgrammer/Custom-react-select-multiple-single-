import { useEffect, useRef, useState } from "react";
import styles from "./react-select.module.css";

export type SelectOption = {
  label: string;
  value: number;
};

type SingleSelectProps = {
  value?: SelectOption;
  multiple?: false;
  onChange: (value: SelectOption | undefined) => void;
};

type MultiSelectProps = {
  value: SelectOption[];
  multiple: true;
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultiSelectProps);

const Select = ({ multiple, value, options, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handleClear = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const handleSelect = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else onChange([...value, option]);
    } else {
      option !== value && onChange(option);
    }
  };

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log(e.code);

      switch (e.code) {
        case "Backspace":
          {
            if (multiple) {
              const lastItem = value[value.length - 1];
              handleSelect(lastItem);
            } else {
              onChange(undefined);
            }
          }
          break;
        case "ArrowUp":
        case "ArrowDown": {
          const newIndexValue =
            highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);

          newIndexValue >= 0 &&
            newIndexValue < options.length &&
            setHighlightedIndex(newIndexValue);
          break;
        }
        case "Space":
          setIsOpen((prev) => !prev);
          break;
        case "Enter":
          handleSelect(options[highlightedIndex]);
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    containerRef?.current?.addEventListener("keydown", handler);

    return () => containerRef?.current?.removeEventListener("keydown", handler);
  }, [options, value, highlightedIndex]);

  useEffect(() => {
    isOpen && setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
      ref={containerRef}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((val) => (
              <div
                onClick={(e) => {
                  handleSelect(val);
                  e.stopPropagation();
                }}
                key={val.value}
                className={styles.chip}
              >
                <span>{val.label}</span>
                <span className={styles.remove}>&times;</span>
              </div>
            ))
          : value?.label}
      </span>
      <div className={styles.actions}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <span className={styles["divider"]}></span>
        <button className={styles["caret"]}></button>
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options?.map((option: SelectOption, index: number) => (
            <li
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              } ${highlightedIndex === index ? styles.highlighted : ""}`}
              onClick={() => handleSelect(option)}
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
