import React, { Component } from "react";
import Footer from '../Footer2'
import { Row, Col, Icon, Modal, Button, Menu } from 'antd';
import spelling1 from '../images/spelling-01.jpg'
import inter2 from '../images/inter2.jpg'
import restClient from '../network/restClient';
import {
  Link
} from "react-router-dom";
import List from './ListGallery';
class allGalleries extends React.Component{
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
    componentDidMount(){
        restClient.getGalleries(this.state.search).then(response=>{
            let galerias = [];
            response.data.pages.map(galeria=>{
              let tempN = galeria;
              tempN.key = `gal-${tempN.id_galeria_fotos}`;
              galerias.push(tempN);
            })
            this.setState({loading:false,galleries:galerias,totalGalleries:parseInt(response.data.total)});

        }).catch(error=>{
          //message.error(err.message);
          this.setState({loading:false});
        })
    }

    render() {
      return (
        <div className="wrapper galeria">
            <div className="galleryName vid">
                Galería de fotos
            </div>

          <Row type="flex" className="galleryGridRow pb" gutter={24}>


          <List state={this.state}/>
          </Row>
          <Footer/>
        </div>
      )

  }
}
export default allGalleries;
