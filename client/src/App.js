import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {books : [{"title": "scifi"},{"title": "more scifi"}]}

  componentDidMount() {
    fetch('/json')
      .then(res => res.json())
      .then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className="App">
        <h1>Books</h1>
        {this.state.books.map(book =>
          <div key={book.id}>{book.title}</div>
        )}
      </div>
    );
  }
}

export default App;