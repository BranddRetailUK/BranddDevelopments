"use client";

import { FormEvent, useState } from "react";
import { HiArrowLongRight, HiOutlineCheckCircle } from "react-icons/hi2";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>Project brief</span>
        {sent ? <HiOutlineCheckCircle aria-hidden="true" /> : null}
      </div>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Service focus
        <select name="focus" defaultValue="Web design and development">
          <option>Web design and development</option>
          <option>Backend services</option>
          <option>Database management</option>
          <option>MVP design and build</option>
          <option>Retail and ecommerce</option>
        </select>
      </label>
      <label>
        What are you building?
        <textarea name="message" rows={5} required />
      </label>
      <button className="button button-light" type="submit">
        Send enquiry <HiArrowLongRight aria-hidden="true" />
      </button>
      {sent ? <p className="form-success">Thanks. The next step is a clear project scope.</p> : null}
    </form>
  );
}
