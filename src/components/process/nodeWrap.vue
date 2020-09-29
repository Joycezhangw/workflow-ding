<template>
    <div>
        <template
                v-if="
        nodeConfig.type === 'start' ||
        nodeConfig.type === 'notifier' ||
        nodeConfig.type === 'approver' ||
        nodeConfig.type === 'audit'
      "
        >
            <div class="node-wrap">
                <node-wrap-box :node.sync="nodeConfig"></node-wrap-box>
                <add-node-btn></add-node-btn>
            </div>
        </template>
        <template v-if="nodeConfig.type==='route'">
            <div class="branch-wrap">
                <div class="branch-box-wrap">
                    <div class="branch-box">
                        <button class="add-branch">添加条件</button>
                        <div class="col-box" v-for="(item,index) in nodeConfig.conditionNodes" :key="index">
                            <div class="top-left-cover-line" v-if="index==0"></div>
                            <div class="bottom-left-cover-line" v-if="index==0"></div>
                            <div class="top-right-cover-line" v-if="index==nodeConfig.conditionNodes.length-1"></div>
                            <div class="bottom-right-cover-line" v-if="index==nodeConfig.conditionNodes.length-1"></div>
                            <condition-node :node-config="item" :node-index="index" :node-len="nodeConfig.conditionNodes.length"></condition-node>
                            <nodeWrap v-if="item.childNode" :nodeConfig="item.childNode"></nodeWrap>
                        </div>
                    </div>
                    <add-node-btn></add-node-btn>
                </div>
            </div>
        </template>
        <nodeWrap
                v-if="nodeConfig.childNode"
                :nodeConfig="nodeConfig.childNode"
        ></nodeWrap>
    </div>
</template>
<script>
    import nodeWrapBox from "@/components/process/nodeWrapBox";
    import addNodeBtn from "@/components/process/addNodeBtn";
    import conditionNode from "@/components/process//conditionNode";
    export default {
        name: "nodeWrap",
        components: {
            addNodeBtn,
            nodeWrapBox,
            conditionNode
        },
        props: {
            nodeConfig: {
                type: Object,
                default: () => {
                },
            },
        },
    };
</script>
<style lang="scss">
    .hbieflow-design {
        .node-wrap {
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
        .branch-wrap {
            display: inline-flex;
            width: 100%;
        }
        .branch-box-wrap {
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
    }
    .hbieflow-design {

        .branch-box {
            display: flex;
            overflow: visible;
            min-height: 180px;
            height: auto;
            border-bottom: 2px solid #cccccc;
            border-top: 2px solid #cccccc;
            position: relative;
            margin-top: 15px;
            .col-box {
                background: #f5f5f7;
                &:before {
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
            }
        }
        .add-branch {
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
            &:hover {
                transform: translateX(-50%) scale(1.1);
                box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
            }
            &:active {
                transform: translateX(-50%);
                box-shadow: none;
            }
        }
        .col-box {
            display: inline-flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-box-align: center;
            align-items: center;
            position: relative;
        }
        .condition-node {
            min-height: 220px;
            display: inline-flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-box-flex: 1;
        }
        .condition-node-box {
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
            &::before {
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
        }
        .auto-judge {
            position: relative;
            width: 220px;
            min-height: 72px;
            background: #ffffff;
            border-radius: 4px;
            padding: 14px 19px;
            cursor: pointer;
            &.error {
                &:after {
                    border: 1px solid #f25643;
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
                }
            }
            .title-wrapper {
                position: relative;
                font-size: 12px;
                color: #15bc83;
                text-align: left;
                line-height: 16px;
                .priority-title {
                    display: inline-block;
                    float: right;
                    margin-right: 10px;
                    color: rgba(25, 31, 37, 0.56);
                }
                .priority-button {
                    display: inline-block;
                    height: 28px;
                    float: right;
                    margin-right: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                    color: rgba(0, 0, 0, 0.65);
                    div {
                        display: inline-block;
                    }
                    .priority-content {
                        padding: 0 8px;
                        font-size: 12px;
                        line-height: 28px;
                        border-left: 1px solid rgba(0, 0, 0, 0.15);
                        border-right: 1px solid rgba(0, 0, 0, 0.15);
                    }
                }
            }
            .placeholder {
                color: #bfbfbf;
            }
            .copy {
                right: 20px;
            }
            .content {
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
            .sort-left {
                left: 0;
                border-right: 1px solid #f6f6f6;
            }
            .sort-right {
                right: 0;
                border-left: 1px solid #f6f6f6;
            }
            &:after {
                pointer-events: none;
                content: '';
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
            &.parallel-judge {
                .title-wrapper {
                    color: #0089ff;
                }
            }
        }
    }
    .hbieflow-design .auto-judge .title-wrapper .editable-title,
    .hbieflow-design .auto-judge .title-wrapper .editable-title-input {
        display: inline-block;
        max-width: 120px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
    .hbieflow-design .auto-judge .sort-left:hover,
    .hbieflow-design .auto-judge .sort-right:hover {
        background: #efefef;
        border-color: rgba(25, 31, 37, 0.08);
    }
    .hbieflow-design .auto-judge .sort-left:hover svg path,
    .hbieflow-design .auto-judge .sort-right:hover svg path {
        fill: rgba(25, 31, 37, 0.8);
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

</style>