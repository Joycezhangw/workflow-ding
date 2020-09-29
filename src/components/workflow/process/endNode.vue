<template>
    <div class="end-node">
        <div class="end-node-circle"></div>
        <div class="end-node-text">流程结束</div>
    </div>
</template>

<script>
    export default {
        name: "endNode"
    }
</script>

<style lang="scss" scoped>
    .hbieflow-design {
        .end-node {
            border-radius: 50%;
            font-size: 14px;
            color: rgba(25, 31, 37, 0.4);
            text-align: left;

            .end-node-circle {
                width: 10px;
                height: 10px;
                margin: auto;
                border-radius: 50%;
                background: #dbdcdc;
            }

            .end-node-text {
                margin-top: 5px;
                text-align: center;
            }
        }
    }

</style>