import React, { Component } from "react";
import { Form, Input, Tooltip, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import draImg from '../images/dr-17.png';
import Footer from '../Footer2'
import restClient from '../network/restClient';
class Counseling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            tipos:[]
        }
    }

    componentDidMount(){
          this.setState({loading:true})
          this.getContent()

    }

    scrollToMyRef = () => {

        window.scrollTo({
            top:180,
            // behavior: "smooth" // optional
        });
    };

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:12}).then(response=>{
              let tipos = [];
               response.data.map(tipo=>{
                 if(tipo.parametro=='ofrece') {
                    
                       tipo.key=`p-${tipo.id_contenido}`;
                       tipo.pdf=false
                 if(tipo.valor2=="seguro de accidentes") {
                        tipo.pdf=true
                     }
              tipos.push(tipo);
            }


                    })

                    console.log(tipos)
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
     <div class="wrapper">
           <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground top" style={{backgroundImage:`url(${data.valor1})`}}>

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit">
                            DEPARTAMENTO MÉDICO
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>


        <Row type="flex">
            {tipos.map(tipo=>
                <Col md={8} xs={24} className="medCol">
                    {tipo.pdf &&
                    <a href="https://colegio-delta.s3.amazonaws.com/pdf/Formulario-reembolso.pdf" target="_blank">
                        <div class="medicServiceCard">
                        <div class="medBox">
                           <img src={tipo.valor1} className="medImg"/>
  
                          </div>
                          <div class="lightTextGray med">
                              {tipo.valor3}
                          </div>
                      </div>
                      </a>
                    }
                    {tipo.pdf==false &&
                        <div class="medicServiceCard">
                        <div class="medBox">
                           <img src={tipo.valor1} className="medImg"/>
  
                          </div>
                          <div class="lightTextGray med">
                              {tipo.valor3}
                          </div>
                      </div>
                    }
                
                </Col>
            )}
        </Row>

        <Footer/>
     </div>
    )
    }
}

export default Counseling;
