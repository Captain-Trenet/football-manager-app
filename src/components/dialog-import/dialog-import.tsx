import React, { useState, ChangeEvent } from "react";
import styles from "./dialog-import.module.scss";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { DialogImportProps, Player } from "@/interfaces/interfaces";
import { setPlayers } from "@/redux/reducers/playersSlice";
import CustomButton from "../custom-button/custom-button";
import Close from "@/assets/close";

const DialogImport: React.FC<DialogImportProps> = ({ closeImport }) => {
  const [filename, setFilename] = useState<string | undefined>();
  const [emptyKey, setEmptyKey] = useState<boolean>(false);
  const [playersData, setPlayersData] = useState<Player[]>([]); // Adjust the type based on your player data structure

  const dispatch = useDispatch();

  // Function to calculate the count of players based on position
  const countPlayersByPosition = (position: string) =>
    playersData.filter((player) => player.position === position).length;

  // Calculate total number of players
  const totalPlayers = playersData.length;

  // Calculate counts for each position
  const totalGoalkeepers = countPlayersByPosition("Goalkeeper");
  const totalDefenders = countPlayersByPosition("Defender");
  const totalMidfielders = countPlayersByPosition("Midfielder");
  const totalForwards = countPlayersByPosition("Forward");

  // parse csv data
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setFilename(file.name);
        let modifiedData: any[] = [];

        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: function (res) {
            console.log(res.data);
            let keys: string[] = [];
            let values: any[] = [];

            const toCamelCase = (str: string) => {
              return str.replace(/\s+/g, "").toLowerCase();
            };
            res.data.forEach((d: any) => {
              let modifiedObject: any = {};
              Object.keys(d).forEach((key) => {
                modifiedObject[toCamelCase(key)] = d[key];
              });
              modifiedData.push({
                id: Date.now() + Math.round(Math.random() * 999),
                ...modifiedObject,
              });

              values = [...values, ...Object.values(d)];
            });

            if (keys.includes("") || values.includes("")) {
              setEmptyKey(true);
            } else {
              console.log("modifiedData", modifiedData);
              setPlayersData(modifiedData);
              setEmptyKey(false);
            }
          },
        });
      } else {
        alert("File must be in .csv format");
      }
    }
  };

  const setPlayersDataRedux = () => {
    dispatch(setPlayers(playersData));
    closeImport();
  };

  return (
    <div className={styles.container}>
      <div>
        {/* top */}
        <div className={styles.header}>
          <span>Importer</span>
          <div onClick={() => closeImport()} className={styles.closeDialog}>
            <Close type={2} />
          </div>
        </div>
        <div className={styles.line}>&nbsp;</div>

        {/* file upload */}
        <div className={styles.fileContainer}>
          <div className={styles.text}>Roster file</div>
          <div
            className={`${styles.fileRead} ${emptyKey && styles.fileReadError}`}
          >
            <div className={styles.selection}>
              {filename ? filename : "No file selected"}
            </div>
            <div className={styles.selectButton}>
              Select File
              <input accept=".csv" onChange={handleFileChange} type="file" />
            </div>
          </div>
        </div>

        {/* error */}
        {emptyKey ? (
          <div className={styles.error}>
            <div className={styles.errorTile}>Error</div>
            <div className={styles.errorDesc}>
              Your sheet is missing data. Please ensure all cells are filled
              out.
            </div>
          </div>
        ) : (
          <div className={styles.info}>File must be in .csv format</div>
        )}

        {/* file summary */}
        {filename && !emptyKey && (
          <div className={styles.fileSum}>
            <div className={styles.infoHeader}>File Summary</div>
            <div className={styles.fileInfo}>
              <div>
                <div className={styles.fileInfoTile}>Total Players</div>
                <div className={styles.fileInfoTileCount}>{totalPlayers}</div>
              </div>
              <div>
                <div className={styles.fileInfoTile}>Goalkeepers</div>
                <div className={styles.fileInfoTileCount}>
                  {totalGoalkeepers}
                </div>
              </div>
              <div>
                <div className={styles.fileInfoTile}>Defenders</div>
                <div className={styles.fileInfoTileCount}>{totalDefenders}</div>
              </div>
              <div>
                <div className={styles.fileInfoTile}>Midfielders</div>
                <div className={styles.fileInfoTileCount}>
                  {totalMidfielders}
                </div>
              </div>
              <div>
                <div className={styles.fileInfoTile}>Forwards</div>
                <div className={styles.fileInfoTileCount}>{totalForwards}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* button */}
      {filename && !emptyKey ? (
        <div className={styles.dialogBtn}>
          <CustomButton
            name={"Import"}
            backgroundColor={"#FEA013"}
            border={"1px solid #FEA013"}
            fontColor={"#F8F8F8"}
            handleClick={setPlayersDataRedux}
          />
        </div>
      ) : (
        <div className={styles.dialogBtn}>
          <CustomButton
            name={"Import"}
            backgroundColor={"#2D2D2D"}
            border={"none"}
            fontColor={"#707070"}
          />
        </div>
      )}
    </div>
  );
};

export default DialogImport;
