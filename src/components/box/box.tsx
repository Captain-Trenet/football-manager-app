import { BoxProps } from "@/interfaces/interfaces";
import React, { ReactNode } from "react";

const Box: React.FC<BoxProps> = ({ children, classe }) => {
  return <div className={classe}>{children}</div>;
};

export default Box;
