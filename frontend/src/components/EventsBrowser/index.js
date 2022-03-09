import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { getAllEvents } from "../../store/event";

const EventsBrowser = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.event);
  const eventArray = Object.values(events)
  useEffect(() => {
    dispatch(getAllEvents());
    console.log("events", events)
  }, [dispatch]);

  if(!eventArray) return null;

  return (
    <div className="event-card-container">
      <h2>Hi from Event Browser</h2>
      {eventArray.map((event) => {
        return (
          <div className="event-card" key={event?.id} style={{width: "300px"}}>
            <Link to={`/event/${event.id}`} >
                <div className="event-img" >
                    <img src={`${event?.imgUrl}`} style={{width: "200px"}}/>
                <div>{event?.title}</div>
                  <ul>
                    <li>Id: {event?.id}</li>
                    <li>{event?.date}</li>
                    <li>{event?.startTime} - {event?.endTime}</li>
                    <li>$ {event?.price}</li>
                  </ul>
                </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default EventsBrowser;
