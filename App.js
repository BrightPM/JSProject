import React, { Component } from 'react';
import Subject2 from "./practice/Subject2"
import TOC2 from "./practice/TOC2"
import ReadContent2 from "./practice/ReadContent2"
import CreateContent2 from "./practice/CreateContent2"
import UpdateContent2 from "./practice/UpdateContent2"
import Control2 from "./practice/Control2"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state={
      mode: "welcome",
      selected_content_id:2,
      subject: {title: 'web', desc: 'world wide web!'},
      welcome: {title: 'welcome', desc: 'Hello, React!'},
      contents: [
        {id:1, title:'HTML', desc: "HTML is for information"},
        {id:2, title:'CSS', desc: "CSS is for design"},
        {id:3, title:'JavaScript', desc: "JavaScript is for interactive"}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
    i=i+1;
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent2 title={_title} desc={_desc}></ReadContent2>
    
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent2 title={_content.title} desc={_content.desc}></ReadContent2>
   
    } else if(this.state.mode ==='create'){
      _article = <CreateContent2 onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id +1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({
          contents: _contents,
          mode: "read",
          selected_content_id: this.max_content_id
        });
      }.bind(this)}></CreateContent2>
    }
    else if(this.state.mode ==='update'){
      _content = this.getReadContent();
      _article = <UpdateContent2 data={_content}
        onSubmit={function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i<_contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            mode: "read"
          });
        }.bind(this)}></UpdateContent2>
    }
    return _article;
  }


  render(){
    return(    
    <div className="App">
      <Subject2
        title = {this.state.subject.title}
        sub = {this.state.subject.desc}
        onChangePage={function(){
          this.setState({
            mode: "welcome",
          });
        }.bind(this)}>
      </Subject2>
      

      <TOC2
        onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id: Number(id)
          });
        }.bind(this)}
        data = {this.state.contents}>
      </TOC2>
      <Control2 onChangeMode={function(_mode){
        if(_mode ==='delete'){
          if(window.confirm('really?')){
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while(i < this.state.contents.length){
              if(_contents[i].id === this.state.selected_content_id){
                _contents.splice(i,1);
                break;
              }
              i=i+1;
            }
          this.setState({
            mode: 'welcome',
            contents: _contents
          })
          alert('deleted!');
        }
      } else {
        this.setState({
          mode: _mode
        })
      }
    }.bind(this)}></Control2>
    
      {this.getContent()}
    </div>
    );
  }
} 
export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


