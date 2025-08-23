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
function generateTreeData(prefix, maxDepth, maxChildren, withIcon = false) {
  const result = [];
  const rootCount = Math.floor(Math.random() * 3) + 1; // 1-3个根节点

  for (let i = 1; i <= rootCount; i++) {
    const rootNode = createNode(`${prefix}-${i}`, `一级 ${i}`, 1, withIcon);
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

  const childCount = Math.floor(Math.random() * maxChildren) + 1; // 1-maxChildren个子节点
  parentNode.children = [];

  for (let i = 1; i <= childCount; i++) {
    const nodeId = `${parentNode.id}-${i}`;
    const nodeLabel = `${getLevelName(currentLevel)} ${i}`;
    const childNode = createNode(nodeId, nodeLabel, currentLevel, withIcon);
    parentNode.children.push(childNode);
    generateChildren(childNode, currentLevel + 1, maxDepth, maxChildren, withIcon);
  }
}

/**
 * 创建单个节点
 * @param {string} id - 节点ID
 * @param {string} label - 节点标签
 * @param {number} level - 节点层级
 * @param {boolean} withIcon - 是否包含icon属性
 * @returns {Object} 节点对象
 */
function createNode(id, label, level, withIcon) {
  const node = {
    id,
    label,
    level,
    children: []
  };

  if (withIcon) {
    node.icon = `icon-${Math.floor(Math.random() * 3) + 1}`; // 随机icon-1到icon-3
  }

  return node;
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
function generateLinkList(leftTreeData, rightTreeData, count = 5) {
  const links = [];
  const leftNodes = collectAllNodes(leftTreeData);
  const rightNodes = collectAllNodes(rightTreeData);

  if (leftNodes.length === 0 || rightNodes.length === 0) {
    return links;
  }

  for (let i = 0; i < count; i++) {
    // 随机选择一个左侧节点和一个右侧节点
    const leftNode = leftNodes[Math.floor(Math.random() * leftNodes.length)];
    const rightNode = rightNodes[Math.floor(Math.random() * rightNodes.length)];

    // 50%的概率左侧到右侧，50%的概率右侧到左侧
    if (Math.random() > 0.5) {
      links.push({ source: leftNode.id, target: rightNode.id });
    } else {
      links.push({ source: rightNode.id, target: leftNode.id });
    }
  }

  return links;
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

// 生成默认的树形数据
const LTreeData = generateTreeData('left', 8, 4, true);
const RTreeData = generateTreeData('right', 7, 5, false);
const lnkList = generateLinkList(LTreeData, RTreeData, 4);

// 导出数据
export {
  LTreeData,
  RTreeData,
  lnkList
};