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
  const eventArray = Object.values(events)
  useEffect(() => {
    dispatch(getEventCategories())
    dispatch(getAllEvents());
  }, [dispatch]);

  if(!eventArray) return null;

  return (
    <>

    <div className="splash">
      {/* <img src={splashImg} alt={"splash"}/> */}
    </div>
    <div className="container">
      {/* <h2>Hi from Event Browser</h2> */}
      {eventArray.map((event) => {
        return (
          <div className="card" key={event?.id} >
            <Link to={`/event/${event.id}`} >
                <div className="card-header" >
                    <img src={`${event?.imgUrl}`} />
                </div>
                <div className="card-body">
                  <span className="cate tag-teal">Category</span>
                  <h3>{event?.title}</h3>
                  <div>Id: {event?.id}</div>
                  <div>Category: {event?.categoryId}</div>
                  <div>{event?.date}</div>
                  <div>{event?.startTime} - {event?.endTime}</div>
                  <div>$ {event?.price}</div>
                </div>
            </Link>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default EventsBrowser;
