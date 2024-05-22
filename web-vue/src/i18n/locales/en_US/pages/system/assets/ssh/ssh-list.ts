export default {
  c: {
    unknown: 'Unknown',
    version: 'Version:',
    delete: 'Delete',
    sshName: 'SSH Name',
    username: 'Username',
    variableName: 'For variable name',
    password: 'Password',
    encoding: 'Encoding format',
    fileSuffix: 'File suffix',
    fileSuffixAndEncoding:
      'Please enter the suffix and encoding of the file allowed to edit. If no encoding is set, the system encoding will be taken by default. Multiple entries can be separated by line breaks. Example: setting encoding: txt@utf-8, not setting encoding: txt',
    workspaceName: 'Workspace name',
    selectWorkspace: 'Please select a workspace',
    systemPrompt: 'System prompt',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  p: {
    manage: 'Manage',
    noAssetSsh: 'No asset SSH',
    sshName: 'SSH name',
    group: 'Group',
    goToFirstPage: 'Hold Ctrl or Alt/Option and click the button to quickly return to the first page',
    search: 'Search',
    add: 'Add',
    batchAssign: 'Batch assign',
    export: 'Export',
    downloadTemplate: 'Download import template',
    import: 'Import',
    nodeStatus: 'Node status is asynchronously acquired with a certain time delay',
    javaEnvAutoDetect:
      'The node status will automatically identify whether there is a java environment in the server. If there is no Java environment, the node cannot be quickly installed',
    associatedNodeStatus:
      'If the associated node has a java environment on the server, but the plugin is not running, a quick installation button will be displayed',
    systemInfo: 'System information',
    systemName: 'System name:',
    systemVersion: 'System version:',
    model: 'Model:',
    hostname: 'Hostname:',
    bootTime: 'Boot time:',
    javaInfo: 'Java information',
    pluginProcessId: 'Plugin process ID:',
    installNode: 'Install node',
    dockerInfo: 'Docker information',
    path: 'Path:',
    exists: 'Exists',
    notExists: 'Does not exist',
    noStatusMsg: 'No status message yet',
    memoryUsage: 'Memory usage:',
    totalMemory: 'Total memory:',
    diskInfo: 'Disk information',
    diskTotal: 'Total disk space:',
    maxDiskUsage: 'Maximum disk usage:',
    maxUsagePartition: 'Partition with the highest usage:',
    usage: 'Usage:',
    count: 'Count:',
    terminal: 'Terminal',
    fullScreenTerminal: 'Full-screen terminal',
    assign: 'Assign',
    file: 'File',
    associate: 'Associate',
    more: 'More',
    edit: 'Edit',
    terminalLog: 'Terminal log',
    editSsh: 'Edit SSH',
    groupName: 'Group name',
    addNewGroup: 'Add new group',
    selectGroupName: 'Select group name',
    host: 'Host',
    port: 'Port number',
    authType: 'Authentication method',
    accountSupportVarRef: 'Account supports referencing workspace variables:',
    user: 'User',
    passwordNote:
      'The password and key fields will not be returned during editing. If you need to reset or clear them, please click here',
    clear: 'Clear',
    passwordSupportVarRef: 'Password supports referencing workspace variables:',
    passwordNote2: 'If the password has not been modified, it can be left blank',
    privateKeyContent: 'Private key content',
    privateKeyDefaultNote:
      'Leave blank to use the default configuration in the $HOME/.ssh directory. The priority is: id_dsa>id_rsa>identity',
    privateKeyContent2:
      'Private key content. Leave blank to use the default configuration in the $HOME/.ssh directory. Supports configuration file directories: file:/xxxx/xx',
    timeout: 'Timeout (s)',
    timeoutUnit: 'Unit is seconds, minimum value is 1 second',
    serverManagementNote: 'This configuration only applies to server management',
    workspaceSshConfigNote: 'The SSH configuration for the workspace needs to be configured separately (',
    sshConfigMethod:
      'Configuration method: SSH list -> Action column -> Associate button -> Corresponding workspace -> Action column -> Configure button',
    punctuation: '。',
    pluginInstallation: 'Install Plugin',
    fileManagement: 'File Management',
    operationLog: 'Operation Log',
    associateWorkspaceSsh: 'Associate Workspace SSH',
    sshDeletionNote:
      'SSHs assigned to workspaces cannot be deleted directly. They need to be deleted in each assigned workspace before the asset SSH can be deleted.',
    name: 'Name:',
    belongingWorkspace: 'Belonging Workspace: ',
    configuration: 'Configuration',
    configureSsh: 'Configure SSH',
    workspaceSpecificConfigNote:
      'The current configuration only applies to the selected workspace. Separate configuration is required for other workspaces.',
    fileDirectory: 'File Directory',
    onlineManagementNote:
      'Binding a specified directory allows online management, and configuring the ssh publishing directory also needs to be done here.',
    authorizedDirectories:
      'Authorized directories that can be directly accessed, multiple entries can be separated by line breaks',
    forbiddenCommands: 'Forbidden Commands',
    forbiddenCommandsNote: 'Restrict commands that are not allowed to be executed in the online terminal',
    superAdminNote: 'Super admins have no restrictions',
    otherUsersNote: 'Other users can configure permissions to lift restrictions',
    forbiddenCommandsDetail:
      'Forbidden commands are commands that are not allowed to be executed in the terminal, multiple entries can be separated by commas. (Super admins have no restrictions)',
    assignToOtherWorkspaces: 'Assign to Other Workspaces',
    note: 'Note',
    configInstructions:
      'After assigning to a workspace, you need to go to the association to configure the corresponding workspace for optimal use.',
    workspaceSelection: 'Select Workspace',
    commandLog: 'Command Log',
    certificate: 'Certificate',
    name_1: 'Name',
    systemName_1: 'System Name',
    memory: 'Memory',
    disk: 'Disk',
    connectionStatus: 'Connection Status',
    nodeStatus_1: 'Node Status',
    creationTime: 'Creation Time',
    modificationTime: 'Modification Time',
    operation: 'Operation',
    inputName: 'Please enter the name',
    inputHostAddress: 'Please enter the host address',
    inputPortNumber: 'Please enter the port number',
    selectConnectionType: 'Please select the connection type',
    inputAccountName: 'Please enter the account name',
    inputLoginPassword: 'Please enter the login password',
    confirmDeleteMachineSsh: 'Are you sure you want to delete the machine SSH?',
    confirmDeleteWorkspaceSsh: 'Are you sure you want to delete the SSH for the corresponding workspace?',
    confirmClearSshHiddenInfo:
      'Are you sure you want to clear the SSH hidden field information? (password, private key)'
  }
}
