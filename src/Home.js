import React, { Component } from "react";
import { Form, Tooltip, Input, Modal, Icon, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import restClient from './network/restClient';
import Footer from "./Footer";
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import icon1 from './images/video.png';
import icon2 from './images/recorrido.png'
import icon3 from './images/calendario.png'
// import icon4 from './images/portal.png';
import icon5 from './images/womenicon.jpg'



import footer from './Footer'
import { element } from "prop-types";
import fotoHeaderRwd from './images/glorieta.jpg'
import instaIconW from './images/instaIcon-43.png';

const {Option} = Select;


class Home extends Component {

  constructor(props) {
  super(props);
    this.state = {
      loading: false,
      visible: false,
      popup: false,
      tit_pop:'',
      linksHome:'',
      text_pop:'',
      img_pop:'',
      fotoHeader:'',
      videoLinkH:"",
      videoHome:false,
      news:[],
      width:'',
      video:undefined,
      galleries:[],
      totalGalleries:0,
      positionSlide:0,
      intervalNoticias:undefined,
      search:{
            pageSize: 3,
            pageNumber:1
        },

            fullName: '',
            user: '',
            profilePhoto: '',
            photosInsta: []
    }
    this.positionSlide=0
  }

  componentDidMount(){
      this.props.isHome(true)

      this.getContent();
      this.getPopUp();
      this.loadNews();
      this.getGaleriaFotos();
      this.setState({positionSlide:0});

     this.changeSlideNews();
     this.eventClick()

     fetch("https://graph.instagram.com/me/media/?fields=media_url&access_token=IGQVJXNW5FdGNiT3YtdHJVVDlVV1YtNThkd29mWTRVdUhGVXVhV2R3NENGUThQOV9HWkxDVVZAQeEs1WTZA6bm5RQ05jUkFUdmdFQ0dhVXZAvVHdUSHlNemwzdlpJQ09DeXVLY21NNXRXMDVlY1dWbmRZAUwZDZD")
       .then(r => r.json())
       .then(data => {
         let feed = [];
         let header = [];
         if(data && data.data){
            data.data.map((img, pos)=>{
                if(pos<8){
                    img.key=`img-${pos+1}`;
                    feed.push(img.media_url);
                }
                
             })
              this.setState({ photosInsta: feed, fullName: "Colegio Delta",
                           user: "uebdelta", profilePhoto:"https://colegio-delta.s3.amazonaws.com/deltainsta.png" })
         }else{
            feed.push("https://colegio-delta.s3.amazonaws.com/theart.jpg");
            feed.push("https://colegio-delta.s3.amazonaws.com/women.jpg");
            feed.push("https://colegio-delta.s3.amazonaws.com/women2.jpg");
            feed.push("https://colegio-delta.s3.amazonaws.com/padre.jpg");
            this.setState({ photosInsta: feed, fullName: "Colegio Delta",
                user: "uebdelta", profilePhoto:"https://colegio-delta.s3.amazonaws.com/deltainsta.png" })
         }
        
       })
}

eventClick(){

    var slides=document.getElementById("v-news-tab").childNodes;
    for(let i=0; i<=slides.length-1;i++){
        let element=slides[i];
         element.addEventListener("click",()=>{
            console.log("cliceado")
            changeSlideEventClick(i);

        });
    }
    function changeSlideEventClick(pos){
        var slides=document.getElementById("v-news-tab").childNodes;
        var contentSlide=document.getElementById("v-news-tabContent").childNodes;
        var position=pos
      console.log(position)
        for(let i=0; i<=slides.length-1;i++){
            let element=slides[i];
            let contentElement=contentSlide[i];

          //   setTimeout(()=>{
             // console.log(element);
            //   (i==slides.length)?position=0:position=i;
            //  (i==slides.length-1)?fin=true:fin=false;
              if (element.classList.contains('active')) {
                  //  element.classList.remove("active");
               //   console.log("diferent")
               console.log(element);
                   element.classList.remove("active");
                  contentElement.classList.remove("active");

                  contentElement.classList.remove("show");


                  break;

                }

            //console.log(element);

          //   },1000)


          }
    }

}
  changeSlideNews(){
      var slides=document.getElementById("v-news-tab").childNodes;
      var contentSlide=document.getElementById("v-news-tabContent").childNodes;
    // console.log(document.getElementById("v-news-tab"))
    // console.log(contentSlide)
    function returnPos(){
       return new Promise((resolve,reject)=>{
            let pos=0
            for(let i=0; i<=slides.length-1;i++){
                let element=slides[i];
                if (element.classList.contains('active')) {
                    pos=i;
                    break;
                }
            }
            resolve(pos);
            reject( "error")
        })

    }


    let elementTmp=undefined
    let contentElementTmp=undefined;
    let fin=false;
    this.setState({intervalNoticias:setInterval(async function(){
        var position=(slides.length-1&&fin)?0:await returnPos();
        for(let i=position; i<=slides.length-1;i++){
            let element=slides[i];
            let contentElement=contentSlide[i];

            //   setTimeout(()=>{
            // console.log(element);
                (i==slides.length)?position=0:position=i;
            // (i==slides.length-1)?fin=true:fin=false;
                if (!element.classList.contains('active')) {
                    //  element.classList.remove("active");
                //   console.log("diferent")
                    element.classList.add("active");
                    elementTmp.classList.remove("active");

                    contentElement.classList.add("active");
                    contentElementTmp.classList.remove("active");
                    contentElement.classList.add("show");
                    contentElementTmp.classList.remove("show");

                    break;

                }
                (i==slides.length-1)?fin=true:fin=false;
                //   if(position==slides.length-1&&fin){
                //       position=0;
                //       setTimeout(()=>{

                //       },1000)
                //   }
            //console.log(element);
            elementTmp=element
            contentElementTmp=contentElement
            //   },1000)
                    

        }
    },10000)});
  }
  componentWillUnmount(){
       this.props.isHome(false);
       if(this.state.intervalNoticias!==undefined){
            clearInterval(this.state.intervalNoticias);
       }
  }

  getPopUp =()=>{
      restClient.getPopUpContent().then(response=>{
          if(response.data.status=='A'){
              this.setState({ popup:true,
                              img_pop:response.data.valor,
                              tit_pop:response.data.valor2,
                              text_pop:response.data.valor3})
          }

        }).catch(error=>{
            this.setState({loading:false});
      });
  }

  getContent = ()=>{
      this.setState({loading:true});
      restClient.getContentById({id_page:20}).then(response=>{

          let header = response.data[0]
          let linksHome = response.data[1]
          let vid = false
          let vidLink = ""
          let fotoh = ""
         if (header.valor2=="video"){
             vidLink = header.valor1
             vid = true
         }else{
             fotoh = header.valor1
             vid = false
         }

        this.setState({ fotoHeader:fotoh,
                        videoLinkH:vidLink,
                        linksHome,
                        videoHome:vid,
                        loading:false},()=>{
                            if(this.state.videoLinkH!=""){
                            document.getElementById('videoBg').play()
                            }
                        }
                        )
        }).catch(error=>{
            this.setState({loading:false});
      });
  }

  loadNews = () =>{
    restClient.getLastNews().then(response=>{
        let noticias  = [];
        let pos=1;
            response.data.news.map(noticia=>{
                let tempN = noticia;
                tempN.key = pos;
                console.log(pos)
                if(pos<5){
                    noticias.push(tempN)

                }
                pos+=1;
            })


    this.setState({news:noticias})
    });
    }


  showModal = () => {
   this.setState({
     visible: true,
   });
 };
getGaleriaFotos=()=>{
   let classActive=1;
    restClient.getGalleries(this.state.search).then(response=>{
        let galerias = [];
        response.data.pages.map(galeria=>{
          let tempN = galeria;
          tempN.key = `gal-${tempN.id_galeria_fotos}`;
          tempN.class=classActive;
          classActive++;
          restClient.getSecondPhoto(galeria).then(res=>{
            tempN.seconPhoto=(res.data!="")? res.data:galeria.portada  ;
            galerias.push(tempN);
            console.log(galerias)
            this.setState({loading:false,galleries:galerias,totalGalleries:parseInt(response.data.total)});
          })

        })


    }).catch(error=>{
      //message.error(err.message);
      this.setState({loading:false});
    })
}
 handleCancel = () => {
   let video = document.getElementById("myVideo");
   this.setState({ visible: false});
   video.pause();
   video.muted = true;
 };

 handleCancel2 = () => {
    this.setState({ popup: false});
 };

 viewPost = (post)=>{
      this.props.history.push(`/post-page/${post}`);
    }



  render() {

    const { visible, loading, fotoHeader,popup,videoHome } = this.state;
    return (
<div className="homeContainer">

   <Row>

       <div className="slideHome" style={{backgroundImage:`url(${fotoHeader})`}}>
           {this.state.videoLinkH &&


           <video  autoplay muted loop id="videoBg" style={{display: videoHome ? 'block' : 'none' }}>
               <source src={this.state.videoLinkH} type='video/mp4'/>

           </video>
            }
       </div>
       <div className="slideHomeRwd">
       </div>
   </Row>

   <Row>
      <div
          className={videoHome ? "iconContainer videoHome":"iconContainer"}>
        <Row style={{width:'100%'}}>
            <Col md={6} xs={24}>
            <a href="https://issuu.com/patty81/docs/revista_delta_2019-20?fr=sOWVjNzE1MDg2NDc" target="_blank">
                <img style={{maxWidth:250, marginTop:20}} src={icon5} className="homeIcon slide-in-elliptic-top-fwd"></img>
            </a>
        </Col>

        <Col md={6} xs={8}>
            <Link to="/" onClick={this.showModal}>
                <img src={icon1} className="homeIcon slide-in-elliptic-top-fwd"></img>
            </Link>
        </Col>
        <Col md={6} xs={8}>
            <a href="https://uedelta.k12.ec/delta/rvcolegiodelta/" target="_blank">
                <img src={icon2} className="homeIcon slide-in-elliptic-top-fwd"></img>
            </a>
        </Col>
        <Col md={6} xs={8}>
            <Link to="/calendario">
                <img src={icon3} className="homeIcon slide-in-elliptic-top-fwd"></img>
            </Link>
        </Col>
        {/* <Col md={6} xs={6}>
            <a href="http://www.uedelta.k12.ec/padres/#/login" target="_blank">
                <img src={icon4} className="homeIcon slide-in-elliptic-top-fwd"></img>
            </a>
        </Col> */}
       </Row>
      </div>
   </Row>

   <div className="newSlider">
      <Row type="flex" className="menuNews">
             <div className="bgColor">
             </div>
      <Col md={2} xs={24}>
            <div className="circleBtnCol">
              <div className="nav nav-news" id="v-news-tab" role="tablist" aria-orientation="vertical" >
                   <a className="nav-link circle space active" id="v-news-1-tab" data-toggle="pill" href="#1" role="tab" aria-controls="v-news-2" aria-selected="false"> </a>
                   <a className="nav-link circle space" id="v-news-2-tab" data-toggle="pill" href="#2" role="tab" aria-controls="v-news-1" aria-selected="false"> </a>
                   <a className="nav-link circle space" id="v-news-3-tab" data-toggle="pill" href="#3" role="tab" aria-controls="v-news-3" aria-selected="false"> </a>
                   <a className="nav-link circle space" id="v-news-4-tab" data-toggle="pill" href="#4" role="tab" aria-controls="v-news-4" aria-selected="false"> </a>
              </div>
            </div>
       </Col>
       <Col md={22} xs={24}>
          <div className="tab-content" id="v-news-tabContent">
              {this.state.news.map(noticia=>

                  <div  className={noticia.key==1 ? "tab-pane fade show active":"tab-pane fade"}
                        id={noticia.key} role="tabpanel" aria-labelledby="v-news-hacemos-tab">
                    <div className="contentTemplate">

                    
                    <Row gutter={30} className="row-news">
                        <Col md={12}>
                            <div className="boxImgNew">
                                <div className="coverNewImg" style={{backgroundImage: `url(${noticia.photo})`}}></div>
                            </div>
                        </Col>
                        <Col md={12} className="col-news">
                            <Row >
                             
                                    <div className="smallBar dark"></div>
                                    <div className="boldTit">
                                        {noticia.tit_bold}
                                    </div>
                                    <div className="thinTit">
                                        {noticia.tit_light}
                                    </div>
                                    <div className="newBodyText">
                                        {noticia.short_description}
                                    </div>
                                    <div className="readMoreBox">
                                        <div className="readMoreBtn news home">
                                            <a className="rmGallery"  onClick={()=>this.viewPost(noticia.id_noticia)}>
                                                <div className="whiteBtn square">
                                                    Leer
                                                </div>
                                                <span className="lightBtn">
                                                    más
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                            
                            </Row>
                        </Col>
                      </Row>
                    </div>
                  </div>
              )}

          </div>
        </Col>
        </Row>
    </div>



    <Row>
        <div className="workWithUs">
            <Row type="flex" className="workRow">
                <Col md={12} xs={24} className="workTextCol">
                    <div className="galleryContent">
                        <div className="smallBar dark"></div>
                        <div className="boldTit">
                            QUIERO UNIRME
                        </div>
                        <div className="thinTit">
                            A LA FAMILIA DELTA
                        </div>
                        <div className="readMoreBox ptop">
                             <a href={this.state.linksHome.valor1} target="_blank" className="readMoreBtn gal">
                                 <div className="whiteBtn square">
                                     Ver
                                 </div>
                                 <span className="lightBtn">
                                      Solicitud de admisión
                                 </span>
                             </a>
                        </div>
                        <div className="readMoreBox ptop">
                             <a href={this.state.linksHome.valor2} target="_blank" className="readMoreBtn gal">
                                 <div className="whiteBtn square">
                                     Ver
                                 </div>
                                 <span className="lightBtn">
                                      Trabaja con nosotros
                                 </span>
                             </a>
                        </div>
                    </div>
                </Col>
                <Col md={12} xs={24} className="instaBoxCol">

                                     <div className="darkBox">
                                      <Row className="instaRow Header">
                                          <Col md={6} xs={6} className="headerInstaCol">
                                              <div className="profileBox">
                                                  <img src={this.state.profilePhoto} className="profile"/>
                                              </div>
                                          </Col>
                                          <Col md={18} xs={18} className="headerInstaCol">
                                              <div className="fullname">
                                                  {this.state.fullName}
                                              </div>
                                              <div className="user">
                                                   @{this.state.user}
                                              </div>
                                          </Col>
                                      </Row>

                                      <Row className="instaRow">
                                        {this.state.photosInsta.map(ph =>
                                            <Col md={6} xs={12} className="instaImgCol">
                                                <div className="instaBoxMiniImg">
                                                    <img src={ph} className="instaImg feed"/>
                                                </div>
                                            </Col>
                                        )}
                                      </Row>
                                        <Row className="btnRow">
                                            <div className="instaBox">
                                            <a href="https://www.instagram.com/uebdelta" target="_blank" className="instaBtn">
                                                <span><img src={instaIconW} className="minInsta"/></span>
                                                Ver más en Instagram</a>
                                            </div>
                                        </Row>


                                    </div>
                </Col>
            </Row>
        </div>
    </Row>
    <Modal
            visible={visible}
            width="90%"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            className="modalVideo">
            <a onClick={this.handleCancel}>
                <Icon type="close" className="iconVideo" />
            </a>

            <video id='myVideo' controls="controls" preload='' autoplay="" width="100%">
                  <source  src="https://uedelta.k12.ec/delta/videos/Ser_parte_del_Delta-h.mp4" type='video/mp4'/>
            </video>
</Modal>

<Modal
        visible={popup}
        width="90%"
        onOk={this.handleOk}
        onCancel={this.handleCancel2}
        centered
        className="modalPopUp">
        <a onClick={this.handleCancel2}>
            <Icon type="close" className="iconPopTemp" />
        </a>
            <div className="imgPopBox">
                <img src={this.state.img_pop} className="imgPopTemp"/>
            </div>
            <div className="titPopBox">
                {this.state.tit_pop}
            </div>
            <div className="titPopBox link">

                <a href={this.state.text_pop} target="_blank" className="linkPop">AQUÍ</a>
            </div>


</Modal>



<Footer/>
</div>

    );

  }

}


const WrappedHomeForm = Form.create({ name: 'home_form' })(Home);
export default WrappedHomeForm;
