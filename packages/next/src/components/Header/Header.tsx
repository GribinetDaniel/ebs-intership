import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { Container } from "../Container";

export function Header() {
 return (
  <header className={styles.header}>
   <Container>
    <nav className={styles.navbar}>
     <div className={styles.logo}>
      <Image src="/images/logo.png" alt="logo" width={100} height={100} />
      <span>Mashable</span>
     </div>
     <ul className={styles.list}>
      <Link href="/">
       <li className={styles.list_item}>Home</li>
      </Link>
      <Link href="/posts">
       <li className={styles.list_item}>Posts</li>
      </Link>
     </ul>
    </nav>
   </Container>
  </header>
 );
}
