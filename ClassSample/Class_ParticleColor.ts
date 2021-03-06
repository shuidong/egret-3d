﻿module egret3d {
    export class Class_ParticleColor extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;

        private cube: Mesh; 
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            var planemat: TextureMaterial = new TextureMaterial();
            var loadtex1: URLLoader = new URLLoader("resource/floor/brick-diffuse.jpg");
            loadtex1.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex1["mat"] = planemat;

            this.cube = new Mesh( new CubeGeometry(10,10,10) , null );

            var mat: TextureMaterial = new TextureMaterial();
            mat.ambientColor = 0xffffff;

            var data: ParticleData = new ParticleData();
            data.lifeMax = data.lifeMin = 2;
            data.rate = 20;

            this.particle = new ParticleEmitter(data, null, mat);
            this.particle.loop = true;

            //var uniformSpeed: ParticleUniformSpeedNode = new ParticleUniformSpeedNode();
            //uniformSpeed.speedShape = new Vec3ConstValueShape();
            //(<Vec3ConstValueShape>uniformSpeed.speedShape).minX = 0;
            //(<Vec3ConstValueShape>uniformSpeed.speedShape).minY = 100;
            //(<Vec3ConstValueShape>uniformSpeed.speedShape).minZ = 0;
            //this.particle.addAnimNode(uniformSpeed);

            var vel: ParticleAccelerationSpeedNode = new ParticleAccelerationSpeedNode();
            vel.speedShape = new Vec3ConstRandomValueShape();
            (<Vec3ConstRandomValueShape>vel.speedShape).minX = 0;//-100;
            (<Vec3ConstRandomValueShape>vel.speedShape).minY = 0;//-100;
            (<Vec3ConstRandomValueShape>vel.speedShape).minZ = 0;//-100;
            (<Vec3ConstRandomValueShape>vel.speedShape).maxX = 0;//100;
            (<Vec3ConstRandomValueShape>vel.speedShape).maxY = 0;//100;
            (<Vec3ConstRandomValueShape>vel.speedShape).maxZ = 0;//100;
            this.particle.addAnimNode(vel);

            //var particleColor_global_Node: ParticleColorGlobalNode = new ParticleColorGlobalNode();
            //this.particle.addAnimNode(particleColor_global_Node);


            //var particleSizeGlobalNode: ParticleSizeGlobalNode = new ParticleSizeGlobalNode();
            //this.particle.addAnimNode(particleSizeGlobalNode);

            this.particle.play();
            this.view1.addChild3D(this.particle);
           
            this.particle.followTarget = this.cube ;

            var loadtex: URLLoader = new URLLoader("resource/effect/ice_0001.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;

            var vv: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            vv.type = "submit";
            vv.value = "rest";
            document.body.appendChild(vv);
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);
            
        }

        protected mouseDown(e: MouseEvent) {
            this.particle.play();
        }

        protected obj: Object3D;
        protected onLoadTexture(e: LoaderEvent3D) {
           e.loader["mat"].diffuseTexture = e.loader.data;
        }

        private angle: number = 0; 
        public update(e: Event3D) {
            this.cameraCrl.update();
            //this.obj.rotationY++;
            this.angle += 0.02;
            this.cube.x = Math.cos(this.angle) * 300;
            this.cube.z = Math.sin(this.angle) * 300;

        }

    }
} 