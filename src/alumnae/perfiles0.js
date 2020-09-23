import React, { Component } from "react";
import Footer from '../Footer2'
import { Row, Col, Icon, Modal, Button, Menu } from 'antd';
import spelling1 from '../images/spelling-01.jpg'
import inter2 from '../images/inter2.jpg'
import restClient from '../network/restClient';
import {
  Link
} from "react-router-dom";
import List from './ListPerfiles';
class Perfiles extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            galleries:[],
            totalGalleries:0,
            search:{
                pageSize: 20,
                pageNumber:1
            }
        }
    }


    render() {
      return (
        <div className="wrapper galeria">
            <div className="galleryName vid">
            Perfiles
            </div>

          <Row type="flex" className="galleryGridRow pb" gutter={24}>


          <List state={this.state}/>
          </Row>
          <Footer/>
        </div>
      )

  }
}
export default Perfiles;
