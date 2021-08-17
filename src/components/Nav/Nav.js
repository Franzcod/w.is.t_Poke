import React from "react";
import { Link } from "react-router-dom";

import styles from "./Nav.module.css";
import poke_icon from "../../assets/poke_icon.png";

export function Nav() {
  return (
    <div className={styles.fullNav}>
      <div className={styles.divRey}>
        <div className={styles.navCont}>
          <Link to="/home" className={styles.linkNav}>
            <img src={poke_icon} alt="" className={styles.img} />
            <p>W.is.T Poke</p>
          </Link>

          <Link to="/about" className={styles.linkNav}>
            <p>About</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
