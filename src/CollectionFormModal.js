import React, { Component } from "react";
import { Row, Col, Icon, Modal, Button, Menu, Form, Input, Radio ,Card} from 'antd';
import logo from './images/logo.png';
import { Link } from "react-router-dom";
import restClient from './network/restClient';
import { componentFromProp } from "recompose";
import CollectionCreateForm from './components/CollectionCreateForm'
const FormItem = Form.Item;
const { Search } = Input;

let content=[];


class CollectionFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content:[]
    }
    }
  handleCancel = () => {
    this.props.toggleVisibility();
  }
  handleRedirect = (post)=>{
      this.handleCancel()
      window.location.replace((`/post-page/${post}`));
  }

  theFuncToFetchNextPage= (post)=>{
     this.props.history.push(`/post-page/${post}`);
   }

  handleCreate = () => {
    // ...
    this.props.toggleVisibility();
  }

  searchCallback = (data)=>{
    console.log(data);
    this.setState({content:data})
  }
  render() {

    return (
      <Modal
        className="modalSearch"
        visible={this.props.visible}
        okText="Create"
        onCancel={this.handleCancel}
        onOk={this.handleCreate}
         width="100%"
         className="finderModal"
      >
      <Row type="flex" className="rowMenuModal finder">

               <Link className="navbar-brand" to="/"><img className="brand-logo" alt="logo" src={logo}/></Link>

                   <div className="searchBox modalClose">
                      <a onClick={this.handleCancel}>
                            <Icon type="close" className="closeFinder" />
                      </a>
                   </div>
      </Row>
      <Row type="flex" className="finderBody">
      <CollectionCreateForm callback={this.searchCallback}/>

      <Row className="resultSearch">
            <Col md={24} xs={24} className="newsCard">

            {this.state.content.map((book) => (
            <Card
							cover={
                    <div>
                        <Col md={12} xs={24} className="tipoderesultado">
                           <h1>Noticias</h1>
                          </Col>

                        <Col md={12} xs={24} className="tituloResultado">
                           <h1>{book.title}</h1>
                           <p>{book.short_description}</p>
                           <div className="readMoreBox feed">
                               <Link className="readMoreBtn"  to={`/post-page/${book.id_noticia}`} onClick={()=>this.handleRedirect(book.id_noticia)}>
                                  <div className="whiteBtn square feed">
                                    Ver
                                  </div>
                                  <span className="lightBtn">
                                      más
                                  </span>
                                </Link>
                        </div>
                        </Col>


                    </div>
							}
						></Card>

            ))}
            </Col>
      </Row>
      </Row>

      </Modal>
    );
  }
}

export default CollectionFormModal;
