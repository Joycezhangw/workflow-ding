<template>
  <div id="app">
    <div class="designer-wrap">
      <div class="header">
        <div class="flow-name">
          <el-button size="small" icon="el-icon-arrow-left" circle></el-button>
          <span>返回</span>
        </div>
        <div class="flow-tab_wrap">
          <div class="flow-tabs">
            <div
              class="flow_tab"
              v-for="(item, index) in tabs"
              :key="index"
              :class="[tabActiveName == item.key ? 'flow-tab_action' : '']"
              @click="changeTabStep(item)"
            >
              {{ item.label }}
            </div>
            <div
              class="flow_tab-link-bar"
              :style="{ transform: translate3d }"
            ></div>
          </div>
        </div>
        <div class="flow-action">
          <el-button size="small" type="primary" round>发布</el-button>
        </div>
      </div>
      <div class="content">
        <template v-if="tabActiveName == 'processDesign'">
          <process-design :process-config="processConfig"></process-design>
        </template>
        <template v-if="tabActiveName == 'iconfont'">
          <hb-icon />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import processDesign from "@/components/workflow/process/processDesign";
import hbIcon from "@/components/icon/index";
export default {
  name: "App",
  components: {
    processDesign,//流程设计面板
    hbIcon,//字体图标
  },
  data() {
    return {
      tabs: [//导航条
        { label: "基础设置", key: "basicSetting" },
        { label: "表单设计", key: "formDesign" },
        { label: "流程设计", key: "processDesign" },
        { label: "高级设置", key: "advancedSetting" },
        { label: "iconfont", key: "iconfont" },
      ],
      tabActiveName: "basicSetting",//导航条初始位置
      processConfig: window.__workFlowConfig.processConfig,//流程设计基础数据
    };
  },
  computed: {
    /**
     * 导航条选中状态动画切换
     */
    translate3d() {
      let index = this.tabs.findIndex((t) => t.key === this.tabActiveName),
        step = 32;
      if (index === 0) {
        return `translate3d(${step}px,0,0)`;
      }
      return `translate3d(${
        this.tabs.findIndex((t) => t.key === this.tabActiveName) * 88 + 32
      }px,0,0)`;
    },
  },
  methods: {
    /**
     * 切换导航条
     */
    changeTabStep(item) {
      this.tabActiveName = item.key;
    },
  },
};
</script>

<style lang="scss">
body,
html {
  width: 100%;
  height: 100%;
}

input::-ms-clear,
input::-ms-reveal {
  display: none;
}

*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: transparent;
}

@-ms-viewport {
  width: device-width;
}

article,
aside,
dialog,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}

body {
  margin: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-variant: tabular-nums;
  line-height: 1.5;
  background-color: #fff;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
}

[tabindex="-1"]:focus {
  outline: 0 !important;
}

