import './AddEventFormPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getEventCategories } from '../../store/event';



const AddEventFormPage = () => {
  const eventCategories = useSelector(state => state.event.categories);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(eventCategories[0]); // Need to check, since it's a dropdown
  const [imgUrl, setImgUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    dispatch(getEventCategories())
  }, [dispatch])

  return (
    <div className='form-container'>
      <h1>Create an Event</h1>
      <form>
      <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
          <label htmlFor='category'>Select a Type for your event</label>
        </div>
          <select
            name="category"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            {eventCategories.map(category =>
              <option key={category.type}>{category.type}</option>
              )}
          </select>


        <div>
          <label htmlFor='imgUrl'>The URL of your Image</label>
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
            value={city}
            onChange={e => setCity(e.target.value)}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}




export default AddEventFormPage;
