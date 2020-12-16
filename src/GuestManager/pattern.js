import Trianglify from 'Trianglify'
var pattern = Trianglify({
    width: 600,
    height: 400,
    cell_size: 75,
    variance: 0.75,
    seed: null, 
    x_colors: 'random',
    y_colors: 'match_x',
    palette: colorbrewer, 
    color_space: 'lab',
    color_function: null,
    stroke_width: 1.51,
    points: undefined 
})