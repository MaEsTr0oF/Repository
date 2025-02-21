import { useState } from "react";
import styles from "./PhoneMap.module.css";
import place from "/img/header/place.png";

const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург'];

export default function PhoneMap() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCity, setSelectedCity] = useState('Москва');

	const handleCitySelect = (city: string) => {
		setSelectedCity(city);
		setIsOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.citySelector}>
				<button 
					className={styles.cityButton} 
					onClick={() => setIsOpen(!isOpen)}
				>
					<img src={place} alt="Выбрать город" className={styles.icon} />
					<span>{selectedCity}</span>
					<span className={`${styles.arrow} ${isOpen ? styles.arrowRotated : ''}`}>▼</span>
				</button>
				{isOpen && (
					<div className={styles.cityDropdown}>
						{cities.map(city => (
							<button
								key={city}
								className={`${styles.cityOption} ${selectedCity === city ? styles.selected : ''}`}
								onClick={() => handleCitySelect(city)}
							>
								{city}
							</button>
						))}
					</div>
				)}
			</div>
			<div className={styles.phoneNumber}>+7 (900) 999-99-99</div>

		</div>
	);
}