hr {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

p {
  margin-top: 0;
  margin-bottom: 1em;
}

abbr[data-original-title],
abbr[title] {
  text-decoration: underline;
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
  border-bottom: 0;
  cursor: help;
}

address {
  margin-bottom: 1em;
  font-style: normal;
  line-height: inherit;
}

input[type="number"],
input[type="password"],
input[type="text"],
textarea {
  -webkit-appearance: none;
}

dl,
ol,
ul {
  margin-top: 0;
  margin-bottom: 1em;
}

ol ol,
ol ul,
ul ol,
ul ul {
  margin-bottom: 0;
}

dt {
  font-weight: 500;
}

dd {
  margin-bottom: 0.5em;
  margin-left: 0;
}

blockquote {
  margin: 0 0 1em;
}

dfn {
  font-style: italic;
}

b,
strong {
  font-weight: bolder;
}

small {
  font-size: 80%;
}

sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

a {
  color: #1890ff;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0);
  outline: 0;
  cursor: pointer;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

a:hover {
  color: #40a9ff;
}

a:active {
  color: #096dd9;
}

a:active,
a:hover {
  text-decoration: none;
  outline: 0;
}

a[disabled] {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  pointer-events: none;
}

code,
kbd,
pre,
samp {
  font-size: 1em;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
}

pre {
  margin-top: 0;
  margin-bottom: 1em;
  overflow: auto;
}

figure {
  margin: 0 0 1em;
}

img {
  vertical-align: middle;
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

[role="button"],
a,
area,
button,
input:not([type="range"]),
label,
select,
summary,
textarea {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}

table {
  border-collapse: collapse;
}

caption {
  padding-top: 0.75em;
  padding-bottom: 0.3em;
  color: rgba(0, 0, 0, 0.45);
  text-align: left;
  caption-side: bottom;
}

th {
  text-align: inherit;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

[type="reset"],
[type="submit"],
button,
html [type="button"] {
  -webkit-appearance: button;
}

[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner,
button::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

input[type="checkbox"],
input[type="radio"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
}

input[type="date"],
input[type="datetime-local"],
input[type="month"],
input[type="time"] {
  -webkit-appearance: listbox;
}

textarea {
  overflow: auto;
  resize: vertical;
}

fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

legend {
  display: block;
  width: 100%;
  max-width: 100%;
  margin-bottom: 0.5em;
  padding: 0;
  color: inherit;
  font-size: 1.5em;
  line-height: inherit;
  white-space: normal;
}

progress {
  vertical-align: baseline;
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  outline-offset: -2px;
  -webkit-appearance: none;
}

[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}

output {
  display: inline-block;
}

summary {
  display: list-item;
}

template {
  display: none;
}

[hidden] {
  display: none !important;
}

mark {
  padding: 0.2em;
  background-color: #feffe6;
}

::-moz-selection {
  color: #fff;
  background: #1890ff;
}

::selection {
  color: #fff;
  background: #1890ff;
}

.clearfix {
  zoom: 1;
}

.clearfix:after,
.clearfix:before {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
@font-face {
  font-family: "IconFont";
  /* project id 135284 */
  src: url("//at.alicdn.com/t/font_135284_ph2thxxbzgf.eot");
  src: url("//at.alicdn.com/t/font_135284_ph2thxxbzgf.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_135284_ph2thxxbzgf.woff") format("woff"),
    url("//at.alicdn.com/t/font_135284_ph2thxxbzgf.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_135284_ph2thxxbzgf.svg#IconFont") format("svg");
}
.iconfont {
  font-family: IconFont !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.designer-wrap {
  height: 100vh;
  overflow: hidden;
}

.designer-wrap .header {
  z-index: 11;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 20px 0 20px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(17, 31, 44, 0.04);
}

.designer-wrap .header .flow-name,
.header .flow-action {
  display: flex;
  align-items: center;
}

.designer-wrap .header .flow-tab_wrap {
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
}

.designer-wrap .header .flow-tab_wrap .flow-tabs {
  position: relative;
  display: inline-block;
  align-items: center;
  justify-content: center;
}

.designer-wrap .header .flow-tab_wrap .flow-tabs .flow_tab {
  position: relative;
  display: inline-block;
  padding: 16px 16px;
  text-decoration: none;
  font-size: 14px;
  color: rgba(17, 31, 44, 0.56);
  cursor: pointer;
}

.designer-wrap .header .flow-tab_wrap .flow-tabs .flow_tab.flow-tab_action {
  font-family: PingFangSC-Medium;
  color: #111f2c;
}

.designer-wrap .header .flow-tab_wrap .flow-tabs .flow_tab-link-bar {
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  transform: translate3d(0px, 0px, 0px);
  width: 28px;
  height: 2px;
  border-radius: 2px;
  background-color: #0089ff;
  transform-origin: 0 0;
  box-sizing: border-box;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.designer-wrap .contentFlow {
  position: relative;
  height: calc(100vh - 56px);
}
</style>
