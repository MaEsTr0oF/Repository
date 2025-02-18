import styles from './CabelProduct.module.css'
import CabelCatalog from "./CabelCatalog/CabelCatalog";
import CabelFilter from "./CabelFilter/CabelFilter";

export default function CabelProduct() {
	return (
		<div className={styles.cabelProduct}>
			<CabelCatalog />
			<CabelFilter />
		</div>
	)
}