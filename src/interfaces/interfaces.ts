import { ReactElement, ReactNode } from "react";

export interface Player {
  id: number;
  playername: string;
  playerimage: string;
  jerseynumber: string;
  position: string;
  height: string;
  weight: string;
  nationality: string;
  flagimage: string;
  starter: string;
  appearances: string;
  minutesplayed: string;
  goals: string;
  assists: string;
  cleansheets: string;
  saves: string;
}

export interface TopBarProps {
  toggleImport: () => void;
}

export interface GroundProps {
  children?: React.ReactNode;
}

export interface BoxProps {
  children: ReactNode;
  classe?: string;
}

export interface CustomButtonProps {
  name: string;
  backgroundColor?: string;
  fontColor?: string;
  border?: string;
  icon?: ReactElement;
  handleClick?: () => void;
}

export interface DialogImportProps {
  closeImport: () => void;
}

export interface FormInputProps {
  type?: number;
  name: string;
  value: string;
  data?: string[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  inputName: string;
}

export interface InfoDialogProps {
  name: string;
  message: string;
}

export interface PlayerPositionProps {
  addClass: string;
  player: Player;
}

export interface PlayersTableProps {
  toggleImport: () => void;
}

export interface PositionPlayers {
  goalKeeper?: Player[] | null;
  defenders?: Player[] | null;
  midFielders?: Player[] | null;
  forward?: Player[] | null;
}
