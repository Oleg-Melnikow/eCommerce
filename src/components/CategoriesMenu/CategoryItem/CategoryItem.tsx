import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactElement, useState } from "react";
import { Category } from "types/API/Category";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useProduct from "hooks/use-product";
import { useNavigate } from "react-router-dom";

type PropsType = {
  category: Category;
};

type PayloadPropsType = {
  name: string;
  image: string;
  categoryKey: string;
  id: string;
};

type CategoryChildPropsType = {
  payload: PayloadPropsType;
  path: string;
  isChildren: boolean;
};

function CategoryChild({
  payload,
  isChildren,
  path,
}: CategoryChildPropsType): ReactElement {
  const { name, image, id, categoryKey } = payload;
  const { setCategory } = useProduct();
  const navigate = useNavigate();

  const onChangeCategory = async (): Promise<void> => {
    setCategory({ id, key: categoryKey });
    navigate(`/catalog/${path}`);
  };

  return (
    <ListItem
      onClick={onChangeCategory}
      sx={{
        p: 1,
        borderLeft: "4px solid #eaeaea",
        minWidth: "210px",
        "&:hover": {
          cursor: "pointer",
          borderLeft: "4px solid #137227",
          color: "#137227",
        },
      }}
    >
      {image && (
        <ListItemIcon>
          <img style={{ borderRadius: "5px" }} src={image} alt={name} />
        </ListItemIcon>
      )}
      <ListItemText primary={name} />
      {isChildren && <NavigateNextIcon />}
    </ListItem>
  );
}

const propsData = (item: Category): PayloadPropsType => {
  const { id, name, assets, key } = item;
  const nameCategory = name.en || name["en-GB"] || name.ru;
  const image = assets[0]?.sources[0]?.uri;
  return { id, image, name: nameCategory, categoryKey: key };
};

export function CategoryItem({ category }: PropsType): ReactElement {
  const { categories } = useProduct();
  const [open, setOpen] = useState(false);

  const payload = propsData(category);
  const children = categories.filter((child) => {
    const [ancestor] = child.ancestors;
    return ancestor?.id === category.id;
  });

  const showChild = (): void => setOpen(true);
  const hideChild = (): void => setOpen(false);

  return (
    <Box
      onMouseEnter={showChild}
      onMouseLeave={hideChild}
      sx={{ position: "relative" }}
    >
      <CategoryChild
        payload={{ ...payload }}
        isChildren={!!children.length}
        path={category.key}
      />
      {!!children.length && (
        <Collapse
          in={open}
          sx={{
            zIndex: 20,
            position: "absolute",
            right: "-210px",
            top: 0,
            background: "#eaeaea",
            "@media (max-width: 800px)": {
              position: "relative",
              background: "#cacaca",
              right: 0,
              ml: 1,
            },
          }}
        >
          <List component="div" disablePadding>
            {children.map((child) => {
              const payloadChild = propsData(child);
              return (
                <CategoryChild
                  key={child.key}
                  path={`${category.key}/${child.key}`}
                  payload={{ ...payloadChild }}
                  isChildren={false}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </Box>
  );
}
