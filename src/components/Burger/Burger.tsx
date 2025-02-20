import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Burger.module.css';

export const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  return (
    <div className={styles.burgerMenu}>
      <button 
        className={`${styles.burgerButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Открыть меню"
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </button>

      <div 
        className={`${styles.menuOverlay} ${isOpen ? styles.active : ''}`}
        onClick={toggleMenu}
      ></div>

      <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <div className={styles.menuHeader}>
          <Link to="/" className={styles.logo} onClick={toggleMenu}>
            КабельОпт
          </Link>
          <button 
            className={styles.closeButton}
            onClick={toggleMenu}
            aria-label="Закрыть меню"
          >
          </button>
        </div>

        <div className={styles.menuContent}>
          <div className={styles.menuSection}>
            <h3>Каталог</h3>
            <ul>
              <li><Link to="/catalog" onClick={toggleMenu}>Все товары</Link></li>
              <li><Link to="/catalog/cable" onClick={toggleMenu}>Кабельная продукция</Link></li>
              <li><Link to="/catalog/accessories" onClick={toggleMenu}>Аксессуары</Link></li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3>Информация</h3>
            <ul>
              <li><Link to="/about" onClick={toggleMenu}>О компании</Link></li>
              <li><Link to="/delivery" onClick={toggleMenu}>Доставка</Link></li>
              <li><Link to="/contacts" onClick={toggleMenu}>Контакты</Link></li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <h3>Документы</h3>
            <ul>
              <li><Link to="/policy" onClick={toggleMenu}>Политика конфиденциальности</Link></li>
              <li><Link to="/offer" onClick={toggleMenu}>Договор оферты</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.menuFooter}>
          <a href="tel:+78001234567" className={styles.phone}>8 (800) 123-45-67</a>
          <a href="mailto:info@kabelopt.ru" className={styles.email}>info@kabelopt.ru</a>
        </div>
      </div>
    </div>
  );
};
