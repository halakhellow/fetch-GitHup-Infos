"use strict";
let username = document.querySelector("input"),
  button = document.querySelector("button"),
  spinner = document.querySelector(".spinner"),
  profilePic = document.querySelector("img"),
  fullName = document.querySelector(".name"),
  linkContainer = document.querySelector(".linkContainer"),
  alertMsg = document.querySelector(".alert"),
  repos = document.querySelector(".repos"),
  followings = document.querySelector(".followings"),
  followers = document.querySelector(".followers");

document.onloadeddata = function () {
  spinner.style.display = "none";
}

username.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getData();
  }
});

button.onclick = function () {
  getData();
};


function clearInfos() {
  fullName.innerHTML = linkContainer.innerHTML = repos.innerHTML = followings.innerHTML = followers.innerHTML =
    "";
  profilePic.style.display = "none";
}

function getData() {
  if (username.value === "") {
    clearInfos();
    alertMsg.setAttribute("style", "display: block");
  } else {
    clearInfos();
    alertMsg.setAttribute("style", "display: none");
    fetch(`https://api.github.com/users/${username.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          spinner.style.display = "block";
          profilePic.style.display = "block";
          fullName.appendChild(
            document
            .createElement("p")
            .appendChild(document.createTextNode(data.name))
          );
          profilePic.setAttribute("src", data.avatar_url);
          let profileLink = document.createElement("a"),
            profileLinkText = document.createTextNode("Visit Profile");
          profileLink.appendChild(profileLinkText);
          profileLink.href = `https://github.com/${username.value}`;
          profileLink.setAttribute("target", "_blank");
          linkContainer.appendChild(profileLink);
        }
      });
    fetch(`https://api.github.com/users/${username.value}/repos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          let titleTag = document.createElement("h4"),
            titleText = document.createTextNode("REPOSITORIES : ");
          titleTag.appendChild(titleText);
          repos.appendChild(titleTag);
        }
        data.map((repo) => {
          let repoContainer = document.createElement("p"),
            repoName = document.createTextNode(repo.name);
          repoContainer.appendChild(repoName);
          repos.appendChild(repoContainer);
        });
      });
    fetch(`https://api.github.com/users/${username.value}/following`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          let titleTag = document.createElement("h4"),
            titleText = document.createTextNode("FOLLOWING : ");
          titleTag.appendChild(titleText);
          followings.appendChild(titleTag);
        }
        data.map((following) => {
          let followingContainer = document.createElement("p"),
            followName = document.createTextNode(following.login);
          followingContainer.appendChild(followName);
          followings.appendChild(followingContainer);
        });
      });
    fetch(`https://api.github.com/users/${username.value}/followers`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          let titleTag = document.createElement("h4"),
            titleText = document.createTextNode("FOLLOWERS : ");
          titleTag.appendChild(titleText);
          followers.appendChild(titleTag);
        }

        data.map((follower) => {
          let followerContainer = document.createElement("p"),
            followerName = document.createTextNode(follower.login);
          followerContainer.appendChild(followerName);
          followers.appendChild(followerContainer);
          spinner.style.display = "none";
        });
      });
  }
}