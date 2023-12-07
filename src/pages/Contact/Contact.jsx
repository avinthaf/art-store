import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

import './Contact.css';

import Alert from '../../components/Alert/Alert';

const Contact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const [submitted, setSubmitState] = useState(false);

  const form = useRef()

  const validateForm = () => {
    const errors = {}
    if (!firstName.trim()) {
      errors.firstName = 'First name is required'
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required'
    }
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid'
    }
    if (!message.trim()) {
      errors.message = 'Message is required'
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      // Perform your desired action with the form data (e.g., send email, save to database, etc.)
      setSubmitState(true)
      setTimeout(() => {
        setSubmitState(false)
      }, 2000)
      // emailjs.sendForm(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAIL_PUBLIC_KEY)
      // .then((result) => {
      //   console.log(result)
      //   setSubmitState(true)
      //   setTimeout(() => {
      //     setSubmitState(false)
      //   }, 2000)
      // }, (error) => {
      //   console.log(error.text);
      // });
      // Clear the form fields
      setFirstName('')
      setLastName('')
      setEmail('')
      setMessage('')
      setErrors({})
    }
  }

  return (
    <div className="Contact">
      <Alert isOpen={submitted} setSubmitState={setSubmitState}/>
      <h1>Contact</h1>
      <p>Got questions about my art? Fill out the form below and I'll get back to you ASAP.</p>
      <form ref={form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            rows={10}
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button type="submit" className="black">Submit</button>
      </form>
    </div>
  )
}

export default Contact
