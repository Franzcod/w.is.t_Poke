import React from "react";
import styles from "../Init/Init.module.css";
import { Link } from "react-router-dom";

export function Init() {
  return (
    <div className={styles.divRey}>
      <div className={styles.contMayor}>
        <Link to={"/home"} className={styles.boton}>
          <h2>INICIAR</h2>
        </Link>
      </div>
    </div>
  );
}

export default Init;
