import { useSelector } from "react-redux";
import styles from "./topbar.module.scss";
import HeaderDetails from "@/components/header-details/header-details";
import SearchBar from "../search-bar/search-bar";
import CustomButton from "@/components/custom-button/custom-button";
import { RootState } from "@/redux/store";
import { TopBarProps } from "@/interfaces/interfaces";

const TopBar: React.FC<TopBarProps> = ({ toggleImport }) => {
  const players = useSelector((state: RootState) => state.players.allPlayers);

  return (
    <div className={styles.topbar}>
      <HeaderDetails />
      <div className={styles.right}>
        <SearchBar />
        <CustomButton
          handleClick={toggleImport}
          name={players?.length > 0 ? "Re-Import Team" : "Import Team"}
          backgroundColor={players?.length > 0 ? "transparent" : "#FEA013"}
          border={`${players?.length > 0 ? "1px solid #494949" : "none"}`}
          fontColor={"#fff"}
          key={1}
        />
      </div>
    </div>
  );
};

export default TopBar;
