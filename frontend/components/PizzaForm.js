import { useState } from 'react'
import React from 'react'
import { useCreateOrderMutation } from '../state/pizzaApi'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState)
  const [createOrder, {isLoading, isError, error}] = useCreateOrderMutation()

  const handleInputChange = (e) => {
    const {name, value, type, checked} = e.target
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const toppings = Object.keys(formState).filter(key => formState[key] === true)

    const orderData = {
      fullName: formState.fullName,
      size: formState.size,
      toppings,
    };
    try{
      await createOrder(orderData).unwrap()
      setFormState(initialFormState)
    } catch (err){
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2> 
      {isLoading && <div className='pending'>Order in progress...</div>}
      {isError && <div className='failure'>Order failed: {error.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
          data-testid="sizeSelect" 
          id="size" 
          name="size"
          value={formState.size}
          onChange={handleInputChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" value='Pepperoni' onChange={handleInputChange}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" value='Green Peppers' onChange={handleInputChange}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" value='Pineapple' onChange={handleInputChange}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" value='Mushrooms' onChange={handleInputChange}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox"value='Ham' onChange={handleInputChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
