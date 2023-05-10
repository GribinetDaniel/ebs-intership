import React from "react";
import Image from "next/image";
import styles from "../styles/ErrorPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Custom404() {
 const router = useRouter();

 return (
  <>
   <div className={styles.image}>
    <Image src="/images/404.jpg" width={1000} height={700} alt="Error 404" />
   </div>
   <p className={styles.paragraph}>
    The page you're looking for isn't found <br />
    We suggest you back to home
   </p>
   <div style={{ display: "flex", justifyContent: "center" }}>
    <button className={styles.button} onClick={() => router.push("/")}>
     Home
     <FontAwesomeIcon icon={faArrowRight} />
    </button>
   </div>
  </>
 );
}
