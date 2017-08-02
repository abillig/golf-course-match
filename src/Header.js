import React, {Component} from 'react';


export default class Header extends React.Component {

render(){
  const infoObj= this.props.infoObj

      return (
        <div>
        <div className="clouds">
        </div>
        <div className="headerText" >
          {this.props.text}
        </div>
        </div>
      )
  }
}
