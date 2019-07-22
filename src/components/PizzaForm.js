import React from "react"

class PizzaForm extends React.Component {

  constructor() {
    super()
    this.state = {
      pizza: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pizza !== prevProps.pizza) {
      this.setState({ pizza: this.props.pizza })
    }
  }

  handleChange = ev => {
    if (ev.target.name === 'size') {
      this.setState({pizza: {...this.state.pizza, size: ev.target.value}})
    }
    else if (ev.target.name === 'topping') {
      this.setState({pizza: {...this.state.pizza, topping: ev.target.value}})
    }
    else {
      console.log(ev.target)
      this.setState({pizza: {...this.state.pizza, vegetarian: !this.state.pizza.vegetarian}})
    }
  }

  render() {
    return (
      <div className="form-row">
        <div className="col-5">
          <input type="text" name='topping' className="form-control" placeholder="Pizza Topping" onChange={this.handleChange} value={
            this.state.pizza.topping
          } />
        </div>
        <div className="col">
          <select name='size' value={this.state.pizza.size} onChange={this.handleChange} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" checked={this.state.pizza.vegetarian ? true : false} onChange={this.handleChange}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" checked={this.state.pizza.vegetarian ? false : true} onChange={this.handleChange} />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => this.props.updatePizza(this.state.pizza)}>Submit</button>
        </div>
      </div>
    )
  }
}

export default PizzaForm
