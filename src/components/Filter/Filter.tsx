import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
} from "@mui/material";
import { colorsTree, crownShape } from "helpers/static-data";
import useProduct from "hooks/use-product";
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Filter(): ReactElement {
  const { setFilters, isLoading, filters } = useProduct();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [shape, setShape] = useState("");
  const [color, setColor] = useState("");

  const minDistance = 1;
  const priceInit = [0, 25];
  const [price, setPrice] = useState<number[]>(priceInit);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ): void => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  const onChangeFilterItem = (event: SelectChangeEvent): void => {
    const { value, name } = event.target;
    if (name === "crown-shape") {
      setShape(value);
    } else {
      setColor(value);
    }
  };

  const showProduct = (): void => {
    let filter: string[] = [
      `variants.price.centAmount:range (${price[0] * 100} to ${price[1] * 100})`,
    ];
    if (shape) {
      filter = [...filter, `variants.attributes.crown-shape.key:"${shape}"`];
    }
    if (color) {
      filter = [...filter, `variants.attributes.foliage-color.key:"${color}"`];
    }

    if (filter.length) {
      setFilters(filter);
      if (search) navigate(pathname);
    }
  };

  const resetFilter = useCallback((): void => {
    setShape("");
    setColor("");
    setPrice([0, 25]);
    if (filters.length) {
      setFilters([]);
    }
  }, [filters.length, setFilters]);

  const chnageValue = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    if (name === "Min") {
      const minValue = Number(value) > price[1] ? price[1] : Number(value);
      const resultValue = minValue < priceInit[0] ? priceInit[0] : minValue;
      setPrice([resultValue, price[1]]);
    } else {
      const maxValue = Number(value) < price[0] ? price[0] : Number(value);
      const resultValue = maxValue > priceInit[1] ? priceInit[1] : maxValue;
      setPrice([price[0], Number(resultValue)]);
    }
  };

  useEffect(() => {
    if (search.includes("search")) {
      resetFilter();
    }
  }, [resetFilter, search]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box sx={{ width: "100%", display: "flex", gap: "10px" }}>
        {["Min", "Max"].map((item, index) => {
          return (
            <TextField
              key={item}
              name={item}
              label={item}
              type="number"
              value={price[index]}
              onChange={chnageValue}
              size="small"
            />
          );
        })}
      </Box>
      <Box sx={{ margin: "0 10px" }}>
        <Slider
          max={25}
          getAriaLabel={() => "Minimum distance"}
          value={price}
          onChange={handleChange1}
          disableSwap
        />
      </Box>
      <FormControl fullWidth size="small">
        <InputLabel id="shape-label">Crown shape</InputLabel>
        <Select
          name="crown-shape"
          labelId="shape-label"
          value={shape}
          label="Crown shape"
          onChange={onChangeFilterItem}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {crownShape.map((el) => {
            return (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="color-label">Foliage/Needle Color</InputLabel>
        <Select
          name="color"
          labelId="color-label"
          value={color}
          label="Foliage/Needle Color"
          onChange={onChangeFilterItem}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {colorsTree.map((el) => {
            return (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        disabled={isLoading}
        variant="outlined"
        color="success"
        onClick={resetFilter}
      >
        Reset
      </Button>
      <Button
        disabled={isLoading}
        variant="contained"
        color="success"
        onClick={showProduct}
      >
        Show products
      </Button>
    </Box>
  );
}
