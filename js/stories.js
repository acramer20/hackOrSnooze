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

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <span><i class="far heart fa-heart"></i></span>
      </li>
    `);
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

  //looping through all of the favorites and generating HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
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


// on the click of the marker, calling to change class. 
async function toggleMark(event) {
  // console.log("changed 'marked' class");
  const $target = $(event.target);
  $target.closest("i").toggleClass("fas");
  
}

$(".stories-list").on("click", ".heart", toggleMark);

