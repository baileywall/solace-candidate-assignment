# Improvements I would make with more time

## Frontend
* My pagination component isn't resilient to more than probably 10ish pages; I would want to add some logic where if there are more than a certain number of pages I don't show the middle pagination numbers and instead have an ellipsis to hide numbers in the middle / that aren't relevant. I also would add the search term + page number to the URL so the user can use the back button (and because I like it when i can navigate websites that way).
* I've used tailwind in the past and have felt a little unsure whether it's preferable to copy and paste classNames or create components when styles are used over and over. I would want to look at the way this is done in the existing codebase because I'm not sure that I'm happy with it but I'm not sure what better options are.
* I'm not sure the best way to define the types for expected request data either, I just created a types file, but I would want to see if Next.js has any recommended best practices for how to do that.

## Backend
* I've noticed that after a number of hot reloads, the Next server stops serving requests because it can't connect to the database anymore. This indicates to me that the database connection isn't being closed once a query is made, which could lead to bigger issues in production, and at the very least is a bad developer experience. I would definitely look into this.
* Like I mentioned in my initial PR, I would want to look into the changes I made to the tsconfig file and the return type of the db index file.
* I would want to revisit the SQL search implementation; it's been a while since I've done a text search in SQL (and have never really used a jsonb type) so I would want to make sure I'm doing it in the most efficient way possible. It also seems like people are more likely to search on some fields than others (maybe city and specialty?) so I would want to look into adding indices on those fields.
* I don't think my server is very resilient to bad requests; if someone passed in a non-number as a limit I think the request would error out. Ideally I would have some validation on the arguments that come in.