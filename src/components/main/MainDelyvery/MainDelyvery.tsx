import plus from "/img/plus.png";
import styles from "./MainDelyvery.module.css";

export default function MainDelyvery() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Условия Доставки и Оплаты</h2>
        <div className={styles.list}>
          <div className={styles.item}>
            Безналичный расчет <img src={plus} className={styles.icon} alt="" />
          </div>
          <div className={styles.item}>
            Оплата через онлайн-банк <img src={plus} className={styles.icon} alt="" />
          </div>
          <div className={styles.item}>
            Оплата по договору <img src={plus} className={styles.icon} alt="" />
          </div>
          <div className={styles.item}>
            Условия сотрудничества для юридических и физических лиц <img src={plus} className={styles.icon} alt="" />
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p className={styles.statNumber}>100%</p>
            <span className={styles.statText}>наших клиентов довольны условиями оплаты</span>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>95%</p>
            <span className={styles.statText}>заказов доставлены вовремя</span>
          </div>
        </div>
      </div>
    </div>
  );
}
