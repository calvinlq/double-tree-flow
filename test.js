// 测试脚本
import DoubleTreeFlow from './dist/double-tree-flow.es.js';

// 简单测试数据
const leftTreeData = [
    {
        id: 'left-1',
        label: '测试节点1',
        level: 1
    }
];

const rightTreeData = [
    {
        id: 'right-1',
        label: '测试节点A',
        level: 1
    }
];

const linkList = [
    { source: 'left-1', target: 'right-1' }
];

// 输出测试信息
console.log('测试库加载成功!');
console.log('DoubleTreeFlow类定义:', DoubleTreeFlow);

// 模拟DOM环境（在Node.js中测试）
if (typeof document === 'undefined') {
    console.log('在Node.js环境中测试，跳过DOM相关操作');
} else {
    // 初始化库
    const treeCanvas = new DoubleTreeFlow('test-container', leftTreeData, rightTreeData, linkList);
    console.log('库初始化成功!');
}

console.log('测试完成!');