import { Link } from 'react-router-dom';
import styles from './Actions.module.css';

interface ActionsProps {
	imagesrc: string;
	label: string;
}

export default function Actions({ imagesrc, label }: ActionsProps) {
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

	return (
		<Link to={getLink(label)} className={styles.actions}>
			<img src={imagesrc} alt={label} />
			<span>{label}</span>
		</Link>
	);
}