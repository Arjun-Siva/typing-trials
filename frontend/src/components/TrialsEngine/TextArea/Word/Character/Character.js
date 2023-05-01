const Character = (props) => {
    const colorCode = props.correctnessBit;
    //console.log(colorCode);

    var color = "";
    if (colorCode === 1) { color = "#98f59c"; }
    else if (colorCode === 2) { color = "#f79c9c"; }

    var currentStyle = {
        backgroundColor : color,
        borderStyle : "dotted",
        borderWidth : "0.5px",
        borderColor: "#dee0e0",
        whiteSpace: "pre-wrap"
    };

    return (
        <span style={currentStyle}>
            {props.children}
        </span>
    )
}

export default Character;