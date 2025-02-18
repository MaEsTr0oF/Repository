import teleg from "/img/teleg.png";
import whats from "/img/whats.png";
import "./MainContForm.css";

export default function MainContForm() {
  const data = {
    adress: {
      label: "Адрес",
      text: "Город, улица, д/строение",
    },
    email: {
      label: "Email",
      text: "mail@gmail.com",
    },
    telephone: {
      label: "Телефон",
      text: "+7 (900) 000-00-00",
    },
  };

  return (
    <div className="main-container">
      <div className="contact-wrapper">
        {/* Левая часть */}
        <div className="contact-info">
          <h2 className="contact-title">КОНТАКТЫ</h2>
          <div className="contact-details">
            {Object.values(data).map((e, index) => (
              <div className="contact-item" key={index}>
                <h3 className="contact-label">{e.label}</h3>
                <span className="contact-text">{e.text}</span>
              </div>
            ))}
            <div className="contact-icons">
              <img src={teleg} alt="Telegram" />
              <img src={whats} alt="WhatsApp" />
            </div>
          </div>
        </div>
        <div className="contact-form">
          <h2 className="form-title">
            Остались вопросы? Оставьте заявку и мы свяжемся с Вами
          </h2>
          <div className="form-input-group">
            <input type="text" placeholder="Имя" className="form-input" />
            <input
              type="text"
              placeholder="+7 (000) 000-00-00"
              className="form-input"
            />
          </div>
          <textarea
            name="question"
            placeholder="Ваш вопрос"
            className="form-textarea"
          />
          <div className="form-footer">
            <button className="form-button">Отправить</button>
            <span className="form-note">
              *Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
