import { combineReducers } from 'redux';
import coursesObject from './courses.js';

var initialState = {
    currentText: "Help us match you with a nearby golf course by answering 5 easy questions. Just press 'Begin' below and remember, you can change your selections at any time.",
    // currentText: "Hi I'm Mike Dougherty, sports reporter at the Journal News. My colleague Vince Mercogliano and I are here to match you with a nearby golf course. Just answer 5 quick questions and we'll select the best one for you. Also, you can change your selections at any time.",
    currentOptions: ["Begin"],
    courseMatch: null,
    loading: false
}

var categories = {
      initial: {
        name: "",
        options: ["Begin"],
        displayed: true,
        selection: null,
        key: "initial"
      },
      price: {
        name: "Are you willing to spend over $60",
        options: ["Over $60 is fine", "Under $60"],
        displayed: false,
        selection: null,
        key: "price"
      },
      nearestCity: {
        name: "Which of these is closest to you?",
        options: ["Northern Westchester", "Central Westchester", "Yonkers/NYC"],
        displayed: false,
        selection: null,
        key: "nearestCity"
      },
      amenities: {
        name: "Are you looking for a course with a driving range?",
        options: ["Driving Range is necessary", "Driving Range not necessary"],
        displayed: false,
        selection: null,
        key: "amenities"
      },
      size: {
        name: "How large is the course you're looking for?",
        options: ["Medium", "Large"],
        displayed: false,
        selection: null,
        key: "size"
      },
      difficulty: {
        name: "What difficulty is best for you?",
        options: ["Easy", "Intermediate", "Hard"],
        displayed: false,
        selection: null,
        key: "difficulty"
      }
}

var buildSelectionsObject = function buildSelectionsObject(categories){
  var selectionsObject = {}

  for(var category in categories){
    selectionsObject[category] = categories[category].selection
  }

  return selectionsObject
}

var matchUserToCourse = function matchUserToCourse(userSelectionsObject, golfCourses){
  var topMatches = 0
  var nearestMatch = ""
  for (var course in golfCourses){
    var numberOfMatches = 0
      for (var selection in userSelectionsObject){
        if (userSelectionsObject[selection] === golfCourses[course][selection]){
          numberOfMatches ++
        }
      }
    if(numberOfMatches > topMatches){
      topMatches = numberOfMatches
      nearestMatch = course
    }
  }
  return nearestMatch
}

  // showOpener: true,
  // selectedPrisoner: prisonerCollection[0],
  // isModalOpen: false,
  // prisonersInView: prisonerCollection,
  // allPrisoners: prisonerCollection

const titles = ["", "Are you willing to spend over $60", "Which of these is closest to you?",
"Are you looking for a course with a driving range?", "How large is the course you're looking for?",
"What difficulty is best for you?"]

// function findNextTitle(titles, titlePassedIn){
//   var newTitle = ""
//   titles.forEach((title, i) => {
//     if (title === titlePassedIn){
//       newTitle = titles[i+1]
//     }
//   })
//   return newTitle
// }

function findNextTitle(categories){
  var nextUp = false
  var nextTitle = ""
  for(var category in categories){

    if(category === "price"){
      // return categories[category].name
    } else if (category != "price" && !categories[category].selection && categories[category].name != ""){
      return categories[category].name
    }
  }
  return ''
}


function findNextCategory(categoryToUser, categories){

  var categoryKeys = Object.keys(categories)
  var nextUp = ""
  var nextCategory = categoryKeys.forEach(function(keyName, i){

    if (keyName === categoryToUser){

      nextUp = categoryKeys[i+1]
    }
  })
  return nextUp
}


function unfilteredApp(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DISPLAY_TEXT':
      return Object.assign({}, state, {currentText: findNextTitle(categories)})
    case 'REMOVE_INTRO_ROW':
      return Object.assign({}, state, {currentText: "Are you willing to spend over $60"})
    case 'MATCH_USER_TO_COURSE':
      return Object.assign({}, state, {courseMatch: matchUserToCourse(buildSelectionsObject(categories), coursesObject)})
    case 'TOGGLE_LOADING_SPINNER':
    debugger;
      return Object.assign({}, state, {loading: !state.loading})
    default:
      return state
  }
}

function categoriesRed(state=categories, action){
  switch (action.type) {
    case 'REMOVE_INTRO_ROW':
      return Object.assign({}, state, {initial: {
            name: "",
            options: ["Begin"],
            displayed: false,
            selection: null,
            key: "initial"
          },
          price: {
            name: "Are you willing to spend over $60",
            options: ["Over $60 is fine", "Under $60"],
            displayed: true,
            selection: null,
            key: "price"
          }})
    case 'FLIP_DISPLAY':
      var objectToChange = state[action.categoryUserSelected.key]
      objectToChange.displayed = true
      var categoryName = action.categoryUserSelected.key
      var nextCategory = findNextCategory(action.categoryUserSelected.key, categories)
      var nextObjectToChange = state[nextCategory]
      nextObjectToChange.displayed = true
      var nextCategoryName = action.nextObjectToChange.key
      return Object.assign({}, state, {[categoryName]: objectToChange, [nextCategoryName]: nextObjectToChange})
    case 'UPDATE_USER_SELECTIONS':
      var objectToChange = state[action.categoryUserSelected.key]
      objectToChange.selection = action.value
      var categoryName = action.categoryUserSelected.key
      return Object.assign({}, state, {[categoryName]: objectToChange})
    default:
      return state
  }
}


const reactApp = combineReducers({
  unfilteredApp, categoriesRed
})

export default reactApp
