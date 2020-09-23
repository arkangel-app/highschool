import React, { Component } from "react";
import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import directoraPhoto from '../images/directora-23.jpg';
import Footer from '../Footer2'
import restClient from '../network/restClient';

class Equipo extends Component {
    constructor(props) {
    super(props);
        this.state = {
            loading:false,
            data:'',
            directora:'',
            people:[],
            direccion:[]
         
        }
        this.myRef = React.createRef();
    }

    scrollToMyRef = () => {

        window.scrollTo({
            top:190,
            // behavior: "smooth" // optional
        });
    };

  componentDidMount(){

      this.setState({loading:true})
      this.getContent()
      this.getPeople()


  }

  getContent = () =>{
      restClient.getContentById({id_page:17}).then(response=>{
               this.setState({data:response.data[0]},()=>this.scrollToMyRef());
      }).catch(error=>{
               this.setState({loading:false});
               message.error(error.message);
      });
  }

  getPeople = () =>{
      restClient.getTeam().then(response=>{
          let personas = [];
          let direccion = [];
          let iPerson=1;
          let iDireccion=1;
          let directora=''; 
            response.data.map(person=>{
                person.cargo = person.cargo.replace(/ /,'<br>')
              
                if(person.id_equipo===14){
                    person.cargo = "Coord. Comunicación y<br>Proyección Institucional";                
                }

                if(person.direccion===true){
                    if(person.id_equipo===1){
                        directora = person             
                    }    else {
                        person.key=iDireccion
                        iDireccion+=1                                      
                        direccion.push(person)
                    }
                 
                    
                } else {
                    person.key=iPerson
                    iPerson+=1
                    personas.push(person)
                }


            })
            console.log(personas)
            console.log(direccion)
           this.setState({people:personas,
                          direccion,  
                          directora,                                        
                          loading:false})
           }).catch(error=>{
               this.setState({loading:false});
               message.error(error.message);
         });
  }

  render() {
      const{data,direccion,directora,people}=this.state
    return (
    <div className="wrapper">

<Row type="flex" className="rowHeader">
        
                <Col md={24} xs={24} className="bgColorHeader">
                    <div className="headerText eequipo">
                     <div className="bigTitHeader acad shortTit pBottom equipoPage">
                            EL Equipo
                     </div>
                      <p className="shortPar espaceTop forma">
                          {data.valor2}
                      </p>
                    </div>
                </Col>
            </Row>
            {/* <Row type="flex" className="topRowDir">
                    <Col md={12} xs={24}>
                        <div className="dirBox">
                            <img src={directoraPhoto} className="dirImg"></img>
                        </div>
                    </Col>
                    
                    <Col md={12} xs={24}
                            className="eqCol">
                            <div className="equipoBox">
                                <div className="name">
                                    {directora.nombre}
                                </div>
                                <div className="cargo">
                                <div dangerouslySetInnerHTML={{ __html: directora.cargo }}></div>

                                </div>
                                <div className="email equipo">
                                    {directora.correo}
                                </div>
                            </div>
                        </Col>
            </Row> */}

        {/* <Row type="flex" className="directoraRow">
            {direccion.map(person=>      
            <Col md={12} xs={24}
                className={person.key%2==0 ? "alignLeftCol pbottom":"alignRightCol pbottom"}>
                <div className="equipoBox">
                    <div className="name">
                        {person.nombre}
                    </div>
                    <div className="cargo">
                         <div dangerouslySetInnerHTML={{ __html: person.cargo }}></div>
                    </div>
                    <div className="email equipo">
                        {person.correo}
                    </div>
                </div>
                </Col>
            )}
        </Row> */}

          
        {/* <Row className="center">
              <div className="darkLine">
              </div>
              <div className="boldTextEquipo">
              OTRAS PERSONAS
              </div>
              <div className="lightTextEquipo">
                  QUE PUEDEN AYUDARTE
              </div>
        </Row>

        <Row type="flex" className="directoraRow">
            {people.map(person=>
                <Col md={12} xs={24}
                    className={person.key%2==0 ? "alignLeftCol pbottom":"alignRightCol pbottom"}>
                    <div className="equipoBox">
                        <div className="name">
                            {person.nombre}
                        </div>
                        <div className="cargo">
                            <div dangerouslySetInnerHTML={{ __html: person.cargo }}></div>
                        </div>
                        <div className="email equipo">
                            {person.correo}
                        </div>
                    </div>
                </Col>
            )}
        </Row> */}
        <Row className="center">
              <img src="https://colegio-delta.s3.amazonaws.com/organigrama.jpg" style={{margin:'30px auto'}}/>
        </Row>
        <Footer/>

    </div>
    )
    }
}
export default Equipo;
