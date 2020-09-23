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
class Footer extends Component {
  render() {
    return (
        <div className="wrapper">
          <Row className="footer2" type="flex">
              <Col md={12} xs={24} className="deltaFoot">
                  <div className="smallBar ft2"></div>
                  <div className="boldTit white ft2">
                      Portal
                  </div>
                  <div className="thinTit footer2">
                      PARA PADRES
                  </div>
                  <div className="rmFt">
                       <a href="http://www.uedelta.k12.ec/padres/#/login" target="_blank" className="readMoreBtn gal">
                           <div className="whiteBtn square ft2">
                               Ir
                           </div>
                           <span className="lightBtn white">
                                ahora
                           </span>
                       </a>
                    </div>
              </Col>
              <Col md={12} xs={24} className="deltaFoot">
                  <Row className="footerTextRow2">
                          <Col md={12} className="footerTextCol">
                              <span className="textContact">
                                 (+593-4) 2590720
                                  <br></br>
                                  infodelta@uedelta.k12.ec
                              </span>
                          </Col>
                          <Col md={12} className="footerTextCol">
                              <span className="textContact">
                                  Km 12, Av. Samborondón
                                  <br></br>
                                  Daule - Ecuador
                              </span>
                          </Col>
                     </Row>

                      <Row className="socialRow2">
                          <Col md={4} xs={6}>
                              <a href="https://www.facebook.com/Unidad-Educativa-Biling%C3%BCe-Delta-166733184261886/" target="_blank">
                              <img src={fb} className="iconImg"/>
                              </a>    
                          </Col>
                          <Col md={4} xs={6}>
                              <a href="https://www.instagram.com/uebdelta/" target="_blank">
                              <img src={insta} className="iconImg"/>
                              </a>    
                          </Col>
                          <Col md={4} xs={6}>
                              <a href="https://twitter.com/uebdelta" target="_blank">
                              <img src={tw} className="iconImg"/>
                              </a>    
                          </Col>
                          <Col md={4} xs={6}>
                              <a href="https://www.youtube.com/channel/UC1m9-hHKJ88AIhDGG7V7lJw" target="_blank">
                              <img src={you} className="iconImg"/>
                              </a>    
                          </Col>
                          <Col md={8} xs={0}>

                          </Col>
                      </Row>
                  </Col>
              <Col md={24} xs={24} className="ptop">
                  <div className="copy center">
                      © 2019 Colegio Delta - Ecuador
                  </div>
              </Col>
          </Row>

      </div>
    );
  }
}

export default Footer;
