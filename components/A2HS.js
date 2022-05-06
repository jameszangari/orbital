// import { useEffect } from "react";

// let deferredPrompt;
// export default function A2HS() {
//   useEffect(() => {
//     // add to homescreen
//     window.addEventListener("beforeinstallprompt", (e) => {
//       // Prevent Chrome 67 and earlier from automatically showing the prompt
//       e.preventDefault();
//       // Stash the event so it can be triggered later.
//       deferredPrompt = e;
//     });

//     function isDeferredNotNull() {
//       return deferredPrompt != null;
//     }

//     function presentAddToHome() {
//       if (deferredPrompt != null) {
//         // Update UI to notify the user they can add to home screen
//         // Show the prompt
//         deferredPrompt.prompt();
//         // Wait for the user to respond to the prompt
//         deferredPrompt.userChoice.then((choiceResult) => {
//           if (choiceResult.outcome === "accepted") {
//             console.log("User accepted the A2HS prompt");
//           } else {
//             console.log("User dismissed the A2HS prompt");
//           }
//           deferredPrompt = null;
//         });
//       } else {
//         console.log("deferredPrompt is null");
//         return null;
//       }
//     }
//   });
// }

import React, { useState, useEffect } from "react";

export default function A2HSProvider({ children, ...props }) {
  const [showA2HS, setShowA2HS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState();

  // Future use maybe
  /* const isAppInstalled = async () => {
    const relatedApps = await navigator.getInstalledRelatedApps()
    console.log(relatedApps)
    relatedApps.forEach((app) => {
      console.log(app.id, app.platform, app.url)
    })
  } */

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Save the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setShowA2HS(true);
    });
  }, []);

  const handleClick = () => {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        setShowA2HS(false);
      }
    });
  };

  const handleClose = () => {
    setShowA2HS(false);
  };

  return (
    <div>
      {/* <A2HSButton
      {...props}
      handleClick={handleClick}
      handleClose={handleClose}
    /> */}
      <button
        className="absolute z-50 bg-blue-bg p-2 m-2"
        onClick={handleClick}
      >
        Test
      </button>
      {children}
    </div>
  );
}
