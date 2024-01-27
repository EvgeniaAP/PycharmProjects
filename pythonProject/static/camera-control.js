export class CameraControl {


    constructor(renderer, camera, updateCallback){
        this.zoomMode = false
    this.press = false
    this.sensitivity = 0.02
        renderer.domElement.addEventListener('mousemove', event => {
            if(!this.press){ return }

            if(event.button == 0){
                camera.position.y -= event.movementY * this.sensitivity
                camera.position.x -= event.movementX * this.sensitivity
            } else if(event.button == 2){
                camera.quaternion.y -= event.movementX * this.sensitivity/10
                camera.quaternion.x -= event.movementY * this.sensitivity/10
            }

            updateCallback()
        })

        renderer.domElement.addEventListener('mousedown', () => { this.press = true })
        renderer.domElement.addEventListener('mouseup', () => { this.press = false })
        renderer.domElement.addEventListener('mouseleave', () => { this.press = false })

        document.addEventListener('keydown', event => {
            if(event.key == 'Shift'){
                this.zoomMode = true
            }
        })

        document.addEventListener('keyup', event => {
            if(event.key == 'Shift'){
                this.zoomMode = false
            }
        })

        renderer.domElement.addEventListener('mousewheel', event => {
            if(this.zoomMode){
                camera.fov += event.wheelDelta * this.sensitivity
                camera.updateProjectionMatrix()
            } else {
                camera.position.z += event.wheelDelta * this.sensitivity
            }

            updateCallback()
        })
    }
}


//import * as THREE from 'three';
//import { threejsLessonUtils } from './threejs-lesson-utils.js';
//
//{
//
//	function addShape( color, geometry ) {
//
//		const material = new THREE.MeshPhongMaterial( { color } );
//		return new THREE.Mesh( geometry, material );
//
//	}
//
//	threejsLessonUtils.addDiagrams( {
//		shapeCube: {
//			create() {
//
//				const width = 8;
//				const height = 8;
//				const depth = 8;
//				return addShape( 'hsl(150,100%,40%)', new THREE.BoxGeometry( width, height, depth ) );
//
//			},
//		},
//		shapeCone: {
//			create() {
//
//				const radius = 6;
//				const height = 8;
//				const segments = 24;
//				return addShape( 'hsl(160,100%,40%)', new THREE.ConeGeometry( radius, height, segments ) );
//
//			},
//		},
//		shapeCylinder: {
//			create() {
//
//				const radiusTop = 4;
//				const radiusBottom = 4;
//				const height = 8;
//				const radialSegments = 24;
//				return addShape( 'hsl(170,100%,40%)', new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radialSegments ) );
//
//			},
//		},
//		shapeSphere: {
//			create() {
//
//				const radius = 5;
//				const widthSegments = 24;
//				const heightSegments = 16;
//				return addShape( 'hsl(180,100%,40%)', new THREE.SphereGeometry( radius, widthSegments, heightSegments ) );
//
//			},
//		},
//		shapeFrustum: {
//			create() {
//
//				const width = 8;
//				const height = 8;
//				const depth = 8;
//				const geometry = new THREE.BoxGeometry( width, height, depth );
//				const perspMat = new THREE.Matrix4();
//				perspMat.makePerspective( - 3, 3, - 3, 3, 4, 12 );
//				const inMat = new THREE.Matrix4();
//				inMat.makeTranslation( 0, 0, 8 );
//
//				const mat = new THREE.Matrix4();
//				mat.multiply( perspMat );
//				mat.multiply( inMat );
//
//				geometry.applyMatrix4( mat );
//				geometry.computeBoundingBox();
//				geometry.center();
//				geometry.scale( 3, 3, 3 );
//				geometry.rotateY( Math.PI );
//				geometry.computeVertexNormals();
//
//				return addShape( 'hsl(190,100%,40%)', geometry );
//
//			},
//		},
//	} );
//
//}








