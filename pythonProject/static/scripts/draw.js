import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';


export class Drawer {
    renderer = null;
    camera = null;
    scene = null;
    controls = null;


    constructor(canvas) {
      this.scene = new THREE.Scene();

      this.initCamera()
      this.renderer = new THREE.WebGLRenderer( { antialias: true, canvas: document.getElementById('fig') } );
      this.animate = this.animate.bind(this)
    }

    initCamera() {
        const fov = 75;
        const aspect = 1;
        const near = 0.1;
        const far = 5;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 2;
    }

    addGeometry(gString) {
//        const loader = new THREE.TextureLoader();
//        const texture = loader.load( 'textures/sprites/disc.png' );
//        texture.colorSpace = THREE.SRGBColorSpace;

const geometry = this.getGeometry(gString)
const material = new THREE.MeshBasicMaterial( {color: 0x00fff0} );
material.opacity = 0.8
material.transparent = true
const cube = new THREE.Mesh( geometry, material );

const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
 this.scene.add( line );

        this.scene.add( cube );
    }

    draw() {
        this.renderer.render(this.scene, this.camera);
    }

    addControls() {
//       this.controls = new CameraControl(this.renderer, this.camera, () => {
//        // you might want to rerender on camera update if you are not rerendering all the time
//            window.requestAnimationFrame(() => this.renderer.render(this.scene, this.camera))
//        })
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
//        this.controls.minDistance = 20;
//        this.controls.maxDistance = 50;
//        this.controls.maxPolarAngle = Math.PI / 2;
    }

    addLight() {
        this.scene.add( new THREE.AmbientLight( 0x666666 ) );
        const light = new THREE.PointLight( 0xffffff, 0, 0, 2 );
        this.camera.add( light );
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    getGeometry(gString) {
        switch(gString) {
            case 'cube':
                return new THREE.BoxGeometry( 1, 1, 1 );
            case 'sphere':
                return new THREE.SphereGeometry( 1, 64, 32 );
            case 'icos':
                return new THREE.IcosahedronGeometry( 1, 0 );
            case 'pyro':
                return new THREE.ConeGeometry( 1, 1,4 );
            case 'cone':
                return new THREE.ConeGeometry( 1, 1, 64 );
        }

    }
}
