STEAM (CS GO) NAME GENERATOR
============================

markov chain thing, fed with other peoples steam names.
it's a loopback backend with react frontend (i was curious about these).
after the fact i can say i dont vibe with LB so much but react is p. neat maybe.



HOW 2 GET IT RUNNING
====================

you need these environment variables to be defined:
	- CSGO_DATABASE_HOST		url to database
	- CSGO_DATABASE_USER		user to login to database
	- CSGO_DATABASE_PASSWORD	password for database
	- CSGO_DATABASE 			name of database in database (u know what i mean)
	- CSGO_POST_PASSWORD 		password for accepting new names
	- CSGO_HOST 				host to run server on (not sure this is needed?)
	- CSGO_PORT 				port to run server on

then in both client and server directories: '$ npm i' (this builds the shit)
then in root directory: '$ ./buld.sh' (this builds prod version of frontend and copies it into server public/ folder)
then in server directory: '$ npm start' (runs it)

i dont know if youre supposed to build loopback for prod as well?

tip: i just put a systemd service with the npm start command to keep it running and it hasn't fucked me up yet!



LOOPBACK MODELS
===============

the monster needs feeding to grow into the great thing i see before me. however it has a quirk - letting it ingest the same food twice will lead to disaster. something about becoming what you eat.

#-------------------------#
| model "Source"          |
|    - text : string (id) |
#-------------------------#

we will store a record of each little bite of source material to avoid duplicates. maybe there is some other purpose as well. it just feels like the right thing to do right now. (perhaps we can tell those who recieve a generated name if their generated name is canon?)

the monster intersects with our world as a pattern description, a set of rules.

#-------------------------------------#
| model "Rule"                        |
|     - input : string (id)           |
|     - output : string (single char) |
|     - strength : int                |
#-------------------------------------#

i can explain a bit more what this is. it's a view of the source material. very simple - in the whole everything the monster has ever been fed, given {input}, the next character is {output} in {strength} number of cases.

ultimately, i keep the monster to supply me and my friends with fresh names. we would probably want to accept them in some kind of receptacle.

#-----------------------#
| model "Name"          |
|     - name : string   |
|     - canon : boolean |
#-----------------------#

no id for the receptacle since it shouldn't be persisted (i will use it for nefarious purposes, and then burn it.)



TODO
====

 - on frontend:
 	 - show too long names with an icon, perhaps too short as well (like 3 chars?)
 	 - some input validation (name length, quality level)
 - on server:
     - accept longer names
     - maybe keep start and end markers forever
     - get it to accept empty strings on models so we can throw away the \x01 fucko
     - get it to match exact on database searches witout included "un-trimmed" responses also
         - basically i search for "fatality" and it gives me also "fatality "
     - whats going on with ping controller. how do i get rid of it
     - find a better way of password protecting
     - perhaps store all generated names, for canon checking on steroids
     