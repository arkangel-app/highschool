import React, { Component } from "react";
import moment from "moment";
import {Row, Col, Icon, Spin} from "antd";
import { gapi } from 'gapi-script';
import reloj from '../images/activity-26.png';
import Footer from "../Footer2";
const antIcon = <Icon type="loading" style={{ fontSize: 46, color:'#cb9c2b' }} spin />;

class Calendar extends Component {
    /* global gapi */
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM YYYY, h:mm A"),
      currentMonth: moment(),
      monthCount: 0,
      events: [],
      isBusy: false,
      isEmpty: false,
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.getEvents();

    setInterval(() => {
      this.getEvents();
    }, 60000);

  };

   findNextMonth(){

        let nm = moment(this.state.currentMonth).add(1, 'months');
            this.setState({
               currentMonth:nm,
            }, () => {
               this.getEvents();
            });

   };

   findPrevMonth(){

     let pm = moment(this.state.currentMonth).subtract(1, 'months')
           this.setState({
              currentMonth:pm,
           }, () => {
              this.getEvents();
           });

   }


  getEvents() {
    let that = this;
    let m = this.state.currentMonth;
    console.log(m);
    let lastDayMonth = moment(m).subtract(0, 'months').endOf('month').format('YYYY-MM-DD');
    console.log(lastDayMonth)
    function start() {
      gapi.client
        .init({
          apiKey: 'AIzaSyC4DzrjnROAqsatpih8hqkybcuzHtbUHwo'
        })
        .then(function() {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/calendarpadresdelta@uedelta.k12.ec/events?maxResults=20&timeMin=${m.format("YYYY-MM")}-01T00:00:00-00:00&timeMax=${lastDayMonth}T23:59:59-00`
          });
        })
        .then(
          response => {
            //let events = response.result.items;
            let eventsArr = [];
            let c = 0;
            console.log(response.result.items)
            response.result.items.map((evento) =>{
            if(evento.status=='confirmed'){
                if(evento.start.date!=undefined){
                  evento.fecha = evento.start.date
                }
                  else{
                  evento.fecha = evento.start.dateTime}
                  evento.pos = c;
                  c++;
                  eventsArr.push(evento)
            }
          });

            let sortedEvents = eventsArr.sort(function(a, b) {
              return (
                moment(a.fecha).format("YYYYMMDD") -
                moment(b.fecha).format("YYYYMMDD")
              );
            });
            if (eventsArr.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                  isEmpty: false
                },
                () => {
                  that.setStatus();
                }
              );
          } else {
              that.setState({
               isEmpty: true,
               isLoading: false
            });
          }
            //console.log(sortedEvents)
          },
          function(reason) {
            console.log(reason);
          }
        );
    }

    gapi.load("client", start);
  }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      ) {

        return false;
      } else {
        this.setState({
          isBusy: false
        });
      }
    }
  };

  render() {
    const { time, events, isEmpty, isLoading } = this.state;
    let key = 0
    let eventsList = events.map(function(event) {
    let hasta = ''
    let str = event.recurrence
    let pos = 0
    let sum = 0
    event.key = key;
    key ++;
    /*Comprobando si es un evento de varios días*/
    if (event.recurrence!=null){
        pos = str[0].indexOf("UNTIL");
        sum = 6 + pos
        hasta = str[0].substring(sum);
        hasta = moment(hasta).format("DD")
    }
      return (
        <Row type="flex" className={
                    event.key%2==0 ?
                    "rowCalendar":"rowCalendar color"}>
            <Col md={6} xs={4} className="colCalendar">
                <div className="day">
                        {moment(event.fecha).format("DD")}
                        { pos>0 &&
                        <span> - {hasta}</span>
                        }
                </div>
                <div className="month">
                        {moment(event.fecha).format("MMM")}
                </div>
            </Col>
            <Col md={18} xs={20} className="colDescription">
            <div className="eventDescription">
                { event.start.dateTime!= null &&
                   <span>
                    <Icon type="clock-circle" className="miniClock"/>
                    {moment(event.start.dateTime).format("h:mm a")}
                  </span>
                }
            </div>
            <div className="eventNameBox">
                <a
                      className="eventLink"
                      href={event.htmlLink}
                      target="_blank"
                      key={event.id}
                    >
                      {event.summary}{" "}</a>
            </div>
          </Col>


          </Row>

      );
    });

    let emptyState = (
      <div className="empty">
        <p className="noEvents">
          No hay eventos para este mes.
      </p>
      </div>
    );

    let loadingState = (
      <div className="loading">
          <Spin size="large" indicator={antIcon} spinning={isLoading}>
          </Spin>
      </div>
    );

    return (
    <div className="wrapper">
      <div className="container calendar">

        <div className="calendarHeader">
            CALENDAR
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
          <div className={
                  isEmpty==false ? "eventos":"hiddenEvents"}>
            {this.state.isLoading && loadingState}
            {events.length > 0 && eventsList}
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

export default Calendar;
