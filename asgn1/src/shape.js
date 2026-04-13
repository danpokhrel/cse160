class Shape{
    constructor(gl, colorUniform, shape, posx, posy, scale, color, segments) {
        this.gl = gl;
        this.colorUniform = colorUniform;
        this.color = [color[0], color[1], color[2]];
        switch(shape){
            case "triangle":
                this.verts = this.getTriangle(posx, posy, scale);
                break;
            case "square":
                this.verts = this.getSquare(posx, posy, scale);
                break;
            case "circle":
                this.verts = this.getCircle(posx, posy, scale, segments);
        }
    }

    draw(){
        this.gl.uniform4f(this.colorUniform, this.color[0], this.color[1], this.color[2], 1);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.verts, this.gl.STATIC_DRAW);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.verts.length / 2);
    }

    getTriangle(posx, posy, scale){
        return new Float32Array(
        [   -0.5*scale+posx, -0.5*scale+posy,
            0.5*scale+posx, -0.5*scale+posy,
            0*scale+posx,    0.5*scale+posy]
        );
    }
    getSquare(posx, posy, scale){
        return new Float32Array(
        [   -0.5*scale+posx, -0.5*scale+posy,
            0.5*scale+posx, -0.5*scale+posy,
            0.5*scale+posx, 0.5*scale+posy,
            -0.5*scale+posx, -0.5*scale+posy,
            0.5*scale+posx, 0.5*scale+posy,
            -0.5*scale+posx, 0.5*scale+posy]
        );
    }
    getCircle(posx, posy, scale, segments){
        let verts = [];
        let cx = posx;
        let cy = posy;
        let r = 0.5 * scale;
        let step = Math.PI * 2 / segments;
        for (let i = 0; i < segments; i++) {
            const a = i * step;
            const b = ((i + 1) % segments) * step;
            verts.push(cx, cy);
            verts.push(cx + r * Math.cos(a), cy + r * Math.sin(a));
            verts.push(cx + r * Math.cos(b), cy + r * Math.sin(b));
        }
        return new Float32Array(verts);
    }
}