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
      return {
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

// const state = action.reduce(reducer, undefined)

// Store Implementation Start //
const validateAction = (action) => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object')
  }
  if (typeof action.type === 'undefined') {
    throw new Error('Action must have a type')
  }
}

const createStore = (reducer) => {
  let state = undefined
  return {
    dispatch: (action) => {
      validateAction(action)
      state = reducer(state, action)
      console.log('state = ', JSON.stringify(state, null, 2))
    },
    getState: () => state
  }
}

const store = createStore(reducer)
store.dispatch({
  type: CREATE_NOTE
})
let t = store.getState()
console.log('t = ', JSON.stringify(t, null, 2))
// Store Implementation End //

// ReactDOM.render(
//   <pre>{JSON.stringify(state, null, 2)}</pre>,
//   document.getElementById('root')
// )
