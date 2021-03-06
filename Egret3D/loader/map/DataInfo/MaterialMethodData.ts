﻿module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.MaterialMethodData
    * @classdesc
    * 材质球的特效数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MaterialMethodData extends SourceDataBase{

        /**
         * @language zh_CN
         * 烘焙效果
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static lightmapMethod: string = "lightmapMethod";

        /**
         * @language zh_CN
         * uv滚动效果
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static uvRollMethod: string = "uvRollMethod";


        /**
         * @language zh_CN
         * alpha遮罩
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static alphaMaskMethod: string = "alphaMaskMethod";

        /**
         * @language zh_CN
         * 特效的类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        public type: string;

        /**
         * @language zh_CN
         * 是否增强specular的强度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public usePower: boolean;

        /**
         * @language zh_CN
         * 贴图索引数据（name）
         * @version Egret 3.0
         * @platform Web,Native
         */
        public texture: string;

        /**
         * @language zh_CN
         * u的滚动速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public uSpeed: number = 0;

        /**
         * @language zh_CN
         * v的滚动速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public vSpeed: number = 0;

        

        /**
        * @language zh_CN
        * constructor 
        */

        constructor() {
            super();
        }
    }
}