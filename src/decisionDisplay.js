import React, {Component} from 'react';
import { connect } from 'react-redux';
import coursesObject from './courses.js';
import FeedbackBullets from './feedbackBullets.js';


class DecisionDisplay extends React.Component {

render(){

  var courseMatch = this.props.courseMatch
  var golfOptions = this.props.golfOptions
  var sentenceConstructorObject = {
    "Driving Range is necessary": "It has a driving range",
    "Driving Range not necessary": "It doesn't have a driving range",
    "Intermediate": "It is an intermediate difficulty",
    "Hard": "It's a tough course",
    "Easy": "It's a relatively easy course",
    "Under $60": "It's comparatively cheap at under $60",
    "Central Westchester": "It's close to Central Westchester",
    "Yonkers/NYC": "It's close to the city",
    "Northern Westchester": "It's close to Northern Westchester",
    "Over $60 is fine": "It's a bit pricey at over $60",
    "Large": "It's a big course",
    "Medium": "It's a medium-sized course"
  }
  // debugger;
    var matched = {"yes": [], "no": []}
    var courseObject = coursesObject[this.props.courseMatch]
      for(var categ in courseObject){
        if (golfOptions[categ].selection === courseObject[categ]){
          matched["yes"].push(sentenceConstructorObject[courseObject[categ]])
        } else {
          matched["no"].push(sentenceConstructorObject[courseObject[categ]])
        }
      }

    const feedback =  <FeedbackBullets courseMatch={this.props.courseMatch} matches={matched}/>




  var theMatch = this.props.courseMatch
  if(this.props.courseMatch){
    if(this.props.loading){
      var selectionObj = <img src="http://www.mop.gov.kw/images/loading.gif" />
    } else {
      var selectionObj =
      <div id="decisionBox">
        <div id="recommendation">We recommend...<br></br><strong> {this.props.courseMatch}</strong></div>
        <div>{feedback}</div>
        <div id="changeSelectionText">Change your selections above to check out other matches. Our recommendation will automagically adjust.</div>
      </div>
    }
  } else {
      var selectionObj = ""
  }


      return (

              <div>{selectionObj}</div>

      )
  }
}

function mapStateToProps(state) {
  return {
    courseMatch: state.unfilteredApp.courseMatch,
    golfOptions: state.categoriesRed
  }
}

export default connect(mapStateToProps, null)(DecisionDisplay);
