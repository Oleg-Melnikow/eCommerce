interface ButtonTagProps {
  type: "button" | "submit" | "reset";
  title: string;
  onClick?: () => void;
}

export default ButtonTagProps;
