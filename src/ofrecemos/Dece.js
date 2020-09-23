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
import orientacion from '../images/dece-02.png'
import vinculos from '../images/dece-03.png'
import especial from '../images/dece-04.png'
import restClient from '../network/restClient';


class Dece extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            tipos:[]
        }
        this.myRef = React.createRef();
    }

    scrollToMyRef = () => {
        window.scrollTo({
            top:160,
            // behavior: "smooth" // optional
        });
    };


    componentDidMount(){

          this.setState({loading:true})
          this.getContent();
          this.scrollToMyRef()

    }

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:10}).then(response=>{
              let tipos = [];
               response.data.map(tipo=>{
                 if(tipo.parametro=='tipo_dece') {
                       tipo.key=`p-${tipo.id_contenido}`;
                       tipos.push(tipo);
                      }
                    })
               this.setState({ data:response.data[0],
                               tipos:tipos,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
             });
    }

  render() {
    const{data,tipos}=this.state
    return (
    <div className="wrapper">
            <Row type="flex" className="rowHeader">
            <Col md={24} xs={24} className="bgColorHeader">
                    <div className="headerText eequipo">
                     <div className="bigTitHeader acad shortTit pBottom equipoPage">
                            DECE
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>

    <div className="contentCopece">

        <Row type="flex" className="copeceRow center people dece">
        {tipos.map(tipo=>
            <Col md={12} xs={24} className="copecePeople">
                <div className="peopleBox dece">
                    <img src={tipo.valor1} className="padresImg dece"/>
                    <div className="peopleText">
                    {tipo.valor3}
                    </div>
                </div>
            </Col>
        )}
        </Row>
      </div>
    <Footer/>

    </div>
    )
    }
}
export default Dece;
