class nodeUtils {

    /**
     * 判断是否条件节点
     * @param {Object} node  节点数据
     * @returns Boolean
     */
    static isConditionNode(node) {
        return node && node.type === 'condition'
    }
    /**
     * 判断是否是路由分支
     * @param {Object} node 节点数据
     */
    static isRouteNode(node) {
        return node && node.type === 'route'
    }
    /**
     * 判断是否是通知抄送人节点
     * @param {*} node 节点数据
     */
    static isNotifierNode(node) {
        return node && node.type === 'notifier'
    }
    /**
     * 判断是否是初始节点
     * @param {*} node 节点数据
     */
    static isStartNode(node) {
        return node && node.type === 'start'
    }
    /**
     * 判断是否是审批人节点
     * @param {*} node 节点数据
     */
    static isApproverNode(node) {
        return node && node.type === 'approver'
    }
    /**
     * 判断是否是办理人节点
     * @param {*} node 节点数据
     */
    static isAuditNode(node) {
        return node && node.type === 'audit'
    }

}
export default nodeUtils;