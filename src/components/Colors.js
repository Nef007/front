

import {TwitterPicker} from "react-color";
export const Colors = ({color, onChangeComplete }) => {


    return (
        <TwitterPicker
            color={ color }
            onChangeComplete={onChangeComplete}
        />
    );
};
