import React, {Fragment, useContext} from "react";
import SearchInput from "../SearchInput";
import ItemsBox from "../ItemsBox";
import DropdownContext from "../../DropdownContext";
const BodyContent = ({isEmpty, loadingState, itemWidth}) => (
    isEmpty || loadingState || !itemWidth ? (
        <Fragment>
            <ItemsBox/>
        </Fragment>
    ) : (
        <Fragment>
            <SearchInput />
            <ItemsBox/>
        </Fragment>
    )
)

const MenuBody = () => {
    const {loadingState,state, state: {data, isOpened, itemWidth}} = useContext(DropdownContext)
    if (!isOpened) return null
    return <BodyContent isEmpty={!data.length} loadingState={loadingState} itemWidth={itemWidth} />
}
export default MenuBody
