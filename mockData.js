/**
 * Mock数据生成器
 */

/**
 * 生成树形数据
 * @param {string} prefix - 节点ID前缀
 * @param {number} maxDepth - 最大深度
 * @param {number} maxChildren - 最大子节点数
 * @param {boolean} withIcon - 是否包含icon属性
 * @returns {Array} 生成的树数据
 */
function generateTreeData(prefix, maxDepth, maxChildren, withIcon = true) {
  const result = [];
  const rootCount = Math.floor(Math.random() * 2) + 2;

  for (let i = 1; i <= rootCount; i++) {
    const rootNode = createNode(`${prefix}-${i}`, `${getRootName(prefix)} ${i}`, 1, withIcon, true);
    rootNode.color = getLevelColor(1);
    result.push(rootNode);
    generateChildren(rootNode, 2, maxDepth, maxChildren, withIcon);
  }

  return result;
}

/**
 * 递归生成子节点
 * @param {Object} parentNode - 父节点
 * @param {number} currentLevel - 当前层级
 * @param {number} maxDepth - 最大深度
 * @param {number} maxChildren - 最大子节点数
 * @param {boolean} withIcon - 是否包含icon属性
 */
function generateChildren(parentNode, currentLevel, maxDepth, maxChildren, withIcon) {
  if (currentLevel > maxDepth) return;

  let childCount;
  if (currentLevel === 2) {
    childCount = Math.floor(Math.random() * (maxChildren - 1)) + 2;
  } else {
    childCount = Math.floor(Math.random() * maxChildren) + 1;
  }
  
  parentNode.children = [];

  for (let i = 1; i <= childCount; i++) {
    const nodeId = `${parentNode.id}-${i}`;
    const nodeLabel = `${getLevelName(currentLevel)} ${i}`;
    const isLeafNode = currentLevel === maxDepth;
    const childNode = createNode(nodeId, nodeLabel, currentLevel, withIcon, !isLeafNode);
    childNode.color = getLevelColor(currentLevel);
    parentNode.children.push(childNode);
    generateChildren(childNode, currentLevel + 1, maxDepth, maxChildren, withIcon);
  }
}

/**
 * 获取根节点名称
 * @param {string} prefix - 前缀
 * @returns {string} 根节点名称
 */
function getRootName(prefix) {
  return prefix === 'left' ? '左侧根节点' : '右侧根节点';
}

/**
 * 根据层级获取颜色
 * @param {number} level - 层级
 * @returns {string} 颜色值
 */
function getLevelColor(level) {
  const colors = [
    '#f56c6c', '#e6a23c', '#5cb87a', 
    '#1989fa', '#6f7ad3', '#909399',
    '#8d4bbb', '#2f9e44', '#1c7ed6'
  ];
  return colors[level % colors.length];
}

/**
 * 创建单个节点
 * @param {string} id - 节点ID
 * @param {string} label - 节点标签
 * @param {number} level - 节点层级
 * @param {boolean} withIcon - 是否包含icon属性
 * @returns {Object} 节点对象
 */
function createNode(id, label, level, withIcon, hasChildren = false) {
  const node = {
    id,
    label,
    level,
    children: [],
    description: getNodeDescription(level, hasChildren),
    expanded: level <= 2
  };

  // 为所有节点设置type属性，不仅仅是叶子节点
  if (!hasChildren) {
    // 叶子节点随机选择节点类型
    const types = ['input', 'output', 'inOut'];
    const type = types[Math.floor(Math.random() * types.length)];
    node.type = type;
    // 为叶子节点添加一些额外属性
    node.dataSize = Math.floor(Math.random() * 1000) + 100; // 数据大小，100-1099
    node.updateTime = getRandomUpdateTime(); // 更新时间
  } else {
    // 非叶子节点设置为文件夹类型
    node.type = 'folder';
    // 为非叶子节点添加节点统计信息
    node.nodeCount = Math.floor(Math.random() * 20) + 1;
  }

  if (withIcon) {
    // 提供更多的图标选项，并根据类型选择图标
    if (!hasChildren) {
      const leafIcons = ['icon-file', 'icon-document', 'icon-data', 'icon-item', 'icon-element'];
      node.icon = leafIcons[Math.floor(Math.random() * leafIcons.length)];
    } else {
      const folderIcons = ['icon-folder', 'icon-category', 'icon-group', 'icon-collection'];
      node.icon = folderIcons[Math.floor(Math.random() * folderIcons.length)];
    }
  }

  return node;
}

