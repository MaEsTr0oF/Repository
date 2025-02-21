import { useState, FormEvent } from 'react';
import styles from './RequestForm.module.css';
import Modal from '../Modal/Modal';

interface RequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestForm({ isOpen, onClose }: RequestFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', phone: '', message: '' });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>Оставить заявку</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Ваш телефон"
                value={formData.phone}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.textarea}
              />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Отправить заявку
            </button>
            
            <p className={styles.privacy}>
              Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Спасибо за заявку!"
        message="Мы получили вашу заявку и свяжемся с вами в ближайшее время."
      />
    </>
  );
} 