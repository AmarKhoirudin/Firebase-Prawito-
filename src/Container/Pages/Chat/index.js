import React, { Component } from "react";
import "./chat.scss";
import { Link } from "react-router-dom";

const user = [
  {
    id: "abc123",
    user: "Amar",
    img: "https://unsplash.com/photos/FO7JIlwjOtU",
    text: [
      {
        type: "penerima",
        chat: "hallo nama ku Khoirudin",
        id: 32
      },
      {
        type: "penerima",
        chat: "iya hehhehe",
        id: 33
      }
    ]
  },
  {
    id: "abc124",
    user: "Amar Khoirudin",
    img: ""
  },
  {
    id: "abc125",
    user: "Huzdaifah",
    img: ""
  },
  {
    id: "abc126",
    user: "Bang Arief",
    img: ""
  }
];
const message = {
  abc123: [
    {
      type: "penerima",
      chat: "hallo nama ku Khoirudin"
    }
  ]
};
class Chat extends Component {
  state = {
    user,
    message,
    terima: "",
    pengirim: "",
    hand: false
  };

  tampilChat = orang => {
    this.setState({
      terima: orang.text,
      hand: true
    });
  };

  render() {
    return (
      <div>
        <h1>Hallo</h1>
        {this.state.user.map((orang, index) => (
          <Link to={`/chat/${index + 1}`}>
            <div
              className="chat"
              key={orang.id}
              onClick={() => this.tampilChat(orang)}
            >
              <p>
                IdPengguna.{orang.id} <hr /> {orang.user}
              </p>
            </div>
          </Link>
        ))}

        {/* {this.state.terima.map(tampil => (
          <h2>{tampil}</h2>
        ))} */}
      </div>
    );
  }
}
export default Chat;
