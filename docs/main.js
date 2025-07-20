/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");



let scene, camera, renderer;
let snowParticles, snowGeo;
let clock = new three__WEBPACK_IMPORTED_MODULE_2__.Clock();
init();
animate();
function init() {
    scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
    scene.background = new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xaee7ff); // daytime blue sky
    camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 25);
    renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
    // Lighting
    const sun = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff, 1);
    sun.position.set(50, 100, 50);
    scene.add(sun);
    scene.add(new three__WEBPACK_IMPORTED_MODULE_2__.AmbientLight(0xffffff, 0.4));
    // Ground
    const ground = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(100, 100), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffffff }));
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    // --- House配置 ---
    const housePositions = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
            const x = col * 10 - 25;
            const z = row * 12 - 30 - 10;
            createHouse(x, 0, z);
            housePositions.push({ x, z });
        }
    }
    // --- Tree配置（豪華版） ---
    // --- Tree配置（規則的） ---
    housePositions.forEach(({ x, z }) => {
        const offsets = [
            { dx: 4, dz: 0 },
            { dx: -4, dz: 0 }, // 西
            //{ dx: 0, dz: 4 },   // 南
            //{ dx: 0, dz: -4 }   // 北
        ];
        offsets.forEach(({ dx, dz }) => {
            const treeX = x + dx;
            const treeZ = z + dz;
            // 幹
            const trunk = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.25, 0.25, 1, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: 0x8b4513 }));
            trunk.position.set(treeX, 0.5, treeZ);
            scene.add(trunk);
            // 葉の段1
            const cone1 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(1.2, 2, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: 0x2e8b57, flatShading: true }));
            cone1.position.set(treeX, 1.5, treeZ);
            scene.add(cone1);
            // 葉の段2
            const cone2 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(1, 2, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: 0x2e8b57, flatShading: true }));
            cone2.position.set(treeX, 2.3, treeZ);
            scene.add(cone2);
            // 葉の段3
            const cone3 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(0.8, 1.5, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: 0x2e8b57, flatShading: true }));
            cone3.position.set(treeX, 3, treeZ);
            scene.add(cone3);
        });
    });
    // --- 丸太オブジェ ---
    const logGroup = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
    // 丸太の本体（円柱）
    const logBody = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.3, 0.3, 2, 16), new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({
        color: 0x8b5a2b,
        roughness: 0.8,
        metalness: 0.1,
    }));
    logBody.rotation.z = Math.PI / 2; // 横倒しに
    logGroup.add(logBody);
    // 両端の断面（年輪風）
    const logEndsMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({
        color: 0xdeB887,
        roughness: 0.6,
        metalness: 0.1,
    });
    const endCap1 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CircleGeometry(0.3, 16), logEndsMaterial);
    endCap1.rotation.y = Math.PI / 2;
    endCap1.position.set(1, 0, 0);
    logGroup.add(endCap1);
    const endCap2 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CircleGeometry(0.3, 16), logEndsMaterial);
    endCap2.rotation.y = -Math.PI / 2;
    endCap2.position.set(-1, 0, 0);
    logGroup.add(endCap2);
    // 配置位置（例：中央）
    logGroup.position.set(3, 0.15, 5);
    scene.add(logGroup);
    // Snow Particles
    snowGeo = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
    const snowCount = 1000;
    const pos = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
        pos[i * 3] = Math.random() * 100 - 50;
        pos[i * 3 + 1] = Math.random() * 50;
        pos[i * 3 + 2] = Math.random() * 100 - 50;
    }
    snowGeo.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(pos, 3));
    const snowMat = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({ color: 0xffffff, size: 0.2 });
    snowParticles = new three__WEBPACK_IMPORTED_MODULE_2__.Points(snowGeo, snowMat);
    scene.add(snowParticles);
    // Snowman
    const snowman = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
    const bottom = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.7, 16, 16), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffffff }));
    const middle = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.5, 16, 16), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffffff }));
    const head = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.4, 16, 16), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffffff }));
    middle.position.y = 0.9;
    head.position.y = 1.6;
    snowman.add(bottom);
    snowman.add(middle);
    snowman.add(head);
    // Hat
    const brim = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.3, 0.3, 0.05, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x000000 }));
    const topHat = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.2, 0.2, 0.3, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x000000 }));
    brim.position.set(0, 1.85, 0);
    topHat.position.set(0, 2.05, 0);
    snowman.add(brim);
    snowman.add(topHat);
    // Arms
    const leftArm = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.03, 0.03, 1), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x8b4513 }));
    const rightArm = leftArm.clone();
    leftArm.position.set(-0.7, 0.9, 0);
    leftArm.rotation.z = Math.PI / 4;
    rightArm.position.set(0.7, 0.9, 0);
    rightArm.rotation.z = -Math.PI / 4;
    snowman.add(leftArm);
    snowman.add(rightArm);
    // Eyes
    const eyeMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x000000 });
    const leftEye = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.05, 8, 8), eyeMaterial);
    const rightEye = leftEye.clone();
    leftEye.position.set(-0.1, 1.7, 0.38);
    rightEye.position.set(0.1, 1.7, 0.38);
    snowman.add(leftEye);
    snowman.add(rightEye);
    // Carrot Nose
    const nose = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(0.05, 0.2, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffa500 }));
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 1.65, 0.4);
    snowman.add(nose);
    // Mouth (small dots)
    for (let i = -2; i <= 2; i++) {
        const dot = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.02, 8, 8), eyeMaterial);
        dot.position.set(i * 0.04, 1.6, 0.37);
        snowman.add(dot);
    }
    snowman.position.set(-5, 0.7, 3);
    scene.add(snowman);
    new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Tween(snowman.position).to({ x: -3 }, 3000).yoyo(true).repeat(Infinity).start();
    // Children Snowball Fight - Improved Facing and Movement
    const leftTeam = [];
    const rightTeam = [];
    const skinMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffccaa });
    const bodyMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x66ccff });
    const eyeMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x000000 });
    function createChild(x, z, faceDirection) {
        const child = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        const head = new three__WEBPACK_IMPORTED_MODULE_2__.Group(); // 顔 + 目 をまとめる
        const face = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.2, 12, 12), skinMat);
        face.position.y = 0.6;
        head.add(face);
        const eyeLeft = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.02, 8, 8), eyeMat);
        const eyeRight = eyeLeft.clone();
        eyeLeft.position.set(-0.05, 0.63, 0.19);
        eyeRight.position.set(0.05, 0.63, 0.19);
        head.add(eyeLeft);
        head.add(eyeRight);
        // 向かい合わせにする
        head.rotation.y = faceDirection === 'left' ? -Math.PI / 2 : Math.PI / 2;
        child.add(head);
        const body = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(0.2, 0.6, 8), bodyMat);
        body.position.y = 0.3;
        child.add(body);
        child.position.set(x, 0, z);
        scene.add(child);
        // ランダムな動き範囲・速度・開始時間
        const moveAmount = 0.3 + Math.random() * 0.5;
        const duration = 800 + Math.random() * 600;
        const delay = Math.random() * 1000;
        const direction = Math.random() < 0.5 ? 1 : -1;
        new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Tween(child.position)
            .to({ x: x + direction * moveAmount }, duration)
            .yoyo(true)
            .repeat(Infinity)
            .delay(delay)
            .start();
        return child;
    }
    // 左チーム
    for (let i = 0; i < 3; i++) {
        const x = -3.5;
        const z = 6 + i * 1;
        const child = createChild(x, z, 'right'); // 右向きに調整
        leftTeam.push(child);
    }
    // 右チーム
    for (let i = 0; i < 3; i++) {
        const x = 3.5;
        const z = 6 + i * 1;
        const child = createChild(x, z, 'left'); // 左向きに調整
        rightTeam.push(child);
    }
    // 雪玉（左→右）
    const snowball1 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.05, 8, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffffff }));
    snowball1.position.set(-3.5, 1.0, 7);
    scene.add(snowball1);
    new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Tween(snowball1.position)
        .to({ x: 3.5 }, 1000)
        .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Easing.Linear.None)
        .yoyo(true)
        .repeat(Infinity)
        .start();
    // 雪玉（右→左）
    const snowball2 = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.05, 8, 8), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xffffff }));
    snowball2.position.set(3.5, 1.0, 7.5);
    scene.add(snowball2);
    new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Tween(snowball2.position)
        .to({ x: -3.5 }, 1000)
        .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Easing.Linear.None)
        .yoyo(true)
        .repeat(Infinity)
        .delay(500)
        .start();
    window.addEventListener('resize', onWindowResize);
}
function createHouse(x, y, z) {
    const house = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
    // ベース（レンガ風の色）
    const baseMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xfffff0 }); // レンガ色
    const base = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(3, 2, 3), baseMat);
    base.position.y = 1;
    house.add(base);
    // 屋根（装飾つき）
    const roofMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x8b0000 }); // 深赤
    const roof = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(2.5, 1.2, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 2.6;
    house.add(roof);
    // 煙突
    const chimney = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.4, 1.2, 0.4), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x444444 }));
    chimney.position.set(1, 3, -1);
    house.add(chimney);
    // 煙（ループアニメーション）
    const smokeMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.6,
    });
    for (let i = 0; i < 5; i++) {
        const smoke = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.2), smokeMat.clone());
        smoke.position.set(1, 3 + i * 0.1, -1);
        house.add(smoke);
        const to = { y: 5 + i * 0.5 };
        new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Tween(smoke.position)
            .to(to, 3000 + i * 300)
            .repeat(Infinity)
            .yoyo(true)
            .start();
        new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].Tween(smoke.material)
            .to({ opacity: 0 }, 3000 + i * 300)
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }
    // 窓素材（薄い水色）
    const windowMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({
        color: 0xccf2ff,
        transparent: true,
        opacity: 0.7
    });
    // 窓フレーム素材（ダークグレー）
    const frameMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x333333 });
    for (let i = -1; i <= 1; i += 2) {
        const windowGroup = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        // ガラス本体
        const glass = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(0.6, 0.6), windowMat);
        windowGroup.add(glass);
        // 十字格子（縦）
        const verticalBar = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(0.05, 0.6), frameMat);
        windowGroup.add(verticalBar);
        // 十字格子（横）
        const horizontalBar = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(0.6, 0.05), frameMat);
        windowGroup.add(horizontalBar);
        // 立体的なフチ（4本の枠）
        const frameThickness = 0.05;
        const frameDepth = 0.05;
        // 上枠
        const topFrame = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.6 + frameThickness * 2, frameThickness, frameDepth), frameMat);
        topFrame.position.set(0, 0.3 + frameThickness / 2, frameDepth / 2);
        windowGroup.add(topFrame);
        // 下枠
        const bottomFrame = topFrame.clone();
        bottomFrame.position.y = -0.3 - frameThickness / 2;
        windowGroup.add(bottomFrame);
        // 左枠
        const leftFrame = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(frameThickness, 0.6, frameDepth), frameMat);
        leftFrame.position.set(-0.3 - frameThickness / 2, 0, frameDepth / 2);
        windowGroup.add(leftFrame);
        // // 右枠
        const rightFrame = leftFrame.clone();
        rightFrame.position.x = 0.3 + frameThickness / 2;
        windowGroup.add(rightFrame);
        // 窓の位置（家の正面）
        windowGroup.position.set(i * 0.8, 1.2, 1.51);
        house.add(windowGroup);
    }
    // ドア（取っ手付き）
    const doorMat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x663300 });
    const door = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(0.8, 1.2), doorMat);
    door.position.set(0, 0.6, 1.51);
    house.add(door);
    const knob = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.05), new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0xaaaaaa }));
    knob.position.set(0.3, 0.6, 1.52);
    house.add(knob);
    house.position.set(x, y, z);
    scene.add(house);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__["default"].update();
    const pos = snowGeo.attributes.position;
    const count = pos.count;
    for (let i = 0; i < count; i++) {
        let y = pos.getY(i) - 0.1;
        if (y < 0)
            y = 50;
        pos.setY(i, y);
    }
    pos.needsUpdate = true;
    renderer.render(scene, camera);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJztcbmltcG9ydCBUV0VFTiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcyc7XG5cbmxldCBzY2VuZSwgY2FtZXJhLCByZW5kZXJlcjtcbmxldCBzbm93UGFydGljbGVzLCBzbm93R2VvO1xubGV0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cbmluaXQoKTtcbmFuaW1hdGUoKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGFlZTdmZik7IC8vIGRheXRpbWUgYmx1ZSBza3lcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KDAsIDEwLCAyNSk7XG5cbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KTtcbiAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgLy8gTGlnaHRpbmdcbiAgY29uc3Qgc3VuID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDEpO1xuICBzdW4ucG9zaXRpb24uc2V0KDUwLCAxMDAsIDUwKTtcbiAgc2NlbmUuYWRkKHN1bik7XG4gIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjQpKTtcblxuICAvLyBHcm91bmRcbiAgY29uc3QgZ3JvdW5kID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTAwLCAxMDApLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KSk7XG4gIGdyb3VuZC5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICBzY2VuZS5hZGQoZ3JvdW5kKTtcblxuXG4gIC8vIC0tLSBIb3VzZemFjee9riAtLS1cbmNvbnN0IGhvdXNlUG9zaXRpb25zID0gW107XG5mb3IgKGxldCByb3cgPSAwOyByb3cgPCA0OyByb3crKykge1xuICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA1OyBjb2wrKykge1xuICAgIGNvbnN0IHggPSBjb2wgKiAxMCAtIDI1O1xuICAgIGNvbnN0IHogPSByb3cgKiAxMiAtIDMwLTEwO1xuICAgIGNyZWF0ZUhvdXNlKHgsIDAsIHopO1xuICAgIGhvdXNlUG9zaXRpb25zLnB1c2goeyB4LCB6IH0pO1xuICB9XG59XG4vLyAtLS0gVHJlZemFjee9ru+8iOixquiPr+eJiO+8iSAtLS1cbi8vIC0tLSBUcmVl6YWN572u77yI6KaP5YmH55qE77yJIC0tLVxuaG91c2VQb3NpdGlvbnMuZm9yRWFjaCgoeyB4LCB6IH0pID0+IHtcbiAgY29uc3Qgb2Zmc2V0cyA9IFtcbiAgICB7IGR4OiA0LCBkejogMCB9LCAgIC8vIOadsVxuICAgIHsgZHg6IC00LCBkejogMCB9LCAgLy8g6KW/XG4gICAgLy97IGR4OiAwLCBkejogNCB9LCAgIC8vIOWNl1xuICAgIC8veyBkeDogMCwgZHo6IC00IH0gICAvLyDljJdcbiAgXTtcblxuICBvZmZzZXRzLmZvckVhY2goKHsgZHgsIGR6IH0pID0+IHtcbiAgICBjb25zdCB0cmVlWCA9IHggKyBkeDtcbiAgICBjb25zdCB0cmVlWiA9IHogKyBkejtcblxuICAgIC8vIOW5uVxuICAgIGNvbnN0IHRydW5rID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjI1LCAwLjI1LCAxLCA4KSxcbiAgICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweDhiNDUxMyB9KVxuICAgICk7XG4gICAgdHJ1bmsucG9zaXRpb24uc2V0KHRyZWVYLCAwLjUsIHRyZWVaKTtcbiAgICBzY2VuZS5hZGQodHJ1bmspO1xuXG4gICAgLy8g6JGJ44Gu5q61MVxuICAgIGNvbnN0IGNvbmUxID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDEuMiwgMiwgOCksXG4gICAgICBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHgyZThiNTcsIGZsYXRTaGFkaW5nOiB0cnVlIH0pXG4gICAgKTtcbiAgICBjb25lMS5wb3NpdGlvbi5zZXQodHJlZVgsIDEuNSwgdHJlZVopO1xuICAgIHNjZW5lLmFkZChjb25lMSk7XG5cbiAgICAvLyDokYnjga7mrrUyXG4gICAgY29uc3QgY29uZTIgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMSwgMiwgOCksXG4gICAgICBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHgyZThiNTcsIGZsYXRTaGFkaW5nOiB0cnVlIH0pXG4gICAgKTtcbiAgICBjb25lMi5wb3NpdGlvbi5zZXQodHJlZVgsIDIuMywgdHJlZVopO1xuICAgIHNjZW5lLmFkZChjb25lMik7XG5cbiAgICAvLyDokYnjga7mrrUzXG4gICAgY29uc3QgY29uZTMgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMC44LCAxLjUsIDgpLFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4MmU4YjU3LCBmbGF0U2hhZGluZzogdHJ1ZSB9KVxuICAgICk7XG4gICAgY29uZTMucG9zaXRpb24uc2V0KHRyZWVYLCAzLCB0cmVlWik7XG4gICAgc2NlbmUuYWRkKGNvbmUzKTtcbiAgfSk7XG59KTtcblxuXG4gLy8gLS0tIOS4uOWkquOCquODluOCuOOCpyAtLS1cbmNvbnN0IGxvZ0dyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbi8vIOS4uOWkquOBruacrOS9k++8iOWGhuafse+8iVxuY29uc3QgbG9nQm9keSA9IG5ldyBUSFJFRS5NZXNoKFxuICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjMsIDAuMywgMiwgMTYpLFxuICBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweDhiNWEyYiwgLy8g5pyo44Gu6Imy77yI54Sm44GS6Iy277yJXG4gICAgcm91Z2huZXNzOiAwLjgsXG4gICAgbWV0YWxuZXNzOiAwLjEsXG4gIH0pXG4pO1xubG9nQm9keS5yb3RhdGlvbi56ID0gTWF0aC5QSSAvIDI7IC8vIOaoquWAkuOBl+OBq1xubG9nR3JvdXAuYWRkKGxvZ0JvZHkpO1xuXG4vLyDkuKHnq6/jga7mlq3pnaLvvIjlubTovKrpoqjvvIlcbmNvbnN0IGxvZ0VuZHNNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gIGNvbG9yOiAweGRlQjg4NywgLy8g5bm06Lyq44Gj44G944GE6JaE5pyo6ImyXG4gIHJvdWdobmVzczogMC42LFxuICBtZXRhbG5lc3M6IDAuMSxcbn0pO1xuXG5jb25zdCBlbmRDYXAxID0gbmV3IFRIUkVFLk1lc2goXG4gIG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgwLjMsIDE2KSxcbiAgbG9nRW5kc01hdGVyaWFsXG4pO1xuZW5kQ2FwMS5yb3RhdGlvbi55ID0gTWF0aC5QSSAvIDI7XG5lbmRDYXAxLnBvc2l0aW9uLnNldCgxLCAwLCAwKTtcbmxvZ0dyb3VwLmFkZChlbmRDYXAxKTtcblxuY29uc3QgZW5kQ2FwMiA9IG5ldyBUSFJFRS5NZXNoKFxuICBuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkoMC4zLCAxNiksXG4gIGxvZ0VuZHNNYXRlcmlhbFxuKTtcbmVuZENhcDIucm90YXRpb24ueSA9IC1NYXRoLlBJIC8gMjtcbmVuZENhcDIucG9zaXRpb24uc2V0KC0xLCAwLCAwKTtcbmxvZ0dyb3VwLmFkZChlbmRDYXAyKTtcblxuLy8g6YWN572u5L2N572u77yI5L6L77ya5Lit5aSu77yJXG5sb2dHcm91cC5wb3NpdGlvbi5zZXQoMywgMC4xNSwgNSk7XG5zY2VuZS5hZGQobG9nR3JvdXApO1xuXG5cblxuICAvLyBTbm93IFBhcnRpY2xlc1xuICBzbm93R2VvID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gIGNvbnN0IHNub3dDb3VudCA9IDEwMDA7XG4gIGNvbnN0IHBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoc25vd0NvdW50ICogMyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc25vd0NvdW50OyBpKyspIHtcbiAgICBwb3NbaSAqIDNdID0gTWF0aC5yYW5kb20oKSAqIDEwMCAtIDUwO1xuICAgIHBvc1tpICogMyArIDFdID0gTWF0aC5yYW5kb20oKSAqIDUwO1xuICAgIHBvc1tpICogMyArIDJdID0gTWF0aC5yYW5kb20oKSAqIDEwMCAtIDUwO1xuICB9XG4gIHNub3dHZW8uc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zLCAzKSk7XG4gIGNvbnN0IHNub3dNYXQgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIHNpemU6IDAuMiB9KTtcbiAgc25vd1BhcnRpY2xlcyA9IG5ldyBUSFJFRS5Qb2ludHMoc25vd0dlbywgc25vd01hdCk7XG4gIHNjZW5lLmFkZChzbm93UGFydGljbGVzKTtcblxuXG4gIC8vIFNub3dtYW5cbmNvbnN0IHNub3dtYW4gPSBuZXcgVEhSRUUuR3JvdXAoKTtcbmNvbnN0IGJvdHRvbSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjcsIDE2LCAxNiksIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pKTtcbmNvbnN0IG1pZGRsZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjUsIDE2LCAxNiksIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pKTtcbmNvbnN0IGhlYWQgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC40LCAxNiwgMTYpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KSk7XG5taWRkbGUucG9zaXRpb24ueSA9IDAuOTtcbmhlYWQucG9zaXRpb24ueSA9IDEuNjtcbnNub3dtYW4uYWRkKGJvdHRvbSk7XG5zbm93bWFuLmFkZChtaWRkbGUpO1xuc25vd21hbi5hZGQoaGVhZCk7XG5cbi8vIEhhdFxuY29uc3QgYnJpbSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMywgMC4zLCAwLjA1LCA4KSwgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwMDAgfSkpO1xuY29uc3QgdG9wSGF0ID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4yLCAwLjIsIDAuMywgOCksIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4MDAwMDAwIH0pKTtcbmJyaW0ucG9zaXRpb24uc2V0KDAsIDEuODUsIDApO1xudG9wSGF0LnBvc2l0aW9uLnNldCgwLCAyLjA1LCAwKTtcbnNub3dtYW4uYWRkKGJyaW0pO1xuc25vd21hbi5hZGQodG9wSGF0KTtcblxuLy8gQXJtc1xuY29uc3QgbGVmdEFybSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMDMsIDAuMDMsIDEpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDhiNDUxMyB9KSk7XG5jb25zdCByaWdodEFybSA9IGxlZnRBcm0uY2xvbmUoKTtcbmxlZnRBcm0ucG9zaXRpb24uc2V0KC0wLjcsIDAuOSwgMCk7XG5sZWZ0QXJtLnJvdGF0aW9uLnogPSBNYXRoLlBJIC8gNDtcbnJpZ2h0QXJtLnBvc2l0aW9uLnNldCgwLjcsIDAuOSwgMCk7XG5yaWdodEFybS5yb3RhdGlvbi56ID0gLU1hdGguUEkgLyA0O1xuc25vd21hbi5hZGQobGVmdEFybSk7XG5zbm93bWFuLmFkZChyaWdodEFybSk7XG5cbi8vIEV5ZXNcbmNvbnN0IGV5ZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwMDAgfSk7XG5jb25zdCBsZWZ0RXllID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDUsIDgsIDgpLCBleWVNYXRlcmlhbCk7XG5jb25zdCByaWdodEV5ZSA9IGxlZnRFeWUuY2xvbmUoKTtcbmxlZnRFeWUucG9zaXRpb24uc2V0KC0wLjEsIDEuNywgMC4zOCk7XG5yaWdodEV5ZS5wb3NpdGlvbi5zZXQoMC4xLCAxLjcsIDAuMzgpO1xuc25vd21hbi5hZGQobGVmdEV5ZSk7XG5zbm93bWFuLmFkZChyaWdodEV5ZSk7XG5cbi8vIENhcnJvdCBOb3NlXG5jb25zdCBub3NlID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkNvbmVHZW9tZXRyeSgwLjA1LCAwLjIsIDgpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmYTUwMCB9KSk7XG5ub3NlLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbm5vc2UucG9zaXRpb24uc2V0KDAsIDEuNjUsIDAuNCk7XG5zbm93bWFuLmFkZChub3NlKTtcblxuLy8gTW91dGggKHNtYWxsIGRvdHMpXG5mb3IgKGxldCBpID0gLTI7IGkgPD0gMjsgaSsrKSB7XG4gIGNvbnN0IGRvdCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjAyLCA4LCA4KSwgZXllTWF0ZXJpYWwpO1xuICBkb3QucG9zaXRpb24uc2V0KGkgKiAwLjA0LCAxLjYsIDAuMzcpO1xuICBzbm93bWFuLmFkZChkb3QpO1xufVxuXG5zbm93bWFuLnBvc2l0aW9uLnNldCgtNSwgMC43LCAzKTtcbnNjZW5lLmFkZChzbm93bWFuKTtcblxubmV3IFRXRUVOLlR3ZWVuKHNub3dtYW4ucG9zaXRpb24pLnRvKHsgeDogLTMgfSwgMzAwMCkueW95byh0cnVlKS5yZXBlYXQoSW5maW5pdHkpLnN0YXJ0KCk7XG5cbi8vIENoaWxkcmVuIFNub3diYWxsIEZpZ2h0IC0gSW1wcm92ZWQgRmFjaW5nIGFuZCBNb3ZlbWVudFxuY29uc3QgbGVmdFRlYW0gPSBbXTtcbmNvbnN0IHJpZ2h0VGVhbSA9IFtdO1xuXG5jb25zdCBza2luTWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhmZmNjYWEgfSk7XG5jb25zdCBib2R5TWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHg2NmNjZmYgfSk7XG5jb25zdCBleWVNYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDAwMCB9KTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hpbGQoeCwgeiwgZmFjZURpcmVjdGlvbikge1xuICBjb25zdCBjaGlsZCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXG4gIGNvbnN0IGhlYWQgPSBuZXcgVEhSRUUuR3JvdXAoKTsgLy8g6aGUICsg55uuIOOCkuOBvuOBqOOCgeOCi1xuICBjb25zdCBmYWNlID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMiwgMTIsIDEyKSwgc2tpbk1hdCk7XG4gIGZhY2UucG9zaXRpb24ueSA9IDAuNjtcbiAgaGVhZC5hZGQoZmFjZSk7XG5cbiAgY29uc3QgZXllTGVmdCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjAyLCA4LCA4KSwgZXllTWF0KTtcbiAgY29uc3QgZXllUmlnaHQgPSBleWVMZWZ0LmNsb25lKCk7XG4gIGV5ZUxlZnQucG9zaXRpb24uc2V0KC0wLjA1LCAwLjYzLCAwLjE5KTtcbiAgZXllUmlnaHQucG9zaXRpb24uc2V0KDAuMDUsIDAuNjMsIDAuMTkpO1xuICBoZWFkLmFkZChleWVMZWZ0KTtcbiAgaGVhZC5hZGQoZXllUmlnaHQpO1xuXG4gIC8vIOWQkeOBi+OBhOWQiOOCj+OBm+OBq+OBmeOCi1xuICBoZWFkLnJvdGF0aW9uLnkgPSBmYWNlRGlyZWN0aW9uID09PSAnbGVmdCcgPyAtTWF0aC5QSSAvIDIgOiBNYXRoLlBJIC8gMjtcbiAgY2hpbGQuYWRkKGhlYWQpO1xuXG4gIGNvbnN0IGJvZHkgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDAuMiwgMC42LCA4KSwgYm9keU1hdCk7XG4gIGJvZHkucG9zaXRpb24ueSA9IDAuMztcbiAgY2hpbGQuYWRkKGJvZHkpO1xuXG4gIGNoaWxkLnBvc2l0aW9uLnNldCh4LCAwLCB6KTtcbiAgc2NlbmUuYWRkKGNoaWxkKTtcblxuICAvLyDjg6njg7Pjg4Djg6Djgarli5XjgY3nr4Tlm7Ljg7vpgJ/luqbjg7vplovlp4vmmYLplpNcbiAgY29uc3QgbW92ZUFtb3VudCA9IDAuMyArIE1hdGgucmFuZG9tKCkgKiAwLjU7XG4gIGNvbnN0IGR1cmF0aW9uID0gODAwICsgTWF0aC5yYW5kb20oKSAqIDYwMDtcbiAgY29uc3QgZGVsYXkgPSBNYXRoLnJhbmRvbSgpICogMTAwMDtcbiAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IDEgOiAtMTtcblxuICBuZXcgVFdFRU4uVHdlZW4oY2hpbGQucG9zaXRpb24pXG4gICAgLnRvKHsgeDogeCArIGRpcmVjdGlvbiAqIG1vdmVBbW91bnQgfSwgZHVyYXRpb24pXG4gICAgLnlveW8odHJ1ZSlcbiAgICAucmVwZWF0KEluZmluaXR5KVxuICAgIC5kZWxheShkZWxheSlcbiAgICAuc3RhcnQoKTtcblxuICByZXR1cm4gY2hpbGQ7XG59XG5cbi8vIOW3puODgeODvOODoFxuZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgY29uc3QgeCA9IC0zLjU7XG4gIGNvbnN0IHogPSA2ICsgaSAqIDE7XG4gIGNvbnN0IGNoaWxkID0gY3JlYXRlQ2hpbGQoeCwgeiwgJ3JpZ2h0Jyk7IC8vIOWPs+WQkeOBjeOBq+iqv+aVtFxuICBsZWZ0VGVhbS5wdXNoKGNoaWxkKTtcbn1cblxuLy8g5Y+z44OB44O844OgXG5mb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICBjb25zdCB4ID0gMy41O1xuICBjb25zdCB6ID0gNiArIGkgKiAxO1xuICBjb25zdCBjaGlsZCA9IGNyZWF0ZUNoaWxkKHgsIHosICdsZWZ0Jyk7IC8vIOW3puWQkeOBjeOBq+iqv+aVtFxuICByaWdodFRlYW0ucHVzaChjaGlsZCk7XG59XG5cbi8vIOmbqueOie+8iOW3puKGkuWPs++8iVxuY29uc3Qgc25vd2JhbGwxID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDUsIDgsIDgpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KSk7XG5zbm93YmFsbDEucG9zaXRpb24uc2V0KC0zLjUsIDEuMCwgNyk7XG5zY2VuZS5hZGQoc25vd2JhbGwxKTtcblxubmV3IFRXRUVOLlR3ZWVuKHNub3diYWxsMS5wb3NpdGlvbilcbiAgLnRvKHsgeDogMy41IH0sIDEwMDApXG4gIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lKVxuICAueW95byh0cnVlKVxuICAucmVwZWF0KEluZmluaXR5KVxuICAuc3RhcnQoKTtcblxuLy8g6Zuq546J77yI5Y+z4oaS5bem77yJXG5jb25zdCBzbm93YmFsbDIgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4wNSwgOCwgOCksIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pKTtcbnNub3diYWxsMi5wb3NpdGlvbi5zZXQoMy41LCAxLjAsIDcuNSk7XG5zY2VuZS5hZGQoc25vd2JhbGwyKTtcblxubmV3IFRXRUVOLlR3ZWVuKHNub3diYWxsMi5wb3NpdGlvbilcbiAgLnRvKHsgeDogLTMuNSB9LCAxMDAwKVxuICAuZWFzaW5nKFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZSlcbiAgLnlveW8odHJ1ZSlcbiAgLnJlcGVhdChJbmZpbml0eSlcbiAgLmRlbGF5KDUwMClcbiAgLnN0YXJ0KCk7XG5cblxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbldpbmRvd1Jlc2l6ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhvdXNlKHgsIHksIHopIHtcbiAgY29uc3QgaG91c2UgPSBuZXcgVEhSRUUuR3JvdXAoKTtcblxuICAvLyDjg5njg7zjgrnvvIjjg6zjg7Pjgqzpoqjjga7oibLvvIlcbiAgY29uc3QgYmFzZU1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmYwIH0pOyAvLyDjg6zjg7PjgqzoibJcbiAgY29uc3QgYmFzZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgzLCAyLCAzKSwgYmFzZU1hdCk7XG4gIGJhc2UucG9zaXRpb24ueSA9IDE7XG4gIGhvdXNlLmFkZChiYXNlKTtcblxuICAvLyDlsYvmoLnvvIjoo4Xpo77jgaTjgY3vvIlcbiAgY29uc3Qgcm9vZk1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4OGIwMDAwIH0pOyAvLyDmt7HotaRcbiAgY29uc3Qgcm9vZiA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMi41LCAxLjIsIDQpLCByb29mTWF0KTtcbiAgcm9vZi5yb3RhdGlvbi55ID0gTWF0aC5QSSAvIDQ7XG4gIHJvb2YucG9zaXRpb24ueSA9IDIuNjtcbiAgaG91c2UuYWRkKHJvb2YpO1xuXG4gIC8vIOeFmeeqgVxuICBjb25zdCBjaGltbmV5ID0gbmV3IFRIUkVFLk1lc2goXG4gICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuNCwgMS4yLCAwLjQpLFxuICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4NDQ0NDQ0IH0pXG4gICk7XG4gIGNoaW1uZXkucG9zaXRpb24uc2V0KDEsIDMsIC0xKTtcbiAgaG91c2UuYWRkKGNoaW1uZXkpO1xuXG4gIC8vIOeFme+8iOODq+ODvOODl+OCouODi+ODoeODvOOCt+ODp+ODs++8iVxuICBjb25zdCBzbW9rZU1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhjY2NjY2MsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgb3BhY2l0eTogMC42LFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICBjb25zdCBzbW9rZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjIpLCBzbW9rZU1hdC5jbG9uZSgpKTtcbiAgICBzbW9rZS5wb3NpdGlvbi5zZXQoMSwgMyArIGkgKiAwLjEsIC0xKTtcbiAgICBob3VzZS5hZGQoc21va2UpO1xuXG4gICAgY29uc3QgdG8gPSB7IHk6IDUgKyBpICogMC41IH07XG4gICAgbmV3IFRXRUVOLlR3ZWVuKHNtb2tlLnBvc2l0aW9uKVxuICAgICAgLnRvKHRvLCAzMDAwICsgaSAqIDMwMClcbiAgICAgIC5yZXBlYXQoSW5maW5pdHkpXG4gICAgICAueW95byh0cnVlKVxuICAgICAgLnN0YXJ0KCk7XG5cbiAgICBuZXcgVFdFRU4uVHdlZW4oc21va2UubWF0ZXJpYWwpXG4gICAgICAudG8oeyBvcGFjaXR5OiAwIH0sIDMwMDAgKyBpICogMzAwKVxuICAgICAgLnJlcGVhdChJbmZpbml0eSlcbiAgICAgIC55b3lvKHRydWUpXG4gICAgICAuc3RhcnQoKTtcbiAgfVxuXG4gIC8vIOeqk+e0oOadkO+8iOiWhOOBhOawtOiJsu+8iVxuY29uc3Qgd2luZG93TWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICBjb2xvcjogMHhjY2YyZmYsXG4gIHRyYW5zcGFyZW50OiB0cnVlLFxuICBvcGFjaXR5OiAwLjdcbn0pO1xuXG4vLyDnqpPjg5Xjg6zjg7zjg6DntKDmnZDvvIjjg4Djg7zjgq/jgrDjg6zjg7zvvIlcbmNvbnN0IGZyYW1lTWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHgzMzMzMzMgfSk7XG5cbmZvciAobGV0IGkgPSAtMTsgaSA8PSAxOyBpICs9IDIpIHtcbiAgY29uc3Qgd2luZG93R3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcblxuICAvLyDjgqzjg6njgrnmnKzkvZNcbiAgY29uc3QgZ2xhc3MgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgwLjYsIDAuNiksIHdpbmRvd01hdCk7XG4gIHdpbmRvd0dyb3VwLmFkZChnbGFzcyk7XG5cbiAgLy8g5Y2B5a2X5qC85a2Q77yI57im77yJXG4gIGNvbnN0IHZlcnRpY2FsQmFyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMC4wNSwgMC42KSxcbiAgICBmcmFtZU1hdFxuICApO1xuICB3aW5kb3dHcm91cC5hZGQodmVydGljYWxCYXIpO1xuXG4gIC8vIOWNgeWtl+agvOWtkO+8iOaoqu+8iVxuICBjb25zdCBob3Jpem9udGFsQmFyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMC42LCAwLjA1KSxcbiAgICBmcmFtZU1hdFxuICApO1xuICB3aW5kb3dHcm91cC5hZGQoaG9yaXpvbnRhbEJhcik7XG5cbiAgLy8g56uL5L2T55qE44Gq44OV44OB77yINOacrOOBruaeoO+8iVxuICBjb25zdCBmcmFtZVRoaWNrbmVzcyA9IDAuMDU7XG4gIGNvbnN0IGZyYW1lRGVwdGggPSAwLjA1O1xuXG4gIC8vIOS4iuaeoFxuICBjb25zdCB0b3BGcmFtZSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjYgKyBmcmFtZVRoaWNrbmVzcyAqIDIsIGZyYW1lVGhpY2tuZXNzLCBmcmFtZURlcHRoKSxcbiAgICBmcmFtZU1hdFxuICApO1xuICB0b3BGcmFtZS5wb3NpdGlvbi5zZXQoMCwgMC4zICsgZnJhbWVUaGlja25lc3MgLyAyLCBmcmFtZURlcHRoIC8gMik7XG4gIHdpbmRvd0dyb3VwLmFkZCh0b3BGcmFtZSk7XG5cbiAgLy8g5LiL5p6gXG4gIGNvbnN0IGJvdHRvbUZyYW1lID0gdG9wRnJhbWUuY2xvbmUoKTtcbiAgYm90dG9tRnJhbWUucG9zaXRpb24ueSA9IC0wLjMgLSBmcmFtZVRoaWNrbmVzcyAvIDI7XG4gIHdpbmRvd0dyb3VwLmFkZChib3R0b21GcmFtZSk7XG5cbiAgLy8g5bem5p6gXG4gIGNvbnN0IGxlZnRGcmFtZSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShmcmFtZVRoaWNrbmVzcywgMC42LCBmcmFtZURlcHRoKSxcbiAgICBmcmFtZU1hdFxuICApO1xuICBsZWZ0RnJhbWUucG9zaXRpb24uc2V0KC0wLjMgLSBmcmFtZVRoaWNrbmVzcyAvIDIsIDAsIGZyYW1lRGVwdGggLyAyKTtcbiAgd2luZG93R3JvdXAuYWRkKGxlZnRGcmFtZSk7XG5cbiAgLy8gLy8g5Y+z5p6gXG4gIGNvbnN0IHJpZ2h0RnJhbWUgPSBsZWZ0RnJhbWUuY2xvbmUoKTtcbiAgcmlnaHRGcmFtZS5wb3NpdGlvbi54ID0gMC4zICsgZnJhbWVUaGlja25lc3MgLyAyO1xuICB3aW5kb3dHcm91cC5hZGQocmlnaHRGcmFtZSk7XG5cbiAgLy8g56qT44Gu5L2N572u77yI5a6244Gu5q2j6Z2i77yJXG4gIHdpbmRvd0dyb3VwLnBvc2l0aW9uLnNldChpICogMC44LCAxLjIsIDEuNTEpO1xuICBob3VzZS5hZGQod2luZG93R3JvdXApO1xufVxuXG5cbiAgLy8g44OJ44Ki77yI5Y+W44Gj5omL5LuY44GN77yJXG4gIGNvbnN0IGRvb3JNYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDY2MzMwMCB9KTtcbiAgY29uc3QgZG9vciA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDAuOCwgMS4yKSwgZG9vck1hdCk7XG4gIGRvb3IucG9zaXRpb24uc2V0KDAsIDAuNiwgMS41MSk7XG4gIGhvdXNlLmFkZChkb29yKTtcblxuICBjb25zdCBrbm9iID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDUpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGFhYWFhYSB9KSk7XG4gIGtub2IucG9zaXRpb24uc2V0KDAuMywgMC42LCAxLjUyKTtcbiAgaG91c2UuYWRkKGtub2IpO1xuXG4gIFxuXG4gIGhvdXNlLnBvc2l0aW9uLnNldCh4LCB5LCB6KTtcbiAgc2NlbmUuYWRkKGhvdXNlKTtcbn1cblxuXG5mdW5jdGlvbiBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIGNvbnN0IGRlbHRhID0gY2xvY2suZ2V0RGVsdGEoKTtcbiAgVFdFRU4udXBkYXRlKCk7XG4gIGNvbnN0IHBvcyA9IHNub3dHZW8uYXR0cmlidXRlcy5wb3NpdGlvbjtcbiAgY29uc3QgY291bnQgPSBwb3MuY291bnQ7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGxldCB5ID0gcG9zLmdldFkoaSkgLSAwLjE7XG4gICAgaWYgKHkgPCAwKSB5ID0gNTA7XG4gICAgcG9zLnNldFkoaSwgeSk7XG4gIH1cbiAgcG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHItNzhkMzkyXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9