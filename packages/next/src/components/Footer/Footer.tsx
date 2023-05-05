import React from "react";
import Image from "next/image";
import { Container } from "../Container";
import styles from "./Footer.module.css";
export function Footer() {
 return (
  <div className={styles.footer}>
   <Container>
    <div className={styles.items}>
     <div className={styles.left}>
      <div className={styles.logo}>
       <Image src="/images/logo.png" alt="logo" width={200} height={200} />
       <span>Mashabel</span>
      </div>
     </div>
     <div className={styles.right}>
      <h2>Contact Us</h2>
      <ul className={styles.list}>
       <li className={styles.list_item}>
        <span>Email:</span>
        <span>mashabel@gamil.com</span>
       </li>
       <li className={styles.list_item}>
        <span>Tel: </span>
        <span>+373014562</span>
       </li>
       <li className={styles.list_item}>
        <span>Address:</span>
        <span>Chisinau, M.Eminescu 48</span>
       </li>
      </ul>
     </div>
    </div>
   </Container>
  </div>
 );
}
