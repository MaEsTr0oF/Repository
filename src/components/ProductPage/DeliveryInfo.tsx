import styles from './ProductPage.module.css';

interface DeliveryInfoProps {
    customInfo?: string;
}

export default function DeliveryInfo({ customInfo }: DeliveryInfoProps) {
    return (
        <div className={styles.deliveryInfo}>
            {customInfo ? (
                <p>{customInfo}</p>
            ) : (
                <>
                    <h3>Доставка</h3>
                    <ul className={styles.deliveryList}>
                        <li>Доставка по всей России</li>
                        <li>Курьерская доставка: 1-3 дня</li>
                        <li>Самовывоз из пунктов выдачи: 1-2 дня</li>
                        <li>Почта России: 3-7 дней</li>
                    </ul>
                    
                    <h3>Оплата</h3>
                    <ul className={styles.paymentList}>
                        <li>Наличными при получении</li>
                        <li>Банковской картой онлайн</li>
                        <li>Безналичный расчет (для юридических лиц)</li>
                    </ul>
                    
                    <p className={styles.deliveryNote}>
                        Стоимость доставки зависит от региона и способа доставки. 
                        Точную стоимость доставки вы можете узнать при оформлении заказа.
                    </p>
                </>
            )}
        </div>
    );
} 