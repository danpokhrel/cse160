class Scene {
    /**
     * @param {Renderer} renderer 
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.animation = null;
        this.objects = [];
    }

    render() {
        this.renderer.startDraw();
        for (const obj of this.objects) {
            this._renderObj(obj);
        }
    }
    _renderObj(object) {
        this.renderer.drawMesh(object.mesh);
        for (const child of object.children) {
            this._renderObj(child);
        }
    }

    tick(deltaTime) {
        if (this.animation) {
            this.animation.tick(deltaTime);
        }
        this.propagateTransforms();
    }

    propagateTransforms() {
        for (const obj of this.objects) {
            this._propagateTransforms(null, obj);
        }
    }
    _propagateTransforms(parent, child) {
        if (parent == null) {
            child.mesh.globalTransform.set(child.localTransform);
        } else {
            child.mesh.globalTransform.set(parent.mesh.globalTransform);
            child.mesh.globalTransform.multiply(child.localTransform);
        }
        for (const grandChild of child.children) {
            this._propagateTransforms(child, grandChild);
        }
    }
}

class SceneObject {
    /**
     * @param {Mesh} mesh 
     * @param {Matrix4} transform
     */
    constructor(mesh, transform) {
        this.mesh = mesh;
        this.localTransform = transform;

        this.children = [];
    }
}
