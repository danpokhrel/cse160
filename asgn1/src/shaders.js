const VERTEX_SHADER = `
precision mediump float;

attribute vec2 u_Position;

void main() {
    gl_Position = vec4(u_Position, 0, 1);
}
`
const FRAGMENT_SHADER = `
precision mediump float;

uniform vec4 u_Color;

void main() {
    gl_FragColor = u_Color;
}
`