import "../TabPanelContent.scss";

import React, { ReactElement, useState, useCallback } from "react";
import FormTag from "components/Form/FormTag";
import Button from "@mui/material/Button";

import { UserPersonalData } from "types/UserProfileDataProps/UserProfileDataProps";
import TabPanelContent from "../TabPanelContent";

interface TabPanelContentProps {
  userData: UserPersonalData;
}

function TabPersonalData({ userData }: TabPanelContentProps): ReactElement {
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
        {Object.entries(userData).map(([key, value]) => (
          <TabPanelContent
            key={key}
            label={key}
            value={value}
            isEditing={isEditing}
          />
        ))}

        <Button className="profile-page__form_button" onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </>
    </FormTag>
  );
}

export default TabPersonalData;
