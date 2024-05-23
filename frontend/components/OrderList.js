import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterSize, setOrders } from '../state/pizzaSlice'
import { useGetOrdersQuery } from '../state/pizzaApi'


export default function OrderList() {
  // const orders = []
  const dispatch = useDispatch()
  const { data: orders = [], isLoading } = useGetOrdersQuery()
  const filterSize = useSelector(state => state.pizza.filterSize)

  useEffect(() => {
    if (orders) {
      dispatch(setOrders(orders))
    }
  }, [orders, dispatch])

  const filteredOrders = filterSize === "All"
    ? orders : orders.filter(order => order.size === filterSize)

  const handleFilterChange = (size) => {
    dispatch(setFilterSize(size))
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders {isLoading && ` Loading...`}</h2>
      <ol>
        {
          filteredOrders.map(order => {
            return (
              <li key={order.id}>
                <div>
              {order.customer} ordered a size {order.size} with {order.toppings && order.toppings.length ? (order.toppings.length === 1 ? '1 topping' : `${order.toppings.length} toppings`) : 'no toppings'}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === filterSize ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => handleFilterChange(size)}
              >{size}</button>
          })
        }
      </div>
    </div>
  )
}
