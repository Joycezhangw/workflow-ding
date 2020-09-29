<script>
    import nodeUtil from "@/libs/nodeUtils"
    //主流程节点面板标题背景颜色，图标，内容
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
            content: "请选中办理人",
            icon: "&#59707;",//该 iconfont 跟  notifier 是一样，后期要统一管理
        }
    };
    /**
     * 创建流程节点，不创建条件节点
     * @param that 当前vue对象
     * @param nodeConfig  流程节点数据
     * @param h  vue  createElement
     * @returns {[]}
     */
    function createNormalNodeBox(that, nodeConfig, h) {
        return (<div class="node-wrap">
            <div class={`node-wrap-box ${nodeConfig.type === "start" ? " node_sid-startevent start-node" : ""}`}>
                <nodeTitle  node={nodeConfig}  isStartNode={nodeUtil.isStartNode(nodeConfig)} nodeCur={nodeCardConfig[nodeConfig.type]}></nodeTitle>
            </div>
            <addNodeBtn></addNodeBtn>
        </div>)
    }

    /**
     * 重新定义 this 指向到 vue
     * */
    const createNodeBoxFunc = (...arg) => createNormalNodeBox.call(arg[0], ...arg);

    let nodeFun = {
        start: createNodeBoxFunc,//开始节点
        approver: createNodeBoxFunc,//审批节点
        notifier: createNodeBoxFunc,//抄送人节点
        audit: createNodeBoxFunc,//办理人节点
        empty: (_) => "",
        route:(that,nodeConfig,h)=>{//分支路由节点
            return (<div class="branch-wrap">
                <div class="branch-box-wrap">
                    <div class="branch-box">
                    <button class="add-branch">添加条件</button>
                    {nodeConfig.conditionNodes.map((item,index)=>{
                        return (<div class="col-box">
                            {index === 0 ? <div class="top-left-cover-line"></div> : ''}
                            {index === 0 ? <div class="bottom-left-cover-line"></div> : ''}
                            {index==nodeConfig.conditionNodes.length-1 ? <div class="top-right-cover-line"></div> : ''}
                            {index==nodeConfig.conditionNodes.length-1 ? <div class="bottom-right-cover-line"></div> : ''}
                            <conditionNode nodeConfig={item} nodeIndex={index} nodeLen={nodeConfig.conditionNodes.length}></conditionNode>
                            {item.childNode && nodeFactory(that,item.childNode,h)}
                        </div>)
                    })}
                </div>
             <addNodeBtn></addNodeBtn>
            </div>
            </div>)
        }
    };

    /**
     * 递归创建流程节点
     * @param that 当前vue对象
     * @param nodeConfig  流程节点数据
     * @param h  vue  createElement
     * @returns {[]}
     */
    function nodeFactory(that, nodeConfig, h) {
        let nodeBox = [],
            selfNode = ((nodeUtil.isStartNode(nodeConfig) || nodeUtil.isNotifierNode(nodeConfig) || nodeUtil.isApproverNode(nodeConfig) || nodeUtil.isAuditNode(nodeConfig)) && nodeFun[nodeConfig.type].call(that, that, nodeConfig, h));
        //分支流程节点
        if(nodeUtil.isRouteNode(nodeConfig)){
            selfNode=nodeFun[nodeConfig.type].call(that, that, nodeConfig, h);
        }
        nodeBox.push(selfNode);
        nodeConfig.childNode && nodeBox.push(nodeFactory.call(that, that, nodeConfig.childNode, h));
        return nodeBox;
    }

    import addNodeBtn from "@/components/workflow/process/addNodeBtn";
    import nodeTitle from "@/components/workflow/process/nodeTitle";
    import conditionNode from "@/components/workflow/process/conditionNode";

    export default {
        name: "nodeWrap",
        comments: {
            addNodeBtn,//添加流程节点组件
            nodeTitle,//流程节点标题组件
            conditionNode//条件流程节点组件
        },
        props: {
            nodeConfig: {type: Object, required: true},
        }, render(h) {
            return (<div>{this.nodeConfig && nodeFactory.call(this,this,this.nodeConfig,h)}</div>);
        },
    }
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
    /*条件分支*/
   
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
    /*连接线*/
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
    /*主节点*/
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