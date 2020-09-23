import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import imgMap from '../images/alumnasmundo.jpeg'
import restClient from '../network/restClient';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            image:'',
            tipos:[]
        }
    }

    componentDidMount(){
          this.setState({loading:true})
          this.getContent()
    }

    getContent = ()=>{
        this.setState({loading:true});
        restClient.getContentById({id_page:19}).then(response=>{
          this.setState({ image:response.data[0],
                          loading:false})
          }).catch(error=>{
              this.setState({loading:false});
        });
    }


  render() {
    const{image} = this.state
    return (
        <div className="wrapper">
        <div class="mapBox">
            <img src={image.valor1} className="imgMap"/>
        </div>
        <Footer/>
        </div>
    )
    }
}
export default Map;
