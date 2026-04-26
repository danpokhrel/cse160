class Mesh {
    constructor(data) {
        this.vertices = data.vertices;
        this.uvs = data.uvs;

        this.globalTransform = new Matrix4();
    }
}