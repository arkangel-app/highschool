import React, { Component } from "react";
import moment from "moment";
import {Row, Col, Icon, Spin, message} from "antd";
import { gapi } from 'gapi-script';
import marilu from '../images/marilu-45.png';
import ft from '../images/boletin/footer.jpg';
import Footer from "../Footer2";
import BoletinFile from "./boletin.htm";
import { parse } from 'node-html-parser';
import restClient from '../network/restClient';
const root = parse('<ul id="list"><li>Hello World</li></ul>');

const antIcon = <Icon type="loading" style={{ fontSize: 46, color:'#cb9c2b' }} spin />;

class Boletin extends Component {
    /* global gapi */
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM YYYY, h:mm A"),
      currentMonth: moment().subtract(1, 'months'),
      monthCount: 0,
      htmlDoc: '',
      eventos: [],
      textos: [],
      boletines: [],
      tags: [],
      currentBoletin:'',
      isBusy: false,
      isEmpty: true,
      isLoading: true,
      saludo:'',
      imagenes:[]
    };
  }

  componentDidMount = () => {
    this.getData();
    console.log(root.querySelector('#list').childNodes[0].childNodes[0].rawText);

  };

  getData(){
      this.setState({isLoading:true});
      restClient.getBoletines().then(response=>{
        this.setState({boletines:response.data, isLoading:false})
        this.getBoletin();
      }).catch(error=>{
        this.setState({isLoading:false});
        message.error(error.message);
      });
  }

   findNextMonth(){
        let nm = moment(this.state.currentMonth).add(1, 'months');
            this.setState({
               currentMonth:nm,
            }, () => {
               this.getBoletin();
            });
   };

   findPrevMonth(){

     let pm = moment(this.state.currentMonth).subtract(1, 'months')
           this.setState({
              currentMonth:pm,
           }, () => {
              this.getBoletin();
           });

   }

consultarImagenes(imagenesSrc,folder){
  console.log(imagenesSrc)
  imagenesSrc.map(imagen=>{
    imagen.imagenNew=imagen.image.split("/")
    imagen.imagenNew[2]=imagen.imagenNew[2].replace(/ /g,"%")
    console.log(imagen.imagenNew)
  })
  let imageNew
  let arrayImagenes=[]
  folder="boletines/"+folder
  restClient.getFotosBoletin({path:folder}).then(response=>{
    console.log(response)
    console.log(imagenesSrc)
      imageNew=response.data.gallery
      imageNew.map(img=>{
       imagenesSrc.map(ele=>{
       console.log("comparando",img.image_name+" == "+ele.imagenNew[2])
        if(img.image_name==ele.imagenNew[2]){
        arrayImagenes.push({link:ele.link,url:img.photo_path})
        console.log(arrayImagenes)

        }
       })
        this.setState({imagenes:arrayImagenes})
      })
  })
}
  getBoletin() {
      let msg = ''
      let mes = moment(this.state.currentMonth).format("MM")
      let year = moment(this.state.currentMonth).format("YYYY")
      let palabras = ''
      let textos = []
      let enlaces = []
      let i = 0
      let hayBoletin=false
      this.state.boletines.map(boletin=>{
        console.log(boletin)
          if(boletin.month==mes && boletin.year==year){

                hayBoletin=true
                palabras =  parse(boletin.html).querySelector('body')
                console.log(palabras)
                palabras.querySelector('#palabras').childNodes.map(p=>{
                    if(p.nodeType==1){
                        if(i!=0){
                            textos.push(p)
                        }else{
                            msg = p.rawText
                        }
                        i+=1
                    }
                })
                var imagenesSrc=[]
                var images=  parse(boletin.html).querySelectorAll('tr td  a')
                images.map(image=>{
                  console.log(image.rawAttributes)
                  try {
                    if(image.childNodes[0].rawAttributes.src){

                      imagenesSrc.push({link:image.rawAttributes.href,image:image.childNodes[0].rawAttributes.src})}

                  } catch (error) {
                    console.log(error)
                  }
 })
             this.consultarImagenes(imagenesSrc, boletin.folder);
                //images = images.querySelector("td")
                //images = images.querySelector("img")
                console.log(images)
                enlaces = palabras.querySelector('ul').toString()

                this.setState({tags:textos,links:enlaces,saludo:msg,isEmpty:false})
            }
      })
      if(hayBoletin==false){
          this.setState({isEmpty:true})
      }
  }

  render() {
    const { time, events, isEmpty, isLoading, htmlDoc,tags,links,saludo, imagenes} = this.state;

    let emptyState = (
      <div className="empty">
        <p className="noEvents">
          No hay boletín para este mes.
      </p>
      </div>
    );

    let loadingState = (
      <div className="loading">
          <Spin size="large" indicator={antIcon} spinning={isLoading}>
          </Spin>
      </div>
    );

    let boletinesRender = (
        <div>
        <Row className="letterBox">
            <Col md={4} xs={24}>
                <div className="photoBox">
                    <img src={marilu} className="idPhoto"></img>
                </div>
            </Col>
            <Col md={20} xs={24}>
                <div className="palabras">
                    <p>{saludo}</p>
                    {tags.map(p=>
                        <p dangerouslySetInnerHTML={{ __html: p }}>
                        </p>

                    )
                    }


                </div>
            </Col>
            <Col md={24} xs={24}>
                <div className="palabras">
                    <Row type="flex" gutter={[1, 16]} className="rowFotosBol">
                    {imagenes.map(img=>
                       <Col md={6} xs={12}>
                           <div className="fotoBolBox">
                              <a className="imgBol" href={img.link} target="_blank" className="imgBol">
                                  <img src={img.url} className="imgBol"></img></a>
                            </div>
                        </Col>
                    )
                    }

                    </Row>
                </div>
            </Col>
        </Row>

        <Row className="newsBox">
            <Col md={24} xs={24}>
                <div dangerouslySetInnerHTML={{ __html: links }}>
                </div>

            </Col>
        </Row>
        </div>
    )

    return (
    <div className="wrapper">
      <div className="container calendar">

        <div className="calendarHeader boletin">
            <span className="titBolet">BOLETÍN INFORMATIVO</span>
            <span className="rightALign">
                <a onClick={() => {this.findPrevMonth()}}>{"< "}</a>
                {moment(this.state.currentMonth).format("MMMM")}
                {" "}
                {moment(this.state.currentMonth).format("YYYY")}
                <a onClick={() => {this.findNextMonth()}}>
                    {" >"}
                </a>
            </span>
        </div>
        <div className="upcoming-meetings">

          <div className="eventos boletin">

            <div className="yellowBar"></div>


          </div>

          <div className={
                  isEmpty==false ? "eventos":"hiddenEvents"}>
            {this.state.isLoading && loadingState}

            {!this.state.isEmpty && boletinesRender}
          </div>
          <div className="msgEvents">
             {this.state.isEmpty && emptyState}
          </div>
        </div>
        </div>
        <Footer/>

      </div>
    );
  }
}

export default Boletin;
