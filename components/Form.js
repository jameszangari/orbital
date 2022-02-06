import { useState } from "react";
import Button from "./Button";
import params from "../pages/api/params.json";

export default function UserForm({ addContact }) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState({
    title: "",
    type: "",
    core: "",
    position: "",
  });
  const handleChange = (event) => {
    console.log(event.target);
    console.log(event.target.name + " " + event.target.value);
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // addContact(contactInfo);
    // console.log(contactInfo);
    // setContactInfo({ title: "", type: "", core: "" });
    let post = {
      title: contactInfo.title,
      type: contactInfo.type,
      core: contactInfo.core,
      position: contactInfo.position,
      createdAt: new Date().toISOString(),
    };
    // console.log(post);
    // reset error and message
    setError("");
    setMessage("");

    // save the post
    let response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });

    console.log(response);
    // // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      //   setTitle("");
      //   setContent("");
      setContactInfo({ title: "", type: "", core: "", position: "" });
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="w-full">
        {error ? (
          <div className="block w-full my-3 mx-auto">
            <h3 className="text-red-500">{error}</h3>
          </div>
        ) : null}
        {message ? (
          <div className="block w-full my-3 mx-auto">
            <h3 className="text-green-500">{message}</h3>
          </div>
        ) : null}
        <div className="block w-full my-6 mx-auto">
          <label className="block text-xl mb-2">Create Planet Name</label>
          <input
            type="text"
            name="title"
            placeholder="Planet Name"
            value={contactInfo.title}
            onChange={handleChange}
            className="block w-full p-3 text-black"
            // required
          />
        </div>
        <div className="block w-full my-6 mx-auto">
          <label className="block text-xl mb-2">Choose Planet Type</label>
          <div className="flex flex-wrap">
            {params.planetType.map((type, i) => {
              const gasGiant = type === "Gas Giant";
              const neptuneLike = type === "Neptune-like";
              const superEarth = type === "Super-Earth";
              const terrestrial = type === "Terrestrial";
              return (
                <div className="flex gap-1" key={i}>
                  <input
                    key={i}
                    type="checkbox"
                    name="type"
                    value={type}
                    onChange={handleChange}
                    className="block text-black"
                    // required
                  />
                  <label className="mr-1 flex-grow">{type}</label>
                  {gasGiant && (
                    <span className="bg-[#2e2d71] w-5 h-5 mr-6"></span>
                  )}
                  {neptuneLike && (
                    <span className="bg-[#36c69b] w-5 h-5 mr-6"></span>
                  )}
                  {superEarth && (
                    <span className="bg-[#6fb23a] w-5 h-5 mr-6"></span>
                  )}
                  {terrestrial && (
                    <span className="bg-[#bdaa66] w-5 h-5 mr-6"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="block w-full my-6 mx-auto">
          <label className="block  text-xl mb-2">Choose Planet Core</label>
          <div className="flex flex-wrap">
            {params.planetCore.map((core, i) => (
              <div className="flex gap-1" key={i}>
                <input
                  key={i}
                  type="checkbox"
                  name="core"
                  value={core}
                  onChange={handleChange}
                  className="block text-black"
                  // required
                />
                <label className="mr-4">{core}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="block w-full my-6 mx-auto">
          <label className="block text-xl mb-2">Choose Planet Position</label>
          <input
            type="number"
            name="position"
            value={contactInfo.position}
            max="10"
            onChange={handleChange}
            className="block w-full p-3 text-black"
            // required
          />
        </div>
        <div>
          {/* <button type="submit">Submit</button> */}
          <Button label="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
}
