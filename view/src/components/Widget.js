import React from "react";
import axios from "axios";
import "./Widget.css";

class Widget extends React.Component {
  state = {
    data: null,
    profile: null,
    repos: null,
    languages: null
  };

  componentDidMount() {
    this.getProfile().then(() => {
      this.getRepos().then(() => {
        this.getLanguageCount();
      });
    });
  }

  //count the total bytes of languages used for all public repos
  getLanguageCount = () => {
    let languages = {};
    this.state.repos.forEach(async repo => {
      await axios.get(repo.languages_url).then(res => {
        Object.keys(res.data).forEach(language => {
          if (languages[language] === undefined) {
            languages[language] = res.data[language];
          } else {
            languages[language] += res.data[language];
          }
        });
      });

      this.setState({ languages: languages });
    });
  };

  //call github api to request a user profile
  getProfile = async () => {
    await axios.get(`https://api.github.com/users/longn5`).then(res => {
      const profile = res.data;
      this.setState({ profile: profile });
    });
  };

  //get public repos for a given user
  getRepos = async () => {
    await axios.get(this.state.profile.repos_url).then(res => {
      const repos = res.data;
      this.setState({ repos: repos });
    });
  };

  render() {
    console.log(this.state.languages);
    //if profile object is null then don't show anything
    let hi = true;
    // if (!this.state.languages) {
    if(hi){
      return (
        <div class="ui segment">
          <div class="ui active dimmer">
            <div class="ui text loader">Loading</div>
          </div>
          <p></p>
        </div>
      );
    } else {
      return (
        <div className="">
          <div id="github-header">
            <span className="widget-title">GITHUB STATS</span>
            <span>
              PUBLIC REPOS:{" "}
              <span className="stat-numbers">
                {this.state.profile.public_repos}
              </span>
            </span>
          </div>
          <div id="github-stats">
            {Object.keys(this.state.languages).map((key, index) => (
              <p key={index}>
                {key}: {this.state.languages[key]}
              </p>
            ))}
          </div>
          <p>Link: {this.state.profile.html_url}</p>
        </div>
      );
    }
  }
}

export default Widget;
