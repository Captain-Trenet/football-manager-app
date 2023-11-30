import { Player, PositionPlayers } from "@/interfaces/interfaces";

export const filterPlayersByPosition = (
  players: Player[] | undefined,
  position: string
): Player[] | undefined => {
  return players?.filter((p) => p.starter === "Yes" && p.position === position);
};

export const getPositionPlayers = (
  starters: Player[] | undefined
): PositionPlayers => {
  const goalKeeper =
    starters && filterPlayersByPosition(starters, "Goalkeeper");
  const defenders = starters && filterPlayersByPosition(starters, "Defender");
  const midFielders =
    starters && filterPlayersByPosition(starters, "Midfielder");
  const forward = starters && filterPlayersByPosition(starters, "Forward");

  return { goalKeeper, defenders, midFielders, forward };
};

export const messageName1 = "No player data found";
export const messageName2 = "Not enough starters";
export const messageName3 = "There are too many starters";

export const messageInfo1 = "Please import your roster first";
export const messageInfo2 =
  "Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation";
export const messageInfo3 =
  "Your team has too many starters for one or more of the positions in the 4-3-3 formation.";

export const convertCmtoM = (str: string): string => {
  const temp = parseFloat(str);
  return (temp * 0.1).toFixed(1);
};