/**
 * 获取节点描述
 * @param {number} level - 层级
 * @param {boolean} hasChildren - 是否有子节点
 * @returns {string} 节点描述
 */
function getNodeDescription(level, hasChildren) {
  const leafDescriptions = [
    '数据输入节点', '数据输出节点', '双向数据节点', 
    '处理结果节点', '配置信息节点', '状态信息节点'
  ];
  const folderDescriptions = [
    '数据分类', '功能模块', '处理流程', 
    '配置组', '资源集合', '业务分类'
  ];
  
  if (hasChildren) {
    return folderDescriptions[Math.floor(Math.random() * folderDescriptions.length)];
  } else {
    return leafDescriptions[Math.floor(Math.random() * leafDescriptions.length)];
  }
}

/**
 * 获取随机更新时间
 * @returns {string} 时间字符串
 */
function getRandomUpdateTime() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30); // 0-29天前
  const pastDate = new Date(now);
  pastDate.setDate(pastDate.getDate() - daysAgo);
  return pastDate.toISOString().slice(0, 10);
}

/**
 * 获取层级名称
 * @param {number} level - 层级
 * @returns {string} 层级名称
 */
function getLevelName(level) {
  const levelNames = ['', '一级', '二级', '三级', '四级', '五级', '六级'];
  return levelNames[level] || `第${level}级`;
}

/**
 * 生成连接列表
 * @param {Array} leftTreeData - 左侧树数据
 * @param {Array} rightTreeData - 右侧树数据
 * @param {number} count - 连接数量
 * @returns {Array} 连接列表
 */
function generateLinkList(leftTreeData, rightTreeData, count = 8) {
  const links = [];
  const leftNodes = collectAllNodes(leftTreeData);
  const rightNodes = collectAllNodes(rightTreeData);
  
  // 分离叶子节点和非叶子节点
  const leftLeafNodes = leftNodes.filter(node => !node.children || node.children.length === 0);
  const rightLeafNodes = rightNodes.filter(node => !node.children || node.children.length === 0);
  const leftFolderNodes = leftNodes.filter(node => node.children && node.children.length > 0);
  const rightFolderNodes = rightNodes.filter(node => node.children && node.children.length > 0);

  if (leftNodes.length === 0 || rightNodes.length === 0) {
    return links;
  }

  // 增加连接数量使视图更丰富
  const totalLinks = Math.min(count, leftNodes.length * rightNodes.length);
  
  // 确保有不同类型的连接
  const leafToLeafCount = Math.floor(totalLinks * 0.5); // 50% 叶子到叶子
  const leafToFolderCount = Math.floor(totalLinks * 0.3); // 30% 叶子到文件夹
  const folderToFolderCount = Math.floor(totalLinks * 0.2); // 20% 文件夹到文件夹
  
  // 生成叶子节点到叶子节点的连接
  for (let i = 0; i < leafToLeafCount && leftLeafNodes.length > 0 && rightLeafNodes.length > 0; i++) {
    const leftNode = leftLeafNodes[Math.floor(Math.random() * leftLeafNodes.length)];
    const rightNode = rightLeafNodes[Math.floor(Math.random() * rightLeafNodes.length)];
    
    // 70%的概率左侧到右侧，30%的概率右侧到左侧，使连接更有方向性
    const source = Math.random() > 0.3 ? leftNode.id : rightNode.id;
    const target = source === leftNode.id ? rightNode.id : leftNode.id;
    
    // 添加连接样式属性
    links.push({
      source,
      target,
      type: 'leaf-to-leaf',
      color: getLinkColor('leaf'),
      thickness: 2,
      label: getConnectionLabel()
    });
  }
  
  // 生成叶子节点到文件夹节点的连接
  for (let i = 0; i < leafToFolderCount && leftLeafNodes.length > 0 && rightFolderNodes.length > 0; i++) {
    const leftNode = leftLeafNodes[Math.floor(Math.random() * leftLeafNodes.length)];
    const rightNode = rightFolderNodes[Math.floor(Math.random() * rightFolderNodes.length)];
    
    // 80%的概率左侧叶子到右侧文件夹
    const source = Math.random() > 0.2 ? leftNode.id : rightNode.id;
    const target = source === leftNode.id ? rightNode.id : leftNode.id;
    
    links.push({
      source,
      target,
      type: 'leaf-to-folder',
      color: getLinkColor('mixed'),
      thickness: 3,
      label: getConnectionLabel()
    });
  }
  
  // 生成文件夹节点到文件夹节点的连接
  for (let i = 0; i < folderToFolderCount && leftFolderNodes.length > 0 && rightFolderNodes.length > 0; i++) {
    const leftNode = leftFolderNodes[Math.floor(Math.random() * leftFolderNodes.length)];
    const rightNode = rightFolderNodes[Math.floor(Math.random() * rightFolderNodes.length)];
    
    // 60%的概率左侧到右侧
    const source = Math.random() > 0.4 ? leftNode.id : rightNode.id;
    const target = source === leftNode.id ? rightNode.id : leftNode.id;
    
    links.push({
      source,
      target,
      type: 'folder-to-folder',
      color: getLinkColor('folder'),
      thickness: 4,
      label: getConnectionLabel()
    });
  }

  return links;
}

