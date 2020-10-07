import { Trash } from '@components/icon'
import { useCommerce } from '@lib/bigcommerce'
import useUpdateItem from '@lib/bigcommerce/cart/use-update-item'
import { ChangeEvent, useEffect, useState } from 'react'
import formatVariantPrice from 'utils/format-item-price'
import styles from './CartItem.module.css'

const CartItem = ({
  item,
  currencyCode,
}: {
  item: any
  currencyCode: string
}) => {
  const { locale } = useCommerce()
  const updateItem = useUpdateItem()
  const [quantity, setQuantity] = useState(item.quantity)
  const { price } = formatVariantPrice({
    listPrice: item.extended_list_price,
    salePrice: item.extended_sale_price,
    currencyCode,
    locale,
  })
  const updateQuantity = async (val: number) => {
    const data = await updateItem({
      itemId: item.id,
      item: {
        productId: item.product_id,
        variantId: item.variant_id,
        quantity: val,
      },
    })
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(e.target.value)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <li className="flex flex-row space-x-6">
      <div className="h-12 w-12 bg-violet"></div>
      <div className="flex-1 flex flex-col">
        <span>{item.name}</span>
        <div className="py-2">
          <button type="button" onClick={() => increaseQuantity(-1)}>
            -
          </button>
          <input
            type="number"
            className={styles.quantity}
            value={quantity}
            onChange={handleQuantity}
            onBlur={handleBlur}
          />
          <button type="button" onClick={() => increaseQuantity(1)}>
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <span>{price}</span>
        <span className="flex justify-end">
          <Trash />
        </span>
      </div>
    </li>
  )
}

export default CartItem