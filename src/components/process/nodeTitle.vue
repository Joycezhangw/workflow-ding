<template>
  <div class="title" :style="{ background: nodeCur.bgColor }">
    <template v-if="!isStartNode">
      <i class="iconfont" v-html="nodeCur.icon"></i>
    </template>
    <template v-if="!editing">
      <span
        :class="[isStartNode ? '' : 'editable-title']"
        @click="changeNodeTitle"
      >
        {{ node.name }}
      </span>
    </template>

    <template v-else>
      <input
        class="hbie-input editable-title-input"
        v-model.trim="node.name"
        @blur="blurEvent()"
        @focus="$event.currentTarget.select()"
        v-focus
      />
    </template>
    <template v-if="!isStartNode">
      <i class="iconfont anticon anticon-close close" tabindex="-1"
        >&#59767;</i
      >
    </template>
  </div>
</template>
<script>
export default {
  name: "nodeTitle",
  props: {
    node: {
      type: Object,
      required: true,
    },
    isStartNode: {
      type: Boolean,
      default: false,
    },
    nodeCur: {
      type: Object,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    changeNodeTitle() {
      //开始节点不能修改标题
      if (!this.isStartNode) this.editing = !this.editing;
    },
    blurEvent() {
      this.editing = false;
    },
  },
};
</script>
<style lang="scss" scoped>
  .hbie-input {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    &::-moz-placeholder {
      color: #bfbfbf;
      opacity: 1;
    }
    &:-ms-input-placeholder {
      color: #bfbfbf;
    }
    &::-webkit-input-placeholder {
      color: #bfbfbf;
    }
    &:placeholder-shown {
      text-overflow: ellipsis;
    }
    &:focus {
      outline: 0;
      -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
  .hbie-input:focus,
  .hbie-input:hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
  .auto-judge:hover .editable-title,
  .node-wrap-box:hover .editable-title {
    border-bottom: dashed 1px #ffffff;
  }
  .auto-judge:hover .editable-title.editing,
  .node-wrap-box:hover .editable-title.editing {
    text-decoration: none;
    border: solid 1px #d9d9d9;
  }
  .auto-judge {
    &:hover {
      .editable-title {
        border-color: #15bc83;
      }
    }
  }
  .parallel-judge {
    &:hover {
      .editable-title {
        border-color: #0089ff;
      }
    }
  }
  .editable-title {
    line-height: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: dashed 1px transparent;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 40px;
    }
    &:hover {
      border-bottom: dashed 1px #ffffff;
    }
  }
  .editable-title-input {
    flex: none;
    height: 18px;
    padding-left: 4px;
    font-size: 12px;
    line-height: 18px;
    z-index: 1;
    &:hover {
      text-decoration: none;
    }
  }

</style>