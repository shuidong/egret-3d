﻿module egret3d {

    /**
    * @private
    * @class egret3d.EntityCollect
    * @classdesc
    * Object3D 渲染对象收集器,把渲染对象进行可视筛选，
    * 并且划分渲染层级，依次排序到加入列表.
    *
    * @see egret3d.Scene3D
    * @see egret3d.View3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EntityCollect extends CollectBase {


        private _normalRenderItems: Array<IRender> = [] ;
        private _alphaRenderItems: Array<IRender> = [] ;

        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        private applyRender(child: any, camera: Camera3D) {
            if (!child.visible) {
                return;
            }
            if ( child["material"] )
                this.addRenderList(<IRender>child, camera);

            for (var i: number = 0; i < child.childs.length; i++) {
                this.applyRender(child.childs[i], camera);
            }
        }

        /**
        * @language zh_CN
        * 尝试将一个渲染对象，进行视锥体裁剪，放入到渲染队列中
        * @param root 渲染根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private addRenderList(renderItem: IRender, camera: Camera3D) {

            if (renderItem.enableCulling) {
                if (!camera.isVisibleToCamera(renderItem)) {
                    return;
                }
                if (renderItem.material != null && renderItem.material.materialData.alphaBlending) {
                    //layer.alphaObjects.push(renderItem);
                    this._alphaRenderItems.push(renderItem);
                }
                else {
                    this._normalRenderItems.push(renderItem);
                }
               // this.renderList.push(renderItem);
            }

            if (renderItem.enablePick) {
                this.mousePickList.push(renderItem);
            }

            //var layer: Layer = this.findLayer(renderItem);
            //var tag: Tag = this.findTag(renderItem);

            //if (renderItem.material != null && renderItem.material.materialData.alphaBlending) {
            //    //layer.alphaObjects.push(renderItem);
            //    this._alphaRenderItems.push(renderItem);
            //}
            //else {
            //    this._normalRenderItems.push(renderItem);
            //}
        }
                
        /**
        * @language zh_CN
        * 数据更新 处理需要渲染的对象
        * @param camera 当前摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(camera: Camera3D) {
            super.update(camera);
            this._normalRenderItems.length = 0;
            this._alphaRenderItems.length = 0;
            this.renderList.length = 0;
            this.mousePickList.length = 0;
            this.clearLayerList();

            if (this.rootScene.quad) {
                var box: BoundBox = camera.frustum.box;
                var quadList: Array<IQuadNode> = this.rootScene.quad.getNodesByAABB(box.min.x, box.min.z, box.max.x, box.max.z);
                //var time3: number = new Date().getTime();
                this.appendQuadList(quadList, camera);
                //var time4: number = new Date().getTime();
                //console.log("200/" + quadList.length + "/" + this.renderList.length, "time:" + (time2 - time1) + "/" + (time4 - time2) + "(" + (time3 - time2) + "," + (time4 - time3) + ")");
            }
            else {
                this.applyRender(this.rootScene.root, camera);
            }

            for (var i: number = 0; i < this._normalRenderItems.length; ++i) {
                this.renderList.push(this._normalRenderItems[i]);
            }
            for (var i: number = 0; i < this._alphaRenderItems.length; ++i) {
                this.renderList.push(this._alphaRenderItems[i]);
            }

            //for (var i: number = 0; i < this._layerTags.length; ++i) {
            //    this._layerTags[i].clearDepth = true;
            //    for (var j: number = 0; j < this._layerTags[i].layers.length; ++j) {
            //        for (var k: number = 0; k < this._layerTags[i].layers[j].objects.length; ++k) {
            //            this.renderList.push(this._layerTags[i].layers[j].objects[k]);
            //        }

            //        this._layerTags[i].layers[j].alphaObjects.sort((a: Object3D, b: Object3D) => this.sort(a, b, camera));
            //        for (var k: number = 0; k < this._layerTags[i].layers[j].alphaObjects.length; ++k) {
            //            this.renderList.push(this._layerTags[i].layers[j].alphaObjects[k]);
            //        }
            //    }
            //}
        }

        /**
        * @language zh_CN
        * 根据当前场景的节点分布情况，生成四叉树
        * @version Egret 3.0
        * @param quadList   需要被判定是否在视锥体里的节点列表
        * @param camera     相机
        * @platform Web,Native
        */
        private appendQuadList(quadList: Array<IQuadNode>, camera: Camera3D) {
            var mesh: Mesh;
            var node: IQuadNode;
            for (node of quadList) {
                if (!(node instanceof Mesh))
                    continue;
                mesh = <Mesh>node;
                if (mesh && mesh.visible && mesh["material"])
                    this.addRenderList(mesh, camera);
            }
        }

        //protected findLayer(object3d: Object3D): Layer {
        //    var typeIndex: number = object3d.layer >> 24;
        //    var layerIndex: number = object3d.layer & 0x00FFFFFF;
        //    if (typeIndex < this._tags.length && typeIndex >= 0) {
        //        if (layerIndex < this._tags[typeIndex].layers.length && layerIndex >= 0) {
        //            return this._tags[typeIndex].layers[layerIndex];
        //        }
        //    }
        //    return this._tags[0].layers[0];
        //}

        //protected findTag(object3d: Object3D): Tag {
        //    var typeIndex: number = object3d.layer >> 24;
        //    if (typeIndex < this._tags.length && typeIndex >= 0) {
        //        return this._tags[typeIndex];
        //    }
        //    return this._tags[0];
        //}

        protected clearLayerList() {
            //for (var i: number = 0; i < this._tags.length; ++i) {
            //    for (var j: number = 0; j < this._tags[i].layers.length; ++j) {
            //        this._tags[i].layers[j].objects.length = 0;
            //        this._tags[i].layers[j].alphaObjects.length = 0;
            //    }
            //}
        }

        protected sort(a: Object3D, b: Object3D, camera: Camera3D) {
            var dis_0: number = Vector3D.distance(a.globalPosition, camera.position);
            var dis_1: number = Vector3D.distance(b.globalPosition, camera.position);
            if (dis_0 > dis_1) {
                return -1;
            }
            else if (dis_0 < dis_1) {
                return 1;
            }

            return 0;
        }
    }
}