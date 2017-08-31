const initalState = {
  nextNodeId: 1,
  notes: {}
}

window.state = initalState

const onAddNote = () => {
  let id = window.state.nextNodeId
  window.state.notes[id] = {
    id,
    content: ''
  }
  window.state.nextNodeId++
  renderApp()
}

class NoteApp extends React.Component {
  render(props) {
    return (
      <div>
      <ul className='notes-list'>
      {
        Object.keys(this.props.notes).map(id => (
          <li className='node-list-item' key={id}>{id}</li>
        ))
      }
      </ul>
      <button onClick={onAddNote}> New Note</button>
    </div>
  )
}}


const renderApp = () => {
  ReactDOM.render(
    <NoteApp notes={window.state.notes} />,
    document.getElementById('root')
  )
}

renderApp()
