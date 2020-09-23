import React, { Component } from "react";
import { Form, Input, Modal, Icon, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import periodismo from '../images/periodismo.png';
import restClient from '../network/restClient';
class Extracurriculares extends Component {
    constructor(props) {
    super(props);
        this.state = {
            clubes:[],
            listaPeriodismo:[],
            loading:false,
            horarioPeriodismo:'',
            tutoraPeriodismo:'',
            visible: false,
            data:''
        }}

  componentDidMount(){
      this.getContent()
      this.listDocuments()
      restClient.getClubes().then(response=>{
          let clubes  = [];
          let tutor='';
          let hora='';
              response.data.clubes.map(club=>{
                  let tempN = club;
                  tempN.key = club.id_club;
                 
                      clubes.push(tempN)
                 
              })

              console.log(clubes)
              this.setState({
                  clubes:clubes,
                  horarioPeriodismo:hora,
                  tutoraPeriodismo:tutor
              },()=>this.scrollToMyRef())
      });


   }

   scrollToMyRef = () => {

       window.scrollTo({
           top:160,
           // behavior: "smooth" // optional
       });
   };

   getContent = () =>{
       restClient.getContentById({id_page:9}).then(response=>{
                this.setState({data:response.data[0]});
       }).catch(error=>{
                this.setState({loading:false});
                message.error(error.message);
        });
   }

   listDocuments = () =>{
       restClient.getDocsPeriodismo().then(response=>{
       let lista  = [];
           response.data.documentos.map(doc=>{
               let tempN = doc;
               tempN.key = doc.id_periodismo;
               lista.push(tempN)
           })
           this.setState({
               listaPeriodismo:lista})
        })
    }

   showModal = () => {
    this.setState({
      visible: true,
        });
    };

     handleCancel = () => {
          this.setState({ visible: false});
     }

  render() {
    const { visible, loading, data } = this.state;

    return (
    <div className="wrapper">
     

        <Row type="flex" className="rowHeader">
                <Col md={12} xs={24}>
                <div class="headerBackground" style={{backgroundImage:`url(${data.valor1})`}}>

                    </div>
                </Col>
                <Col md={12} xs={24} className="bgColorHeader">
                    <div className="headerText">
                     <div className="bigTitHeader acad shortTit extra">
                     Clubes y Extra<br className="long-jump"></br>curriculares

                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>



        <Row type="flex" className="rowSubjects ib">
        <Col md={24} xs={24} className="colTitsubjects">
            <div className="smallBar dark2"></div>
            <div className="titleBd ib">
                CLUBES
            </div>
            <div className="titleLt ib">
                DEL COLEGIO
            </div>
        </Col>

        
            {this.state.clubes.map(club=>
               {
                if(club.id_club!=38){
                    return  <Col md={6} xs={12} className="subjectBox clubes">
                         <div className="subjectImgBox">
                            <img src={club.foto} className="subjectImg ib"></img>
                         </div>
                    </Col>
                } else {
                    return  <Col md={6} xs={12} className="subjectBox clubes">
                     <div className="subjectImgBox">
                        <a className="clubPopUp" onClick={this.showModal}>
                             <img src={periodismo} className="subjectImg ib"></img>
                        </a>
                     </div>
                   </Col>  
                }
            }
                


            )}


        </Row>
        <Modal
                visible={visible}
                width="90%"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                className="modalClub"
                wrapClassName="modalClubBody">
                <a onClick={this.handleCancel}>
                    <Icon type="close" className="iconVideo clubBtn" />
                </a>

                <img src={periodismo} className="imgClubPop"></img>

                <div className="listaTit">
                    Documentos del club
                </div>

                <ul className="lista periodismo">
                    {this.state.listaPeriodismo.map(doc=>
                        <li className="archivoPeriodismo">
                            <a href={doc.archivo} target="_blank">
                                {doc.articulo}
                            </a>
                        </li>
                    )}
                </ul>

        </Modal>
        <Footer/>

    </div>
    )
    }
}
export default Extracurriculares;
