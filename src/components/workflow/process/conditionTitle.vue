<template>
  <div class="title-wrapper">
    <template v-if="!editing">
      <span class="editable-title" @click="changeNodeTitle">{{ node.name }}</span>
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
    <span class="priority-title">优先级{{ nodeIndex + 1 }}</span>
    <svg
      class="svg-icon copy"
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
      style=""
    >
      <defs></defs>
      <path
        d="M637.873 157.538c60.731 0 110.829 47.262 110.829 106.496v576.119c0 55.768-44.348 100.824-100.274 105.944l-10.555.552H160.532c-60.81 0-110.907-47.262-110.907-106.496V264.034c0-59.313 50.097-106.496 110.828-106.496h477.341zm0 68.924H160.532c-23.631 0-41.984 17.329-41.984 37.572v576.119c0 20.243 18.353 37.573 41.905 37.573h477.341c23.631 0 41.984-17.33 41.984-37.573V264.034c0-20.322-18.353-37.572-41.905-37.572zM834.796 0c60.731 0 110.829 47.262 110.829 106.496v576.118c0 59.235-50.098 106.496-110.829 106.496a34.422 34.422 0 01-6.222-68.372l6.222-.55c23.631 0 41.906-17.33 41.906-37.574V106.496c0-20.322-18.354-37.573-41.906-37.573H357.455c-21.032 0-37.81 13.627-41.354 30.956l-.63 6.617a34.422 34.422 0 11-68.923 0C246.548 47.183 296.645 0 357.376 0h477.342zM426.772 491.284a43.323 43.323 0 010 86.646H253.479a43.323 43.323 0 010-86.646h173.293zm86.646-173.293a43.323 43.323 0 010 86.647H253.479a43.323 43.323 0 010-86.647h259.939z"
      ></path>
    </svg>
    <svg
      class="svg-icon close"
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
    >
      <defs></defs>
      <path
        d="M512 451.67L768.427 195.2a42.667 42.667 0 1160.373 60.33L572.31 512 828.8 768.427a42.667 42.667 0 11-60.33 60.373L512 572.31 255.573 828.8a42.667 42.667 0 11-60.373-60.33L451.69 512 195.2 255.573a42.667 42.667 0 1160.33-60.373L512 451.69z"
      ></path>
    </svg>
  </div>
</template>
<script>
export default {
  name: "conditionTitle",
  props: {
    node: {//流程数据
      type: Object,
      required: true
    },
    nodeIndex: {//条件流程索引
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    /**
     * 选中标题，切换到文本框
     */
    changeNodeTitle() {
      this.editing = !this.editing;
    },
    /**
     * 文本框失去焦点
     */
    blurEvent() {
      this.editing = false;
    },
  },
};
</script>