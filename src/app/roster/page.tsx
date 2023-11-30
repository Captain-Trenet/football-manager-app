"use client";
import Box from "@/components/box/box";
import { useState } from "react";
import TopBar from "./components/topbar/topbar";
import PlayersTable from "@/components/players-table/players-table";
import DialogImport from "@/components/dialog-import/dialog-import";

const RosterPage = () => {
  const [importWindow, setImportWindow] = useState(false);

  const toggleImport = () => {
    setImportWindow(!importWindow);
  };

  return (
    <Box>
      <TopBar toggleImport={toggleImport} />
      <PlayersTable toggleImport={toggleImport} />
      {importWindow && <DialogImport closeImport={toggleImport} />}
    </Box>
  );
};

export default RosterPage;
