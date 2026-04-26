//------------------Vertex Shader------------------
const vertexShader = /*glsl*/`

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uGlobalRotation;
uniform mat4 uModel;

attribute vec3 aPosition;
attribute vec2 aUV;

varying vec2 vUV;

void main() {
    vUV = aUV;
    gl_Position = uProjection * uView * uGlobalRotation * uModel * vec4(aPosition, 1.0);
}

`
//------------------Fragment Shader------------------
const fragmentShader = /*glsl*/`

precision mediump float;

varying vec2 vUV;
//uniform sampler2D uTexture;

void main(){
    //gl_FragColor = texture2D(uTexture, vUV);
    gl_FragColor = vec4(vUV, 0.0, 1.0);
}

`