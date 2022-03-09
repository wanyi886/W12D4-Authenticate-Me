import './EditEventFormPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getEventCategories, editEvent, getOneEvent } from '../../store/event';



const EditEventFormPage = ({event}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const eventCategories = useSelector(state => state.event.categories);
  const sessionUser = useSelector(state => state.session.user);

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [categoryId, setCategoryId ] = useState(event.ategoryId);
  const [category, setCategory] = useState(event.category); // Need to check, since it's a dropdown
  const [imgUrl, setImgUrl] = useState(event.imgUrl);
  const [price, setPrice] = useState(event.price);
  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [address, setAddress] = useState(event.address);
  const [city, setCity] = useState(event.city);
  const [state, setState] = useState(event.state)
  const [zipCode, setZipCode] = useState(event.zipCode);
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    dispatch(getEventCategories());
  }, [dispatch])

  useEffect(() => {
    const cate = eventCategories.find(element => element.type === category);
    if (cate) setCategoryId(cate.id);
  }, [category])

  useEffect(() => {
    const errors = [];
    if (!title) errors.push("Title cannot be empty.");
    if (!description) errors.push("Description cannot be empty.");
    if (!category) errors.push("Please select a category.");
    if (!imgUrl) errors.push("Image URl cannot be empty.");
    if (!price) errors.push("Price cannot be empty.");
    if (price < 0) errors.push("Price cannot be less than 0.");
    if (!date) errors.push("Date cannot be empty.");
    if (!startTime) errors.push("Start Time cannot be empty.");
    if (!endTime) errors.push("End Time cannot be empty.");
    if (!address) errors.push("Address cannot be empty.");
    if (!city) errors.push("City cannot be empty.");
    if (!state) errors.push("State cannot be empty.");
    if (!zipCode) errors.push("Zipcode cannot be empty.");
    if (zipCode.length !== 5) errors.push("Zipcode should be 5 digits.");

    setErrors(errors);

  }, [title, description, category, imgUrl, price, date, startTime, endTime, address, city, state, zipCode])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...event,
      // hostId,
      title,
      description,
      categoryId,
      imgUrl,
      price,
      date,
      startTime,
      endTime,
      address,
      city,
      state,
      zipCode
    }

    console.log("event in edit form", event)

    let updatedEvent = await dispatch(editEvent(payload));

    if (updatedEvent) {
      history.push(`/event/${updatedEvent.id}`)
    }
  }

  return (
    <div className='form-container'>
      <h1>Edit this Event</h1>
      <form onSubmit={handleSubmit}>
      <ul>
          {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
          <label htmlFor='title'>Title</label>
        </div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Give a name for the event"
            value={title}
            onChange={e => setTitle(e.target.value)}>
          </input>
        </div>

        <div>
          <label htmlFor='description'>Description</label>
        </div>
        <div>
          <textarea
            name="description"
            placeholder='Tell us More about this event...'
            value={description}
            onChange={e => setDescription(e.target.value)}
            >
          </textarea>
        </div>

        <div>
          <label htmlFor='category'>Select a Category</label>
        </div>
          <select
            name="category"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            {eventCategories.map(category =>
              <option key={category.id}>{category.type}</option>
              )}
          </select>


        <div>
          <label htmlFor='imgUrl'>The image URL of the event</label>
        </div>
        <div>
          <input
            type="text"
            name="imgUrl"
            placeholder='Ex: http://123456'
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            >
          </input>
        </div>

        <div>
          <label htmlFor='price'>Set the Price of Your Event</label>
        </div>
        <div>
          <input
            type="number"
            name="price"
            value={price}
            min={0}
            onChange={e => setPrice(e.target.value)}>
          </input>
        </div>

        <div>
          <label htmlFor="date">Event Date</label>
        </div>
        <div>
          <input
            type="date"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            >
          </input>
        </div>

        <div>
          <label htmlFor='startTime'>Event Start Time</label>
        </div>
        <div>
          <input
            type="time"
            name="startTime"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            >
          </input>
        </div>

        <div>
        <label htmlFor='endTime'>Event End Time</label>
        </div>
        <div>
          <input
            type="time"
            name="endTime"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            >
          </input>
        </div>

        <div>
        <label htmlFor='address'>Address</label>
        </div>
        <div>
          <input
            type="text"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            >
          </input>
        </div>

        <div>
        <label htmlFor='city'>City</label>
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder='Ex. San Francisco'
            value={city}
            onChange={e => setCity(e.target.value)}
            >
          </input>
        </div>

        <div>
        <label htmlFor='state'>State</label>
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder='Ex: CA'
            value={state}
            onChange={e => setState(e.target.value)}
            >
          </input>
        </div>

        <div>
        <label htmlFor='zipCode'>Zipcode</label>
        </div>
        <div>
          <input
            type="text"
            name="zipCode"
            placeholder='Ex: 91230'
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            >
          </input>
        </div>
        <button
          type="submit"
          disabled={errors? true : false}
          >Submit</button>
      </form>
    </div>
  )
}




export default EditEventFormPage;
