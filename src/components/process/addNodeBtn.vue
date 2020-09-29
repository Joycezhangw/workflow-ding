<template>
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
          <span class="iconfont">&#59739;</span>
        </button>
      </el-popover>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddNodeBtn",
};
</script>
<style lang="scss" scoped>
.hbieflow-design {
  .add-node-btn-box {
    width: 240px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    position: relative;
    &::before {
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
  }
  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 20px 0px 32px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    flex-grow: 1;
    .btn {
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
      .iconfont {
        color: #fff;
        font-size: 16px;
      }
    }
  }
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
</style>