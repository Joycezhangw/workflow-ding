<template>
  <div class="condition-node">
    <div class="condition-node-box">
      <div class="auto-judge">
        <div class="sort-left" v-if="nodeIndex != 0">
          <svg
            class="svg-icon left"
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
          >
            <defs></defs>
            <path
              d="M403.046 529.203l373.863-373.76a27.955 27.955 0 000-39.629l-39.527-39.628a27.955 27.955 0 00-39.628 0L264.602 509.338a27.955 27.955 0 000 39.628l433.152 433.152a27.814 27.814 0 0039.628 0l39.527-39.526a27.955 27.955 0 000-39.526l-373.76-373.863z"
            ></path>
          </svg>
        </div>
        <condition-title :nodeConfig="nodeConfig" :node-index="nodeIndex"></condition-title>

        <div class="sort-right" v-if="nodeIndex != nodeLen - 1">
          <svg
            class="svg-icon right"
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
          >
            <defs></defs>
            <path
              d="M638.362 529.203l-373.76-373.76a27.955 27.955 0 010-39.629l39.526-39.628a27.955 27.955 0 0139.629 0l433.152 433.152a27.955 27.955 0 010 39.628L343.757 982.118a27.955 27.955 0 01-39.629 0l-39.629-39.526a27.955 27.955 0 010-39.526l373.863-373.863z"
            ></path>
          </svg>
        </div>
        <div class="content"></div>
      </div>
      <add-node-btn></add-node-btn>
    </div>
  </div>
</template>

<script>
import AddNodeBtn from "@/components/workflow/process/addNodeBtn";
import conditionTitle from '@/components/workflow/process/conditionTitle'

export default {
  name: "conditionNode",
  components: { AddNodeBtn,conditionTitle },
  props: {
    nodeConfig: {
      type: Object,
    },
    nodeIndex: {
      type: Number,
      default: 0,
    },
    nodeLen: {
      type: Number,
      defalut: 0,
    },
  },
};
</script>

<style scoped>
</style>