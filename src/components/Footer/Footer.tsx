import styles from "./Footer.module.css"; // Импортируем стили

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogoContainer}>
          <h1 className={styles.footerLogo}>Logo</h1>
          <p className={styles.footerDescription}>
            Интернет-магазин строительных кабелей
          </p>
        </div>
        <div className={styles.footerLinksContainer}>
          <ul className={styles.footerList}>
            <li className={styles.footerListItem}>
              <a href="#" className={styles.footerLink}>
                Покупателям
              </a>
            </li>
            <li className={styles.footerListItem}>
              <a href="#" className={styles.footerLink}>
                О компании
              </a>
            </li>
            <li className={styles.footerListItem}>
              <a href="#" className={styles.footerLink}>
                Контакты
              </a>
            </li>
          </ul>
          <ul className={styles.footerList}>
            <li className={styles.footerListItem}>
              <a href="#" className={styles.footerLink}>
                Политика конфиденциальности
              </a>
            </li>
            <li className={styles.footerListItem}>
              <a href="#" className={styles.footerLink}>
                Договор публичной оферты
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footerContacts}>
          <div className={styles.footerContactsInfo}>
            <p className={styles.footerPhone}>+7 (999) 999-999</p>
            <p className={styles.footerEmail}>Email: info@mail.ru</p>
          </div>
          <button className={styles.footerButton}>Наверх</button>
        </div>
      </div>
    </footer>
  );
}
