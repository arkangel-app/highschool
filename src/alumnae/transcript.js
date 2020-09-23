import React, { Component } from "react";
import { Form, Input, Modal, Button, Radio, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import imgMap from '../images/alumnasmundo.jpeg'
import restClient from '../network/restClient';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
const Option = Select.Option;
const { TextArea } = Input;


class Transcript extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            checkA: false,
            checkE: false,
            loading: false,
            checked: [],
            clearRadios: true,
        }
    }


    handleSubmit = (e)=>{
       e.preventDefault();
       this.props.form.validateFields((err, values) => {
       if (!err) {
           this.setState({loading:true,error:undefined});
            let postObj = {...values,fecha: values.fecha.format('DD/MM/YYYY')};
            console.log(postObj)
           restClient.sendTranscriptRequest(postObj).then(response=>{
                   message.success(response.data.message);
                   this.setState({loading:false});
                    //window.location.reload(false);
                 })
                   .catch(err=>{
                     message.error(err.message);
                     this.setState({loading:false});
               })
            }
        })
    }

    handleChangeA = e => {
      this.setState(
        {
          checkA: e.target.checked,
        },
        () => {
          this.props.form.validateFields(['curso'], { force: true });
          this.props.form.validateFields(['paralelo'], { force: true });
          document.getElementById("studentFields").style.display ="block"
          document.getElementById("exStudentFields").style.display ="none"

        },
      );
    };


    handleChangeB = e => {
      this.setState(
        {
          checkE: e.target.checked,
        },
        () => {
            this.props.form.validateFields(['yearEx'], { force: true });
            document.getElementById("studentFields").style.display ="none"
            document.getElementById("exStudentFields").style.display ="block"
        },
      );
    };

    onChange = checkedValues => {
       this.setState(() => {
         return { checked: checkedValues };
       });
   };

   handleClear  = () => {
       console.log('clear')
      this.setState({clearRadios: false });
  };


   toggleDisabled = () => {
  this.setState({
    disabled: !this.state.disabled,
  });
};

    isDisabled = id => {
      return (
        this.state.checked.length > 0 && this.state.checked.indexOf(id) === -1
      );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const{image} = this.state
    const dateFormat = 'DD/MM/YYYY';
    return (
        <div className="wrapper">
        <div class="formBox">
        <Form onSubmit={this.handleSubmit} className="transcriptForm">
            <div className="titForm">Solicitud de trámites varios</div>
                      <Row gutter={24}>
                        <Col xs={24} md={24} className="colDate">
                            <FormItem label="Fecha" className="dateInput">
                                      {getFieldDecorator('fecha', {
                                          initialValue:this.state.intro,
                                          rules: [
                                               {
                                                 required: true,
                                                 message: 'Por favor elige una fecha',
                                               }
                                         ],
                                      })(
                                          <DatePicker/>
                                      )}
                            </FormItem>
                        </Col>
                        <Col xs={24} md={24}>
                        <div className="nameBox"><span>Yo,</span>
                              <FormItem className="itemName">
                                        {getFieldDecorator('nombre', {
                                            rules: [
                                                 {
                                                   required: true,
                                                   message: 'Por favor ingresa tu nombre',
                                                 }
                                           ],
                                        })(
                                            <Input className="inputName" placeholder="2 nombres y 2 apellidos"/>
                                        )}
                              </FormItem>
                          </div>
                      </Col>
                      <Col xs={24} md={4}>
                            <FormItem className="itemName">
                                      {getFieldDecorator('alumna', {
                                          rules: [
                                             {
                                               required: true,
                                               message: 'Selecciona una opción',
                                             },
                                           ],
                                      })(
                                          <Checkbox.Group  onChange={this.onChange}>
                                              <Checkbox value="current" disabled={this.isDisabled("current")} onChange={this.handleChangeA}>
                                                Alumna
                                              </Checkbox>
                                              <Checkbox value="ex" disabled={this.isDisabled("ex")} onChange={this.handleChangeB}>
                                                 Exalumna
                                               </Checkbox>
                                         </Checkbox.Group>
                                      )}
                            </FormItem>
                    </Col>
                    <Col xs={24} md={18}>
                    <div className="item">
                        <div id="studentFields" >
                            <FormItem label="Curso" className="itemAlumna">
                                      {getFieldDecorator('curso', {
                                          rules: [
                                             {
                                               required: this.state.checkA,
                                               message: 'Ingresa tu curso',
                                             },
                                           ],
                                      })(
                                          <Input className="inputDynamic"/>
                                      )}
                            </FormItem>
                            <FormItem label="Paralelo" className="itemAlumna">
                                    {getFieldDecorator('paralelo', {
                                        rules: [
                                           {
                                             required: this.state.checkA,
                                             message: 'Ingresa tu paralelo',
                                           },
                                         ],
                                    })(
                                        <Input className="inputDynamic"/>
                                    )}
                          </FormItem>
                        </div>
                        <div id="exStudentFields">
                            <FormItem label="Graduada en el año lectivo" className="itemAlumna">
                                      {getFieldDecorator('yearEx', {
                                          rules: [
                                             {
                                               required: this.state.checkE,
                                               message: 'Ingresa el año en que te graduaste',
                                             },
                                           ],
                                      })(
                                          <Input className="inputDynamic"/>
                                      )}
                            </FormItem>
                        </div>
                      </div>

                  </Col>
                  <Col xs={24} md={24}>
                        <h2><span>Solicito</span></h2>
                  </Col>
                  <Col xs={24} md={24}>
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                        <div className="reqBox">
                            <div className="requestTit">
                                TRANSCRIPT
                            </div>
                            <Row>
                                <Col lg={12} xs={24} md={24}>
                                    <Form.Item  className="radGroup">
                                      {getFieldDecorator('cursoOpt')(
                               
                                           <Checkbox.Group>
                                              <Checkbox value="8vo">
                                                8vo. EGB
                                              </Checkbox>
                                              <Checkbox value="9no">
                                                 9no. EGB
                                               </Checkbox>
                                                <Checkbox value="10mo">
                                               10mo. EGB
                                              </Checkbox>
                                              <Checkbox value="1bachillerato">
                                                I BACH
                                               </Checkbox>
                                                <Checkbox value="2bachillerato">
                                                II BACH
                                              </Checkbox>
                                              <Checkbox value="3bachillerato">
                                                 III BACH
                                               </Checkbox>
                                         </Checkbox.Group>
                                      )}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xs={24} md={24}>
                                    <FormItem className="cursoTransc" label="Otros cursos">
                                              {getFieldDecorator('cursoTxt', {
                                              })(
                                                 <Input onChange={this.handleClear}/>
                                              )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                        <div className="reqBox">
                            <div className="requestTit">
                                RANKING DE NOTAS
                            </div>
                            <FormItem className="rankingField" label="Curso">
                                      {getFieldDecorator('cursoRanking', {
                                      })(
                                         <Input/>
                                      )}
                            </FormItem>
                            <div>
                                <FormItem className="rankingField paralelo" label="Paralelo">
                                          {getFieldDecorator('paraleloRanking', {
                                          })(
                                             <Input/>
                                          )}
                                </FormItem>
                            </div>
                        </div>
                        </Col>
                        <Col xs={24} md={12}>
                        <div className="reqBox">
                            <div className="requestTit">
                                COPIAS CERTIFICADAS
                            </div>
                            <FormItem className="copiasField">
                                      {getFieldDecorator('copias', {
                                      })(
                                          <Checkbox.Group>
                                              <Checkbox value="acta">
                                                Acta de grado
                                              </Checkbox>
                                              <Checkbox value="titulo">
                                                 Titulo de bachiller
                                               </Checkbox>
                                         </Checkbox.Group>
                                      )}
                            </FormItem>
                        </div>
                        <div className="reqBox">
                            <div className="requestTit">
                                <div className="certificadoConducta">
                                CERTIFICADO DE CONDUCTA
                                <FormItem className="certificado">
                                    {getFieldDecorator('certificado', {
                                    })(

                                            <Checkbox value="conducta">

                                            </Checkbox>
                                    )}
                                </FormItem>
                                </div>
                            </div>


                            <FormItem className="rankingField" label="Año Académico">
                                      {getFieldDecorator('academicYear', {
                                      })(
                                         <Input/>
                                      )}
                            </FormItem>
                        </div>
                        <div className="firma">

                        <FormItem className="rankingField email">
                                  {getFieldDecorator('correo', {
                                      rules: [
                                         {
                                           required: true,
                                           message: 'Ingresa tu correo',
                                         },
                                       ],
                                  })(
                                     <Input/>
                                  )}
                        </FormItem>
                        <div className="correo">Mail del solicitante</div>
                        </div>
                        </Col>
                      </Row>
                  </Col>
                  <Col xs={24} md={24} className="colBtn">
                             <Button style={{ margin:'auto', marginBottom:'15px'}} loading={this.state.loading} htmlType="submit" type="primary" icon="save" className="saveForm">Enviar</Button>

                         </Col>
                  </Row>

            </Form>
        </div>
        <Footer/>
        </div>
    )
    }
}
const TranscriptObjt = Form.create()(Transcript);
export default TranscriptObjt;
