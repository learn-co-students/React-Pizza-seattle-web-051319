import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      editingPizza: {}
    }
  }

  componentDidMount() {
    this.fetchPizzas()
  }

  fetchPizzas = () => {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(json => this.setState({pizzas: json}))
  }

  editPizza = pizza => {
    this.setState({editingPizza: pizza})
  }

  updatePizza = pizza => {
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        size: pizza.size,
        topping: pizza.topping,
        vegetarian: pizza.vegetarian
      })
    })
    .then(res => res.json())
    .then(json => {
      const filteredPizzas = this.state.pizzas.filter(element => element.id !== pizza.id)
      const pizzas = [...filteredPizzas, json].sort((a, b) => {
        return a.id - b.id
      })
      this.setState({
        pizzas
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.editingPizza} updatePizza={this.updatePizza}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
