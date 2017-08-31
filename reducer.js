const CREATE_NOTE = 'CREATE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'

const initialState = {
  nextNodeId: 1,
  notes: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      const id = state.nextNodeId
      const newNote = {
        id,
        content: ''
      }
      return {  // {a: 1, b:2} , {a:1, b:3}
        ...state,
        nextNodeId: id + 1,
        notes: {
          ...state.notes,
          [id]: newNote
        }
      }
    }
    case UPDATE_NOTE: {
      const {id, content} = action
      const editedNote = {
        ...state.notes[id],
        content
      }
      return {
        ...state,
        nextNodeId: id + 1,
        notes: {
          ...state.notes,
          [id]: editedNote
        }
      }
    }
    default:
      return state
  }
}

const action = [
  {type: CREATE_NOTE},
  {type: UPDATE_NOTE, id: 1, content: 'OLA'}
]

const state = action.reduce(reducer, undefined)

ReactDOM.render(
  <pre>{JSON.stringify(state, null, 2)}</pre>,
  document.getElementById('root')
)
