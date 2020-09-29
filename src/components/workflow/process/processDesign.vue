<template>
  <div class="contentFlow">
    <div class="design-engine">
      <div class="hbieflow-design">
        <div class="zoom">
          <div
            :class="'zoom-out' + (zoomValue == 50 ? ' disabled' : '')"
            @click="changeZoomSize(-zoomStep)"
          ></div>
          <span>{{ zoomValue }}%</span>
          <div
            :class="'zoom-in' + (zoomValue == 300 ? ' disabled' : '')"
            @click="changeZoomSize(+zoomStep)"
          ></div>
        </div>
        <div class="ie-polyfill-container">
          <div
            class="box-scale"
            id="box-scale"
            :style="{
              transform: 'scale(' + zoomValue / 100 + ')',
              transformOrigin: '50% 0px 0px',
            }"
          >
            <node-wrap :nodeConfig="processConfig"></node-wrap>
            <end-node />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import endNode from "@/components/workflow/process/endNode";
import nodeWrap from "@/components/workflow/process/nodeWrap";

export default {
  name: "processDesign",
  components: {
    endNode,//结束流程组件
    nodeWrap,//流程节点
  },
  props: {
    processConfig: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      zoomValue: 100,//流程设计面板初始缩放值
      zoomStep: 10, // 缩放步长
    };
  },
  methods: {
    //缩放设计面板
    changeZoomSize(val) {
      let v = this.zoomValue + val;
      if (v >= 50 && v <= 300) {
        // 缩放介于50%~300%
        this.zoomValue = v;
      }
    },
  },
};
</script>
<style lang="scss">
.hbieflow-design {
  width: 100%;
  background-color: #f5f5f7;
  overflow: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;

  .ie-polyfill-container {
    display: -ms-grid;
    -ms-grid-columns: min-content;
  }

  .box-scale {
    transform: scale(1);
    display: inline-block;
    position: relative;
    width: 100%;
    padding: 54.5px 0;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    min-width: -webkit-min-content;
    min-width: -moz-min-content;
    min-width: min-content;
    background-color: #f5f5f7;
    -webkit-transform-origin: 0 0 0;
    transform-origin: 0 0 0;
  }
}

/**放大，缩小**/
.zoom {
  display: flex;
  position: fixed;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 40px;
  margin-top: 30px;
  z-index: 10;
}

.zoom .zoom-out,
.zoom .zoom-in {
  width: 30px;
  height: 30px;
  background: #fff;
  color: #c1c1cd;
  cursor: pointer;
  background-size: 100%;
  background-repeat: no-repeat;
}

.zoom .zoom-out {
  background-image: url(https://gw.alicdn.com/tfs/TB1s0qhBHGYBuNjy0FoXXciBFXa-90-90.png);
}

.zoom .zoom-in {
  background-image: url(https://gw.alicdn.com/tfs/TB1UIgJBTtYBeNjy1XdXXXXyVXa-90-90.png);
}

.zoom .zoom-in.disabled,
.zoom .zoom-out.disabled {
  opacity: 0.7;
}
</style>