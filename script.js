import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const planets = [
    {
        name: "Merkurius",
        color: 0x999999,
        size: 0.38,
        distance: 5,
        speed: 0.047,
        description:
            "Merkurius adalah planet terkecil dan planet yang paling dekat dengan Matahari. Permukaannya dipenuhi kawah dan memiliki perubahan suhu yang sangat ekstrem."
    },
    {
        name: "Venus",
        color: 0xe5b567,
        size: 0.65,
        distance: 7,
        speed: 0.035,
        description:
            "Venus merupakan planet terpanas di Tata Surya. Atmosfernya sangat tebal dan didominasi karbon dioksida sehingga panas terperangkap di permukaannya."
    },
    {
        name: "Bumi",
        color: 0x2878d0,
        size: 0.7,
        distance: 10,
        speed: 0.025,
        description:
            "Bumi adalah tempat tinggal manusia dan berbagai makhluk hidup yang diketahui. Planet ini memiliki air dalam bentuk cair serta atmosfer yang mendukung kehidupan."
    },
    {
        name: "Mars",
        color: 0xc75b35,
        size: 0.53,
        distance: 13,
        speed: 0.020,
        description:
            "Mars dikenal sebagai Planet Merah karena warna permukaannya. Planet ini menjadi salah satu tujuan utama penelitian dan eksplorasi robotik."
    },
    {
        name: "Jupiter",
        color: 0xc99a72,
        size: 1.8,
        distance: 18,
        speed: 0.012,
        description:
            "Jupiter adalah planet terbesar di Tata Surya. Planet ini merupakan raksasa gas dan memiliki badai besar yang dikenal sebagai Bintik Merah Besar."
    },
    {
        name: "Saturnus",
        color: 0xd9c18c,
        size: 1.5,
        distance: 24,
        speed: 0.009,
        description:
            "Saturnus merupakan planet raksasa gas yang terkenal karena sistem cincinnya. Cincin tersebut tersusun terutama dari bongkahan es dan batuan."
    },
    {
        name: "Uranus",
        color: 0x7ed9dc,
        size: 1.05,
        distance: 29,
        speed: 0.006,
        description:
            "Uranus adalah planet raksasa es dengan warna biru kehijauan. Sumbu rotasinya sangat miring sehingga planet ini tampak seperti berputar menyamping."
    },
    {
        name: "Neptunus",
        color: 0x3155db,
        size: 1.02,
        distance: 34,
        speed: 0.004,
        description:
            "Neptunus merupakan planet kedelapan dan terjauh dari Matahari. Planet ini memiliki atmosfer dingin serta angin yang dapat bergerak sangat kencang."
    }
];

const planetList = document.getElementById("planet-list");

if (planetList) {

    planets.forEach((planet) => {

        const item = document.createElement("article");

        item.className = "planet-item";

        item.innerHTML = `
            <h3>${planet.name}</h3>
            <p>${planet.description}</p>
        `;

        planetList.appendChild(item);

    });
}

const facts = [
    "Jupiter merupakan planet terbesar di Tata Surya.",
    "Satu hari di Venus lebih lama daripada satu tahunnya.",
    "Matahari mengandung hampir seluruh massa Tata Surya.",
    "Cincin Saturnus tersusun terutama dari es dan pecahan batuan.",
    "Neptunus memiliki angin yang dapat bergerak sangat kencang.",
    "Bulan adalah satelit alami Bumi.",
    "Cahaya Matahari membutuhkan sekitar 8 menit 20 detik untuk mencapai Bumi.",
    "Jejak kaki astronaut di Bulan dapat bertahan sangat lama karena tidak ada angin seperti di Bumi.",
    "Jupiter memiliki banyak satelit alami yang telah ditemukan.",
    "Bintang-bintang yang kita lihat di langit berada pada jarak yang berbeda-beda dari Bumi."
];

const factElement = document.getElementById("random-fact");

const nextFactButton = document.getElementById("next-fact");

function showRandomFact() {

    const randomIndex = Math.floor(
        Math.random() * facts.length
    );

    if (factElement) {
        factElement.textContent = facts[randomIndex];
    }
}

if (nextFactButton) {
    nextFactButton.addEventListener("click", showRandomFact);
}

showRandomFact();

const container = document.getElementById(
    "solar-system-container"
);

