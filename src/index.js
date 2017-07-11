import _ from 'lodash';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
// When importing from a file in the project instead of an installed library, must give full file path to reference
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// Key from google https://console.developers.google.com
// Install api calls through npm - installs to package.json
const API_KEY = 'AIzaSyBjFcUyLlfV5qaacWs6HEdl8J2hJ5nYxR8';

// Create a new component, which will produce some html
// const is ES6 syntax. The differencxe from var is that const means this is final value, and the variable will never be reassigned

// Instead of declaring a const here, declare a class and make App class object.
class App extends Component {
  constructor(props) {
    super(props);

    // Name the state videos, which will be an array
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('puppies');
  }

// Define callback
videoSearch(term) {
  YTSearch({key: API_KEY, term: term}, (videos) => {
    // Update this.state with the new list of videos here
    // When the key and value are the same string (ex: videos), can condense from
    //    this.setState({ videos: videos }) to : this.setState({ videos })
    this.setState({
      videos: videos,
      selectedVideo: videos[0]
    });
  });
}

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    // This html lookin ish is JSX - js code that can produce html
    // Compiles into ugly vanilla js (with methods from react library)
    // JSX can be nested
    // Pass prop videos to video list, so when App rerenders, VideoList will get new list of videos as well
    // onVideoSelect updates selectedVideo property...passed as prop into VideoList,
    //    which passes it to VideoListItem.
    // VideoListItem says when li is clicked, call this function on the clicked video to set selected.
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
};

// Take this component's generated html and put it on the page (in the DOM)
// ReactDOM.render(App) is trying to pass class; need to pass instance instead
// Any component name used inside JSX becomes component instance

// Need to render instance of App (<App />) to element in index.html (in this case, "container")
//    pass reference to "container"
// renders App instance to div element
ReactDOM.render(<App />, document.querySelector('.container'));