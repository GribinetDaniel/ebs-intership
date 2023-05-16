import styles from "../styles/Home.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faComments,
 faArrowRight,
 faUsers,
 faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/Container";
import Link from "next/link";

export default function Home() {
 return (
  <div className={styles.homepage}>
   <Container>
    <section className={styles.section__welcome}>
     <div className={styles.section__welcome__left}>
      <h2>Welcome to Mashabel!</h2>
      <p>
       a place where the passion for writing and creativity come together to
       create interesting and inspiring blogs.{" "}
      </p>
      <Link href="/posts">
       <button className={styles.section__welcome__button}>
        Get Started
        <FontAwesomeIcon
         icon={faArrowRight}
         style={{ width: "30px", height: "30px" }}
        />
       </button>
      </Link>
     </div>
     <div className={styles.section__welcome__right}>
      <Image
       src="/images/welcome.png"
       width={750}
       height={600}
       alt="Image"
       quality={100}
      />
     </div>
    </section>
   </Container>
   <section className={styles.section__facilities}>
    <div className={styles.section__facilities__description}>
     <h1>What you can find on our website</h1>
    </div>
    <div className={styles.section__cards}>
     <div className={styles.section__card}>
      <div className={styles.section__cardShape}>
       <FontAwesomeIcon
        icon={faComments}
        style={{ width: "50px", height: "50px" }}
       />
      </div>
      <h2 className={styles.section__cardTitle}>Variety of blogs</h2>
      <p className={styles.section__cardDescription}>
       Here, you will find a variety of blogs written by talented and
       enthusiastic authors who share their personal thoughts and experiences
       with the world.
      </p>
     </div>
     <div className={styles.section__card}>
      <div className={styles.section__cardShape}>
       <FontAwesomeIcon
        icon={faUsers}
        style={{ width: "50px", height: "50px" }}
       />
      </div>
      <h2 className={styles.section__cardTitle}>Friendly community</h2>
      <p className={styles.section__cardDescription}>
       In our community everyone will feel welcomed and accepted and will be
       encouraged to be themselves without fear of judgment.
      </p>
     </div>
     <div className={styles.section__card}>
      <div className={styles.section__cardShape}>
       <FontAwesomeIcon
        icon={faLightbulb}
        style={{ width: "45px", height: "45px" }}
       />
      </div>
      <h2 className={styles.section__cardTitle}>Inspiration place</h2>
      <p className={styles.section__cardDescription}>
       On our website you will find a lot of ideas and you can be inspired as
       much as you want
      </p>
     </div>
    </div>
   </section>
  </div>
 );
}
