import React, {Component} from 'react';
import { connect } from 'react-redux';
import coursesObject from './courses.js';
import feedbackBullets from './feedbackBullets.js';


class DecisionDisplay extends React.Component {

render(){

  var courseMatch = this.props.courseMatch
  var golfOptions = this.props.golfOptions
  var sentenceConstructorObject = {
    "Driving Range is necessary": "It has a driving range",
    "Driving Range not necessary": "It doesn't have a driving range, but you're okay with that",
    "Intermediate": "It is only an intermediate difficulty",
    "Hard": "It's a tough course, as you requested",
    "Easy": "It's a relatively easy course",
    "Under $60": "It's comparatively cheap at under $60",
    "Central Westchester": "It's close to you in Central Westchester",
    "Yonkers/NYC": "It's close to the city",
    "Northern Westchester": "It's close to you in Northern Westchester",
    "Over $60 is fine": "It's a bit pricey at over $60, but you're okay with that",
    "Large": "It's a big course",
    "Medium": "It's a medium-sized course"
  }
  // debugger;
  function constructDisplay(obj, courseMatch, golfOptions, sentenceConstructorObject){

    var golfOptions = golfOptions
    var resultsString = ""
    resultsString += courseMatch += "is the best match for you"
        for(var categ in obj){
      if (golfOptions[categ].selection === obj[categ])
      resultsString += sentenceConstructorObject[obj[categ]]
    }
    return resultsString
  }


  var theMatch = this.props.courseMatch
  if(this.props.courseMatch){
    if(this.props.loading){
      var selectionObj = <img src="http://www.mop.gov.kw/images/loading.gif" />
    } else {
      var selectionObj =
      <div id="decisionBox">
        <h1>Our recommendation...</h1>
        <h1><strong> {this.props.courseMatch}</strong></h1>
        <div>{constructDisplay(coursesObject[theMatch], courseMatch, golfOptions, sentenceConstructorObject)}</div>
        <div>Try playing around with you choices listed above to see other courses</div>
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
