import React, {Component} from 'react';
export default class FeedbackBullets extends React.Component {

render(){

  const yesLis = this.props.matches["yes"].map(text => {
    if (text){ return <li>{text}</li> }
  })
  const noLis = this.props.matches["no"].map(text => {
    if (text){ return <li>{text}</li> }
  })

  debugger;
      return (
        <div id="resultsBulletsContainer">
          <div id="resultsBullets">

            Just as you requested...
              <ul>
                {yesLis}
              </ul>

            And also...
              <ul>
                {noLis}
              </ul>

          </div>
        </div>
      )
  }
}
