import { useState } from "react";
import styles from "./Burger.module.css";

export default function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.burgerMenu}>
      <button
        className={`${styles.burgerButton} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
        <ul>
          <li><a href="#">Сравнение</a></li>
          <li><a href="#">Отложенное</a></li>
          <li><a href="#">Корзина</a></li>
          <li><a href="#">Контакты</a></li>
          <li><a href="#">О компании</a></li>
          <li><a href="#">Покупателям</a></li>
          <li><a href="#">Оплата и доставка</a></li>
          <li><a href="#">Контакты</a></li>
        </ul>
      </nav>
    </div>
  );
}
