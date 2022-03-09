import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { getAllEvents } from "../../store/event";

const EventsBrowser = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.event.list);
  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch]);

  if(!events) return null;

  return (
    <div>
      <h2>Hi from Event Browser</h2>
      {events.map((event) => {
        return (
        <Link to={`/event/${event.id}`} key={event.id}>
          <div className="event-card" >
            <div className="event-img" >
                <img src={`${event.imgUrl}`} style={{width: "200px"}}/>
                  <a href={`/event/${event.id}`}></a>
            <div>{event.title}</div>
              <ul>
                <li>Id: {event.id}</li>
                <li>{event.date}</li>
                <li>{event.startTime} - {event.endTime}</li>
                <li>$ {event.price}</li>
              </ul>
            </div>
          </div>
        </Link>
        )
      })}
    </div>
  )
}

export default EventsBrowser;
