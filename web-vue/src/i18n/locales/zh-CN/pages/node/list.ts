export default {
  c: {
    quickInstall: '快速安装',
    nodeName: '节点名称',
    workspaceSync: '工作空间同步',
    enterNodeManagement: '点击进入节点管理',
    unknown: '未知',
    delay: '延迟',
    selectWorkspace: '请选择工作空间',
    systemPrompt: '系统提示',
    confirm: '确认',
    cancel: '取消'
  },
  p: {
    noNodesInCurrentWorkspace: '当前工作空间还没有节点',
    installAgentAndAddNewNode: '需要您在需要被管理的服务器中安装 agent ，并将 agent 信息新增到系统中',
    manualAddition: '手动新增',
    solution: '解决办法',
    recommendedQuickInstall: '【推荐】使用快速安装方式导入机器并自动新增逻辑节点',
    addNewNodeOrAuthorizeExistingMachine:
      '请到【系统管理】-> 【资产管理】-> 【机器管理】新增节点，或者将已新增的机器授权关联、分配到此工作空间',
    noNodes: '没有任何节点',
    grouping: '分组',
    quickReturnToFirstPage: '按住 Ctr 或者 Alt/Option 键点击按钮快速回到第一页',
    search: '搜索',
    onlyTableViewSupportsWorkspaceSync: '表格视图才能使用工作空间同步功能',
    modifyMonitoringFrequency: '监控频率可以到服务端配置文件中修改',
    hoverOverDashboardForDetails: '悬停到仪表盘上显示具体含义',
    viewMonitoringHistoryData: '点击仪表盘查看监控历史数据',
    viewNetworkDelayHistoryData: '点击延迟可以查看对应节点网络延迟历史数据',
    nodeStatisticsTimeout:
      '为了避免部分节点不能及时响应造成监控阻塞,节点统计超时时间不受节点超时配置影响将采用默认超时时间(10秒)',
    notEnabled: '未启用',
    remainingMemory: '剩余内存：',
    totalMemory: '总内存：',
    projectCountInLogicalNodes: '工作空间中逻辑节点中的项目数量：',
    projectCountInPhysicalNodes: '物理节点项目数量：',
    resyncProjectInfoInLogicalNodes: '点击重新同步当前工作空间逻辑节点项目信息',
    scriptTemplateCountInLogicalNodes: '工作空间中逻辑节点中脚本模版数量：',
    scriptTemplateDataInPhysicalNodes: '物理节点脚本模板数据：',
    resyncScriptTemplateInfoInLogicalNodes: '点击重新同步当前工作空间逻辑节点脚本模版信息',
    buttonDisabledMeansNodeIsOff: '如果按钮不可用则表示当前节点已经关闭啦,需要去编辑中启用',
    management: '管理',
    bindSshInfoToEnableFeature: '需要到编辑中去为一个节点绑定一个 ssh信息才能启用该功能',
    terminal: '终端',
    more: '更多',
    edit: '编辑',
    deletionCheck: '删除会检查数据关联性,并且节点不存在项目或者脚本',
    delete: '删除',
    unbindCheck: '解绑会检查数据关联性,同时将自动删除节点项目和脚本缓存信息,一般用于服务器无法连接且已经确定不再使用',
    unbind: '解绑',
    top: '置顶',
    moveUp: '上移',
    moveDown: '下移',
    nodeName: '节点名称：',
    nodeAddress: '节点地址：',
    currentStatus: '当前数据为默认状态',
    statusDescription: '状态描述：',
    occupancyRate: '占用率：',
    diskOccupancyRate: '硬盘占用率：',
    actualMemoryOccupancyRate: '实际内存占用率：',
    viewHistoricalTrends: '点击查看历史趋势',
    runningTime: '运行时间',
    updateTime: '更新时间',
    editNode: '编辑节点',
    groupName: '分组名称',
    addGroup: '新增分组',
    selectGroupName: '选择分组名',
    nodeStatus: '节点状态',
    enable: '启用',
    disable: '停用',
    bindSsh: '绑定 SSH',
    selectSsh: '请选择SSH',
    unbindSsh: '不绑定',
    quickInstallPlugin: '快速安装插件端',
    syncToOtherWorkspaces: '同步到其他工作空间',
    warmTip: '温馨提示',
    syncMechanism: '同步机制采用节点地址确定是同一个服务器（节点）',
    createNewNode: '当目标工作空间不存在对应的节点时候将自动创建一个新的节点（逻辑节点）',
    syncNodeInfo: '当目标工作空间已经存在节点时候将自动同步节点授权信息、代理配置信息',
    selectWorkspace: '选择工作空间',
    historicalMonitoringChart: '历史监控图表',
    statusValue: '状态',
    nodeIp: '节点地址',
    systemName: '系统名',
    version: '版本',
    info: '信息',
    projectCount: '项目数',
    scriptCount: '脚本数',
    pluginRunning: '插件运行',
    createTime: '创建时间',
    modifyTime: '修改时间',
    sortValue: '排序值',
    operation: '操作',
    inputNodeName: '请输入节点名称',
    confirmDeleteNode: '真的要删除节点么？删除会检查数据关联性,并且节点不存在项目或者脚本',
    confirmUnbindNode: '真的要解绑节点么？',
    unbindCheck_1: '解绑会检查数据关联性,同时将自动删除节点项目和脚本缓存信息',
    unbindUsage: '一般用于服务器无法连接且已经确定不再使用',
    misoperationWarning: '如果误操作会产生冗余数据！！！',
    dangerousOperation: '危险操作！！！',
    confirmTop: '确定要将此数据置顶吗？',
    confirmMoveUp: '确定要将此数上移吗？',
    confirmMoveDown: '确定要将此数据下移吗？下移操作可能因为列表后续数据没有排序值操作无效！',
    confirmOperation: '确定要操作吗？',
    moveAdvice: '操后上移或者下移可能不会达到预期排序',
    expectedOrderAdvice: '还需要对相关数据都操作后才能达到预期排序'
  }
}