/**
 * 获取连接标签
 * @returns {string} 连接标签
 */
function getConnectionLabel() {
  const labels = [
    '数据流', '关联关系', '引用', 
    '依赖', '映射', '转换', 
    '同步', '触发', '输出'
  ];
  return labels[Math.floor(Math.random() * labels.length)];
}

/**
 * 获取连接线颜色
 * @param {string} type - 连接类型
 * @returns {string} 颜色值
 */
function getLinkColor(type) {
  const leafColors = ['#4096ff', '#67c23a', '#e6a23c'];
  const folderColors = ['#f56c6c', '#909399', '#6f7ad3'];
  const mixedColors = ['#8d4bbb', '#2f9e44', '#1c7ed6'];
  
  switch (type) {
    case 'leaf':
      return leafColors[Math.floor(Math.random() * leafColors.length)];
    case 'folder':
      return folderColors[Math.floor(Math.random() * folderColors.length)];
    case 'mixed':
      return mixedColors[Math.floor(Math.random() * mixedColors.length)];
    default:
      return '#909399';
  }
}

/**
 * 收集所有节点
 * @param {Array} treeData - 树数据
 * @returns {Array} 所有节点列表
 */
function collectAllNodes(treeData) {
  const nodes = [];

  function traverse(node) {
    nodes.push(node);
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => traverse(child));
    }
  }

  treeData.forEach(node => traverse(node));
  return nodes;
}

/**
 * 收集所有叶子节点
 * @param {Array} treeData - 树数据
 * @returns {Array} 所有叶子节点列表
 */
function collectLeafNodes(treeData) {
  const nodes = [];

  function traverse(node) {
    if (!node.children || node.children.length === 0) {
      nodes.push(node);
    } else if (node.children && node.children.length > 0) {
      node.children.forEach(child => traverse(child));
    }
  }

  treeData.forEach(node => traverse(node));
  return nodes;
}

// 生成默认的树形数据
// 调整左右两侧树的深度，使视觉更加平衡
const LTreeData = generateTreeData('left', 5, 4, true);
const RTreeData = generateTreeData('right', 4, 5, true);
const lnkList = generateLinkList(LTreeData, RTreeData, 12);

// 导出数据
export {
  LTreeData,
  RTreeData,
  lnkList
};