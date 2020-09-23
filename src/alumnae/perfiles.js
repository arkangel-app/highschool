import React, { Component } from "react";
import {  Row, Col } from 'antd';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import MasonryLayout from 'react-masonry-layout';
import objectFitImages from 'object-fit-images';
import Lightbox from 'react-image-lightbox';
import { message} from 'antd'
import restClient from '../network/restClient';
import Footer from '../Footer2'
import './light.css';
import {
  Link,
  BrowserRouter,
  withRouter
} from "react-router-dom";
class Perfiles extends React.Component{

    constructor(props){
      super(props);
      this.state={
        photoIndex: 0,
        isOpen: false,
        photos: [],
        loading:false,
        nombre:'Galería'
      }
    }

    componentDidMount(){
            this.setState({loading:true});
            let fotos=[];
                restClient.getGaleriaContent({path:"perfiles"}).then(response=>{
                response.data.gallery.map(data=>{
                    data.key = `${data.photo_path}`
                    fotos.push(data.photo_path)
                })
                console.log(fotos);
                this.setState({photos:fotos,loading:false})
            }).catch(error=>{
              this.setState({loading:false});
              message.error(error.message);
            });
        }


    render() {
      let patronNormal = true;
      const { photoIndex, isOpen,nombre } = this.state;
      const  images = this.state.photos;
      return (
      <div>
         <div className="galleryName">
            PERFILES
         </div>
        <div className="justify-content-md-center galleryBox" style={{position:'relative', paddingTop:30, paddingBottom:30 }} >

            <Row type="flex" gutter={16} className="perfilesRow">
            {images.map((photo, i) => {
                return(
                <Col lg={8} md={12} xs={24}>
                    <div className="imgBoxPerfiles">
                          <LazyLoadImage
                            alt={""}
                            effect="blur"
                            className="imgPerfiles"
                            src={photo}
                            onClick={() => this.setState({ isOpen: true, photoIndex:i })}
                            />
                    </div>

                </Col>)
            }
        )}
    </Row>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}

            <Footer/>
      </div>
      );
    }
}
export default Perfiles;
