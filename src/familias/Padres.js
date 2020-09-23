import React, { Component } from "react";
import { List,Modal,Icon, Row, Col } from 'antd';
import photo1 from '../images/circlePhoto-19.png';
import photo2 from '../images/circlePhoto-20.png';
import photo3 from '../images/circlePhoto-21.png';
import Footer from '../Footer2'
import restClient from '../network/restClient';
import './stylePadres.css'
class Padres extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:'',
            tipos:[],
            archivos:[]
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
             restClient.getContentById({id_page:16}).then(response=>{
              let tipos = [];
               response.data.map(tipo=>{
                 if(tipo.parametro=='tipo_formacion_padres') {
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
             restClient.getArchivosPadres().then(archivosRes=>{
                let archivos = [];
                archivosRes.data.archivos.map(ar=>{
                    ar.key = `archivo-${ar.id_contenido}`;
                    archivos.push(ar);
                });
                console.log(archivos);
                this.setState({archivos: archivos});
             }).catch(err=>{
                 //nada
             })
    }
    modalVideo(record) {
        Modal.info({
            content:(
              <div className="vidCenter">
                  <iframe className="videoYoutube" src={record}></iframe>
              </div>
            ),
            centered:true,
            maskClosable:"true",
            cancelText:"Volver",
            className:"modalVidIframe",
        })
    }
    abrirModal=(archivo)=>{
        if(archivo.valor2==="PDF"){

        }else{
            this.modalVideo(archivo.url);
        }
    }

    render() {
        const{data,tipos}=this.state;
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
                            FORMACIÓN A PADRES

                            </div>
                            <p className="shortPar espaceTop forma">
                                {data.valor2}
                            </p>
                            </div>
                        </Col>
                    </Row>

            <Row className="contentRow" justify="center">
                {tipos.map(tipo=>
                 <div className="valuesList">
                    <strong>
                        {tipo.valor1}<br></br>
                    </strong>
                    <div dangerouslySetInnerHTML={{ __html: tipo.valor2 }}></div>
                </div>
                )}
            </Row>

            <Row className="contentRow" gutter={20} style={{margin:'auto'}}>
                {this.state.archivos.length>0 && this.state.archivos.map(archivo=>
                    <Col md={8}>
                        <div className="archivosPadres" onClick={()=>this.abrirModal(archivo)}>
                            <span className="padresTitle">{archivo.valor1}</span>
                                {archivo.valor2=='PDF' && <Icon style={{fontSize:50,verticalAlign:'middle'}} type="file-pdf" theme="twoTone" />}
                                {archivo.valor2=='VIDEO' && <Icon style={{fontSize:50, verticalAlign:'middle'}} type="play-circle" theme="twoTone" />}
                        </div>
                    </Col>    
                )}
            </Row>
            <Footer/>
        </div>


    );
    }
}

export default Padres;
