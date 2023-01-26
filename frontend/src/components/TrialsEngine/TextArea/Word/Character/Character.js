const Character = (props) => {
    const colorCode = props.correctnessBit;
    //console.log(colorCode);

    var color = "";
    if (colorCode === 1) { color = "#98f59c"; }
    else if (colorCode === 2) { color = "#f79c9c"; }

    var currentStyle = {
        backgroundColor : color,
    };

    return (
        <span style={currentStyle}>
            {props.children}
        </span>
    )
}

export default Character;