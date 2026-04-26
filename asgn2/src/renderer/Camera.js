class Camera {
    constructor() {
        this.transform = new Matrix4();
        this.projectionMatrix = new Matrix4();

        this.target = [0, 0, 0];
        this.distance = Math.sqrt(3 * 3 + 3 * 3 + 7 * 7);
        this.theta = Math.atan2(3, 7) * 180 / Math.PI;
        this.phi = Math.atan2(3, Math.sqrt(3 * 3 + 7 * 7)) * 180 / Math.PI;
        this.updateView();
    }

    updateView() {
        const phiRad = this.phi * Math.PI / 180;
        const thetaRad = this.theta * Math.PI / 180;
        const cosPhi = Math.cos(phiRad);

        const eyeX = this.distance * Math.sin(thetaRad) * cosPhi;
        const eyeY = this.distance * Math.sin(phiRad);
        const eyeZ = this.distance * Math.cos(thetaRad) * cosPhi;

        this.transform.setLookAt(
            eyeX, eyeY, eyeZ,
            this.target[0], this.target[1], this.target[2],
            0, 1, 0
        );
    }

    setOrbit(distance, theta, phi) {
        this.distance = distance;
        this.theta = theta;
        this.phi = Math.max(-89, Math.min(89, phi));
        this.updateView();
        return this;
    }
}