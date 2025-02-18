import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Actions.module.css';
import CartModal from '../CartModal/CartModal';

interface ActionsProps {
	imagesrc: string;
	label: string;
}

export default function Actions({ imagesrc, label }: ActionsProps) {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const getLink = (label: string) => {
		switch (label) {
			case "Корзина":
				return "/cart";
			case "Отложенные":
				return "/favorites";
			case "Сравнение":
				return "/compare";
			default:
				return "/";
		}
	};

	const handleClick = () => {
		if (label === "Корзина") {
			setIsCartOpen(true);
		}
	};

	return (
		<>
			<Link to={getLink(label)} className={styles.actions} onClick={handleClick}>
				<img src={imagesrc} alt={label} />
				<span>{label}</span>
			</Link>

			{label === "Корзина" && (
				<CartModal
					isOpen={isCartOpen}
					onClose={() => setIsCartOpen(false)}
				/>
			)}
		</>
	);
}