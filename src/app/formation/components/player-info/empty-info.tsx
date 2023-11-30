import styles from "./player-info.module.scss";

const EmptyInfo = () => {
  return (
    <div className={styles.container}>
      <div style={{ height: "75%" }} className={styles.imgContainer}>
        &nbsp;
      </div>

      <div className={styles.top}>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default EmptyInfo;
