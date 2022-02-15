"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showHeart = Boolean(currentUser);
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        ${showHeart ? getHeartHTML(story, currentUser) : ""}
      </li>
    `);
}

//<span class="fav-marker"><i class="far fa-heart"></i></span>

//getting the heart html for the page

function getHeartHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const heartType = !isFavorite ? "fas" : "far";
  return `<span class ="fav-marker">
    <i class="${heartType} fa-heart"></i>
  </span>`
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();
  $favoritedStories.empty();


  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorites added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }

  // looping through all of the favorites and generating HTML for them

  // for (let story of currentUser.favorites) {
  //   const $story = generateStoryMarkup(story);
  //   $allStoriesList.append($story);
  // }

  $allStoriesList.show();
  $favoritedStories.show();
}

async function collectNewStory(evt){
  evt.preventDefault();
  console.debug("collectNewStory");
  const title = $('#story-title').val();
  const author = $('#story-author').val();
  const url = $('#story-url').val();
  await storyList.addStory(currentUser,
    {title, author, url});
}

$("#storyForm").on('submit', collectNewStory);

async function toggleFavorites(evt) {
  // evt.target.classList.toggle("far");
  // evt.target.classList.toggle('fas');

  const $tgt = $(evt.target);
  const $closestLi= $tgt.closest('li');
  const storyId = $closestLi.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId)

  if ($tgt.hasClass("fas")) {
    // if it is a favorite should have a heart filled. 
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
    console.log(`${$tgt.classList}`);
  } else {
    // not a favorite so do the opp.
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
  console.debug("toggleFavorites")
  
}
// on the click of the marker, calling to change class. 

$(".container").on('click', '.fa-heart',toggleFavorites)
//   e.target.classList.toggle("far");
//   e.target.classList.toggle('fas');

//   if (e.target.classList.contains("fas")){
//     const story = e.target.parent()
//    console.log(story);
//   }
// });

//issue I am facing. The hearts are not staying highlighted. How to get them to stay marked and keep the fas class. 

