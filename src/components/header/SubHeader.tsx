import { Link } from "react-router-dom";
import PhoneMap from "./PhoneMap/PhoneMap";
import styles from "./SubHeader.module.css";

export default function SubHeader() {
  return (
    <div className={styles.subHeader}>
      <div className={styles.navigation}>
        <Link to="/about" className={styles.navLink}>О компании</Link>
        <Link to="/buyers" className={styles.navLink}>Покупателям</Link>
        <Link to="/delivery" className={styles.navLink}>Оплата и доставка</Link>
        <Link to="/contacts" className={styles.navLink}>Контакты</Link>
      </div>
      <PhoneMap />
    </div>
  );
}