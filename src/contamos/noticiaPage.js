import React, { Component } from "react";
import { Form, Input, Icon, Card, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import postImg from '../images/news/domenica.jpg'
import restClient from '../network/restClient';
class NewsFeed extends Component {
    constructor(props) {
    super(props);
        this.state = {
            noticiaData:[],
            loading:false,
            id_post:0,
            news:[],
            image:''
        }}

  componentDidMount(){
      this.loadNews();
      if(this.props.match.params.id_post!=undefined){
                //load post
                this.setState({id_noticia:this.props.match.params.id_post},function(){
                  this.getNoticiaContent();
                })

      }
   }

   loadNews = () =>{
    restClient.getLastNews().then(response=>{
        let noticias  = [];
            response.data.news.map(noticia=>{
                let tempN = noticia;
                tempN.key = noticia.id_noticia;
                noticias.push(tempN)
            })
    this.setState({news:noticias})
    });
    }

    handleRedirect = (post)=>{
        window.location.replace((`/post-page/${post}`));
    }

    viewPost = (post)=>{
         this.props.history.push(`/post-page/${post}`);
    }

   getNoticiaContent = ()=>{
       console.log('ok')
       this.setState({loading:true});
       restClient.getPostById({id_noticia:this.props.match.params.id_post}).then(response=>{
           console.log(response)
         this.setState({noticiaData:response.data[0], loading:false,
             image:response.data[0].photo})
       }).catch(error=>{
         this.setState({loading:false});
         message.error(error.message);
       });
   }

  render() {
    const { Meta } = Card;
    console.log(this.state.noticiaData)
    return (
        <div className="wrapper">

            <Row className="rowPosts" type="flex">
                <Col md={18} xs={24} className="colPostPage">
                    <div className="newBox">
                        <div class="headerNews">
                          <img className="postImg" src={this.state.image} />
                        </div>
                        <h3 className="newsTitle">{this.state.noticiaData.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: this.state.noticiaData.texto_noticia }} className="newsBody">

                        </div>
                    </div>
                </Col>
                <Col md={6} xs={24} className="colPostAside">
                    <div className="recentPostBox">
                        <h3 className="lastNewsTit">Últimas noticias</h3>
                    {this.state.news.map(noticia=>
                        <div className="newsList">
                            <Link className="newsList" to={`/post-page/${noticia.id_noticia}`} onClick={()=>this.handleRedirect(noticia.id_noticia)}>
                                {noticia.title}
                            </Link>
                            <div className="postDate">
                                {noticia.fecha}
                            </div>
                        </div>
                    )}
                    </div>
                </Col>
            </Row>
            <Footer/>
        </div>


    )}
}
export default NewsFeed;
