// Im making a css type class here for the marker because we need to do a little math for the plotting etc.

const width = 200;
const height = 100;

const currentPosition = {
    position: 'absolute',
    borderRadius: '20px',
    width: '20px',
    height: '20px',
    border: '3px solid #fafafa',
    backgroundColor: '#00a4c4',
    left: '-10px',
    top: '-10px'
}

const markerHolderStyle = {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgb(250, 250, 250)',
    top: -height,
    left: -width/2,
    boxShadow: '1px 2px 1px rgb(40, 40, 40, 0.2)',
    borderLeft: 'solid 2px '
}

const downArrow = {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '70px 50px 0 50px',
    borderColor: 'rgb(250, 250, 250) transparent transparent transparent',
    position: 'absolute',
    top: height*1.5
}

export { markerHolderStyle, downArrow, currentPosition }; 