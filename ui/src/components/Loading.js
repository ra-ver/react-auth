import React from "react";

import STATUS from "./status";
import * as animationData from "./loading.json";

import "./Loading.css";

const defaultOptions = {
  loop: true,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class Loading extends React.Component {
  render() {
    return ( <
      div className = "loading" > {
        this.props.status !== STATUS.AUTHENTICATED && ( <
          div style = {
            {
              position: "absolute"
            }
          } >
          <
          /div>
        )
      } <
      div style = {
        {
          position: "absolute"
        }
      } >
      <
      /div> <
      /div>
    );
  }
}

export default Loading;