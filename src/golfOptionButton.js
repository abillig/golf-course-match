import React, {Component} from 'react';
import changeDisplayText from './actions/changeDisplayText'
import updateUserSelections from './actions/updateUserSelections'
import removeIntroRow from './actions/removeIntroRow'
import flipDisplay from './actions/flipDisplay'
import matchUserToCourse from './actions/matchUserToCourse'

import { connect } from 'react-redux'



class GolfOptionButton extends React.Component {

handleButtonClick(e){
  this.props.updateUserSelections(this.props.category, e.target.innerText)
  this.props.changeDisplayText(this.props.category.name)
  // this.props.matchUserToCourse()
  if(this.props.category.name == ""){
    this.props.removeIntroRow()
  }
  else {
    this.props.flipDisplay(this.props.category)
  }
}

render(){

      return (
        <button className = {this.props.className} onClick={this.handleButtonClick.bind(this)}>
          {this.props.text}
        </button>
      )
  // }
}
}

export default connect(null, {
  changeDisplayText: changeDisplayText,
  removeIntroRow: removeIntroRow,
  updateUserSelections: updateUserSelections,
  flipDisplay: flipDisplay,
  matchUserToCourse: matchUserToCourse
})(GolfOptionButton);
