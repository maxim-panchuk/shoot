import { useSelector, useDispatch } from "react-redux"
import { pushDot, defineDots } from "../toolkitRedux/toolkitSlice"
import "../css/graph.css"
import { useEffect } from "react";

export default function Graph(props) {
    const dispatch = useDispatch();
    const username = useSelector(state => state.userSlice.username);
    
    const radius = props.radius;
    const dotsArr = props.dotsArr;
    

    useEffect(() => {
        function renderDot() {
            document.querySelectorAll("circle").forEach(item => item.remove())
            const graph = document.getElementById("area-graph");
            if (graph !== null) {
                dotsArr.forEach(element => {
                    let x = element.x * (140 / radius) + 175
                    let y = -(element.y * 140 / radius) + 175
                    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    dot.setAttribute("cx", x);
                    dot.setAttribute("cy", y);
                    dot.setAttribute("r", "3");
                    if (element.result === 'true') {
                        dot.setAttribute("stroke", "#00ff32");
                        dot.setAttribute("fill", "#00ff32");
                    } else {
                        dot.setAttribute("stroke", "#AD2D2D");
                        dot.setAttribute("fill", "#AD2D2D");
                    }
                    graph.appendChild(dot);
                });
            }
        }
        renderDot();
    })

    async function sendRequest(coords) {
        let url = "http://localhost:8080/api/shot"
        return await fetch (url, {
            method  :   "POST",
            headers :   {
                "Content-Type"  :   "application/json;charset=utf-8"
            },
            body    :   JSON.stringify(coords)
        })
        .then((response) => response.json());
    }

    async function graphManager(client_rect, event) {
        let xClick = (event.clientX - client_rect.left);
        let yClick = (event.clientY - client_rect.top);
        let x = (xClick - 175) / (140 / radius);
        let y = -(yClick - 175) / (140 / radius);

        let coords = {
            x: x.toFixed(3),
            y: y.toFixed(3),
            r: radius,
            username: username
        }

        return await sendRequest(coords);
    }

    async function handleClick(event) {
        event.preventDefault();
        
        const client_rect = document.getElementById("area-graph").getBoundingClientRect();
        const response = await graphManager(client_rect, event);
        if (response.result === true) response.result = 'true';
        else response.result = 'false';
        dispatch(defineDots(response));
        //dispatch(pushDot(response));
    }

    return (
        <svg className="svg-coordinates" height="350" width="350" id="area-graph" onClick={event => handleClick(event)}>
            <path className="coordinates-figure" d="M 105 175 h70 v-70 A70 70 0 0 0 105 175z"></path>
            <polygon className="coordinates-figure" points="175,315 175,175 315,175 "></polygon>
            <rect className="coordinates-figure" x="35" y="175" width="140" height="140"></rect>
            <line className="coordinate-axis" x1="0" x2="345" y1="175" y2="175"></line>
            <line className="coordinate-axis" x1="175" x2="175" y1="350" y2="5"></line>
            <line className="coordinates-marker" x1="171" x2="179" y1="35" y2="35"></line>
            <line className="coordinates-marker" x1="171" x2="179" y1="105" y2="105"></line>
            <line className="coordinates-marker" x1="171" x2="179" y1="245" y2="245"></line>
            <line className="coordinates-marker" x1="171" x2="179" y1="315" y2="315"></line>
            <text className="positive-coords" x="150" y="40">R</text>
            <text className="negative-coords" x="150" y="320">-R</text>
            <line className="coordinates-marker" x1="35" x2="35" y1="171" y2="179"></line>
            <line className="coordinates-marker" x1="105" x2="105" y1="171" y2="179"></line>
            <line className="coordinates-marker" x1="245" x2="245" y1="171" y2="179"></line>
            <line className="coordinates-marker" x1="315" x2="315" y1="171" y2="179"></line>
            <text className="positive-coords" x="310" y="195">R</text>
            <text className="negative-coords" x="30" y="195">-R</text>
            <text className="coordinates-text" x="182" y="11">y</text>
            <text className="coordinates-text" x="335" y="167">x</text>
        </svg>
    )
}