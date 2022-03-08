import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllEvents, getOneEvent } from "../../store/event";

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log("eventID", id);
  // const event = eventList.find(event => event.id === Number(id));

  const event = useSelector(state => state.event[id])

  console.log("event", event);

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [dispatch])

  return (
    <div>
      <h1>{event.title}</h1>
      <button type="submit">Register</button>
      <ul>
        <li>{event.title}</li>
      </ul>
    </div>
  )
}

export default EventDetail;
