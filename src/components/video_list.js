import React from 'react';
import VideoListItem from './video_list_item'

// In a const, props is the argument. In class, props is part of the class object and can be accessed with class.
// So, when refactoring from const to class, change props.<something> to this.props.<something>
    // Bootstrap included in project (check index.html)
    // col-md-4 sets as bootstrap column with 4
    // React is intelligent about rendering lists
const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return (
     <VideoListItem
      	onVideoSelect={props.onVideoSelect}
      	key={video.etag}
      	video={video} />
    );
	});
	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};
export default VideoList;
