import React from "react"

const PizzaForm = (props) => {
  return(
      <form className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" value={props.formInput.topping} name="topping" onChange={props.updateForm}/>
        </div>
        <div className="col">
          <select value={props.formInput.size}  name="size" onChange={props.updateForm} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value={true} checked={props.formInput.vegetarian}  name="vegetarian" onChange={props.updateForm}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value={null} checked={!props.formInput.vegetarian}  name="vegetarian" onChange={props.updateForm}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.submitForm} >Submit</button>
        </div>
      </form>

  )
}

export default PizzaForm
