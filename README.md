# Double Tree Flow

一个用于可视化两棵树之间节点连接关系的JavaScript库。

## 功能特点
- 支持左右两棵树之间的节点连接可视化
- 节点展开/折叠功能
- 自动计算和绘制连接线，支持不同方向的连接
- 处理节点滚动和可视性，优化连接线显示
- 响应式设计，适应不同窗口大小

## 安装

### 使用npm
```bash
npm install double-tree-flow
```

### 使用yarn
```bash
yarn add double-tree-flow
```

## 使用示例

```javascript
// 导入库
import DoubleTreeFlow from 'double-tree-flow';

// 准备数据
const leftTreeData = [
    {
        id: 'left-1',
        label: '节点1',
        level: 1,
        children: [
            {
                id: 'left-1-1',
                label: '子节点1-1',
                level: 2
            }
        ]
    },
    {
        id: 'left-2',
        label: '节点2',
        level: 1
    }
];

const rightTreeData = [
    {
        id: 'right-1',
        label: '节点A',
        level: 1
    },
    {
        id: 'right-2',
        label: '节点B',
        level: 1
    }
];

const linkList = [
    { source: 'left-1', target: 'right-1' },
    { source: 'left-2', target: 'right-2' }
];

// 创建实例
// 可选：传递配置选项
const options = {
    treeContainerWidth: '300px', // 树容器宽度
    treeContainerMaxHeight: '500px' // 树容器最大高度
};

const treeFlow = new DoubleTreeFlow('container-id', leftTreeData, rightTreeData, linkList, options);

// 方法调用
// 重绘连接线
treeFlow.redraw();

// 更新数据
treeFlow.updateData(newLeftTreeData, newRightTreeData, newLinkList);
```

## API文档

### DoubleTreeFlow类

#### 构造函数
```typescript
constructor(containerId: string, leftTreeData: TreeNode[], rightTreeData: TreeNode[], linkList: Connection[], options?: {
  containerHeight?: string;
  treeContainerWidth?: string;
  treeContainerMaxHeight?: string;
})
```
- `containerId`: 容器元素的ID
- `leftTreeData`: 左侧树的数据
- `rightTreeData`: 右侧树的数据
- `linkList`: 初始连接线列表
- `options` (可选): 配置选项对象
  - `containerHeight`: 容器高度 (例如: '80vh')
  - `treeContainerWidth`: 树容器宽度 (例如: '300px')
  - `treeContainerMaxHeight`: 树容器最大高度 (例如: '500px')

#### 方法
- `redraw()`: 重绘连接线
- `updateData(leftTreeData: TreeNode[], rightTreeData: TreeNode[], linkList: Connection[])`: 更新树数据和连接线

### 数据类型

```typescript
// 树节点接口
interface TreeNode {
  id: string;
  label: string;
  level: number;
  icon?: string;
  children?: TreeNode[];
  parentId?: string;
}

// 连接接口
interface Connection {
  source: string;
  target: string;
}
```

## 开发

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 许可证
MIT