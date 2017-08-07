import React, {Component} from 'react';
import GolfOptions from './golfOptions';
import DecisionDisplay from './decisionDisplay';
import matchUserToCourse from './actions/matchUserToCourse'
import toggleLoadingSpinner from './actions/toggleLoadingSpinner'
import ChatBubble from 'react-chat-bubble';


import { connect } from 'react-redux'



class App extends React.Component {

  render(){



        var displayed = []
        var golfOptions = this.props.golfOptions


        var allFilledOut = true
        var filler = ""
        for (var option in golfOptions) {
          if (golfOptions[option].name != "" && !golfOptions[option].selection){
            filler = golfOptions[option].name
            allFilledOut = false
          }
        }
        if(allFilledOut === true){
          // setInterval(() => {
          //     this.props.toggleLoadingSpinner();
          // }, 1000);
          this.props.matchUserToCourse()
        }

        var urls=["https://pbs.twimg.com/profile_images/879428269560528897/OUkmwsMH_400x400.jpg"]

        // var urls = ["https://pbs.twimg.com/profile_images/792394525113192448/ozEiOlaL.jpg","https://pbs.twimg.com/profile_images/851986160826163201/WFdHMiN6.jpg"];
      function getUrl() {
        // debugger;
         return urls[Math.floor(Math.random() * urls.length)];
      }

      var newUrl = getUrl()

        var currentText = [{
        "type" : 1,
        "image": newUrl,
        "text": this.props.currentText
      }
    ]

        for (var option in golfOptions) {
          if (golfOptions[option].displayed === true){
            displayed.push(golfOptions[option])
          }
        }

        const previousRows = displayed.slice(0, displayed.length - 1).map(optionHash => {
          return <GolfOptions className="previousRows" optionHash={optionHash} />
        })

        const currentQuestionRow = displayed.slice(displayed.length - 1, displayed.length).map(optionHash => {
          return <GolfOptions className = "" optionHash={optionHash} />
        })

        if(this.props.courseMatch){
          var chatBubbleUntilEnd = ""
        } else {
          var chatBubbleUntilEnd = <ChatBubble messages = {currentText} />
        }

        <ChatBubble messages = {currentText} />


      return (
        <div id="allOfIt">
          {previousRows}
          {chatBubbleUntilEnd}
          {currentQuestionRow}
          <DecisionDisplay />

        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    // initial: state.unfilteredApp,
    golfOptions: state.categoriesRed,
    courseMatch: state.unfilteredApp.courseMatch,
    currentText: state.unfilteredApp.currentText
  }
}

export default connect(mapStateToProps, {
  matchUserToCourse: matchUserToCourse,
  toggleLoadingSpinner: toggleLoadingSpinner
})(App);
