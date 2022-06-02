import Head from "next/head";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Image from "../components/Image";
import Logo from "../components/Logo";
import { motion } from "framer-motion";

export default function CaseStudy() {
  return (
    <>
      <Head>
        <title>Case Study</title>
      </Head>
      <div className="max-w-6xl mx-auto my-12 leading-6 px-6">
        <Logo className={"mb-16"} />
        <h1 className="mt-8 mb-4 text-3xl font-secondary text-oPinkLight uppercase">
          The Project Overview
        </h1>
        <div>
          <p className="mb-4">
            <em>
              {`
            Orbital, a covid-safe interactive art installation allowing for the
            collaboration of visitors to manipulate and create a one-of-a-kind
            galaxy in real time.
              `}
            </em>
          </p>
          <p>
            {`
          Our vision for the Drexel Westphal 2021-22 senior project is to create
          a covid-safe interactive art installation allowing for the
          collaboration of visitors to manipulate and create a one-of-a-kind
          experience in real time. Over a timeline of 9 months our team ideated,
          designed, tested, developed, and deployed a galaxy themed interactive
          art installation for visitors from all over Drexel to take part in.
            `}
          </p>
        </div>
        <h1 className="mt-8 mb-4 text-3xl font-secondary text-oPinkLight uppercase">
          The Team Members
        </h1>
        <p>Charles Wolloch: Project Manager, UX/UI</p>
        <p>Melissa Gabriele: UX/UI, Dev</p>
        <p>Reid Dumont: UX/UI, Project Manager</p>
        <p>James Zangari: Dev, UX/UI</p>
        <h1 className="mt-8 mb-4 text-3xl font-secondary text-oPinkLight uppercase">
          The Project Summary
        </h1>
        <p>
          {`
        Our main goal is to design and develop an interface for visitors to make
        their own custom planet and add it to our galaxy that is being projected
        in real time, while also creating interactions that excite, intrigue,
        and are memorable. Our minimal viable product will consist of the planet
        customizer application, the galaxy canvas for the planets to be added
        to, and a statistics dashboard that will show off fun metrics collected
        from the event, live.
      `}
        </p>
        <p>
          {`
        Although we present ourselves with this galaxy theme today, we weren't
        always centered around this concept of building a galaxy together from
        scratch. We always knew we wanted to enable visitors to collaborate to
        create a piece of art together through their individual efforts but our
        original intent was to allow for anything to be displayed.
      `}
        </p>
        <p>
          {`
        Our original plans were for visitors to have a free range of drawing
        tools and visuals so they can create their own individual art piece
        which, upon saving, would be collaged with the rest of the submitted
        works. Over time this would create a giant collage of the work of
        everyone who took part and ideally would appear as a magnificent mural
        representing all of the collaboration that occurred.
          `}
        </p>
        <p>
          {`
        After receiving feedback that our original idea was too broad, we
        quickly pivoted into the galaxy creation theme. It offered a unique
        niche for us to explore and an experience to build while also working
        off of the themes we initially wanted to capture.
          `}
        </p>
        <h1 className="mt-8 mb-4 text-3xl font-secondary text-oPinkLight uppercase">
          The Challenge
        </h1>
        <p>
          {`
        The basis for our project is centered around us solving this challenge
        statement:
          `}
        </p>
        <ul>
          <li>
            {`
          How can we create an interactive art experience that excites, engages,
          and is memorable for our users?
            `}
          </li>
        </ul>
        <p>
          {`
        To solve this challenge we took our 9 month timeline and split it into 3
        phases:
          `}
        </p>
        <ul>
          <li>{`Research, Design & Development, and Execution.`}</li>
        </ul>
        <p>
          {`
        Each phase lasted 3 months (a single term's length) and our project
        ended with the senior showcase presentation.
          `}
        </p>
        <h1 className="mt-8 mb-4 text-3xl font-secondary text-oPinkLight uppercase">
          The Solution
        </h1>
        <h2 className="mt-8 mb-4 text-2xl font-secondary text-blue-accent uppercase">
          Research
        </h2>
        <p>
          {`In order for us to succeed we started by spending 1 term researching and
        ideating. We conducted interviews, user workshops, met with industry
        professionals, and conducted other user research methodologies to gain
        insight into what makes engaging, memorable, and fun interactive art.`}
        </p>
        <div className="py-8">
          <Image
            src="/case-study/image6.png"
            layout="responsive"
            width={1999}
            height={1123}
            alt="Supporting Images"
            className="max-w-3xl"
          />
        </div>
        <p>
          {`It was also at this time that we identified our target audience as being
        the Drexel student population, since we were limited due to covid
        restrictions. We then created a user persona representing our target
        audience.`}
        </p>
        <div className="py-8">
          <Image
            src="/case-study/image1.jpg"
            layout="responsive"
            width={1584}
            height={1080}
            alt="Supporting Images"
            className="max-w-3xl"
          />
        </div>
        <p>
          {`After identifying our target audience, we began forming our User
        experience, interface, and interaction designs. We tested our prototypes
        with real users based on our target audience and used those insights to
        refine our approach and ideas.`}
        </p>
        <div className="py-8">
          <Image
            src="/case-study/image3.png"
            layout="responsive"
            width={1999}
            height={667}
            alt="Supporting Images"
            className="max-w-3xl"
          />
        </div>
        <h2 className="mt-8 mb-4 text-2xl font-secondary text-blue-accent uppercase">
          Design
        </h2>
        <p>
          {`Once we had chosen the solar system concept, it was time to begin
        focusing on the planet creation design. We knew we wanted users to
        create unique planets which would be added to our collaborative solar
        system. Our first round of design allowed users to select one of NASA's
        4 planet types and customize size, surface, orbiting elements, etc.`}
        </p>
        <iframe
          className="my-16 w-full h-full max-w-3xl mx-auto aspect-video"
          src="https://drive.google.com/file/d/1p6iF-w_Z2YWXa4f-iEFFyPBvD-xw_RDj/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <p>
          {`Feedback obtained from users showed us that they did not notice the
        bottom scroll menu or enjoy using it. We explained too much with text
        and not enough with visuals. The feedback from this round of user
        testing helped influence a completely new design for the flow that users
        understood and enjoyed using more.`}
        </p>
        <p>
          {`We also focused on branding, creating a logo, name, and graphics, and
        selecting colors that fit with the sci-fi/space atmosphere we wanted at
        the event.`}
        </p>
        <div className="py-8">
          <Image
            src="/case-study/image7.png"
            layout="responsive"
            width={987}
            height={1109}
            alt="Supporting Images"
            className="max-w-3xl"
          />
        </div>
        <p>
          {`This new design was much less text heavy, showing rather than
        explaining. We had a lot of facts in the app which were removed in this
        round of edits. We decided to place the facts on the walls in our
        installation so visitors could learn about the planets they were
        creating. The new design uses tabs to guide the user through the flow
        and includes the planet type selection as one of the tabs so users can
        easily edit their planet type if desired. As the user makes choices, the
        tabs show each selected option and they will see their planet update
        with those choices.`}
        </p>
        <iframe
          className="my-16 w-full h-full max-w-3xl mx-auto aspect-video"
          src="https://drive.google.com/file/d/11YFZY7XC228hoCF8ELGVrveNOBFoM83e/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <p>
          {`The final update focused on smaller changes now that we had a finalized
        format that users understood and enjoyed. Confusion from users about
        color choice correlation led us to incorporate it into the atmosphere
        and core tabs instead of having its own tab. The main focus of this UI
        update was to create a UI style that fit with the planet building
        experience and the ambience we were trying to create at our event.`}
        </p>
        <iframe
          className="my-16 w-full h-full max-w-3xl mx-auto aspect-video"
          src="https://drive.google.com/file/d/1bXQVuQttvMXbe76tRLHzzoozJuf76E_Z/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <p>
          {`The final product was a streamlined process that took around a minute to
        complete with enough variability that each visitor could create a unique
        planet. Our goal was to create a process that was quick and easy for
        everyone to use and understand.`}
        </p>
        <iframe
          className="my-16 w-full h-full max-w-3xl mx-auto aspect-video"
          src="https://drive.google.com/file/d/1F_kSAqo9FqgPKsDdp6SG4On8wQw2eD1I/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <h2 className="mt-8 mb-4 text-2xl font-secondary text-blue-accent uppercase">
          Development
        </h2>
        <p>
          {`The Orbital web app is built with Next.js, a React framework, and uses
        an additional set of packages to help improve and enhance the user
        experience. The core technology behind this application is
        react-three-fiber (R3F), a React renderer for three.js (3D javascript
        library). Using R3F combined with lamina, a layer based shader material,
        allows for multiple images and colors to be combined and layered onto a
        3d object, which in our case was a sphere representing a planet. The
        planet creation flow uses key features of React such as the "useState"
        hook, which allows the user's selection to be stored as a variable. When
        the user submits their planet to our solar system, these variables are
        then passed to the database as a JSON object where the data can then be
        manipulated for each unique planet that is created. We were able to
        achieve real-time updates for our web app on exhibit day using SWR, a
        React Hooks library for data fetching. This allowed us to set a refresh
        interval on the pages where the web app would refresh every 60
        milliseconds checking for updates in our database. Additionally,
        Tailwind was added to reduce the amount of CSS files included in our
        application.`}
        </p>
        <p>
          {`The essentials: planet creation flow, solar system, and mission control,
        were finalized early enough where we had some resources to devote to
        other interactions. This led us to incorporate the joystick station. We
        used the Logitech Extreme 3D Pro Joystick and connected it to our planet
        database to cycle through the planets.`}
        </p>
        <p>
          {`We did this by using JavaScript to connect to the USB port to detect
        inputs. This input was then split so we could read a roll to the left or
        right. A roll left would pull the previous array entry, and a roll right
        would pull the next entry.`}
        </p>
        <iframe
          className="my-16 w-full h-full max-w-3xl mx-auto aspect-video"
          src="https://drive.google.com/file/d/1qbmrZdAaWfNGTyDX_huzPvT1DyL18Cyx/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <h2 className="mt-8 mb-4 text-2xl font-secondary text-blue-accent uppercase">
          Execution
        </h2>
        <p>
          {`The event was held in the Westphal lobby of Drexel. We created a floor
        plan that optimized the darkness of our given space while allowing
        visitors to progress safely through the installation. The large mission
        control screen, shown on Westphal's big multi-screen display, grabbed
        the attention of visitors as they walked through the front door.
        Visitors then could approach our information table that displayed facts
        about each planet type along with a scale model of the planets presented
        with stickers and treats. QR codes and informational flyers about each
        interaction and the exhibit were placed around the entire room. The
        large screens each displayed a different rear projected view of the
        solar system. This was done so visitors could get as close to the
        screens as they wanted without obstructing the view. We placed QR codes
        to create planets, more facts about the planet types, and information
        about the exhibit for visitors to read as they progressed through on the
        walls surrounding our exhibit. The joystick station, where visitors
        enjoyed scrolling through the database of planets, sat between the
        screens and the information table. This set-up was something we
        researched by referencing our space and other installations. We tested
        our equipment in multiple sessions, and updated our planned setup based
        on research and application throughout the final term.`}
        </p>
        <div className="py-8">
          <Image
            src="/case-study/image2.png"
            layout="responsive"
            width={1990}
            height={1019}
            alt="Supporting Images"
            className="max-w-3xl"
          />
          <Image
            src="/case-study/image5.png"
            layout="responsive"
            width={1999}
            height={1791}
            alt="Supporting Images"
            className="max-w-3xl"
          />
          <Image
            src="/case-study/image4.png"
            layout="responsive"
            width={1999}
            height={1599}
            alt="Supporting Images"
            className="max-w-3xl"
          />
        </div>
        <h1 className="mt-8 mb-4 text-3xl font-secondary text-oPinkLight uppercase">
          The Results
        </h1>
        <h2 className="mt-8 mb-4 text-2xl font-secondary text-blue-accent uppercase">
          Final UI demo
        </h2>
        <iframe
          className="my-16 w-full h-full max-w-3xl mx-auto aspect-video"
          src="https://drive.google.com/file/d/1F_kSAqo9FqgPKsDdp6SG4On8wQw2eD1I/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <h2 className="mt-8 mb-4 text-2xl font-secondary text-blue-accent uppercase">
          Promotional video highlighting our event
        </h2>
        <iframe
          className="my-16 w-full h-full max-w-3xl mx-auto aspect-video"
          width="1250"
          height="703"
          src="https://www.youtube.com/embed/JaKvuOuIV5A"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
  encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <h1 className="mt-8 mb-4 text-3xl font-secondary text-oPinkLight uppercase">
          The Conclusion
        </h1>
        <p>
          {`Our goal was to create an interactive art exhibit that excites,
        intrigues, and is memorable while also offering a covid safe experience
        for our visitors.`}
        </p>
        <p>
          {`We know we succeeded when we saw high user interest and engagement
        within our exhibit. Additionally, we saw our backend database filled
        with all of the data provided from users coming in and making their own
        custom planet. This serves as a great metric for us because we saw a
        significant amount of user input into our database.`}
        </p>
        <p>
          {`Our main goal was to create a collaborative piece that allowed each
        person to contribute something unique as an expression of themselves.
        Based on the unique planets that populate our database, and the diverse
        solar system it creates, it is clear that this was successful.`}
        </p>
      </div>
    </>
  );
}
