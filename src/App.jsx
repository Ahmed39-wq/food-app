import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodData } from './feature/foodSlice'
import { addToCart, removeCartItem, clearCart, increase, decrease } from './feature/foodSlice'
import './App.css'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFoodData())
  }, [dispatch])

  const {foodData, isLoading, cartItem} = useSelector(state => state.food)

  return (
    <>
    {
      isLoading && <h1>Fetching data from api</h1>
    }
   <div>
    {
      foodData.map(data => (
        <div key={data.id}>
          <p>{data.title}</p>
          <p>{data.price}</p>
          <p>{data.description}/</p>
          <img style={{width: '5rem'}} src={data.image} alt="" />
          <div className='add-item'>
            <button onClick={() => dispatch(decrease(data))}>-</button>
            <button onClick={() => dispatch(increase(data))}>+</button>
          </div>
          <button onClick={() => dispatch(addToCart(data))}>Add to Cart</button>
        </div>
      ))
    }
   </div>
    
    <h1>Cart Items</h1>
    <div>
      {
        cartItem?.length !== 0 && cartItem?.map(item => {
          const {title, id, image, quantity} = item
          return (
            <div key={id}>
              <p>{title}</p>
              <img src={image} alt={title} style={{width: '2rem'}} />
              <div className='quantity'>
                <button onClick={() => dispatch(decrease(id))}>-</button>
                <p>{quantity}</p>
                <button onClick={() => dispatch(increase(id))}>+</button>
              </div>
              <button onClick={() => dispatch(removeCartItem(id))}>Remove Item</button>
            </div>
          )
        })
      }
    </div>

    <div >
      {
      cartItem?.length !== 0 && <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      }
    </div>
    </>
  )
}

export default App
