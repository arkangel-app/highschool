import React, { Component } from "react";
import { Row, Col, Icon, Modal, Button, Menu, Form, Input, Radio ,Card} from 'antd';
import restClient from '../network/restClient';
import { componentFromProp } from "recompose";
const FormItem = Form.Item;
const { Search } = Input;


class CollectionCreateForm extends React.Component {

  constructor(props) {
    super(props);
	}
	
  render() {
	  let {getFieldDecorator} = this.props.form;
    return (
		<Form layout="vertical">
		<FormItem>
		  {getFieldDecorator('find')(
			  <Search
			  	id="find"
				  placeholder="Realiza una búsqueda"
				  onSearch={value => 
				   
					restClient.getSearchFilter({busqueda: value}).then(response=>{
					  let noticias=[];
						  response.data.content.map(noticia=>{
							  let tempN = noticia;
							  tempN.key = noticia.id_noticia;
							  noticias.push(tempN)
						  })
						  localStorage.setItem("searchContent",JSON.stringify(noticias));
						  this.props.callback(noticias);
						  // this.setState({ content:noticias});
				   // this.state();
				  })
				  }
				  style={{ width: 200 }}
				/>
		  )}
		</FormItem>
	
	</Form>
    );
  }
}

const CollectionCreateFormWrapped = Form.create({ name: 'validate_other' })(CollectionCreateForm);

export default CollectionCreateFormWrapped;
