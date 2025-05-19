# INST377-Final-Project

<h3>Title</h3>
AniList Recommender </br>
<h3>Description</h3>
A program for recommending anime to AniList users and comparing AniList user lists to other user's lists based off their individual statuses. </br>
<h3>Target browsers</h3>
  PC </br>

<h1>Developer Manual</h1>
<h3>How to Install</h3>
Clone this GitHub repository and open with an IDE (e.g. Visual Studio Code).
- <b>Dependencies</b>:
<h3>How to Run Application on a Server</h3>

<h3>Tests</h3>

<h3>API Information</h3>
The API being used is https://graphql.anilist.co using this documentation https://docs.anilist.co/
API method used is POST to send the query and variables to the AniList API. This is to get information from the API using the specific query and variables sent.

<h3>Bugs</h3>
When on Vercel , the main page load properly, but if you went to other page on come back, this message display
404: NOT_FOUND
Code: NOT_FOUND
ID: iad1::jbzvm-1747626619456-ab82b18a7ad6

On Vercel, the show recommendation button, it's either extremely slow or it just doesn't show the anime you favorited right away.
