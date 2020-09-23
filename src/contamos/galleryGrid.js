import React, { Component } from "react";
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
class Gallery extends React.Component{

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
            this.getName()
            let fotos=[];
                restClient.getGaleriaContent({path:this.props.match.params.id_galeria}).then(response=>{
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

    getName = ()=>{
            this.setState({loading:true});
                restClient.galleryByPath({path:this.props.match.params.id_galeria}).then(response=>{
                    console.log(response)
                    let data = response.data.galeria[0]
                this.setState({nombre:data.nombre_galeria,
                                loading:false})
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
             {nombre}
         </div>
        <div className="justify-content-md-center galleryBox" style={{position:'relative', paddingTop:30, paddingBottom:30 }} >

          <MasonryLayout
            id="masonry-layout"
            sizes={[
                { columns: 1, gutter: 0 },
                { mq: '500px', columns: 2, gutter: 0 },
                { mq: '768px', columns: 3, gutter: 0 },
                { mq: '1024px', columns: 4, gutter: 0 }
              ]}
            position={true}
            >
            {images.map((photo, i) => {
              let height = 0;
              let heightClass = '';
              if(i%4 === 0 && i!=0 ){
                patronNormal = !patronNormal;
              }
              if(patronNormal){
                height = i % 2 === 0 ? 236 : 536;
                heightClass = i % 2 === 0 ? 'contenedorImagenRecetaSmall' : 'contenedorImagenBig';
              }else{
                height = (i % 4 === 0 || i % 4 === 1)? 536 : 236;
                heightClass = (i % 4 === 0 || i % 4 === 1)? 'contenedorImagenBig' : 'contenedorImagenRecetaSmall';
              }
              return (

                <div
                  key={i}
                  className="picsMason animation all 2"
                  style={{
                    display: 'block',
                  }}>
                    <div className={heightClass}>
                          <LazyLoadImage
                            alt={""}
                            height={height}
                            effect="blur"
                            className="card-img-top"
                            src={photo}
                            onClick={() => this.setState({ isOpen: true, photoIndex:i })}
                            />
                    </div>

                </div>
              )}
            )}

          </MasonryLayout>
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
export default Gallery;
