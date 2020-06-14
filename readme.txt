STEAM (CS GO) NAME GENERATOR
============================

markov chain thing, fed with other peoples steam names.

if this goes as planned, it's gonna be a loopback backend with react frontend (i'm curious about these).



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

 - create a frontend
 - on server:
     - get it to accept empty strings on models so we can throw away the \x01 fucko
     - get it to match exact on database searches witout included "un-trimmed" responses also
         - basically i search for "fatality" and it gives me also "fatality "
     - whats going on with ping controller. how do i get rid of it
     - find a better way of password protecting
     