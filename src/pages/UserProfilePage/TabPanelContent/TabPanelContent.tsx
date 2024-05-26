import "./TabPanelContent.scss";

import React, { ReactElement, useState, useCallback } from "react";
import FormTag from "components/Form/FormTag";
import Button from "@mui/material/Button";

import {
  UserPersonalData,
  UserAddressesData,
} from "types/UserProfileDataProps/UserProfileDataProps";
import Comp from "./TabPanelContentData/TabPanelContentData";

function TabPanelContent({
  userData,
}: {
  userData: UserPersonalData | UserAddressesData;
}): ReactElement {
  // Флаг который переключает Текстовые поля в Инпуты для заполнения
  const [isEditing, setIsEditing] = React.useState(false);

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
      <>
        {Object.entries(userData).map((item) => {
          const [key, value] = item;
          return (
            <Comp key={key} label={key} value={value} isEditing={isEditing} />
          );
        })}

        <Button className="profile-page__form_button" onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </>
    </FormTag>
  );
}

export default TabPanelContent;
