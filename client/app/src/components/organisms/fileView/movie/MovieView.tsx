import { FC, memo } from "react";
import ReactPlayer from "react-player";
import { MovieViewProps } from "./MovieView.type";

const MovieView: FC<MovieViewProps> = (props) => {
  return (
    <div>
      <ReactPlayer
        url={props.fileSource ? URL.createObjectURL(props.fileSource) : ""}
        controls
        width="100%"
      />
    </div>
  );
};

export default memo(MovieView);