//
//import * as THREE from 'three';
//import { OrbitControls } from '../../examples/jsm/controls/OrbitControls.js';
//
//export const threejsLessonUtils = {
//	_afterPrettifyFuncs: [],
//	init( options = { threejsOptions: {} } ) {
//
//		if ( this.renderer ) {
//
//			return;
//
//		}
//
//		const canvas = document.createElement( 'canvas' );
//		canvas.id = 'c';
//		document.body.appendChild( canvas );
//		const renderer = new THREE.WebGLRenderer( {
//			canvas,
//			alpha: true,
//			antialias: true,
//			powerPreference: 'low-power',
//			...options.threejsOptions,
//		} );
//		this.pixelRatio = window.devicePixelRatio;
//
//		this.renderer = renderer;
//		this.elemToRenderFuncMap = new Map();
//
//		const resizeRendererToDisplaySize = ( renderer ) => {
//
//			const canvas = renderer.domElement;
//			const width = canvas.clientWidth * this.pixelRatio | 0;
//			const height = canvas.clientHeight * this.pixelRatio | 0;
//			const needResize = canvas.width !== width || canvas.height !== height;
//			if ( needResize ) {
//
//				renderer.setSize( width, height, false );
//
//			}
//
//			return needResize;
//
//		};
//
//		const clearColor = new THREE.Color( '#000' );
//		let needsUpdate = true;
//		let rafRequestId;
//		let rafRunning;
//
//		const render = ( time ) => {
//
//			rafRequestId = undefined;
//			time *= 0.001;
//
//			const resized = resizeRendererToDisplaySize( renderer );
//
//			// only update if we drew last time
//			// so the browser will not recomposite the page
//			// of nothing is being drawn.
//			if ( needsUpdate ) {
//
//				needsUpdate = false;
//
//				renderer.setScissorTest( false );
//				renderer.setClearColor( clearColor, 0 );
//				renderer.clear( true, true );
//				renderer.setScissorTest( true );
//
//			}
//
//			this.elementsOnScreen.forEach( elem => {
//
//				const fn = this.elemToRenderFuncMap.get( elem );
//				const wasRendered = fn( renderer, time, resized );
//				needsUpdate = needsUpdate || wasRendered;
//
//			} );
//
//			if ( needsUpdate ) {
//
//				// maybe there is another way. Originally I used `position: fixed`
//				// but the problem is if we can't render as fast as the browser
//				// scrolls then our shapes lag. 1 or 2 frames of lag isn't too
//				// horrible but iOS would often been 1/2 a second or worse.
//				// By doing it this way the canvas will scroll which means the
//				// worse that happens is part of the shapes scrolling on don't
//				// get drawn for a few frames but the shapes that are on the screen
//				// scroll perfectly.
//				//
//				// I'm using `transform` on the voodoo that it doesn't affect
//				// layout as much as `top` since AFAIK setting `top` is in
//				// the flow but `transform` is not though thinking about it
//				// the given we're `position: absolute` maybe there's no difference?
//				const transform = `translateY(${window.scrollY}px)`;
//				renderer.domElement.style.transform = transform;
//
//			}
//
//			if ( rafRunning ) {
//
//				startRAFLoop();
//
//			}
//
//		};
//
//		function startRAFLoop() {
//
//			rafRunning = true;
//			if ( ! rafRequestId ) {
//
//				rafRequestId = requestAnimationFrame( render );
//
//			}
//
//		}
//
//		this.elementsOnScreen = new Set();
//		this.intersectionObserver = new IntersectionObserver( ( entries ) => {
//
//			entries.forEach( entry => {
//
//				if ( entry.isIntersecting ) {
//
//					this.elementsOnScreen.add( entry.target );
//
//				} else {
//
//					this.elementsOnScreen.delete( entry.target );
//
//				}
//				// Each entry describes an intersection change for one observed
//				// target element:
//				//   entry.boundingClientRect
//				//   entry.intersectionRatio
//				//   entry.intersectionRect
//				//   entry.isIntersecting
//				//   entry.rootBounds
//				//   entry.target
//				//   entry.time
//
//			} );
//			if ( this.elementsOnScreen.size > 0 ) {
//
//				startRAFLoop();
//
//			} else {
//
//				rafRunning = false;
//
//			}
//
//		} );
//
//
//	},
//	addDiagrams( diagrams ) {
//
//		[ ...document.querySelectorAll( '[data-diagram]' ) ].forEach( ( elem ) => {
//
//			const name = elem.dataset.diagram;
//			const info = diagrams[ name ];
//			if ( ! info ) {
//
//				throw new Error( `no diagram: ${name}` );
//
//			}
//
//			this.addDiagram( elem, info );
//
//		} );
//
//	},
//	addDiagram( elem, info ) {
//
//		this.init();
//
//		const scene = new THREE.Scene();
//		let targetFOVDeg = 60;
//		const aspect = 1;
//		const near = 0.1;
//		const far = 50;
//		let camera = new THREE.PerspectiveCamera( targetFOVDeg, aspect, near, far );
//		camera.position.z = 15;
//		scene.add( camera );
//
//		const root = new THREE.Object3D();
//		scene.add( root );
//
//		const renderInfo = {
//			pixelRatio: this.pixelRatio,
//			camera,
//			scene,
//			root,
//			renderer: this.renderer,
//			elem,
//		};
//
//		const obj3D = info.create( { scene, camera, renderInfo } );
//		const promise = ( obj3D instanceof Promise ) ? obj3D : Promise.resolve( obj3D );
//
//		const updateFunctions = [];
//		const resizeFunctions = [];
//
//		const settings = {
//			lights: true,
//			trackball: true,
//			// resize(renderInfo) {
//			// },
//			// update(time, renderInfo) {
//			// },
//			render( renderInfo ) {
//
//				renderInfo.renderer.render( renderInfo.scene, renderInfo.camera );
//
//			},
//		};
//
//		promise.then( ( result ) => {
//
//			const info = result instanceof THREE.Object3D ? {
//				obj3D: result,
//			} : result;
//			if ( info.obj3D ) {
//
//				root.add( info.obj3D );
//
//			}
//
//			if ( info.update ) {
//
//				updateFunctions.push( info.update );
//
//			}
//
//			if ( info.resize ) {
//
//				resizeFunctions.push( info.resize );
//
//			}
//
//			if ( info.camera ) {
//
//				camera = info.camera;
//				renderInfo.camera = camera;
//
//			}
//
//			Object.assign( settings, info );
//			targetFOVDeg = camera.fov;
//
//			if ( settings.trackball !== false ) {
//
//				const controls = new OrbitControls( camera, elem );
//				controls.rotateSpeed = 1 / 6;
//				controls.enableZoom = false;
//				controls.enablePan = false;
//				elem.removeAttribute( 'tabIndex' );
//				//resizeFunctions.push(controls.handleResize.bind(controls));
//				updateFunctions.push( controls.update.bind( controls ) );
//
//			}
//
//			// add the lights as children of the camera.
//			// this is because TrackballControls move the camera.
//			// We really want to rotate the object itself but there's no
//			// controls for that so we fake it by putting all the lights
//			// on the camera so they move with it.
//			if ( settings.lights !== false ) {
//
//				camera.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444, .5 ) );
//				const light = new THREE.DirectionalLight( 0xffffff, 1 );
//				light.position.set( - 1, 2, 4 - 15 );
//				camera.add( light );
//
//			}
//
//		} );
//
//		let oldWidth = - 1;
//		let oldHeight = - 1;
//
//		const render = ( renderer, time ) => {
//
//			root.rotation.x = time * .1;
//			root.rotation.y = time * .11;
//
//			const rect = elem.getBoundingClientRect();
//			if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
//          rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {
//
//				return false;
//
//			}
//
//			renderInfo.width = rect.width * this.pixelRatio;
//			renderInfo.height = rect.height * this.pixelRatio;
//			renderInfo.left = rect.left * this.pixelRatio;
//			renderInfo.bottom = ( renderer.domElement.clientHeight - rect.bottom ) * this.pixelRatio;
//
//			if ( renderInfo.width !== oldWidth || renderInfo.height !== oldHeight ) {
//
//				oldWidth = renderInfo.width;
//				oldHeight = renderInfo.height;
//				resizeFunctions.forEach( fn => fn( renderInfo ) );
//
//			}
//
//			updateFunctions.forEach( fn => fn( time, renderInfo ) );
//
//			const aspect = renderInfo.width / renderInfo.height;
//			const fovDeg = aspect >= 1
//				? targetFOVDeg
//				: THREE.MathUtils.radToDeg( 2 * Math.atan( Math.tan( THREE.MathUtils.degToRad( targetFOVDeg ) * .5 ) / aspect ) );
//
//			camera.fov = fovDeg;
//			camera.aspect = aspect;
//			camera.updateProjectionMatrix();
//
//			renderer.setViewport( renderInfo.left, renderInfo.bottom, renderInfo.width, renderInfo.height );
//			renderer.setScissor( renderInfo.left, renderInfo.bottom, renderInfo.width, renderInfo.height );
//
//			settings.render( renderInfo );
//
//			return true;
//
//		};
//
//		this.intersectionObserver.observe( elem );
//		this.elemToRenderFuncMap.set( elem, render );
//
//	},
//	onAfterPrettify( fn ) {
//
//		this._afterPrettifyFuncs.push( fn );
//
//	},
//	afterPrettify() {
//
//		this._afterPrettifyFuncs.forEach( ( fn ) => {
//
//			fn();
//
//		} );
//
//	},
//};
//
//window.threejsLessonUtils = threejsLessonUtils;
