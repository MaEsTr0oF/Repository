import styles from './CabelProduct.module.css'
import CabelCatalog from "./CabelCatalog/CabelCatalog";
import CabelFilter from "./CabelFilter/CabelFilter";
import PageTitle from "../PageTitle/PageTitle";

export default function CabelProduct() {
	return (
		<div className={styles.cabelProduct}>
			<PageTitle title="Каталог товаров" />
			<CabelCatalog />
			<CabelFilter />
		</div>
	)
}