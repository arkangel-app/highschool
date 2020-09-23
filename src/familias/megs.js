import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import photo1 from '../images/circlePhoto-19.png';
import photo2 from '../images/circlePhoto-20.png';
import photo3 from '../images/circlePhoto-21.png';
import Footer from '../Footer2'
import restClient from '../network/restClient';

class Megs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            texto:''
        }
    }

    componentDidMount(){
          this.setState({loading:true})
          this.getContent()
    }

    getContent = ()=>{
             this.setState({loading:true});
             restClient.getContentById({id_page:15}).then(response=>{
               this.setState({ data:response.data[0],
                               texto:response.data[1],
                               loading:false})
               }).catch(error=>{
                   this.setState({loading:false});
             });
    }


    render() {
        const {texto,data} = this.state
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
                            MEGS
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>

            <Row className="contentRow" justify="center">
                <div className="parrBox">
                    <span className="boldMeg">{texto.valor1} </span>
                    <span className="lightParr">
                         &nbsp;{texto.valor2}
                    </span>
                </div>
            </Row>


            <Footer/>
        </div>


    );
    }
}

export default Megs;
