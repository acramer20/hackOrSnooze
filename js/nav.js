"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $("#storyForm").hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function showStorySubmitOpt(evt) {
  console.debug("showStorySubmit", evt);
  hidePageComponents();
  $("#storyForm").show();
}

$("#storyPost").on("click", showStorySubmitOpt);

function showFavorites(evt) {
  console.debug("showFavorites", evt);
  hidePageComponents();
  putFavoritesOnPage();
  $("#storyForm").hide();
}
$("#favoriteStories").on("click", showFavorites);

function showMyStories(evt) {
  console.debug("showMyStories", evt);
  hidePageComponents();
  putMyStoriesOnPage();
  $("#storyForm").hide();
}
$("#myStories").on("click", showMyStories);


