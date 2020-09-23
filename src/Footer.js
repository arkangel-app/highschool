import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";

import insta from './images/social-icon-11.png';
import you from './images/social-icon-12.png';
import fb from './images/social-icon-13.png';
import tw from './images/social-icon-14.png';
import instaIconW from './images/instaIcon-43.png';

class Footer extends Component {

    constructor(props) {
      super(props)
      this.state = {
          fullName: '',
          user: '',
          profilePhoto: '',
          photosInsta: []
      }
  }

  fetchInstagram(next, array){
    return fetch(next)
    .then(r => r.json())
    .then(async data => {
      data.data.map(img=>{
         img.key=`img-${img.id}`;
         array.push(img.images.low_resolution.url);
      });
      if(data.pagination && data.pagination.next_url){
        await this.fetchInstagram(data.pagination.next_url,array);
      }
      return array;
    })
  }

  componentDidMount() {
      
  }

  render() {
    return (
        <div className="wrapper-footer">
          <Row className="footer darkCol" type="flex">




          </Row>

          <Row className="footerTextRow">
              <Col md={12} className="footerTextCol left">
                  <span className="textContact">
                     (+593-4) 2590720
                      <br></br>
                      infodelta@uedelta.k12.ec
                  </span>
              </Col>
              <Col md={12} className="footerTextCol right">
                  <span className="textContact">

                      Km 12, Av. Samborondón
                      <br></br>
                      Daule - Ecuador
                  </span>
              </Col>
         </Row>

          <Row className="socialRow">
             <div className="socialIcons">
              <div className="smImg">
                  <a href="https://www.facebook.com/Unidad-Educativa-Biling%C3%BCe-Delta-166733184261886/" target="_blank">
                  <img src={fb} className="iconImg socialFooter"/>
                  </a>
              </div>
              <div className="smImg">
                  <a href="https://www.instagram.com/uebdelta/" target="_blank">
                  <img src={insta} className="iconImg socialFooter"/>
                  </a>
              </div>
              <div className="smImg">
                  <a href="https://twitter.com/uebdelta" target="_blank">
                  <img src={tw} className="iconImg socialFooter"/>
                  </a>
              </div>
              <div className="smImg">
                  <a href="https://www.youtube.com/channel/UC1m9-hHKJ88AIhDGG7V7lJw" target="_blank">
                  <img src={you} className="iconImg socialFooter"/>
                  </a>

              </div>
          </div>
          </Row>

          <Row className="instaRow bioCopy">

              <div className="copy">
                  © 2020 Colegio Delta - Ecuador
              </div>
          </Row>

      </div>
    );
  }
}

export default Footer;
