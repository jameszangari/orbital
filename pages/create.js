import { useState } from "react";
import params from "./api/params.json";
import Button from "../components/Button";
import Form from "../components/Form";
import Nav from "../components/Nav";

export default function AddPost() {
  // here we create an array state to store the contact form data
  const [contacts, updateContacts] = useState([]);

  const addContact = (contact) => {
    updateContacts([...contacts, contact]);
  };
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [error, setError] = useState("");
  // const [message, setMessage] = useState("");

  // const handlePost = async (e) => {
  //   e.preventDefault();

  //   // reset error and message
  //   setError("");
  //   setMessage("");

  //   // fields check
  //   if (!title || !content) return setError("All fields are required");

  //   // post structure
  //   let post = {
  //     title,
  //     content,
  //     published: false,
  //     createdAt: new Date().toISOString(),
  //   };
  //   // save the post
  //   let response = await fetch("/api/posts", {
  //     method: "POST",
  //     body: JSON.stringify(post),
  //   });

  //   // get the data
  //   let data = await response.json();

  //   if (data.success) {
  //     // reset the fields
  //     setTitle("");
  //     setContent("");
  //     // set the message
  //     return setMessage(data.message);
  //   } else {
  //     // set the error
  //     return setError(data.message);
  //   }
  // };

  return (
    <div>
      <Nav />
      <div className="max-w-3xl my-5 mx-auto p-3">
        <Form addContact={addContact} />
        {/* <form onSubmit={handlePost} className={styles.form} id="form">
          {error ? (
            <div className={styles.formItem}>
              <h3 className={styles.error}>{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div className={styles.formItem}>
              <h3 className={styles.message}>{message}</h3>
            </div>
          ) : null}
          <div className={styles.formItem}>
            <label>Your Planet Name</label>
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Planet name"
              className="text-black"
            />
          </div>
          <div className={styles.formItem}>
            <label>Choose Planet Type</label>
            <div className="flex">
              <select
                name="content"
                form="form"
                className={styles.formSelect}
                // onChange={(e) => setContent(e.target.value)}
              >
                <option
                  value={content.planetType}
                  name="planetType"
                  defaultChecked
                ></option>
                {params.planetType.map((type, i) => (
                  <option key={i} value={content.planetType} name="planetType">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formItem}>
            <label>Choose Planet Core</label>
            <div className="flex">
              <select
                name="content"
                className={styles.formSelect}
                form="form"
                // onChange={(e) => setContent(e.target.value)}
              >
                <option
                  value={content.planetCore}
                  name="planetCore"
                  defaultChecked
                ></option>
                {params.planetCore.map((type, i) => (
                  <option key={i} value={content.planetCore} name="planetCore">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formItem}>
            <Button label="Create your planet!" type="submit" />
          </div>
        </form> */}
      </div>
    </div>
  );
}
