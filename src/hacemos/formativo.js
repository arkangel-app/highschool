import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import photo1 from '../images/circlePhoto-19.png';
import photo2 from '../images/circlePhoto-20.png';
import photo3 from '../images/circlePhoto-21.png';
import Footer from '../Footer2'
import restClient from '../network/restClient';
class Formativo extends Component {
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
          this.getContent()
    }

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:6}).then(response=>{
              let tf = [];
              let i = 1;
               response.data.map(tipo=>{
                 if(tipo.parametro=='tipo_formativo') {
                       tipo.key=i;
                       i+=1
                       tf.push(tipo);
                 }
                    })
               this.setState({ data:response.data[0],
                               tipos:tf,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
                   message.error(error.message);
             });
         }

    render() {
    const{tipos,data}=this.state
    tipos.map(tipo=>
        console.log(tipo)
    )
    return (
        <div class="wrapper">
            <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground" style={{backgroundImage:`url(${data.valor1})`}}>

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit">
                            FORMATIVO
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>



            <Row className="contentRow forma" justify="center">
                {tipos.map(tipo=>
                <Col md={8} xs={24} className="colFormacion">
                    <img src={tipo.valor1} className="circleImg"></img>
                
                        <div className="textCircle">
                            {tipo.valor3}
                        </div>
                </Col>
                )
            }
            </Row>



            <Footer/>
        </div>


    );
    }
}

export default Formativo;
