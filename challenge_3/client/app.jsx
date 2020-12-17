class FOne extends React.Component {
  render() {
    return (
    <div>
      Signup - Add your account information
      <form>
        <label for="Name">Name</label><br></br>
        <input type="text" id="Name"  onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="Email">Email</label><br></br>
        <input type="email" id="Email"onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="Password">Password</label><br></br>
        <input type="password" id="Password"onChange={(e) => this.props.onChange(e)}></input><br></br>
        <input type="submit" onClick={(e) =>{
          e.preventDefault()
          this.props.onClick()
        }} value="Next Form"></input>
      </form>
    </div>)
  }
}
class FTwo extends React.Component {
  render() {
    return (
    <div>
      Shipping - Add your shipping information
      <form>
        <label for="Address1">Address Line 1</label><br></br>
        <input type="text"id="Address1" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="Address2">Address Line 2</label><br></br>
        <input type="text"id="Address2" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="City">City</label><br></br>
        <input type="text" id="City" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="State">State</label><br></br>
        <input type="text" id="State" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="ZipCode">ZipCode</label><br></br>
        <input type="text" id="ZipCode"onChange={(e) => this.props.onChange(e)}></input><br></br>
        <input type="submit" onClick={(e) => {
          e.preventDefault()
          this.props.onClick()
        }} value="Next Form"></input>
      </form>
    </div>)
  }
}
  class FThree extends React.Component {
    render() {
      return (
      <div>
      Payment - Add your credit card details
      <form>
        <label for="CCNum">Credit Card Number</label><br></br>
        <input type="text" id="CCNum" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="ExpDate">Expiration Date</label><br></br>
        <input type="date" id="ExpDate" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="CCV" >CCV Number</label><br></br>
        <input type="text" id="CCV" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <label for="BillZip">Billing Zip Code</label><br></br>
        <input type="text" id="BillZip" onChange={(e) => this.props.onChange(e)}></input><br></br>
        <input type="submit" onClick={(e) => {
          e.preventDefault();
          this.props.onClick()
        }} value="Submit"></input>
      </form>
    </div>)
  }
}
class Summary extends React.Component {
  render() {
    var summary = Object.keys(this.props.state).map(key => {
      if(key !== 'Password' && key !== 'active')
      return (
        <div key={key}>
        <label>{key} :</label>
        <p>{this.props.state[key]}</p>
        </div>
      )
    })
    return (
    <div>
      {summary}
      <button onClick={this.props.onClick}>Purchase</button>
    </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      Address1: '',
      Address2: '',
      City: '',
      State: '',
      ZipCode: 0,
      CCNum: '',
      ExpDate: '',
      BillZip: '',
      active: undefined
    }
    this.onF1Click = this.onF1Click.bind(this);
    this.onF2Click = this.onF2Click.bind(this);
    this.onF3Click = this.onF3Click.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStartClick = this.onStartClick.bind(this)
    this.onPurchaseClick = this.onPurchaseClick.bind(this)
  }
  onChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }
  onStartClick() {
    this.setState({active: <FOne onChange={this.onChange}onClick={this.onF1Click}/>})
  }
  onF1Click() {
    this.setState({active: <FTwo onChange={this.onChange} onClick={this.onF2Click}/>})
  }
  onF2Click() {
    this.setState({active: <FThree onChange={this.onChange} onClick={this.onF3Click}/>})
  }
  onF3Click() {
    this.setState({active: <Summary state={this.state} onClick={this.onPurchaseClick}/>})
  }
  onPurchaseClick() {
    axios({
      method: 'POST',
      url:'/formdata',
      data: this.state
    })
    .then(response => {
      this.setState({
        Name: '',
        Email: '',
        Password: '',
        Address1: '',
        Address2: '',
        City: '',
        State: '',
        ZipCode: 0,
        CCNum: '',
        ExpDate: '',
        BillZip: '',
        active: undefined
      })
    })
  }


  render() {
    if(this.state.active) {return this.state.active}
    else return (
      <div>
        <button onClick={this.onStartClick}>Start Forms</button>
      </div>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById('root'))
