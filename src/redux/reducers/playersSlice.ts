import { Player } from "@/interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayersState {
  teamName: string;
  allPlayers: Player[] | [];
  filteredPlayers: Player[] | [];
  currentPlayer: Player | null;
  activePlayer: Player | null;
}

const initialState: PlayersState = {
  teamName: "My Team",
  allPlayers: [],
  filteredPlayers: [],
  currentPlayer: null,
  activePlayer: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    updateTeamName: (state, action: PayloadAction<string>) => {
      state.teamName = action.payload;
    },
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.allPlayers = action.payload;
    },
    setFilteredPlayers: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        return { ...state, filteredPlayers: [] };
      }

      const data = state.allPlayers.filter((player) => {
        const playerName = player.playername.toLowerCase();
        const position = player.position.toLowerCase();
        return (
          playerName.includes(action.payload) ||
          position.includes(action.payload)
        );
      });

      return { ...state, filteredPlayers: data };
    },
    setCurrentPlayer: (state, action: PayloadAction<Player>) => {
      state.currentPlayer = action.payload;
    },
    deletePlayer: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPlayer: null,
        allPlayers: state.allPlayers?.filter(
          (player) => player.id !== action.payload
        ),
      };
    },
    updateCurrentPlayer: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;
      if (state.currentPlayer) {
        state.currentPlayer = { ...state.currentPlayer, [name]: value };
      }
    },
    updatePlayer: (state, action: PayloadAction<Player>) => {
      const { id } = action.payload;
      const allPlayers = state.allPlayers.map((player) =>
        player.id === id ? action.payload : player
      );
      return { ...state, allPlayers };
    },
    setActivePlayer: (state, action: PayloadAction<Player>) => {
      // Assuming 'activePlayer' is a property in the state
      state.activePlayer = action.payload;
    },
  },
});

export const {
  setPlayers,
  deletePlayer,
  updatePlayer,
  setFilteredPlayers,
  setCurrentPlayer,
  updateCurrentPlayer,
  setActivePlayer,
  updateTeamName,
} = playersSlice.actions;
export default playersSlice.reducer;
