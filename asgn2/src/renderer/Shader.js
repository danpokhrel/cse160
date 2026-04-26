class Shader {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} vertShader
     * @param {string} fragShader
    */
    constructor(gl, vertShader, fragShader) {
        this.gl = gl;
        // Shaders
        if (!initShaders(gl, vertShader, fragShader)) {
            console.log("Failed to init shaders.");
            return -1;
        }

        // Buffers
        this.vertexBuffer = gl.createBuffer();
        this.uvBuffer = gl.createBuffer();
        if (!(this.vertexBuffer && this.uvBuffer)) {
            console.log("Failed to create buffer.");
            return -1;
        }

        // Vertex Attributes
        this.aPosition = gl.getAttribLocation(gl.program, "aPosition");
        this.aUV = gl.getAttribLocation(gl.program, "aUV");
        if (this.aPosition < 0 || this.aUV < 0) {
            console.log("Failed to get attribute location:", this.aPosition, this.aUV);
            return -1;
        }

        // Uniforms
        this.uProjection = gl.getUniformLocation(gl.program, "uProjection");
        this.uView = gl.getUniformLocation(gl.program, "uView");
        this.uGlobalRotation = gl.getUniformLocation(gl.program, "uGlobalRotation");
        this.uModel = gl.getUniformLocation(gl.program, "uModel");
        if (this.uProjection < 0 || this.uView < 0 || this.uModel < 0 || this.uGlobalRotation < 0) {
            console.log("Failed to get transform matrix uniform locations.");
            return -1;
        }
    }

    /**
     * @param {Float32Array} verticies
     * @param {Float32Array} uvs
    */
    bindMesh(verticies, uvs) {
        this.uploadBuffer(this.vertexBuffer, verticies, this.aPosition, 3, this.gl.FLOAT);
        this.uploadBuffer(this.uvBuffer, uvs, this.aUV, 2, this.gl.FLOAT);
    }

    /**
     * @param {WebGLBuffer} buffer
     * @param {Array} data 
     * @param {Gluint} attribLocation
     * @param {Glint} num 
     * @param {GLenum} type
     */
    uploadBuffer(buffer, data, attribLocation, num, type) {
        let gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        gl.vertexAttribPointer(attribLocation, num, type, false, 0, 0);
        gl.enableVertexAttribArray(attribLocation);
    }

    /**
     * @param {Matrix4} projectionMat 
     * @param {Matrix4} viewMat
     * @param {Matrix4} rotMat
     * @param {Matrix4} modelMat 
     */
    updateTransforms(projectionMat, viewMat, rotMat, modelMat) {
        this.gl.uniformMatrix4fv(this.uProjection, false, projectionMat.elements);
        this.gl.uniformMatrix4fv(this.uView, false, viewMat.elements);
        this.gl.uniformMatrix4fv(this.uGlobalRotation, false, rotMat.elements);
        this.gl.uniformMatrix4fv(this.uModel, false, modelMat.elements);
    }
}