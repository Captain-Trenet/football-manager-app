import React, { ChangeEvent } from "react";
import styles from "./edit-dialog.module.scss";
import DownArrow from "@/assets/down-arrow";
import { FormInputProps } from "@/interfaces/interfaces";

const FormInput: React.FC<FormInputProps> = ({
  type = 1,
  name,
  value,
  data,
  handleInputChange,
  inputName,
}) => {
  if (type === 1) {
    return (
      <div className={styles.formInput}>
        <div className={styles.name}>{name}</div>
        <input
          name={inputName}
          onChange={handleInputChange}
          value={value}
          type="text"
          className={styles.input}
        />
      </div>
    );
  }
  if (type === 2) {
    return (
      <div className={styles.formInput}>
        <label htmlFor="customSelect" className={styles.name}>
          {name}
        </label>

        <div className={styles.options}>
          <select
            name={inputName}
            onChange={handleInputChange}
            id="customSelect"
          >
            {data?.map((val) => (
              <option key={val} value={val} selected={val === value}>
                {val}
              </option>
            ))}
          </select>
          <div className={styles.arrow}>
            <DownArrow />
          </div>
        </div>
      </div>
    );
  }
  if (type === 3) {
    return (
      <div className={styles.formInput}>
        <label htmlFor="customSelect" className={styles.name}>
          {name}
        </label>

        <div className={styles.radio}>
          <label htmlFor="no" className={styles.no}>
            <input
              type="radio"
              name="starter"
              id="no"
              value="No"
              checked={value === "No"}
              onChange={handleInputChange}
            />
            <div className={styles.border}></div>
            No
          </label>
          <label htmlFor="yes" className={styles.no}>
            <input
              onChange={handleInputChange}
              value="Yes"
              type="radio"
              name="starter"
              id="yes"
              checked={value === "Yes"}
            />
            <div className={styles.border}></div>
            Yes
          </label>
        </div>
      </div>
    );
  }

  // Add a default case or throw an error for unknown types
  throw new Error(`Unknown FormInput type: ${type}`);
};

export default FormInput;
