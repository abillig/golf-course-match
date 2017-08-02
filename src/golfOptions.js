import React, {Component} from 'react';
import GolfOptionButton from './golfOptionButton';
export default class GolfOptions extends React.Component {

render(){

  var category = this.props.optionHash
  //don't remember distinction b/w object or array here. def due to complexity of sin object
  // var whatToMap = Array.isArray(this.props.optionCollection) ? this.props.optionCollection : Object.keys(this.props.optionCollection)
  const optionsButtons = category.options.map(option => {
    var variableClassName = "myButton"
    if(option === category.selection){
      variableClassName = "myButton red"
    }
    return <GolfOptionButton className = {variableClassName} category = {category} text={option}/>;
  })

      return (
        <div className="optionButtonsContainer">
          <div className="optionButtons">
            <div className={this.props.className}>
              {optionsButtons}
            </div>
          </div>
        </div>
      )
  }
}
