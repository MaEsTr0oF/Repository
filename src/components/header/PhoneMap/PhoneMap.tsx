import place from "/img/header/place.png";
import ArrowDown from "/img/header/ArrowDown.png";
import styles from "./PhoneMap.module.css";

export default function PhoneMap() {
  return (
    <div className={styles.container}>
      <div className={styles.citySelector}>
        <img src={place} alt="Выбрать город" className={styles.icon} />
        <span>Выбрать город</span>
        <img src={ArrowDown} alt="Стрелка вниз" className={styles.iconSmall} />
      </div>
      <div className={styles.phoneNumber}>+7 (900) 999-99-99</div>
      <button type="submit" className={styles.button}>
        <span>Оставить заявку</span>
      </button>
    </div>
  );
}
