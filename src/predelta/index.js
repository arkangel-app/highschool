import React, { Component } from "react";
import './style.css';
import { trackWindowScroll } from "react-lazy-load-image-component";
// import { Form, Input, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';

// import Footer from '../Footer2'
// import restClient from '../network/restClient';

class Predelta extends Component {

    constructor(props) {
    super(props);
    this.state = {
        loading:false,
        linkPrescolarStyle:undefined,
        linksColegiosStyle1:undefined,
        linksColegiosStyle2:undefined,
        searchBox:undefined,
        miniTit:undefined,
        burger:undefined,
        bars:undefined,
    }

  }

    componentDidMount(){
        
        // console.log(document.getElementsByClassName('linkPreescolar')[0]);

        this.setState({
            linkPrescolarStyle: document.getElementsByClassName('linkPreescolar')[0].style,
            linksColegiosStyle1: document.getElementsByClassName('linksColegios')[0].style,
            linksColegiosStyle2: document.getElementsByClassName('linksColegios')[1].style,
            // test: document.getElementsByClassName('linksColegios')[1].style.getPropertyValue('top'),
            // test1: document.getElementsByClassName('linksColegios')[1].style.cssText,
            // searchBox: document.getElementsByClassName('searchBox')[0].style.display,
            miniTit: document.getElementsByClassName('miniTit')[0].style,
            burger: document.getElementsByClassName('bm-burger-button')[0].style,
            // bars:document.getElementsByClassName('bm-burger-bars')[0].style.color
        },()=>{
            // console.log(this.state.test);
            // console.log(this.state.test1);
            document.getElementsByClassName('linkPreescolar')[0].style.display = 'none';
            document.getElementsByClassName('linksColegios')[0].style.display = 'none';
            document.getElementsByClassName('linksColegios')[1].style.display = 'none';
            document.getElementsByClassName('searchBox')[0].style.display = 'none';
            document.getElementsByClassName('miniTit')[0].style.display = 'none';
            document.getElementsByClassName('bm-burger-button')[0].style.display = 'none';
            
    
            // document.getElementsByClassName('miniTit')[0].style.top = '70px';
            // document.getElementsByClassName('miniTit')[0].style.left = '236px';
            // document.getElementsByClassName('miniTit')[0].style.color = 'white';

            // document.getElementsByClassName('bm-burger-button')[0].style.left = '250px';
            // document.getElementsByClassName('bm-burger-button')[0].style.color = 'white';
            // document.getElementsByClassName('bm-burger-button')[0].style.top = '34px';

            
            // let elementos = document.getElementsByClassName('bm-burger-bars');
            // console.log(elementos);
            // for (let index = 0; index < elementos.length; index++) {
            //     const element = elementos[index];
            //     element.style.background = 'white';
                
            // }
        });  
       
    }
    componentWillUnmount(){
        document.getElementsByClassName('linkPreescolar')[0].style = this.state.linkPrescolarStyle;
        document.getElementsByClassName('linksColegios')[0].style = this.state.linksColegiosStyle1;
        document.getElementsByClassName('linksColegios')[1].style = this.state.linksColegiosStyle2;
        document.getElementsByClassName('searchBox')[0].style = this.state.searchBox;
        document.getElementsByClassName('bm-burger-button')[0].style = this.state.burger;
        document.getElementsByClassName('miniTit')[0].style = this.state.miniTit;
        

        // document.getElementsByClassName('miniTit')[0].style.top = this.state.miniTit.top;
        // document.getElementsByClassName('miniTit')[0].style.left = this.state.miniTit.left;
        // document.getElementsByClassName('miniTit')[0].style.color = this.state.miniTit.color;

        // document.getElementsByClassName('bm-burger-button')[0].style.left = this.state.miniTit.left;
        // document.getElementsByClassName('bm-burger-button')[0].style.color = this.state.miniTit.color;
        // document.getElementsByClassName('bm-burger-button')[0].style.top = this.state.miniTit.top;


        // let elementos = document.getElementsByClassName('bm-burger-bars');
        //     for (let index = 0; index < elementos.length; index++) {
        //         const element = elementos[index];
        //         element.style.background = this.state.bars;
                
        //     }

    }

    scrollToMyRef = () => {

        window.scrollTo({
            top:160,
            // behavior: "smooth" // optional
        });
    };

   

    render() {
    return (
        <div className="wrapper" style={{marginTop:'-160px'}}>
            <iframe className="iframePredelta" src="http://predelta.edu.ec"></iframe>

        </div>
    )}
}

export default Predelta;
