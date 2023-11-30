import { CustomButtonProps } from "@/interfaces/interfaces";
import React from "react";

const CustomButton: React.FC<CustomButtonProps> = ({
  name,
  backgroundColor,
  fontColor,
  border,
  icon,
  handleClick,
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: backgroundColor || "none", // Default color if not provided
    color: fontColor || "#fff", // Default color if not provided
    border: border || "1px solid #494949", // Default border if not provided
    padding: "12px 20px", // Padding as specified
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "8px",
    fontFamily: "inherit",
    fontSize: "14px",
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {icon && <span>{icon}</span>}
      {name}
    </button>
  );
};

export default CustomButton;
