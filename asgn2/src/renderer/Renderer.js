class Renderer {
    constructor() {
        /** @type {HTMLCanvasElement} */
        const canvas = document.getElementById('canvas');
        this.canvas = canvas;

        /** @type {WebGLRenderingContext} */
        this.gl = canvas.getContext('webgl');
        const gl = this.gl;
        if (!gl) {
            console.log("Failed to get rendering context for WebGL");
            return;
        }
        gl.clearColor(0.1, 0.7, 0.9, 1);
        gl.enable(gl.DEPTH_TEST);

        // Back Face Culling
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.frontFace(gl.CCW);

        // Render Data
        this.shader = new Shader(gl, vertexShader, fragmentShader);
        this.camera = new Camera();
        this.globalRotation = new Matrix4();

        this.resizeCanvas();
        this.resizeTimeout = null;
        window.addEventListener('resize', () => {
            if (this.resizeTimeout !== null) {
                window.clearTimeout(this.resizeTimeout);
            }
            this.resizeTimeout = window.setTimeout(() => {
                this.resizeCanvas();
                this.resizeTimeout = null;
            }, 120);
        });

        this.isDragging = false;
        this.lastPointerX = 0;
        this.lastPointerY = 0;
        this.canvas.style.cursor = 'grab';

        this.canvas.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) {
                return;
            }
            this.isDragging = true;
            this.lastPointerX = event.clientX;
            this.lastPointerY = event.clientY;
            this.canvas.setPointerCapture?.(event.pointerId);
            this.canvas.style.cursor = 'grabbing';
            event.preventDefault();
        });

        this.canvas.addEventListener('pointermove', (event) => {
            if (!this.isDragging) {
                return;
            }
            const dx = event.clientX - this.lastPointerX;
            const dy = event.clientY - this.lastPointerY;
            this.lastPointerX = event.clientX;
            this.lastPointerY = event.clientY;

            const sensitivity = 0.25;
            this.camera.theta -= dx * sensitivity;
            this.camera.phi = Math.max(-89, Math.min(89, this.camera.phi + dy * sensitivity));
            this.camera.updateView();
        });

        this.canvas.addEventListener('pointerup', (event) => {
            if (event.button !== 0) {
                return;
            }
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        });

        this.canvas.addEventListener('pointercancel', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        });

        this.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            const zoomRate = 0.0015;
            const delta = event.deltaY * zoomRate;
            const newDistance = this.camera.distance * (1 + delta);
            this.camera.setOrbit(Math.max(2, Math.min(50, newDistance)), this.camera.theta, this.camera.phi);
        }, { passive: false });
    }

    resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width * ratio));
        const height = Math.max(1, Math.round(rect.height * ratio));
        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
            this.gl.viewport(0, 0, width, height);
        }

        const aspect = rect.width / Math.max(1, rect.height);
        this.camera.projectionMatrix.setPerspective(30, aspect, 1, 100);
    }

    startDraw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    drawMesh(mesh) {
        this.shader.bindMesh(mesh.vertices, mesh.uvs);
        this.shader.updateTransforms(
            this.camera.projectionMatrix,
            this.camera.transform,
            this.globalRotation,
            mesh.globalTransform
        );
        this.gl.drawArrays(this.gl.TRIANGLES, 0, mesh.vertices.length / 3);
    }
}