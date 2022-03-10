import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTickets } from '../../store/ticket'

const MyTickets = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  // console.log("sessionUser.id", sessionUser.id)

  useEffect(() => {
    dispatch(getTickets(sessionUser.id))
  }, [dispatch]);

  let content;



  return (
    <>
      <h1>My Tickets</h1>

    </>
  )
}

export default MyTickets;
