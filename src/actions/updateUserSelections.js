export default function updateRowsDisplay(categoryUserSelected, value){
  return {
    type: 'UPDATE_USER_SELECTIONS',
    categoryUserSelected: categoryUserSelected,
    value: value
  }
}
