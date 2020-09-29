<template>
    <div
            class="node-wrap-box"
            :class="[node.type === 'start' ? 'node_sid-startevent start-node' : '']"
    >
        <node-title
                :node="node"
                :isStartNode="node.type === 'start' ? true : false"
                :nodeCur="nodeCur[node.type]"
        ></node-title>
        <div class="content">
            <div class="text"></div>
            <i class="iconfont arrow">&#59844;</i>
        </div>
    </div>
</template>
<script>
    import nodeTitle from "@/components/process/nodeTitle";

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
        audit: {
            bgColor: "rgb(251, 96, 45)",
            content: "发起人自选",
            icon: "&#59707;",
        }
    };
    export default {
        name: "nodeWrapBox",
        props: {
            node: {
                type: Object,
                required: true,
                default: () => {
                },
            },
        },
        components: {
            nodeTitle,
        },
        data() {
            return {
                nodeCur: Object.freeze(nodeCardConfig),
            };
        },
    };
</script>
<style lang="scss">

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

        &:after {
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

        &.error {
            &:after {
                border: 1px solid #f25643;
                box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
            }
        }

        .title {
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

            .node-view-icon {
                &.audit {
                    path {
                        fill: #ffffff;
                    }
                }
            }
        }

        .placeholder {
            color: #bfbfbf;
        }

        .close {
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

        .content {
            position: relative;
            font-size: 14px;
            padding: 16px;
            padding-right: 30px;

            .text {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }

            .arrow {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 14px;
                font-size: 14px;
                color: #979797;
            }
        }

        .parallel-tip {
            padding: 16px;
            color: #00b853;
        }

        &:before {
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

        &.start-node {
            &:before {
                content: none;
            }
        }
    }

    .node-wrap-box:active:after,
    .node-wrap-box:hover:after {
        border: 1px solid #3296fa;
        box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
    }

    .node-wrap-box:active .close,
    .node-wrap-box:hover .close {
        display: block;
    }

    .node-wrap-box .title .node-view-icon,
    .node-wrap-box .title .iconfont {
        font-size: 12px;
        margin-right: 5px;
    }

    .start-node {
        &.node-wrap-box {
            .content {
                .text {
                    display: block;
                    white-space: nowrap;
                }
            }
        }
    }

    .node-wrapper-box-new {
        padding: 12px 10px;

        .actions {
            margin-top: 11px;
            text-align: right;
        }

        .ant-btn {
            margin-left: 8px;
        }
    }

    .node-wrapper-box-new {
        padding: 12px 10px;

        .actions {
            margin-top: 11px;
            text-align: right;
        }

        .ant-btn {
            margin-left: 8px;
        }
    }
</style>