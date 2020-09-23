import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import Footer from "./Footer";
import "./index.css";
import "./hover.css";
import "antd/dist/antd.css";
class App extends React.Component {
  constructor() {
  super();
  this.state={
    loaded:false
  };
}
  render() {
  return (
    <div>
      <Main/>
    </div>
  )
  }

}

const DashApp = () => {
  return ReactDOM.render(
      <App/>
  , document.getElementById('root'));
};
DashApp();