if (container) {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x050816);

    const camera = new THREE.PerspectiveCamera(
        60,
        (container.clientWidth || window.innerWidth) /
            (container.clientHeight || 500),
        0.1,
        1000
    );

    camera.position.set(0, 28, 55);

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setSize(
        container.clientWidth || window.innerWidth,
        container.clientHeight || 500
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        0.5
    );

    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(
        0xffffff,
        3000,
        300
    );

    scene.add(sunLight);

    const sunGeometry = new THREE.SphereGeometry(
        2.8,
        64,
        64
    );

    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa22
    });

    const sun = new THREE.Mesh(
        sunGeometry,
        sunMaterial
    );

    scene.add(sun);

    const sunGlow = new THREE.PointLight(
        0xffaa33,
        180,
        100
    );

    scene.add(sunGlow);

    const starGeometry = new THREE.BufferGeometry();

    const starPositions = [];

    for (let i = 0; i < 3000; i++) {

        starPositions.push(
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500
        );

    }

    starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            starPositions,
            3
        )
    );

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.45
    });

    const stars = new THREE.Points(
        starGeometry,
        starMaterial
    );

    scene.add(stars);

    const planetObjects = [];

    planets.forEach((data) => {

        const geometry = new THREE.SphereGeometry(
            data.size,
            48,
            48
        );

        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.9,
            metalness: 0
        });

        const planet = new THREE.Mesh(
            geometry,
            material
        );

        planet.userData = data;

        planet.position.x = data.distance;

        scene.add(planet);

        planetObjects.push({
            mesh: planet,
            data: data,
            angle: Math.random() * Math.PI * 2
        });

        const orbitGeometry = new THREE.BufferGeometry();

        const orbitPoints = [];

        for (let i = 0; i <= 128; i++) {

            const angle = (i / 128) * Math.PI * 2;

            orbitPoints.push(
                new THREE.Vector3(
                    Math.cos(angle) * data.distance,
                    0,
                    Math.sin(angle) * data.distance
                )
            );

        }

        orbitGeometry.setFromPoints(orbitPoints);

        const orbitMaterial = new THREE.LineBasicMaterial({
            color: 0x343c59,
            transparent: true,
            opacity: 0.5
        });

        const orbit = new THREE.LineLoop(
            orbitGeometry,
            orbitMaterial
        );

        scene.add(orbit);

        if (data.name === "Saturnus") {

            const ringGeometry = new THREE.RingGeometry(
                data.size * 1.35,
                data.size * 2.1,
                96
            );

            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xd6c49a,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });

            const ring = new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );

            ring.rotation.x = Math.PI / 2.5;

            planet.add(ring);

        }

    });

    const raycaster = new THREE.Raycaster();

    const pointer = new THREE.Vector2();

    const planetName = document.getElementById("planet-name");

    const planetDescription = document.getElementById(
        "planet-description"
    );

    renderer.domElement.addEventListener("click", (event) => {

        const rect = renderer.domElement.getBoundingClientRect();

        pointer.x =
            ((event.clientX - rect.left) / rect.width) * 2 - 1;

        pointer.y =
            -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);

        const objects = planetObjects.map((planetObject) => {
            return planetObject.mesh;
        });

        const hits = raycaster.intersectObjects(objects, true);

        if (hits.length > 0) {

            let selectedObject = hits[0].object;

            while (
                selectedObject &&
                !selectedObject.userData.name &&
                selectedObject.parent
            ) {
                selectedObject = selectedObject.parent;
            }

            const selected = selectedObject.userData;

            if (planetName) {
                planetName.textContent = selected.name;
            }

            if (planetDescription) {
                planetDescription.textContent = selected.description;
            }

        }

    });

    let dragging = false;

    let previousX = 0;
    let previousY = 0;

    renderer.domElement.addEventListener(
        "pointerdown",
        (event) => {

            dragging = true;

            previousX = event.clientX;
            previousY = event.clientY;

            renderer.domElement.setPointerCapture(event.pointerId);

        }
    );

    renderer.domElement.addEventListener(
        "pointermove",
        (event) => {

            if (!dragging) return;

            const dx = event.clientX - previousX;
            const dy = event.clientY - previousY;

            scene.rotation.y += dx * 0.003;
            scene.rotation.x += dy * 0.003;

            previousX = event.clientX;
            previousY = event.clientY;

        }
    );

    renderer.domElement.addEventListener(
        "pointerup",
        () => {

            dragging = false;

        }
    );

    renderer.domElement.addEventListener(
        "pointercancel",
        () => {
            dragging = false;
        }
    );

    renderer.domElement.addEventListener(
        "wheel",
        (event) => {

            camera.position.z += event.deltaY * 0.03;

            camera.position.z = THREE.MathUtils.clamp(
                camera.position.z,
                12,
                120
            );

        },
        { passive: true }
    );

    function animate() {

        requestAnimationFrame(animate);

        sun.rotation.y += 0.002;

        stars.rotation.y += 0.0001;

        planetObjects.forEach((object) => {

            object.angle += object.data.speed * 0.01;

            object.mesh.position.x =
                Math.cos(object.angle) * object.data.distance;

            object.mesh.position.z =
                Math.sin(object.angle) * object.data.distance;

            object.mesh.rotation.y += 0.01;

        });

        renderer.render(scene, camera);

    }

    animate();

    window.addEventListener("resize", () => {

        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || 500;

        camera.aspect = width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(width, height);

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, 2)
        );

    });

    const loadingElement = document.getElementById("loading");

    if (loadingElement) {
        loadingElement.style.display = "none";
    }

    console.log("KOSMO berhasil dijalankan!");
    console.log("Three.js Solar System aktif.");
    console.log("Jumlah planet:", planets.length);

} else {

    console.warn(
        "Simulasi KOSMO tidak dijalankan: elemen #solar-system-container tidak ditemukan."
    );

      }
