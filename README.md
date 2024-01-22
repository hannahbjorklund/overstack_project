# Overstack

## Description

Duration: 2 weeks

Over the course of two weeks, I created my first large scale, self-driven fullstack CRUD application: Overstack. 

Overstack is a statistics tool for the game Overwatch 2 which I developed for my friends and the greater Overwatch community. Overwatch is a competitive first-person team-based shooter developed by Activision-Blizzard. In order to climb the ranks, the game demands strategizing and team collaboration. As a result, my friends and I are always looking for ways to improve and track team progress. However, Overwatch does not have much info on group stats, and the in-game menus can feel isolating. I created Overstack to remedy this. With Overstack, users can link multiple Overwatch accounts, add their friends' accounts, and view statistics for their entire friend group.

This project is deployed! Check it out [here](https://overstack-e13eace92494.herokuapp.com/#/home)

## Demo

You can view a demo of this application [here](https://youtu.be/00QkHRocwjE)

## Usage

* Link accounts: preview and link multiple Overwatch profile(s) to your account on the Link Account page. 
* Friends: preview, add, and remove friends on the My Friends page. A friend filter enables the user to stay organized
* Profiles: view an account's profile and statistics page by clicking on their player card. User can view multiple different categories of statistics using the "Total", "Unranked",  and "Competitive" buttons, as well as view stats for the profile's top 3 heroes utilizing the drop down menu.
* User page: view all of your connected accounts, link a new account, or unlink an account using the "Remove account" button. View an overview of your user profile, and view even more stats by clicking the "See more stats" button.
* Stack: view a large assortment of data across your entire friend group, or "stack", including unranked and competitive stats, total stats, character specific stats, and more. 
* Admin: administrators can visit the admin panel, where they can view all registered users, delete users, promote them to admin status, or demote them.

## Prerequisites

* Node.js
* PG
* Axios
* Express
* Redux & sagas
* Database manager
* React
* Bootstrap

## Developer Notes

This is currently version 1.0 of Overstack. I would like to implement many more features in future versions.

One particularly challenging aspect to this project was the amount of object oriented programming centered around formatting the API data. The API contained some repeat data values and data that I did not want to include in Overstack's statistics, as well lacked other data that I wished to add. However, doing formatting in the server to handle the incoming data made much of the project easier and smoother.

I would like to overhaul the friend system in an upcoming update. I am also considering adding a friend feed where users can share their clips and play of the game videos, as well as achievements, and the ability to create multiple stacks.

## Acknowledgements

Many thanks to my instructors, classmates, and mentors at [Prime Digital Academy](https://www.primeacademy.io/) who equipped me with the tools and support needed to create this project. I would also like to thank my close Overwatch friends, who peer reviewed my concept, tested app features, and suggested things to implement. 

This application retrieves profile data from the [OverFast API](https://overfast-api.tekrop.fr/). Many assests such as character images, fonts, and statistics are taken from Overwatch 2. I do not claim to own any of these assets.
