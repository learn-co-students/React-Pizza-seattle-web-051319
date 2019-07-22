import React from "react"

const Pizza = (props) => {

  const handleClick = () => {
    props.editPizza(props.pizza)
  }

  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian ? 'Yes' : 'No'}</td>
      <td><button onClick={handleClick} type="button" className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
