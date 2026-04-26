const FPS_AVERAGE_STEP = 100;

function main() {
    const renderer = new Renderer();
    const scene = new Scene(renderer);
    generateScene(scene);
    const animation = new Animation(animWalk);

    let timeline = document.getElementById("Timeline");
    let playButton = document.getElementById("PlayPause");
    let time = document.getElementById("Time");
    let rotation = 0;
    let neckRot = 0;
    let headRot = 0;
    updateRotation();

    let frameTimes = [];
    let lastTime = performance.now();
    let frameLabel = document.getElementById("FrameTime");

    requestAnimationFrame(tick);
    function tick() {
        const start = performance.now();
        const deltaTime = start - lastTime;
        lastTime = start;

        _tick(deltaTime);
        scene.tick(deltaTime);
        animation.tick(deltaTime);
        scene.render();

        //frameTimes.push(performance.now() - start);
        frameTimes.push(deltaTime);
        if (frameTimes.length > FPS_AVERAGE_STEP) {
            frameTimes.shift();
        }
        const frameTime = average(frameTimes);
        frameLabel.innerHTML = "ms: " + frameTime.toFixed(1) + " fps: " + (1000 / frameTime).toFixed(0);

        requestAnimationFrame(tick);
    }

    function _tick(deltaTime) {
        renderer.globalRotation.setRotate(rotation, 0, 1, 0);

        const value = (animation.curTime / animation.duration) * 100;
        timeline.value = value;
        time.innerHTML = (animation.curTime / 1000).toFixed(1) + "s / " + (animation.duration / 1000).toFixed(1) + "s";
    }


    document.getElementById("Rotation").addEventListener("input", function () { updateRotation(); });
    function updateRotation() {
        rotation = document.getElementById("Rotation").value;
    }
    document.getElementById("Neck").addEventListener("input", function () {
        pause();
        neckRot = document.getElementById("Neck").value;
    })
    document.getElementById("Head").addEventListener("input", function () {
        play();
        headRot = document.getElementById("Head").value;
    })

    playButton.addEventListener("click", function () {
        if (animation.isPlaying) pause();
        else play();
    })
    function play() {
        animation.isPlaying = true;
        playButton.value = "||";
    }
    function pause() {
        animation.isPlaying = false;
        playButton.value = ">";
    }
}

function average(array) {
    let total = 0;
    let i = 0;
    for (const x of array) {
        total += x;
        i++;
    }
    return total / i;
}