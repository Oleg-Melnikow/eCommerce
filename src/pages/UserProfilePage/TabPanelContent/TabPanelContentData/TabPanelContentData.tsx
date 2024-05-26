import "../TabPanelContent.scss";
import React, { ReactElement } from "react";
import TextField from "@mui/material/TextField";

interface TabPanelContentDataProps {
  label: string;
  value: string;
  isEditing: boolean;
}

function Comp({
  label,
  value,
  isEditing,
}: TabPanelContentDataProps): ReactElement {
  const [input, setInput] = React.useState(value);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name } = event.target;
    setInput(value);
  };

  return (
    <div key={label} className="form__field">
      {isEditing ? (
        <>
          <label className="form__field_label" htmlFor={label}>
            {label}:
          </label>
          <TextField
            className="form__field_content-input"
            id={label}
            name={label}
            value={input}
            onChange={handleInputChange}
            autoFocus
          />
        </>
      ) : (
        <>
          <span className="form__field_label">{label}:</span>
          <p className="form__field_content">{input}</p>
        </>
      )}
    </div>
  );
}

export default Comp;
