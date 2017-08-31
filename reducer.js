// Store creation start //
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
  const subscribers = []
  return {
    dispatch: (action) => {
      validateAction(action)
      state = reducer(state, action)
      console.log('{dispatch} state = ', JSON.stringify(state, null, 2))
      subscribers.forEach((handler) => {
        console.log('{dispatch} handler = ', handler)
        handler()
      })
    },
    subscribe: (handler) => {
      subscribers.push(handler)
      return () => {
        const index = subscribers.indexOf(handler)
        if (index > 0) {
          subscribers.splice(index, 1)
        }
      }
    },
    getState: () => state
  }
}
// Store End //

// Action Types Start//
const CREATE_NOTE = 'CREATE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'
// Action Types End //

// Reducer start //

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
// Reducer End //

// Store //
const store = createStore(reducer)
// Store //

// Render app whenever store changes //
store.subscribe(() => {
  ReactDOM.render(
    <pre>{JSON.stringify(store.getState(), null, 2)}</pre>,
    document.getElementById('root')
  )
})

// Dispatch actions //
store.dispatch({
  type: CREATE_NOTE
})

store.dispatch({
  type: UPDATE_NOTE,
  id: 1,
  content: 'Hello World'
})
