<script>
import { NodeUtils } from "./util";
const isCondition = (data) => data.type === "condition";
const isNodeRoute = (data) => data.type === "route";
const notEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;
const hasBranch = (data) => notEmptyArray(data.conditionNodes);
const stopPro = (ev) => ev.stopPropagation();
const nodeCardConfig = {
  start: {
    bgColor: "rgb(87, 106, 149)",
    content: "所有人",
    icon: "",
  },
  approver: {
    bgColor: "rgb(255, 148, 62)",
    content: "发起人自选",
    icon: "&#59631;",
  },
  notifier: {
    bgColor: "rgb(50, 150, 250)",
    content: "发起人自选",
    icon: "&#59707;",
  },
};

function createNormalCard(that, nodeConfig, h) {
  const classList = ["flow-path-card"];
  const afterTrue = (isTrue, name) => (isTrue && classList.push(name), isTrue);
  const isStartNode = afterTrue(NodeUtils.isStartNode(nodeConfig), "start");
  const isApprNode = afterTrue(
    NodeUtils.isApproverNode(nodeConfig),
    "approver"
  );
  const isNotifierNode = afterTrue(
    NodeUtils.isNotifierNode(nodeConfig),
    "notifier"
  );
  let nodeCur = nodeCardConfig[nodeConfig.type];
  return (
    `<div>
      <nodeTitle
        node={nodeConfig}
        isStartNode={isStartNode}
        nodeCur={nodeCur}
      ></nodeTitle>
      <div class="content">
        <div class="text">{nodeCur.content}</div>
        <i class="iconfont anticon anticon-right arrow">&#59844;</i>
      </div>
    </div>`
  );
}
const createFunc = (...arg) => createNormalCard.call(arg[0], ...arg);
let nodes = {
  start: createFunc,
  approver: createFunc,
  notifier: createFunc,
  empty: (_) => "",
  condition: function (that, conf, h) {
    return (
      <div class="condition-node">
        <div class="condition-node-box">
          <div class="auto-judge">
            <div class="title-wrapper">
              <span class="editable-title">
                {conf.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
  route: function (that, conf, h) {
    return "";
  },
};
/**
 * 添加节点按钮
 */
function addNodeButton(ctx, data, h, isBranch = false) {
  // 只有非条件节点和条件分支树下面的那个按钮 才能添加新分支树
  //   let couldAddBranch = !hasBranch(data) || isBranch;
  let isEmpty = data.type === "empty";
  if (isEmpty && !isBranch) {
    return "";
  }
  return (
    <div class="add-node-btn-box">
      <div class="add-node-btn">
        <el-popover placement="right" trigger="click" width="368">
          <div class="add-node-popover">
            <div class="add-node-popover-body">
              <a class="add-node-popover-item approver">
                <div class="item-wrapper">
                  <span class="iconfont">&#59631;</span>
                </div>
                <span>审批人</span>
              </a>
              <a class="add-node-popover-item notifier">
                <div class="item-wrapper">
                  <span class="iconfont">&#59707;</span>
                </div>
                <span>抄送人</span>
              </a>
              <a class="add-node-popover-item route">
                <div class="item-wrapper">
                  <span class="iconfont">&#59838;</span>
                </div>
                <span>条件分支</span>
              </a>
            </div>
          </div>
          <button class="btn" type="button" slot="reference">
            <span class="iconfont el-icon-plus"></span>
          </button>
        </el-popover>
      </div>
    </div>
  );
}
/**
 * 节点工厂
 */
function nodeFactory(that, nodeConfig, h) {
  let res = [],
    branchNode = "",
    selfNode = (
      <div class="node-wrap">
        <div
          class={`node-wrap-box ${
            nodeConfig.type === "start" ? " node_sid-startevent start-node" : ""
          }`}
        >
          {nodes[nodeConfig.type].call(that, that, nodeConfig, h)}
        </div>
        {addNodeButton.call(that, that, nodeConfig, h)}
      </div>
    );
  //分支
  if (isNodeRoute(nodeConfig)) {
    branchNode = (
      <div class="branch-wrap">
        <div class="branch-box-wrap">
          <div class="branch-box">
            <button class="add-branch">添加条件</button>
            {nodeConfig.conditionNodes.map((d) =>
              nodeFactory.call(that, that, d, h)
            )}
          </div>
        </div>
        {addNodeButton.call(that, that, nodeConfig, h, true)}
      </div>
    );
  }
  //条件
  if (isCondition(nodeConfig)) {
    return (
      <div class="col-box">
        <div class="top-left-cover-line" v-if="index==0"></div>
        <div class="bottom-left-cover-line" v-if="index==0"></div>
        <div
          class="top-right-cover-line"
          v-if="index==nodeConfig.conditionNodes.length-1"
        ></div>
        <div
          class="bottom-right-cover-line"
          v-if="index==nodeConfig.conditionNodes.length-1"
        ></div>
        {selfNode}
        {branchNode}
        {nodeFactory.call(that, that, nodeConfig.childNode, h)}
      </div>
    );
  }
  res.push(selfNode);
  branchNode && res.push(branchNode);
  nodeConfig.childNode &&
    res.push(nodeFactory.call(that, that, nodeConfig.childNode, h));
  return res;
}
import nodeTitle from "@/components/process/nodeTitle";
export default {
  name: "nodeWrap",
  components: {
    nodeTitle,
  },
  props: {
    nodeConfig: { type: Object, required: true },
  },
  render(h) {
    return (
        {this.nodeConfig && nodeFactory.call(this, this, this.nodeConfig, h)}
    );
  },
};
</script>
<style>
/**节点**/
.hbieflow-design .node-wrap {
  display: inline-flex;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  width: 100%;
  padding: 0 50px;
  position: relative;
}
.hbieflow-design .branch-wrap {
  display: inline-flex;
  width: 100%;
}
.hbieflow-design .branch-box-wrap {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 270px;
  width: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.hbieflow-design .branch-box {
  display: flex;
  overflow: visible;
  min-height: 180px;
  height: auto;
  border-bottom: 2px solid #cccccc;
  border-top: 2px solid #cccccc;
  position: relative;
  margin-top: 15px;
}
.hbieflow-design .branch-box .col-box {
  background: #f5f5f7;
}
.hbieflow-design .branch-box .col-box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}
.hbieflow-design .add-branch {
  border: none;
  outline: none;
  user-select: none;
  justify-content: center;
  font-size: 12px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  color: #0089ff;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center center;
  cursor: pointer;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.hbieflow-design .add-branch:hover {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
}
.hbieflow-design .add-branch:active {
  transform: translateX(-50%);
  box-shadow: none;
}
.hbieflow-design .col-box {
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
}
.hbieflow-design .condition-node {
  min-height: 220px;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-flex: 1;
}
.hbieflow-design .condition-node-box {
  padding-top: 30px;
  padding-right: 50px;
  padding-left: 50px;
  -webkit-box-pack: center;
  justify-content: center;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
  position: relative;
}
.hbieflow-design .condition-node-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}
.hbieflow-design .auto-judge {
  position: relative;
  width: 220px;
  min-height: 72px;
  background: #ffffff;
  border-radius: 4px;
  padding: 14px 19px;
  cursor: pointer;
}
.hbieflow-design .auto-judge.error:after {
  border: 1px solid #f25643;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}
.hbieflow-design .auto-judge .title-wrapper {
  position: relative;
  font-size: 12px;
  color: #15bc83;
  text-align: left;
  line-height: 16px;
}
.hbieflow-design .auto-judge .title-wrapper .editable-title,
.hbieflow-design .auto-judge .title-wrapper .editable-title-input {
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hbieflow-design .auto-judge .title-wrapper .priority-title {
  display: inline-block;
  float: right;
  margin-right: 10px;
  color: rgba(25, 31, 37, 0.56);
}
.hbieflow-design .auto-judge .title-wrapper .priority-button {
  display: inline-block;
  height: 28px;
  float: right;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
}
.hbieflow-design .auto-judge .title-wrapper .priority-button div {
  display: inline-block;
}
.hbieflow-design .auto-judge .title-wrapper .priority-button .priority-content {
  padding: 0 8px;
  font-size: 12px;
  line-height: 28px;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}
.hbieflow-design .auto-judge .placeholder {
  color: #bfbfbf;
}
.hbieflow-design .auto-judge .close,
.hbieflow-design .auto-judge .copy {
  width: 14px;
  height: 14px;
  display: none;
  position: absolute;
  right: -2px;
  top: -2px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  z-index: 2;
}
.hbieflow-design .auto-judge .close path,
.hbieflow-design .auto-judge .copy path {
  fill: rgba(25, 31, 37, 0.56);
}
.hbieflow-design .auto-judge .close:hover path,
.hbieflow-design .auto-judge .copy:hover path {
  fill: rgba(25, 31, 37, 0.8);
}
.hbieflow-design .auto-judge .copy {
  right: 20px;
}
.hbieflow-design .auto-judge .content {
  font-size: 14px;
  color: #191f25;
  text-align: left;
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.hbieflow-design .auto-judge .sort-left,
.hbieflow-design .auto-judge .sort-right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: none;
  z-index: 1;
}
.hbieflow-design .auto-judge .sort-left svg,
.hbieflow-design .auto-judge .sort-right svg {
  width: 12px;
  height: 12px;
}
.hbieflow-design .auto-judge .sort-left svg path,
.hbieflow-design .auto-judge .sort-right svg path {
  fill: rgba(25, 31, 37, 0.56);
}
.hbieflow-design .auto-judge .sort-left {
  left: 0;
  border-right: 1px solid #f6f6f6;
}
.hbieflow-design .auto-judge .sort-right {
  right: 0;
  border-left: 1px solid #f6f6f6;
}
.hbieflow-design .auto-judge .sort-left:hover,
.hbieflow-design .auto-judge .sort-right:hover {
  background: #efefef;
  border-color: rgba(25, 31, 37, 0.08);
}
.hbieflow-design .auto-judge .sort-left:hover svg path,
.hbieflow-design .auto-judge .sort-right:hover svg path {
  fill: rgba(25, 31, 37, 0.8);
}
.hbieflow-design .auto-judge:after {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}
.hbieflow-design .auto-judge.active:after,
.hbieflow-design .auto-judge:active:after,
.hbieflow-design .auto-judge:hover:after {
  border: 1px solid #3296fa;
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
}
.hbieflow-design .auto-judge.active .close,
.hbieflow-design .auto-judge:active .close,
.hbieflow-design .auto-judge:hover .close,
.hbieflow-design .auto-judge.active .copy,
.hbieflow-design .auto-judge:active .copy,
.hbieflow-design .auto-judge:hover .copy {
  display: block;
}
.hbieflow-design .auto-judge.active .priority-title,
.hbieflow-design .auto-judge:active .priority-title,
.hbieflow-design .auto-judge:hover .priority-title {
  display: none;
}
.hbieflow-design .auto-judge.active .sort-left,
.hbieflow-design .auto-judge:active .sort-left,
.hbieflow-design .auto-judge:hover .sort-left,
.hbieflow-design .auto-judge.active .sort-right,
.hbieflow-design .auto-judge:active .sort-right,
.hbieflow-design .auto-judge:hover .sort-right {
  display: flex;
  align-items: center;
}
.hbieflow-design .auto-judge.parallel-judge .title-wrapper {
  color: #0089ff;
}
/**节点连接线**/
.hbieflow-design .add-node-btn-box {
  width: 240px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  position: relative;
}

.hbieflow-design .add-node-btn-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}

.hbieflow-design .add-node-btn {
  user-select: none;
  width: 240px;
  padding: 20px 0px 32px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  flex-grow: 1;
}

.hbieflow-design .add-node-btn .btn {
  outline: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  width: 30px;
  height: 30px;
  background: #3296fa;
  border-radius: 50%;
  position: relative;
  border: none;
  line-height: 30px;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hbieflow-design .add-node-btn .btn .iconfont {
  color: #fff;
  font-size: 16px;
}

/**结束节点**/
.hbieflow-design .add-node-btn .btn:hover {
  transform: scale(1.3);
  box-shadow: 0 13px 27px 0 rgba(0, 0, 0, 0.1);
}

.hbieflow-design .add-node-btn .btn:active {
  transform: none;
  background: #1e83e9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.hbieflow-design .end-node {
  border-radius: 50%;
  font-size: 14px;
  color: rgba(25, 31, 37, 0.4);
  text-align: left;
}

.hbieflow-design .end-node .end-node-circle {
  width: 10px;
  height: 10px;
  margin: auto;
  border-radius: 50%;
  background: #dbdcdc;
}

.hbieflow-design .end-node .end-node-text {
  margin-top: 5px;
  text-align: center;
}

.hbieflow-design .add-branch {
  border: none;
  outline: none;
  user-select: none;
  justify-content: center;
  font-size: 12px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  color: #0089ff;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center center;
  cursor: pointer;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.node-wrap-box {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
}

.node-wrap-box:after {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.node-wrap-box.active:after,
.node-wrap-box:active:after,
.node-wrap-box:hover:after {
  border: 1px solid #3296fa;
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
}

.node-wrap-box.active .close,
.node-wrap-box:active .close,
.node-wrap-box:hover .close {
  display: block;
}

.node-wrap-box.error:after {
  border: 1px solid #f25643;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.node-wrap-box .title {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 30px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #ffffff;
  text-align: left;
  background: #576a95;
  border-radius: 4px 4px 0px 0px;
}

.node-wrap-box .title .node-view-icon,
.node-wrap-box .title .iconfont {
  font-size: 12px;
  margin-right: 5px;
}

.node-wrap-box .title .node-view-icon.audit path {
  fill: #ffffff;
}

.node-wrap-box .placeholder {
  color: #bfbfbf;
}

.node-wrap-box .close {
  display: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}

.node-wrap-box .content {
  position: relative;
  font-size: 14px;
  padding: 16px;
  padding-right: 30px;
}

.node-wrap-box .content .text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.node-wrap-box .content .arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 14px;
  font-size: 14px;
  color: #979797;
}

.node-wrap-box .parallel-tip {
  padding: 16px;
  color: #00b853;
}

.start-node.node-wrap-box .content .text {
  display: block;
  white-space: nowrap;
}

.node-wrapper-box-new {
  padding: 12px 10px;
}

.node-wrapper-box-new .actions {
  margin-top: 11px;
  text-align: right;
}

.node-wrapper-box-new .ant-btn {
  margin-left: 8px;
}

.node-wrap-box:before {
  content: "";
  position: absolute;
  top: -12px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 0;
  height: 4px;
  border-style: solid;
  border-width: 8px 6px 4px;
  border-color: #cacaca transparent transparent;
  background: #f5f5f7;
}

.node-wrap-box.start-node:before {
  content: none;
}
.add-node-popover-header {
  position: relative;
  margin-bottom: 15px;
}
.add-node-popover-close {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  color: rgba(0, 0, 0, 0.25);
}
.add-node-popover-body {
  max-width: 346px;
}
.add-node-popover-item {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #191f25 !important;
  margin-right: 8px;
  margin-bottom: 8px;
  width: 160px;
  background: rgba(17, 31, 44, 0.02);
  padding: 8px;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
.add-node-popover-item .item-wrapper {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 12px;
}
.add-node-popover-item .iconfont {
  font-size: 20px;
  line-height: 40px;
}
.add-node-popover-item svg {
  width: 20px;
  height: 20px;
}
.add-node-popover-item.approver .item-wrapper {
  color: #ff943e;
}
.add-node-popover-item.notifier .item-wrapper {
  color: #3296fa;
}
.add-node-popover-item.customer-notifier .item-wrapper {
  color: #3296fa;
}
.add-node-popover-item.customer .item-wrapper {
  color: #ff943e;
}
.add-node-popover-item.route .item-wrapper {
  color: #15bc83;
}
.add-node-popover-item.connector .item-wrapper svg {
  fill: #476dff;
}
.add-node-popover-item.auto .item-wrapper {
  color: #7a8189;
}
.add-node-popover-item:hover {
  background: #ffffff;
  border: 1px solid #ecedef;
  box-shadow: 0 2px 8px 0 rgba(17, 31, 44, 0.08);
}
.add-node-popover-item:active .item-wrapper {
  box-shadow: none;
  background: #eaeaea;
}
.add-node-popover-item:active .iconfont {
  color: inherit;
}
.customerRelateConfirm span {
  color: rgba(25, 31, 37, 0.4);
}
.add-node-wrapper .ant-popover-arrow {
  display: none;
}
.top-left-cover-line {
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  top: -2px;
  left: -1px;
}

.top-right-cover-line {
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  top: -2px;
  right: -1px;
}

.bottom-left-cover-line {
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  bottom: -2px;
  left: -1px;
}

.bottom-right-cover-line {
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  bottom: -2px;
  right: -1px;
}
/**==标题== */
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
}

.hbie-input::-moz-placeholder {
  color: #bfbfbf;
  opacity: 1;
}

.hbie-input:-ms-input-placeholder {
  color: #bfbfbf;
}

.hbie-input::-webkit-input-placeholder {
  color: #bfbfbf;
}

.hbie-input:placeholder-shown {
  text-overflow: ellipsis;
}

.hbie-input:focus,
.hbie-input:hover {
  border-color: #40a9ff;
  border-right-width: 1px !important;
}

.hbie-input:focus {
  outline: 0;
  -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
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
.auto-judge:hover .editable-title {
  border-color: #15bc83;
}
.parallel-judge:hover .editable-title {
  border-color: #0089ff;
}
.editable-title {
  line-height: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-bottom: dashed 1px transparent;
}
.editable-title:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 40px;
}
.editable-title:hover {
  border-bottom: dashed 1px #ffffff;
}
.editable-title-input {
  flex: none;
  height: 18px;
  padding-left: 4px;
  font-size: 12px;
  line-height: 18px;
  z-index: 1;
}
.editable-title-input:hover {
  text-decoration: none;
}
</style>