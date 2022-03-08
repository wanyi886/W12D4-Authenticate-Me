import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { NavLink, Route, useParams } from 'react-router-dom';
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
          <div className="event-card" key={event.id}>
              <i src={`${event.imgUrl}`} />
            <ul>
              <li>{event.imgUrl}</li>
              <li>{event.title}</li>
              <li>{event.date}</li>
              <li>{event.startTime} to {event.endTime}</li>
              <li>{event.price} USD</li>
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default EventsBrowser;
