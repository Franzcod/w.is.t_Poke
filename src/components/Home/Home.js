import React from "react";
import styles from "../Home/Home.module.css";
import CardQ from "../Home/CardQ/CardQ";
// import OptionsButton from "../Home/OptionsButton/OptionsButton";

export function Home() {
  return (
    <div className={styles.divRey}>
      <div className={styles.contMayor}>
        <CardQ />
      </div>
    </div>
  );
}

export default Home;
