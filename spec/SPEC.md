## Technical requirements given to the developers for this project

* The page needs to render server side using Node.js Express with the HTML markup containg the initial state of the chat ([data.json](../server/data/data.json)) 
* User interface needs to support adding new chat messages
* Provide a server side endpoint that on GET returns the data.json and on POST accepts a single new post (no need to persist the post, enough to just acknowledge receipt of it)
* When adding a new message, the new message needs to be displayed on the screen and also sent to the server's API endpoint described in previous step
* There is no need for persistence (database or otherwise)
* Supported browsers: Chrome 65 or later

## Spec

Here is a rough list of features in decreasing order of how important we think they are:

## Critical features

* Create a single-user timeline of posts that conforms to the design spec ([Design](Design-Spec-Main.png))
* The timeline must support new posts by the current user.
* Mouseover (tap on mobile) on a post should transition the post into the alternative view ([Backside](Design-Spec-Click.png)) - use 3D transition
* The interface should be responsive; it should scale with the viewport size.
* Every post needs to have date and time as well as user's avatar