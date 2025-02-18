import { useState } from 'react';
import styles from './mainFind.module.css';
import Modal from '../../Modal/Modal';

export default function MainFind() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		query: ''
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Search query:', formData.query);
		setIsModalOpen(true);
		setFormData({ query: '' });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ query: e.target.value });
	};

	return (
		<>
			<div className={styles.mainFind}>
				<div className={styles.mainFind_container}>
					<div className={styles.mainFind_content}>
						<h2>Не нашли то, что искали?</h2>
						<p>Оставьте заявку и мы найдем нужный вам товар</p>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Введите название товара"
								value={formData.query}
								onChange={handleChange}
								required
							/>
							<button type="submit">Найти</button>
						</form>
					</div>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Спасибо за запрос!"
				message="Мы начали поиск вашего товара и свяжемся с вами в ближайшее время."
			/>
		</>
	);
}