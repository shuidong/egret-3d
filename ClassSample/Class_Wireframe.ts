﻿module egret3d {
    export class Class_Wireframe extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var wir: egret3d.Wireframe = new egret3d.Wireframe();
            wir.material.diffuseColor = 0xffffff;
            wir.material.ambientColor = 0xffffff;
            this.view1.addChild3D(wir);

            var geom: egret3d.Geometry = wir.geometry;

            var width: number = 200;
            var height: number = 200;

            var row: number = 10;
            var col: number = 10;

            var point_row: number = row + 1;
            var point_col: number = col + 1;

            var vb: Array<number> = new Array<number>();
            var ib: Array<number> = new Array<number>();

            for (var i: number = 0; i < point_row; ++i) {
                vb.push(-width * col / 2, 0, height * i - height * row / 2);
                vb.push(width * col / 2, 0, height * i - height * row / 2);
            }

            for (var i: number = 0; i < point_col; ++i) {
                vb.push(width * i - width * col / 2, 0, height * col / 2);
                vb.push(width * i - width * col / 2, 0, -height * col / 2);
            }

            for (var i: number = 0; i < vb.length / 3; ++i) {
                ib.push(i);
            }

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);
            geom.setVertexIndices(0, ib);

            var box: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());
            this.view1.addChild3D(box);

            //var m: Mesh = new Mesh(new PlaneGeometry(), new TextureMaterial());
            //this.view1.addChild3D(m);
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            //var load: URLLoader = new URLLoader("resource/laohu/body_12.esm");
            //load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);


            //this._line[0] = this.buildSemicircleLien(egret3d.Vector3D.X_AXIS, 80, 25, 180, 180, 0xffff00);
            //this.view1.addChild3D(this._line[0]);
            //this._line[1] = this.buildSemicircleLien(egret3d.Vector3D.Y_AXIS, 80, 25, 180, 180, 0xffffffff);
            //this.view1.addChild3D(this._line[1]);
            //this._line[2] = this.buildSemicircleLien(egret3d.Vector3D.Z_AXIS, 80, 25, 180, 270, 0xffffffff);
            //this.view1.addChild3D(this._line[2]);


        }

        private _line: Array<egret3d.Wireframe> = new Array<egret3d.Wireframe>();
    
        protected onLoad(e: LoaderEvent3D) {
            var m: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            this.view1.addChild3D(m);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }

        private buildSemicircleLien(axis: egret3d.Vector3D, r: number, density: number, angle: number, offsetAngle: number, color: number): egret3d.Wireframe {
            var line: egret3d.Wireframe = null;
            var vb = [];
            if (axis.x != 0) {
                for (var i = 0; i < density; i++) {
                    vb.push(
                        0,
                        r * Math.cos(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * i)),
                        r * Math.sin(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * i))
                    );
                }

                vb.push(
                    0,
                    r * Math.cos(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * (density - 1))),
                    r * Math.sin(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * (density - 1)))
                );
            }
            else if (axis.y != 0) {
                for (var i = 0; i < density; i++) {
                    vb.push(
                        r * Math.cos(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * i)),
                        0,
                        r * Math.sin(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * i))
                    );
                }

                vb.push(
                    r * Math.cos(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * (density - 1))),
                    0,
                    r * Math.sin(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * (density - 1)))
                );
            }
            else if (axis.z != 0) {
                for (var i = 0; i < density; i++) {
                    vb.push(
                        r * Math.cos(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * i)),
                        r * Math.sin(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * i)),
                        0);
                }

                vb.push(
                    r * Math.cos(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * (density - 1))),
                    r * Math.sin(egret3d.MathUtil.DEGREES_TO_RADIANS * (offsetAngle + angle / density * (density - 1))),
                    0);
            }
            else return null;

            var ib = [];
            for (var i = 1; i <= density; i++) {
                ib.push(i - 1, i);
            }

            // var geom: egret3d.Geometry = new egret3d.Geometry();
            // geom.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR;
            // geom.verticesData = vb;
            // geom.indexData = ib;
            line = new egret3d.Wireframe();
            var geom: egret3d.Geometry = line.geometry;
            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);
            geom.indexData = ib;
            line.material.diffuseColor = color;
            return line;
        }
    }
}