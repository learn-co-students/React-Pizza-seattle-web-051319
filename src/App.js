import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const URL = "http://localhost:3000/pizzas"

class App extends Component {
    constructor(){
        super()
        this.state = {
            pizzas: [],
            // selectedPizza: null
            formInput: {
                id: 0,
                topping: '',
                size: '',
                vegetarian: true
            }
        }
    }

    componentDidMount(){
        fetch(URL)
        .then(res => res.json())
        .then(json => {
            this.setState({
                pizzas: json
            })
        })
    }
    selectPizza = pizza => {
        this.setState({
            formInput: {
                id: pizza.id,
                topping: pizza.topping,
                size: pizza.size,
                vegetarian: pizza.vegetarian
            }
        })

    }

    submitForm = (event) => {
        event.preventDefault()
        if(this.state.formInput.id){
            const newPizzas = this.state.pizzas.map((pizza => {
                return pizza.id === this.state.formInput.id ? this.state.formInput : pizza
            }))
            this.setState({
                // set state is asyncrious so it doesnt have to wait.
                pizzas: newPizzas
            },this.persistChanges)
            // set state can take two arguments. 1 being the change in state and the other being the thing to fire once its state is changed.
        }else{
            fetch(URL ,{
                method: "POST",
                headers: {
                    'Accepts': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    topping:  this.state.formInput.topping,
                    size: this.state.formInput.size,
                    vegetarian: this.state.formInput.vegetarian
                })
            })
            .then(res => res.json())
            .then(json => this.setState({
                pizzas: [...this.state.pizzas,json]
            }))
        }
    }

    persistChanges = () => {
        fetch(`${URL}/${this.state.formInput.id}`,{
            method: "PATCH",
            headers: {
                'Accepts': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                topping:  this.state.formInput.topping,
                size: this.state.formInput.size,
                vegetarian: this.state.formInput.vegetarian
            })
        })
    }

    updateForm = event => {
        event.persist();
        this.setState({
            formInput: {
                ...this.state.formInput,
                [event.target.name]: event.target.value
            }
        })
    }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm formInput={this.state.formInput} updateForm={this.updateForm} submitForm={this.submitForm}/>
        <PizzaList pizzas={this.state.pizzas} selectPizza={this.selectPizza}/>
      </Fragment>
    );
  }
}

export default App;
