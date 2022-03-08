import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const EventDetail = () => {
  const eventId = useParams();
  const eventList = useSelector(state => state.event.list); // This is an empty array. Need to do the store??
  const event = eventList.find(event => event.id === Number(eventId));
  console.log("eventList!!!!!!", eventList)
  return (
    <div>
      <h2>Event Detail Page</h2>
      <ul>
        <li>{event.title}</li>
      </ul>
    </div>
  )
}

export default EventDetail;
