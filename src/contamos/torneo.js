import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import photo1 from '../images/circlePhoto-19.png';
import photo2 from '../images/circlePhoto-20.png';
import photo3 from '../images/circlePhoto-21.png';
import Footer from '../Footer2'
import restClient from '../network/restClient';
import {
  Link
} from "react-router-dom";
class Torneo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:[],
            texto:''
        }
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
             console.log('torneo')
             restClient.getGalleries({pageSize: 20,pageNumber:1,tipo:"TORNEO"}).then(response=>{
                 let galerias = [];
              response.data.pages.map(galeria=>{
                let tempN = galeria;
                tempN.key = `gal-${tempN.id_galeria_fotos}`;
                galerias.push(tempN);
              })

               this.setState({ data:galerias,
                               loading:false},()=>this.scrollToMyRef())
               }).catch(error=>{
                   this.setState({loading:false});
             });
    }


    render() {
        let patronNormal = true;
        const {texto,data} = this.state
        console.log(data)
         const  images = this.state.data;
    return (

        <div class="wrapper">

            <Row>
                <Col md={12} xs={24}>
                    <div className="textBox light center cop shortHeader torneo">
                     <div className="bigTitHeader">
                        Torneo de fútbol
                     </div>
                    </div>
                </Col>

                <Col md={12} xs={24}>
                    <div className="textBox light center cop shortHeader torneolight">

                      <p className="shortPar espaceTop">

                        Es un espacio de integración familiar, alegría y deportividad creado para los padres del Delta. Desde el 2017, cada año más de 200 deportistas se reúnen los sábados en el cole para jugar este torneo.

                      </p>
                    </div>
                </Col>
            </Row>



            <Row type="flex" className="galleryGridRow pb torneo" gutter={24}>




                        {images.map(photo=>

                            <Col md={12} xs={24} className="colGaleryImg">
                          <div class="image-container effect gallery"
                              style={{backgroundImage:`url(${photo.portada})`}}>
                              <Link to={`/gallery/${photo.path}`}>
                                <div class="mask">
                                  <div className="galTit">{photo.nombre_galeria}</div>
                                </div>
                              </Link>
                          </div>
                        </Col>
                    )}


            </Row>

            <Footer/>
        </div>


    );
    }
}

export default Torneo;
