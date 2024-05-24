import "./TabPanelContent.scss";

import React, { ReactElement, useEffect, useState, useCallback } from "react";
import FormTag from "components/Form/FormTag";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function TabPanelContent({ tabContent }: { tabContent: string }): ReactElement {
  // Получение данных из ЛС и установка их как дефолтных в лейблы и ТекстФилды
  const [personalValues, setPersValues] = useState<Record<string, string>>({});
  const [addressValues, setAddressValues] = useState<Record<string, string>>(
    {}
  );
  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      const parsedUserData = JSON.parse(userProfile);
      const { firstName, lastName, dateOfBirth } = parsedUserData;
      setPersValues({ firstName, lastName, dateOfBirth });
    }
  }, []);

  // Флаг который переключает Текстовые поля в Инпуты для заполнения
  const [isEditing, setIsEditing] = React.useState(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setPersValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  const handleEditClick = useCallback(() => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }, []);

  return (
    <FormTag
      className="profile-page__form"
      id="personal-form"
      url="#"
      onSubmit={() => {}}
    >
      {Object.keys(personalValues).map((key) => (
        <div key={key} className="form__field">
          {isEditing ? (
            <>
              <label className="form__field_label" htmlFor={key}>
                {key}:
              </label>
              <TextField
                className="form__field_content-input"
                id={key}
                name={key}
                value={personalValues[key] || ""}
                onChange={handleInputChange}
                autoFocus
              />
            </>
          ) : (
            <>
              <span className="form__field_label">{key}:</span>
              <p className="form__field_content">{personalValues[key]}</p>
            </>
          )}
        </div>
      ))}

      <Button className="profile-page__form_button" onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </Button>
    </FormTag>
  );
}

export default TabPanelContent;
