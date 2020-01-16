import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import { addDataToApi, getDataFromApi, updateDataApi } from "../../../Config/Redux/Action";
import { connect } from "react-redux";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: ""
  };

  componentDidMount() {
    const getData = JSON.parse(localStorage.getItem("User"));
    this.props.getData(getData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, noteId, textButton } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const dataDashboard = JSON.parse(localStorage.getItem("User"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      uid: dataDashboard.uid,
    };
    if(textButton === "SIMPAN"){
      saveNotes(data);
    } else {
      data.noteId = noteId
      updateNotes(data)
    }
    console.log(data);
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    e.preventDefault();
    const { history } = this.props;
    history.push("/login");
    localStorage.removeItem("User");
  };

  updateNotesData = note => {
    console.log("update", note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "UPDATE",
      noteId: note.id
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN"
    });
  };
  render() {
    const { title, textButton, content } = this.state;
    const { notes } = this.props;
    console.log("note =>", notes);
    const { updateNotesData, cancelUpdate, handleSaveNotes } = this;
    return (
      <div className="container">
        <div className="input-form">
          <input
            placeholder="Title"
            className="input-title"
            value={title}
            name="title"
            onChange={this.handleChangeInput}
          />
          <textarea
            placeholder="Content"
            className="input-content"
            value={content}
            name="content"
            onChange={this.handleChangeInput}
          ></textarea>
          <div className="action-wrapper">
            {/* <button onClick={this.onClick} className="save-btn cancel">
              LogOut
            </button>
            <hr /> */}
            {textButton === "UPDATE" ? (
              <button className="save-btn cancel" onClick={cancelUpdate}>
                CANCEL
              </button>
            ) : (
              <div />
            )}

            <button className="save-btn" onClick={handleSaveNotes}>
              {textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map(note => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => updateNotesData(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = state => ({
  dataUser: state.user,
  notes: state.notes
});

const reduxDispatch = dispatch => ({
  saveNotes: data => dispatch(addDataToApi(data)),
  getData: data => dispatch(getDataFromApi(data)),
  updateNotes : data => dispatch(updateDataApi(data))
});

export default connect(
  reduxState,
  reduxDispatch
)(Dashboard);
