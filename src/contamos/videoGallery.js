
import Footer from '../Footer2'
import React, { Component,useState ,useRef, useCallback} from 'react';
import useBookSearch from "./useInfiniteScrollVideo";
import { Row, Col, Icon, Modal, message, Button, Menu } from 'antd';
import spelling1 from '../images/spelling-01.jpg'
import inter2 from '../images/inter2.jpg'
import { Link } from "react-router-dom";
import restClient from '../network/restClient';
import List from './ListVideo';
class videoGallery extends React.Component{

    constructor(props) {
    super(props);
      this.state = {
        loading: false,
        visible: false,
        videos:[],
        path:''
      }


    }


    componentDidMount(){
        restClient.getVideos({pageSize: 20,pageNumber:1}).then(response=>{
            let vids  = [];
              response.data.videos.pages.map(vid=>{
                  let tempN = vid;
                  tempN.key = vid.id_video;
                  vids.push(tempN)
              })
              this.setState({
                  videos:vids})
              }).catch(error=>{
                       this.setState({loading:false});
                       message.error(error.message);
               });

    }

   show(ruta) {
       console.log(ruta)
     this.setState({
    path: ruta,
       visible: true,

     });
   };

   handleCancel = () => {
     let video = document.getElementById("myVideo");
     this.setState({ visible: false, path:''});
     video.pause();
   };

   DataModal(record) {
          Modal.info({
              content:(
                <div className="vidCenter">
                    <iframe className="videoYoutube" src={record}></iframe>
                </div>
              ),
              centered:true,
              visible:this.state.visible,
              maskClosable:"true",
              footer:null,
              className:"modalVidIframe",
          })
  }

    render() {
     const {visible,path} = this.state
      return (
        <div className="wrapper galeria">
            <div className="galleryName vid">
                Galería de videos
            </div>
            <Row type="flex" className="galleryGridRow pb video" gutter={[24,24]}>

      
            <List clickHandler={this.DataModal}state={this.state}/>
            </Row>
            <Footer/>
        </div>
    )
    }
}

export default videoGallery;
