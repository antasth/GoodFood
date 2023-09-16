import { MdOutlineClose } from 'react-icons/md';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { useState } from 'react';
import styles from './CartItem.module.scss';
import {
  addToCart,
  getActiveCart,
  removeFromCart,
} from '../../../../api/requests';

// eslint-disable-next-line max-lines-per-function
export function CartItem(props: {
  itemData: LineItem;
  setCartData: React.Dispatch<React.SetStateAction<Cart | undefined>>;
}): React.ReactElement {
  const { itemData, setCartData } = props;

  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const validPrice = itemData.variant.prices
    ? itemData.variant.prices[0].value.centAmount / 100
    : null;
  const validDiscountedPrice =
    itemData.variant.prices && itemData.variant.prices[0].discounted
      ? itemData.variant.prices[0].discounted.value.centAmount / 100
      : null;
  const validTotalPrice = itemData.totalPrice.centAmount / 100;
  const validTotalDiscountedPrice = itemData.totalPrice.centAmount / 100;
  const imageSrc = itemData.variant.images
    ? itemData.variant.images[0].url
    : '';
  const currentQuantity = itemData.quantity;

  const handleIncreaseQuantityButton = (): void => {
    setIsButtonsDisabled(true);
    getActiveCart().then(
      (cartResponse) => {
        const cart = cartResponse.body;
        const { productId } = itemData;
        const quantity = 1;
        addToCart(cart, productId, quantity).then(
          (result) => {
            setCartData(result.body);
            setIsButtonsDisabled(false);
          },
          (error: Error) => console.log(error),
        );
      },
      (error: Error) => console.log(error),
    );
  };

  const handleDecreaseQuantityButton = (): void => {
    setIsButtonsDisabled(true);
    getActiveCart().then(
      (cartResponse) => {
        const cart = cartResponse.body;
        const lineItemID = itemData.id;
        const quantity = 1;
        removeFromCart(cart, lineItemID, quantity).then(
          (result) => {
            setCartData(result.body);
            setIsButtonsDisabled(false);
          },
          (error: Error) => console.log(error),
        );
      },
      (error: Error) => console.log(error),
    );
  };

  const handleDeleteButton = (): void => {
    setIsButtonsDisabled(true);
    getActiveCart().then(
      (cartResponse) => {
        const cart = cartResponse.body;
        const lineItemID = itemData.id;
        const quantity = currentQuantity;
        removeFromCart(cart, lineItemID, quantity).then(
          (result) => {
            setCartData(result.body);
            setIsButtonsDisabled(false);
          },
          (error: Error) => console.log(error),
        );
      },
      (error: Error) => console.log(error),
    );
  };

  return (
    <>
      <div className={styles.product_block}>
        <img src={imageSrc} className={styles.image} alt="product" />
        <p className={styles.name}>{itemData.name.en}</p>
      </div>
      <div className={styles.quantity_block}>
        <button
          className={styles.quantity_button}
          onClick={handleDecreaseQuantityButton}
          disabled={isButtonsDisabled}
          type="button"
        >
          -
        </button>
        <p className={styles.quantity}>{currentQuantity}</p>
        <button
          className={styles.quantity_button}
          onClick={handleIncreaseQuantityButton}
          disabled={isButtonsDisabled}
          type="button"
        >
          +
        </button>
      </div>
      {validDiscountedPrice && (
        <div className={styles.prices_container}>
          <div className={styles.price_new}>$ {validDiscountedPrice}</div>
          <div className={styles.price_old}>$ {validPrice}</div>
        </div>
      )}
      {!validDiscountedPrice && (
        <div className={styles.price}>$ {validPrice}</div>
      )}
      {validTotalDiscountedPrice && (
        <div className={styles.prices_container}>
          <div className={styles.price_new}>$ {validTotalDiscountedPrice}</div>
          <div className={styles.price_old}>$ {validTotalPrice}</div>
        </div>
      )}
      {!validTotalDiscountedPrice && (
        <div className={styles.price}>$ {validTotalPrice}</div>
      )}
      <button
        className={styles.delete_button}
        onClick={handleDeleteButton}
        type="button"
        disabled={isButtonsDisabled}
      >
        <MdOutlineClose className={styles.delete_icon} />
      </button>
    </>
  );
}