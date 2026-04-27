class Animation {
    constructor(data) {
        this.data = data;
        this.additive = null;
        this.isPlaying = false;
        this.curTime = 0;
        this.duration = data.frameLength * data.frameCount;

        this.curFrame = 0;
        this.frameDuration = 0;

        this.rot1 = 0;
        this.rot2 = 0;
    }

    tick(deltaTime) {
        if (!this.isPlaying) return;
        if (!this.data) return;

        this.curTime += deltaTime;
        if (this.curTime > this.duration) {
            this.curTime = 0;
            this.curFrame = 0;
            this.frameDuration = 0;
        }

        this.frameDuration += deltaTime;
        if (this.frameDuration < this.data.frameLength) return;

        this.frameDuration = 0;
        this.curFrame += 1;

        for (const track of this.data.tracks) {
            const obj = track.obj;
            const frame = track.frames[this.curFrame];
            obj.localTransform = frame;
        }
    }
}