<template>
    <div class="condition-node">
        <div class="condition-node-box">
            <div class="auto-judge">
                <div class="sort-left" v-if="nodeIndex!=0"><i class="iconfont">&#59816;</i></div>
                <div class="title-wrapper">
                    <span class="editable-title">{{nodeConfig.name}}</span>
                </div>
                <div class="sort-right" v-if="nodeIndex!=nodeLen-1">
                    <i class="iconfont">&#59844;</i>
                </div>
                <div class="content"></div>
            </div>
            <add-node-btn></add-node-btn>
        </div>
    </div>
</template>

<script>
    import AddNodeBtn from "./addNodeBtn";
    export default {
        name: "conditionNode",
        components: {AddNodeBtn},
        props: {
            nodeConfig: {
                type: Object
            },
            nodeIndex: {
                type: Number,
                default: 0
            },
            nodeLen: {
                type: Number,
                defalut: 0
            }
        }
    }
</script>

<style scoped>

</style>