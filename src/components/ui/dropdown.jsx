export const DropdownMenu = (props) => {
    return (
        <div {...props} className="flex items-center justify-center border border-[#000000]">
            <select className="form-select w-full max-w-xs">
                <option value="2" selected = {props.value == 2}>2</option>
            <option value="5" selected = {props.value == 5}>5</option>
            <option value="10" selected = {props.value == 10}>10</option>
            <option value="15" selected = {props.value == 15}>15</option>
            <option value="20" selected = {props.value == 20}>20</option>
        </select>
    </div>
)}