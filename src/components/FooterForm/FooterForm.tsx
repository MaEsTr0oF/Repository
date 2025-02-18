import styles from './FooterForm.module.css'

export default function FooterForm() {
	return (
	
		<form className={styles.deliveryForm}>
			<h2>УКАЖИТЕ АДРЕС ДОСТАВКИ И МЫ ПОДБЕРЕМ НЕСКОЛЬКО ВАРИАНТОВ</h2>
			<div className={styles.formFields}>
				<input type="text" placeholder="Имя" className={styles.input} />
				<input type="tel" placeholder="Телефон" className={styles.input} />
				<input type="text" placeholder="С чем могу помочь?" className={styles.input} />
				<button type="submit" className={styles.submitButton}>Отправить</button>
			</div>
			</form>
	
	)
}
