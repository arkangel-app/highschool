import React, { Component } from "react";
import { Form, Input, Icon, Card, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
import postImg from '../images/news/IMG_2656.jpg'

class NewsFeed extends Component {
  render() {
    const { Meta } = Card;
    return (
        <div className="wrapper">

            <Row className="rowPosts" type="flex">
                <Col md={18} xs={24} className="colPostPage">
                    <div className="newBox">
                        <div class="headerNews">
                          <img className="postImg" src={postImg} />
                        </div>
                        <h3 className="newsTitle">Célebrez  la  tour  Eiffel</h3>
                        <div className="newsBody">

                        <p>¡Design thinking y proyecto interdisciplinario! las áreas de Dibujo&nbsp; Técnico – Francés y Computer&nbsp; Science, en equipos formados de distintos paralelos, crearon un monumento utilizando materiales reciclados y empatizando con algo que las identifique, desarrollaron así sentido estético, creatividad y resolvieron problemas.</p>
                            <p><strong>8VO&nbsp; A-B-C</strong><br></br>
                            PRIMER&nbsp; LUGAR<br></br>
                            GRUPO # 4<br></br>
                            Amanda&nbsp; Peet&nbsp; Hanna<br></br>
                            Amelia&nbsp; Ferretti&nbsp; González<br></br>
                            Mia&nbsp; Baquerizo&nbsp; Vidaurreta<br></br>
                            Isabela&nbsp; Miranda&nbsp; Serrano<br></br>
                            Luciana&nbsp; Cucalón&nbsp; Koening<br></br>
                            Layla&nbsp; Lozada&nbsp; Chagerben</p>
                            <p>SEGUNDO&nbsp; LUGAR<br></br>
                            GRUPO # 9<br></br>
                            María&nbsp; Corina&nbsp; Cedeño&nbsp; Orellana<br></br>
                            Valeria&nbsp; Habze&nbsp; Treviño<br></br>
                            Alejandra&nbsp; Maspons&nbsp; Mayer<br></br>
                            Rafaella de&nbsp; Fátima&nbsp; Menéndez&nbsp; Gilbert<br></br>
                            Irina&nbsp; Mora&nbsp; Rodas<br></br>
                            Valeria de&nbsp; los Ángeles&nbsp; Alva&nbsp; Rivera<br></br>
                            Rafaella&nbsp; León&nbsp; Martínez</p>
                            <p>TERCER&nbsp; LUGAR<br></br>
                            GRUPO&nbsp; # 5<br></br>
                            Fabiana&nbsp; Farah&nbsp; Valdez<br></br>
                            Xaviera&nbsp; Estrada&nbsp; Pérez<br></br>
                            María&nbsp; Leonor&nbsp; Cisneros&nbsp; Bejarano<br></br>
                            Brianna&nbsp; Ibáñez&nbsp; Saldarriaga<br></br>
                            Andrea&nbsp; Intriago&nbsp; Casal<br></br>
                            Adriana&nbsp; Noboa&nbsp; Kronfle</p>
                            <p><strong>9NO&nbsp; A – B – C</strong><br></br>
                            PRIMER&nbsp; LUGAR<br></br>
                            Alexia&nbsp; Chinchilla&nbsp; Baquerizo<br></br>
                            Nicole&nbsp; Tutivén&nbsp; Álvarez<br></br>
                            Julianne&nbsp; Wray&nbsp; Ledesma<br></br>
                            Camila&nbsp; Rumbea&nbsp; Morales<br></br>
                            Federica&nbsp; Bucco&nbsp; Sereni</p>
                            <p>SEGUNDO&nbsp; LUGAR<br></br>
                            María&nbsp; José&nbsp; Álvarez&nbsp; Vega<br></br>
                            Emilie&nbsp; Kuffel&nbsp; Vayas<br></br>
                            Sofía&nbsp; Costa&nbsp; Cabezas<br></br>
                            Anabella&nbsp; Mendoza&nbsp; Acosta<br></br>
                            Anarella&nbsp; Furoiani&nbsp; Barzola<br></br>
                            Cristina&nbsp; Khoury&nbsp; Kure</p>
                            <p>TERCER&nbsp; LUGAR<br></br>
                            Adriana&nbsp; Insua&nbsp; Patiño<br></br>
                            Alexia&nbsp; Córdoba&nbsp; De los&nbsp; Santos<br></br>
                            Ilona&nbsp; Dunn Bertha<br></br>
                            Nicole&nbsp; Ortíz&nbsp; Saldarreaga<br></br>
                            Fernanda&nbsp; Joniaux&nbsp; García<br></br>
                            María&nbsp; Helena&nbsp; Salem&nbsp; Hanze</p>
                            <p><strong>10MO&nbsp;A -B -C</strong><br></br>
                            PRIMER&nbsp; LUGAR<br></br>
                            María&nbsp; José&nbsp; González&nbsp; Ruiz<br></br>
                            Charlize Marie&nbsp; Zederbauer Lapentty<br></br>
                            Mia&nbsp; Cartwright&nbsp; Ponce<br></br>
                            Paula&nbsp; Missale&nbsp; Cucalón<br></br>
                            Nicole&nbsp; Díaz&nbsp; Navas<br></br>
                            Ana&nbsp; Victoria&nbsp; Pino&nbsp; Piana</p>
                            <p>SEGUNDO&nbsp; LUGAR<br></br>
                            Almudena&nbsp; Costa&nbsp; Cabezas<br></br>
                            Victoria&nbsp; Patiño&nbsp; Crespo<br></br>
                            Ariadna&nbsp; Brito&nbsp; Troncoso<br></br>
                            Ana&nbsp; Cristina&nbsp; Silva&nbsp; Zavala<br></br>
                            Daniela&nbsp; Alarcón&nbsp; Rendón<br></br>
                            Cristina&nbsp; Coltro&nbsp; Rodríguez</p>
                            <p>TERCER&nbsp; LUGAR<br></br>
                            Isabella&nbsp; Intriago&nbsp; Hidalgo<br></br>
                            Luciana&nbsp; Moncayo&nbsp; Torres<br></br>
                            María&nbsp; Emilia Delfini&nbsp; Mora<br></br>
                            Nicole&nbsp; Miranda Montoya<br></br>
                            Nicole&nbsp; Ganz&nbsp; Vásconez<br></br>
                            María&nbsp; Paula&nbsp; Herrera&nbsp; Trujillo</p>
                            <p>JURADO&nbsp; CALIFICADOR<br></br>
                            Samantha&nbsp; Quintana<br></br>
                            Rosanna&nbsp; Plaza<br></br>
                            Nancy&nbsp; Salazar</p>

                        </div>
                    </div>
                </Col>
                <Col md={6} xs={24} className="colPostAside">
                    <div className="recentPostBox">
                        <h3 className="lastNewsTit">Últimas noticias</h3>
                        <div className="newsList">
                            <Link to="/post-page" className="linkPosts">
                                First Place Poetry Contest
                            </Link>
                            <div className="postDate">
                                Agosto 29 / 2019
                            </div>
                        </div>
                        <div className="newsList">
                            <Link to="/post-page2" className="linkPosts">
                                Célebrez la tour Eiffel
                            </Link>
                            <div className="postDate">
                                Agosto 29 / 2019
                            </div>
                        </div>
                        <div className="newsList">
                            <Link to="/post-page" className="linkPosts">
                                Seleccionada del Guayas
                            </Link>
                            <div className="postDate">
                                Agosto 29 / 2019
                            </div>
                        </div>
                        <div className="newsList">
                            <Link to="/post-page" className="linkPosts">
                                Intercolegial de bandas
                            </Link>
                            <div className="postDate">
                                Agosto 27 / 2019
                            </div>
                        </div>
                        <div className="newsList">
                            <Link to="/post-page" className="linkPosts">
                                Campeonas Beach Volley
                            </Link>
                            <div className="postDate">
                                Agosto 27 / 2019
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer/>
        </div>


    )}
}
export default NewsFeed;
