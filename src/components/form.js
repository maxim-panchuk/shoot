import { useDispatch, useSelector } from "react-redux";
import { changeRadius, changeX, changeY, pushDot, defineDots } from "../toolkitRedux/toolkitSlice"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function UserForm() {

    const dispatch = useDispatch();
    const x = useSelector(state => state.toolkit.x);
    const y = useSelector(state => state.toolkit.y);
    const radius = useSelector(state => state.toolkit.radius);
    const username = useSelector(state => state.userSlice.username);
    
    function handleChangeX(event) {
        dispatch(changeX(event.target.value));
    };
    
    function handleChangeY(event) {

        dispatch(changeY(event.target.value));
    };

    function handleChangeR(event) {
        dispatch(changeRadius(event.target.value));
    }

    function validate() {
        if (isNaN(y)) {
            console.log("Y must be a number!")
            return false;
        }
        if (y < -3 || y > 5) {
            console.log("Y must be on range [-3;5]")
            return false;
        }
        if (y === "") {
            console.log("Y is not set")
            return false;
        }
        if (x === "") {
            return false;
        }
        if (radius === "") {
            return false
        }
        return true;
    }

    async function sendRequest(coords) {
        let url = "http://localhost:8080/api/shot";
        return await fetch (url, {
            method  :   "POST",
            headers :   {
                "Content-Type"  :   "application/json;charset=utf-8"
            },
            body    :   JSON.stringify(coords)
        })
        .then((response) => response.json());
    }

    async function handleSubmit() {
        console.log(parseFloat(y))
        if (validate()) {
            let coords = {
                x: x,
                y: y,
                r: radius,
                username: username
            }
            const response = await sendRequest(coords);
            if (response.result === true) response.result = 'true';
            else response.result = 'false';

            dispatch(defineDots(response));
            //dispatch(pushDot(response));
        }
    }

    return (
        <FormControl onSubmit={handleSubmit}>
            <FormLabel id="demo-row-radio-buttons-group-label">X - координата</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group"
            onChange={handleChangeX} value={x}>
                <FormControlLabel value={-3} control={<Radio />} label="-3" />
                <FormControlLabel value={-2} control={<Radio />} label="-2" />
                <FormControlLabel value={-1} control={<Radio />} label="-1" />
                <FormControlLabel value={0} control={<Radio />} label="0" />
                <FormControlLabel value={1} control={<Radio />} label="1" />
                <FormControlLabel value={2} control={<Radio />} label="2" />
                <FormControlLabel value={3} control={<Radio />} label="3" />
            </RadioGroup>

            <TextField id="standard-basic" label="Y - координата" variant="standard" onChange={handleChangeY} value={y} />
            
            <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" 
            value={radius} onChange={handleChangeR} label="R - значение" style={{ marginTop: '30px'}}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
            
            <Button variant="outlined" style={{marginTop: '30px'}} onClick={handleSubmit}>Outlined</Button>
        </FormControl>
      );
}
