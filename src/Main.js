import React, { Component } from "react";
import {
  Route,
  NavLink,
  Link,
  HashRouter,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Predelta from './predelta/'
import Calidad from "./somos/Calidad";
import Historia from "./somos/Historia";
import Copece from "./somos/Copece";
import Equipo from "./somos/Equipo";
import Mvv from "./somos/Mvv";
import ProyectoEducativo from "./hacemos/proyectoEducativo";
import Academico from "./hacemos/academico";
import Formativo from "./hacemos/formativo";
import Extracurriculares from "./hacemos/extracurriculares";
import Ib from "./hacemos/Ib";
import DptoMedico from "./ofrecemos/departamentoMedico";
import Counseling from "./ofrecemos/Counseling";
import Capellania from "./ofrecemos/Capellania";
import Dece from "./ofrecemos/Dece";
import Bar from "./ofrecemos/Bar";
import Transporte from "./ofrecemos/Transporte";
import Mapa from "./alumnae/map";
import NewsFeed from "./contamos/newsFeed";
import PostPage from "./contamos/noticiaPage";
import PostPage2 from "./contamos/noticiaPage2";
import Calendar from "./contamos/calendar";
import Boletin from "./contamos/boletin";
import allGalleries from "./contamos/allGalleries";
import Megs from './familias/megs'
import Padres from './familias/Padres'
import Torneo from './contamos/torneo'
import Transcript from './alumnae/transcript'
import logo from './images/logo.png';
import search from './images/find-19.png';
import prescolar from './images/prescolar.png';
import torremar from './images/torremar.png';
import prescolarKids from './images/prescolar-kids.png';
import torremarLogo from './images/torremar-logo.png';
import fb from './images/social-icon-13.png';
import tw from './images/social-icon-14.png';
import icon1 from './images/menu ico-40.png'
import icon2 from './images/menu ico-41.png'
import icon3 from './images/menu ico-42.png'
import Gallery from './contamos/galleryGrid'
import Perfiles from './alumnae/perfiles'
import CollectionFormModal from './CollectionFormModal'
import ModalToggle from './ModalToggle'
import { Row, Col, Icon, Modal, Button , Form, Input, Radio ,Card} from 'antd';
import restClient from './network/restClient';
import videoGallery from './contamos/videoGallery'
import { slide as Menu } from 'react-burger-menu'
import './menu.css'
const FormItem = Form.Item;
const { Search } = Input;

class Main extends Component {


  constructor(props) {
  super(props);
    this.state = {
      loading: false,
      visible: false,
      menuWindow:false,
      isModalOpen: false,
      isHome:false,
      path:'',
      menuOpen: false,
      loading:false,
      linkRevista:''
    }

}

 componentDidMount(){
    let w = window.location.pathname;
    if(w=='/'){
        this.setState({isHome:true,path:w})
    }else{
            this.setState({isHome:false,path:w})
    }
    this.setState({loading:true})
    this.getContent()
}

componentWillReceiveProps(prevProps) {
    console.log(prevProps)
  // Typical usage (don't forget to compare props):
  if(this.state.path=!window.location.pathname){
      let w = window.location.pathname;
      if(w=='/'){
          this.setState({isHome:true,path:w})
      }else{
              this.setState({isHome:false,path:w})
      }
  }
}

getContent = ()=>{
         this.setState({loading:true});
         restClient.getContentById({id_page:21}).then(response=>{
           this.setState({ linkRevista:response.data[0].valor1,
                           loading:false})
           }).catch(error=>{
               this.setState({loading:false});
         });
}


handleStateChange (state) {
   this.setState({menuOpen: state.isOpen})
 }


 handleCancel  = () => {
     console.log('ok')
   this.setState({ menuOpen: false });
 };



changeHome=(isHome) => {
    this.setState({isHome})
}
//  CollectionCreateForm= Form.create()(

//   ({ form: { getFieldDecorator } }) => (
//       <Form layout="vertical">
//           <FormItem>
//             {getFieldDecorator('find')(
//                 <Search
//                     placeholder="Realiza una búsqueda"
//                     onSearch={value =>

//                       restClient.getSearchFilter({busqueda: value}).then(response=>{
//                         let noticias=[];
//                             response.data.content.map(noticia=>{
//                                 let tempN = noticia;
//                                 tempN.key = noticia.id_noticia;
//                                 noticias.push(tempN)
//                             })
//                             // this.setState({ content:noticias});
//                       console.log(noticias)
//                     })
//                     }
//                     style={{ width: 200 }}
//                   />
//             )}
//           </FormItem>


//       </Form>

//   )

// );

openModal(){

 return(
      <Modal
        visible={this.state.visible}
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

      <Form layout="vertical">
          <FormItem>

                <Search
                    placeholder="Realiza una búsqueda"
                    onSearch={value =>

                      restClient.getSearchFilter({busqueda: value}).then(response=>{
                        let noticias=[];
                            response.data.content.map(noticia=>{
                                let tempN = noticia;
                                tempN.key = noticia.id_noticia;
                                noticias.push(tempN)
                            })
                            // this.setState({ content:noticias});
                     // console.log(content)
                    })
                    }
                    style={{ width: 200 }}
                  />

          </FormItem>


      </Form>


      </Row>
      <Row >
            <Col md={12} xs={24} className="newsCard">

            {this.state.content.map((book) => (
            <Card
							cover={
								<div className="boxImgNew newsFeed">
									 <div className="coverNewImg" style={{backgroundImage: `url(${book.photo})`}}></div>
								</div>
							}
						></Card>

            ))}
            </Col>
      </Row>
      </Modal>
 )

}



  render() {
    const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
    };
    const { visible, loading, menuOpen,linkRevista } = this.state;
    const { SubMenu } = Menu;
    return (
      <BrowserRouter>
      <div>
          <div className="linksColegios">
              <div class="linkPreescolar">
                        <div class="linkLogo">
                            <a href="http://predelta.edu.ec/" target="_blank">
                                <img className="imgLogoIn" src={prescolarKids}/>
                            </a>
                         </div>
                         <img className="imgLogoOut" src={prescolar}/></div>
          </div>
          <div className="linksColegios">
              <div class="linkTorremar ">
                        <div class="linkLogo">
                          <a href="http://www.torremar.edu.ec/" target="_blank">
                              <img className="imgLogoIn" src={torremarLogo}/>
                          </a>
                        </div>
                         <img className="imgLogoOut" src={torremar}/></div>
          </div>



         <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
             <div>
                 <ul className="nav flex-column flex-nowrap rwd">
                     <li className="nav-item">
                         <a className="rwd nav-link collapsed" href="#submenu1" data-toggle="collapse" data-target="#submenu1">QUIÉNES SOMOS</a>
                            <div className="collapse" id="submenu1" aria-expanded="false">
                              <ul className="flex-column pl-2 nav">
                                  <li className="nav-item"><Link to="/copece" onClick={this.handleCancel} className="nav-link py-0" href="#">COPECE</Link></li>
                                  <li className="nav-item"><Link to="/historia" onClick={this.handleCancel} className="nav-link py-0" href="#">HISTORIA</Link></li>
                                  <li className="nav-item"><Link to="/mision-vision-valores" onClick={this.handleCancel} className="nav-link py-0" href="#">IDEARIO</Link></li>
                                  <li className="nav-item"><Link to="/calidad" onClick={this.handleCancel} className="nav-link py-0" href="#">CALIDAD</Link></li>
                                  <li className="nav-item"><Link to="/equipo" onClick={this.handleCancel} className="nav-link py-0" href="#">EL EQUIPO</Link></li>
                                  <a href="https://opusdei.org" target="_blank" className="nav-link py-0">OPUS DEI</a>
                              </ul>
                            </div>
                    </li>
                    <li className="nav-item">
                        <a className="rwd nav-link collapsed" href="#submenu2" data-toggle="collapse" data-target="#submenu2">QUÉ HACEMOS</a>
                           <div className="collapse" id="submenu2" aria-expanded="false">
                             <ul className="flex-column pl-2 nav">
                                 <li className="nav-item"><Link to="/proyecto-educativo" onClick={this.handleCancel} className="nav-link py-0" href="#">PROYECTO EDUCATIVO</Link></li>
                                 <li className="nav-item"><Link to="/formativo" onClick={this.handleCancel} className="nav-link py-0" href="#">FORMATIVO</Link></li>
                                 <li className="nav-item"><Link to="/academico" onClick={this.handleCancel} className="nav-link py-0" href="#">ACADÉMICO</Link></li>
                                 <li className="nav-item"><Link to="/ib" onClick={this.handleCancel} className="nav-link py-0" href="#">IB</Link></li>
                                 <li className="nav-item"><Link to="/extracurriculares" onClick={this.handleCancel} className="nav-link py-0" href="#">EXTRACURRICULARES</Link></li>
                             </ul>
                           </div>
                   </li>
                   <li className="nav-item">
                       <a className="rwd nav-link collapsed" href="#submenu3" data-toggle="collapse" data-target="#submenu3">TE OFRECEMOS</a>
                          <div className="collapse" id="submenu3" aria-expanded="false">
                            <ul className="flex-column pl-2 nav">
                                <li className="nav-item"><Link to="/dece" onClick={this.handleCancel} className="nav-link py-0" href="#">DECE</Link></li>
                                <li className="nav-item"><Link to="/counseling" onClick={this.handleCancel} className="nav-link py-0" href="#">COUNSELING</Link></li>
                                <li className="nav-item"><Link to="/capellania" onClick={this.handleCancel} className="nav-link py-0" href="#">CAPELLANÍA</Link></li>
                                <li className="nav-item"><Link to="/departamento-medico" onClick={this.handleCancel} className="nav-link py-0" href="#">DEPARTAMENTO MÉDICO</Link></li>
                                <li className="nav-item"><Link to="/bar-y-almuerzos" onClick={this.handleCancel} className="nav-link py-0" href="#">BAR</Link></li>
                                <li className="nav-item"><Link to="/transporte" onClick={this.handleCancel} className="nav-link py-0" href="#">TRANSPORTE</Link></li>
                            </ul>
                          </div>
                  </li>
                  <li className="nav-item">
                      <a className="rwd nav-link collapsed" href="#submenu4" data-toggle="collapse" data-target="#submenu4">TE CONTAMOS</a>
                         <div className="collapse" id="submenu4" aria-expanded="false">
                           <ul className="flex-column pl-2 nav">
                               <li className="nav-item"><Link to="/calendario" onClick={this.handleCancel} className="nav-link py-0">CALENDARIO</Link></li>
                               <li className="nav-item"><Link to="/news" onClick={this.handleCancel} className="nav-link py-0">NOTICIAS</Link></li>
                               <li className="nav-item"><Link to="/boletines" onClick={this.handleCancel} className="nav-link py-0">BOLETINES</Link></li>
                               <li className="nav-item"><Link to="/galerias-delta" onClick={this.handleCancel} className="nav-link py-0">GALERÍA</Link></li>
                               <li className="nav-item"><Link to="/galeria-videos" onClick={this.handleCancel} className="nav-link py-0">VIDEOS</Link></li>
                               <li className="nav-item"><a href={linkRevista} target="_blank" onClick={this.handleCancel} className="nav-link py-0">REVISTAS</a> </li>
                            </ul>
                         </div>
                 </li>
                 <li className="nav-item">
                     <a className="rwd nav-link collapsed" href="#submenu5" data-toggle="collapse" data-target="#submenu5">FAMILIAS</a>
                        <div className="collapse" id="submenu5" aria-expanded="false">
                          <ul className="flex-column pl-2 nav">
                              <li className="nav-item"><Link to="/megs" onClick={this.handleCancel} className="nav-link py-0">MEGS</Link></li>
                              <li className="nav-item"><Link to="/padres" onClick={this.handleCancel} className="nav-link py-0">FORMACIÓN A PADRES</Link></li>
                              <li className="nav-item"><a href="https://forms.gle/KBiWTJUn2dc4VYu39" target="_blank" onClick={this.handleCancel} className="nav-link py-0">WANTED!</a></li>
                              <li className="nav-item"><Link to="/torneo" onClick={this.handleCancel} className="nav-link py-0">TORNEO DE FÚTBOL</Link></li>
                           </ul>
                        </div>
                </li>
                <li className="nav-item">
                    <a className="rwd nav-link collapsed last" href="#submenu6" data-toggle="collapse" data-target="#submenu6">ALUMNAE</a>
                       <div className="collapse" id="submenu6" aria-expanded="false">
                         <ul className="flex-column pl-2 nav">
                              <li className="nav-item"><Link to="/mapa" onClick={this.handleCancel} className="nav-link py-0">CIUDADANAS DEL MUNDO</Link></li>
                              <li className="nav-item"><Link to="/perfiles" onClick={this.handleCancel} className="nav-link py-0">PERFILES</Link></li>
                              <li className="nav-item last"><Link to="/transcript" onClick={this.handleCancel} className="nav-link py-0">TRANSCRIPT REQUEST</Link></li>
                          </ul>
                       </div>
                 </li>
                 <li className="nav-item">
                    <Link className="rwd nav-link collapsed last predeltaLink" to="/predelta" onClick={this.handleCancel} >PREDELTA</Link>
                 </li>
                 </ul>
            </div>
         </Menu>
         <span className="miniTit">
             MENU
         </span>


        <Row type="flex" justify="center" className="rowMenu" style={{display: this.state.isHome ? 'none' : 'flex' }}>

                 <Link className="navbar-brand" to="/"><img className="brand-logo" alt="logo" src={logo}/></Link>
                 <div className="searchBox">
                     <ModalToggle
                      label={<img src={search} className="serchIcon"/>}
                       modal={ CollectionFormModal }
                     // modal={ this.openModal }
                    />
                 </div>
        </Row>



        <div className="content">
          <Route component={ScrollToTop} />
          <Route exact path="/" render={(props) => <Home {...props} isHome={this.changeHome}/>} />
          <Route exact path="/historia" component={Historia}/>
          <Route exact path="/mision-vision-valores" component={Mvv}/>
          <Route exact path="/copece" component={Copece}/>
          <Route exact path="/equipo" component={Equipo}/>
          <Route exact path="/calidad" component={Calidad}/>
          <Route exact path="/proyecto-educativo" component={ProyectoEducativo}/>
          <Route exact path="/formativo" component={Formativo}/>
          <Route exact path="/academico" component={Academico}/>
          <Route exact path="/ib" component={Ib}/>
          <Route exact path="/dece" component={Dece}/>
          <Route exact path="/counseling" component={Counseling}/>
          <Route exact path="/departamento-medico" component={DptoMedico}/>
          <Route exact path="/capellania" component={Capellania}/>
          <Route exact path="/bar-y-almuerzos" component={Bar}/>
          <Route exact path="/transporte" component={Transporte}/>
          <Route exact path="/mapa" component={Mapa}/>
          <Route exact path="/news" component={NewsFeed}/>
          <Route exact path="/post-page/:id_post" component={PostPage}/>
          <Route exact path="/post-page" component={PostPage2}/>
          <Route exact path="/gallery/:id_galeria" component={Gallery}/>
          <Route exact path="/calendario" component={Calendar}/>
          <Route exact path="/boletines" component={Boletin}/>
          <Route exact path="/galerias-delta" component={allGalleries}/>
          <Route exact path="/galeria-videos" component={videoGallery}/>
          <Route exact path="/megs" component={Megs}/>
          <Route exact path="/padres" component={Padres}/>
          <Route exact path="/torneo" component={Torneo}/>
          <Route exact path="/extracurriculares" component={Extracurriculares}/>
          <Route exact path="/transcript" component={Transcript}/>
          <Route exact path="/perfiles" component={Perfiles}/>
          <Route exact path="/predelta" component={Predelta}/>

    </div>
      </div>
        </BrowserRouter>
    );
  }
}

export default Main;
