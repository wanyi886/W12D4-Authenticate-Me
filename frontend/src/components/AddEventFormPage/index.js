import './AddEventFormPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import * as sessionActions from "../../store/session";
import { postEvent, getOneEvent } from '../../store/event';
import { getEventCategories } from '../../store/category';


const AddEventFormPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const eventCategories = useSelector(state => state.category.list);
  const sessionUser = useSelector(state => state.session.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(eventCategories[0]); // Need to check, since it's a dropdown
  const [categoryId, setCategoryId ] = useState(1);
  const [imgUrl, setImgUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    dispatch(getEventCategories())
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
    // if (!price) errors.push("Price cannot be empty.");
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
      hostId: sessionUser.id,
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

    let createdEvent = await dispatch(postEvent(payload));

    if (createdEvent) {
      dispatch(getOneEvent(createdEvent.id))
      console.log("new event id", createdEvent.id)
      history.push(`/event/${createdEvent.id}/detail`)
    }
  }

  return (
    <div className='form-container'>
      <h1>Create an Event</h1>
      <form onSubmit={handleSubmit}>
      <ul>
          {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='form-label'>
          <label htmlFor='title'>Title</label>
        </div>
        <div className='form-input'>
          <input
            className='form-input'
            type="text"
            name="title"
            placeholder="Give a name for the event"
            value={title}
            onChange={e => setTitle(e.target.value)}>
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='description'>Description</label>
        </div>
        <div className='form-input'>
          <textarea
            name="description"
            placeholder='Tell us More about this event...'
            value={description}
            onChange={e => setDescription(e.target.value)}
            >
          </textarea>
        </div>

        <div className='form-label'>
          <label htmlFor='category'>Select a Category</label>
        </div>
          <select
            name="category"
            onChange={e => setCategory(e.target.value)}
            value={category}
            className='form-select'
          >
            {eventCategories.map(category =>
              <option key={category.id}>{category.type}</option>
              )}
          </select>


        <div className='form-label'>
          <label htmlFor='imgUrl'>The image URL of the event</label>
        </div>
        <div>
          <input
            type="text"
            name="imgUrl"
            placeholder='Ex: http://123456'
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            className='form-input'
            >
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='price'>Set the Price of Your Event</label>
        </div>
        <div>
          <input
            className='form-input'
            type="number"
            name="price"
            value={price}
            min={0}
            onChange={e => setPrice(e.target.value)}>

          </input>
        </div>

        <div className='form-label'>
          <label htmlFor="date">Event Date</label>
        </div>
        <div>
          <input
            className='form-input'
            type="date"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            >
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='startTime'>Event Start Time</label>
        </div>
        <div>
          <input
            className='form-input'
            type="time"
            name="startTime"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            >
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='endTime'>Event End Time</label>
        </div>
        <div>
          <input
            className='form-input'
            type="time"
            name="endTime"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            >
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='address'>Address</label>
        </div>
        <div>
          <input
            className='form-input'
            type="text"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            >
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='city'>City</label>
        </div>
        <div>
          <input
            className='form-input'
            type="text"
            name="city"
            placeholder='Ex. San Francisco'
            value={city}
            onChange={e => setCity(e.target.value)}
            >
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='state'>State</label>
        </div>
        <div>
          <input
            className='form-input'
            type="text"
            name="city"
            placeholder='Ex: CA'
            value={state}
            onChange={e => setState(e.target.value)}
            >
          </input>
        </div>

        <div className='form-label'>
          <label htmlFor='zipCode'>Zipcode</label>
        </div>
        <div>
          <input
            className='form-input'
            type="text"
            name="zipCode"
            placeholder='Ex: 91230'
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            >
          </input>
        </div>
        <button
          className='btn submit'
          type="submit"
          // disabled={errors? true : false}
          >Submit</button>
      </form>
    </div>
  )
}




export default AddEventFormPage;
