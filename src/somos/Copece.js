import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import colegios from '../images/logosColegios.png'
import padres from '../images/avatar-23.png'
import profesores from '../images/avatar-24.png'
import alumnos from '../images/avatar-25.png'
import restClient from '../network/restClient';

class Copece extends Component {

    constructor(props) {
    super(props);
    this.state = {
        loading:false,
        data:'',
        people:[],
    }
  }

  scrollToMyRef = () => {

      window.scrollTo({
          top:170,
          // behavior: "smooth" // optional
      });
  };

      componentDidMount(){

          this.setState({loading:true})
          this.getContent()

    }

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:1}).then(response=>{
              let personas = [];
               response.data.map(person=>{
                 if(person.parametro=='colegio_people') {
                       person.key=`p-${person.id_contenido}`;
                       personas.push(person);
                      }
                    })
               this.setState({ data:response.data[0],
                               people:personas,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
                   message.error(error.message);
             });
         }

  render() {
    const {data,people} = this.state
    return (
    <div className="wrapper">
        <Row type="flex" className="rowHeader">
        
        <Col md={24} xs={24} className="bgColorHeader">
            <div className="headerText eequipo">
             <div className="bigTitHeader acad shortTit pBottom equipoPage">
                    COPECE
             </div>
              <p className="shortPar espaceTop forma">
                  {data.valor2}
              </p>
            </div>
        </Col>
    </Row>



    <div className="contentCopece">
        <Row type="flex" className="normalRow copece">
            <div className="logosBox copece">
                <img src={colegios} className="imgColegios"/>
            </div>
        </Row>
        <Row type="flex" className="copeceRow">
            <Col md={24} xs={24} className="bigCopece">
                <div className="leftText history cop">
                    COLEGIOS COPECE
                </div>
            </Col>
            <Col md={16} xs={24} className="textCopece">
                {data.valor3}
            </Col>
        </Row>
        <Row type="flex" className="copeceRow center people">
            {people.map(person=>
                <Col md={8} xs={24} className="copecePeople">
                    <div className="peopleBox">
                        <img src={person.valor1} className="padresImg"/>
                        <div className="peopleText">
                            {person.valor3}
                        </div>
                    </div>
                </Col>
            )
        }
        </Row>
      </div>
    <Footer/>

    </div>
    )
    }
}
export default Copece;
