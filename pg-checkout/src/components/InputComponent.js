import React, {Component} from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

class InputComponent extends Component {
  //const logo = "../resources/img/";

  constructor(props) {
    super(props);
    this.state = {
     pay : ""
    }
  }
  validateOnlyNumbers = (event) =>{
    let num = event.target.value
    num = num.replace(/\D/,'');
    event.target.value = num 
    this.setState ({ pay: event.target.value })
  }

  limitOnlyNumbers = (event) =>{
    if(event.target.value.length <= this.props.length){
      let num = event.target.value
      num = num.replace(/\D/,'');
      event.target.value = num 
      this.setState ({ pay: event.target.value })
    }
  }
  render= () => {
    
    if( this.props.mask && this.props.num){
      return (
        <InputMask className="form-control" type="text" placeholder={this.props.placeholder}
        mask="\ 999 999 9999" id= {this.props.id}
        required/>
      )
    }
    if(this.props.number ){
      return (
        <InputMask className="form-control" type="text" placeholder={this.props.placeholder}
        onChange={this.validateOnlyNumbers}  id= {this.props.id} value={this.state.pay}
        required/>
      )
    }

    if(this.props.limitNumber ==="true" ){
      return (
        <InputMask className="form-control" type="text" placeholder={this.props.placeholder}
        onChange={this.limitOnlyNumbers}  id= {this.props.id} value={this.state.pay}
        required/>
      )
    }
  
    if(this.props.readOnly === "false"){
      return (
        <input  type="text"
                className="form-control" placeholder={this.props.placeholder} id= {this.props.id} aria-label={this.props.ariaLabel}
                aria-describedby="basic-addon1" />
      )
    }
    return (
            <div className="input-group col-10">
                <input  type="text" readOnly value= {this.props.value}
                        className="form-control" placeholder="" id= {this.props.id} aria-label={this.props.ariaLabel}
                        aria-describedby="basic-addon1" />
            </div>
    )
  }
}

InputComponent.propTypes = {
  length: PropTypes.number,
  mask: PropTypes.any,
  num: PropTypes.number,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  number: PropTypes.number,
  limitNumber: PropTypes.number,
  readOnly: PropTypes.any,
  ariaLabel: PropTypes.string,
  value: PropTypes.any
}

export default InputComponent;
