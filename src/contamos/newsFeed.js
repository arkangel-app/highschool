import React, { Component ,useState, useRef, useCallback} from "react";
import { Form, Input, Icon, Card, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import ReactDOM from 'react-dom'
import Footer from '../Footer2'
import restClient from '../network/restClient';

import List from './List';

class NewsFeed extends Component {

    constructor(props) {
    super(props);
      this.state = {
        loading: false,
        news:[],
        fetchin:true,
        listItem:[]
      }
    }

    componentDidMount(){
        this.loadNews();
    }


     loadNews = () =>{
      restClient.getNewsList({pageSize: 20,pageNumber:1}).then(response=>{
          let noticias  = [];
              response.data.news.news.map(noticia=>{
                  let tempN = noticia;
                  tempN.key = noticia.id_noticia;
                  noticias.push(tempN)
              })
     this.setState({news:noticias})
      });
      }

      viewPost = (post)=>{
           this.props.history.push(`/post-page/${post}`);
         }
         theFuncToFetchNextPage= (post)=>{
            this.props.history.push(`/post-page/${post}`);
          }


  render() {
    const { Meta } = Card;
    const theFuncToFetchNextPage=this.theFuncToFetchNextPage;
    return (
        <div className="wrapper">

		<Row className="feedRow" type="flex" gutter={48}>

            <List/>



            </Row>
            <Footer/>
        </div>


    )}
}

export default NewsFeed;
