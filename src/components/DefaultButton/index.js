/**@jsx jsx*/
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {jsx} from "@emotion/core";

const DefaultButton = ({buttonRef, checkedItemsValue, checkedItemsLabel}) => (<FontAwesomeIcon icon={faBars} size={'sm'}/>)
export default DefaultButton