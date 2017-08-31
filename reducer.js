const CREATE_NODE = 'CREATE_NODE'
const UPDATE_NODE = 'UPDATE_NODE'

const initialState = {
  nextNodeId: 1,
  notes: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NODE: {
      const id = state.nextNodeId
      const newNote = {
        id,
        content: ''
      }
      return {  // {a: 1, b:2} , {a:1, b:3}
        ...state,
        nextNodeId: id+1,
        notes: {
          ...state.notes,
          [id]: newNote
        }
      }
    }
    case UPDATE_NODE: {
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

const state0 = reducer(undefined, {
  type: CREATE_NOTE
})

const state1 = reducer(state0, {
  type: UPDATE_NODE,
  id:1,
  content: 'Hello, WORLD 2222'
})

ReactDOM.render(
  <pre>{JSON.stringify(state1, null, 2)}</pre>,
  document.getElementById('root')
)
