import React from "react";
import styles from "../Home/Home.module.css";
import CardQ from "../Home/CardQ/CardQ";
import OptionsButton from "../Home/OptionsButton/OptionsButton";

export function Home() {
  return (
    <div className={styles.divRey}>
      home
      <div className={styles.contMayor}>
        <CardQ />
        <OptionsButton />
      </div>
    </div>
  );
}

export default Home;
