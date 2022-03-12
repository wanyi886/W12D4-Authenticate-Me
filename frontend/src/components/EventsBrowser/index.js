import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { getAllEvents } from "../../store/event";
import { getEventCategories } from "../../store/category";
import './EventsBrowser.css'
import splashImg from '../../images/homepage2.jpg'

const EventsBrowser = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.event);
  const eventArray = Object.values(events);

  const sortList = array => {
    return array
      .sort((eventA, eventB) => {
        return eventB.id - eventA.id;
      })
      // .map(event => event.id);
  }

  const sortedArray = sortList(eventArray);

  useEffect(() => {
    dispatch(getEventCategories())
    dispatch(getAllEvents());
  }, [dispatch]);



  if(!eventArray) return null;

  return (
    <div className="homepage-body">
      <div className="splash">
        {/* <img src={splashImg} alt={"splash"}/> */}
      </div>
      <div className="container">
        {/* <h2>Hi from Event Browser</h2> */}
        {sortedArray.map((event) => {
          return (
            <div className="card" key={event?.id} >
              <Link to={`/event/${event.id}/detail`} style={{ textDecoration: 'none' }}>
                  <div className="card-header" >
                      <img src={`${event?.imgUrl}`} />
                  </div>
                  <div className="card-body">
                    {/* <span className="cate tag">{event?.Category?.type}</span> */}
                    {/* <div className="cate category">Category{event.categoryId}</div> */}
                    <h3>{event?.title}</h3>
                    {/* <div>Id: {event?.id}</div> */}
                    <div className="cate date">{new Date(event?.date).toDateString()}</div>
                    <span className="cate time">{event?.startTime}</span>
                    <div className="cate price">$ {event?.price}</div>
                    {/* <div className="cate price">Event Id {event?.id}</div> */}
                  </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EventsBrowser;
