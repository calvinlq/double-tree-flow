// 导入样式文件
import './index.scss';

// 导入图标资源
import inputIcon from './assets/images/input.svg';
import outputIcon from './assets/images/output.svg';
import inOutIcon from './assets/images/inOut.svg';

// 定义节点类型枚举
type NodeType = 'input' | 'output' | 'inOut';

// 定义树节点接口
interface TreeNode {
  id: string;
  label: string;
  level: number;
  type: NodeType;
  icon?: string;
  children?: TreeNode[];
  parentId?: string;
}

// 定义连接接口
interface Connection {
  source: string;
  target: string;
}

class DoubleTreeFlow {
  private leftTreeData: TreeNode[];
  private rightTreeData: TreeNode[];
  private linkList: Connection[];
  private container: HTMLElement;
  private connections: Connection[] = [];
  private selectedNode: string | null = null;
  private enableLink: boolean;
  private bezier: number;
  private enableTxtBgColor: boolean;
  
  constructor(
    containerId: string,
    leftTreeData: TreeNode[],
    rightTreeData: TreeNode[],
    linkList: Connection[],
    options: { bezier?: number; enableLink?: boolean; enableTxtBgColor?: boolean } = {}
  ) {
    this.enableLink = options.enableLink !== undefined ? options.enableLink : false;
    this.enableTxtBgColor = options.enableTxtBgColor !== undefined ? options.enableTxtBgColor : false;
    this.bezier = options.bezier !== undefined ? options.bezier : 100;
    this.leftTreeData = leftTreeData;
    this.rightTreeData = rightTreeData;
    this.linkList = linkList;

    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    container.style.display = 'flex';
    container.style.justifyContent = 'space-around';
    container.style.padding = '6px 10px';
    this.container = container;

    this.init();
  }

  private init(): void {
    // 创建外层容器和两个树容器
    this.container.innerHTML = `<svg id="connection-layer"></svg>`;

    const leftTree = document.createElement("div");
    leftTree.className = "tree-container";
    leftTree.id = "leftTree";
    const treeContainerWidth = this.container.dataset.treewidth;
    const treeContainerMaxHeight = this.container.dataset.treeheight;
    
    if (treeContainerWidth) {
      leftTree.style.width = `${treeContainerWidth}px`;
    }
    if (treeContainerMaxHeight) {
      leftTree.style.maxHeight = `${treeContainerMaxHeight}px`;
    }

    const rightTree = document.createElement("div");
    rightTree.className = "tree-container";
    rightTree.id = "rightTree";
    if (treeContainerWidth) {
      rightTree.style.width = `${treeContainerWidth}px`;
    }
    if (treeContainerMaxHeight) {
      rightTree.style.maxHeight = `${treeContainerMaxHeight}px`;
    }

    this.container.appendChild(leftTree);
    this.container.appendChild(rightTree);

    this.initializeTrees();
    window.addEventListener("resize", () => this.drawConnections());
  }

  private getParentNode(nodeId: string): DOMRect {
    const nodeElement = document.querySelector(`[data-id="${nodeId}"]`) as HTMLElement;
    const nodeRect = nodeElement.getBoundingClientRect();
    if (nodeRect.top !== 0) {
      return nodeRect;
    } else {
      return this.getParentNode(nodeElement.parentElement!.parentElement!.dataset.id!);
    }
  }

  private renderTreeNode(node: TreeNode, container: HTMLElement): void {
    const nodeElement = document.createElement("div");
    let nodeClasses = `tree-node level-${node.level}`;
    // 如果有子节点，添加has-children类
    if (node.children && node.children.length > 0) {
      nodeClasses += " has-children";
    }
    // 如果是一级节点，添加level-1-node类
    if (node.level === 1) {
      nodeClasses += " level-1-node";
    }
    nodeElement.className = nodeClasses;
    nodeElement.dataset.id = node.id;
    nodeElement.dataset.level = node.level.toString();
    // 存储父节点ID
    if (node.parentId) {
      nodeElement.dataset.parentId = node.parentId;
    }

    const flexContainer = document.createElement("div");
    flexContainer.className = `tree-node-row level-${node.level}`;
    nodeElement.appendChild(flexContainer);

    // 切换按钮
    if (node.children && node.children.length > 0) {
      const toggleElement = document.createElement("span");
      toggleElement.className = "tree-toggle minus";
      toggleElement.addEventListener("click", (e) => {
        e.stopPropagation();
        const childrenElement = nodeElement.querySelector(".tree-children") as HTMLElement;
        childrenElement.classList.toggle("active");
        const toggleActive =  childrenElement.classList.contains("active")
        if (!toggleActive) {
          toggleElement.classList.remove('minus')
          toggleElement.classList.add('plus')
        } else {
          toggleElement.classList.remove('plus')
          toggleElement.classList.add('minus')
        }
        this.drawConnections(); // 节点展开/折叠时重新绘制连接线
      });
      flexContainer.appendChild(toggleElement);
    } else {
      // 没有子节点的占位符
      const placeholder = document.createElement("span");
      placeholder.className = "no-toggle";
      placeholder.style.width = "3px";
      placeholder.style.display = "inline-block";
      placeholder.style.marginRight = "5px";
      flexContainer.classList.add("not-children");
      flexContainer.appendChild(placeholder);
    }

    // 根据节点类型设置图标
    let iconPath = '';
    switch (node.type) {
      case 'input':
        iconPath = inputIcon;
        break;
      case 'output':
        iconPath = outputIcon;
        break;
      case 'inOut':
        iconPath = inOutIcon;
        break;
      default:
        iconPath = node.icon || '';
    }

    if (iconPath) {
      const iconElement = document.createElement("img");
      iconElement.src = iconPath;
      iconElement.className= "tree-icon";
      flexContainer.appendChild(iconElement);
    }

    // 节点标签
    const labelElement = document.createElement("span");
    labelElement.className = "tree-label";
    if (this.enableTxtBgColor) {
      labelElement.className += " tree-bg-color";
      labelElement.style.padding = '2px 10px';
    } else {
      labelElement.className += " default";
    }
    labelElement.textContent = node.label;
    labelElement.addEventListener("click", () => {
      this.handleNodeClick(node.id);
    });
    flexContainer.appendChild(labelElement);

    // 子节点容器
    if (node.children && node.children.length > 0) {
      const childrenElement = document.createElement("div");
      childrenElement.className = "tree-children active";
      nodeElement.appendChild(childrenElement);

      // 渲染子节点
      node.children.forEach((child) => {
        // 设置子节点的父ID
        child.parentId = node.id;
        this.renderTreeNode(child, childrenElement);
      });
    }

    container.appendChild(nodeElement);
  }

  private handleNodeClick(nodeId: string): void {
    // 清除之前选中节点的样式
    if (this.selectedNode) {
      const prevSelected = document.querySelector(
        `[data-id="${this.selectedNode}"] .tree-label`
      ) as HTMLElement | null;
      if (prevSelected) prevSelected.classList.remove("selected");
    }

    // 如果选中了不同的节点，创建连接
    if (this.selectedNode && this.selectedNode !== nodeId) {
        // 允许左右和右左连接
        const isLeftToRight = this.selectedNode.startsWith("left-") && nodeId.startsWith("right-");
        const isRightToLeft = this.selectedNode.startsWith("right-") && nodeId.startsWith("left-");

        if (this.enableLink && (isLeftToRight || isRightToLeft)) {
          const source = this.selectedNode;
          const target = nodeId;
          this.connections.push({ source, target });
          this.drawConnections();
          this.selectedNode = null;
          return;
        } else if (!this.enableLink) {
          this.selectedNode = nodeId;
          const selectedElement = document.querySelector(
            `[data-id="${nodeId}"] .tree-label`
          ) as HTMLElement | null;
          if (selectedElement) {
            selectedElement.classList.add("selected");
          }
          return;
        }
      }

      // 如果点击的是已经选中的节点，则移除选中状态
      if (this.selectedNode === nodeId) {
        const selectedElement = document.querySelector(
          `[data-id="${nodeId}"] .tree-label`
        ) as HTMLElement | null;
        if (selectedElement) {
          selectedElement.classList.remove("selected");
        }
        this.selectedNode = null;
        return;
      }

      // 设置新的选中节点
      this.selectedNode = nodeId;
      const selectedElement = document.querySelector(
        `[data-id="${nodeId}"] .tree-label`
      ) as HTMLElement | null;
      if (selectedElement) {
        selectedElement.classList.add("selected");
      }
  }

  private isNodeVisible(nodeId: string): boolean {
    const nodeElement = document.querySelector(`[data-id="${nodeId}"]`) as HTMLElement | null;
    if (!nodeElement) return false;

    // 检查所有祖先节点是否展开
    let parent = nodeElement.parentElement;
    while (parent && parent.classList.contains("tree-children")) {
      if (!parent.classList.contains("active")) {
        return false;
      }
      parent = parent.parentElement?.parentElement || null;
    }

    // 检查节点是否在可视区域内（部分可见即可）
    const treeContainer = nodeElement.closest(".tree-container") as HTMLElement | null;
    if (!treeContainer) return false;
    const nodeRect = nodeElement.getBoundingClientRect();
    const containerRect = treeContainer.getBoundingClientRect();

    return (
      nodeRect.bottom > containerRect.top && nodeRect.top < containerRect.bottom
    );
  }

  private findNearestVisibleAncestor(nodeId: string): string | null {
    const nodeElement = document.querySelector(`[data-id="${nodeId}"]`) as HTMLElement | null;
    if (!nodeElement) return null;

    // 先检查当前节点是否可见
    if (this.isNodeVisible(nodeId)) {
      return nodeId;
    }

    // 查找可见的祖先节点
    let parentId = nodeElement.dataset.parentId;
    while (parentId) {
      if (this.isNodeVisible(parentId)) {
        return parentId;
      }
      const parentElement = document.querySelector(`[data-id="${parentId}"]`) as HTMLElement | null;
      if (!parentElement) break;
      parentId = parentElement.dataset.parentId;
    }

    // 如果没有可见的祖先节点，查找同层级的可见节点
    const level = nodeElement.dataset.level;
    const sameLevelNodes = Array.from(
      document.querySelectorAll(`.tree-node[data-level="${level}"]`) as NodeListOf<HTMLElement>
    );
    const nodeRect = nodeElement.getBoundingClientRect();

    // 筛选出在可视区域内的同层级节点
    const visibleSameLevelNodes = sameLevelNodes.filter((node) => {
      return this.isNodeVisible(node.dataset.id!);
    });

    if (visibleSameLevelNodes.length === 0) {
      // 如果同层级没有可见节点，查找更高级别的节点
      const grandparentElement = nodeElement.parentElement?.closest(".tree-node") as HTMLElement | null;
      if (grandparentElement) {
        return this.findNearestVisibleAncestor(grandparentElement.dataset.id!);
      }
      return null;
    }

    // 找到距离当前节点最近的可见节点
    visibleSameLevelNodes.sort((a, b) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return (
        Math.abs(aRect.top - nodeRect.top) - Math.abs(bRect.top - nodeRect.top)
      );
    });

    // 确保连接线连接到可视范围的边缘节点
    const closestNode = visibleSameLevelNodes[0];
    const closestNodeId = closestNode.dataset.id!;

    return closestNodeId;
  }

  private addScrollListenersWithThrottle(): void {
    const treeContainers = document.querySelectorAll(".tree-container") as NodeListOf<HTMLElement>;
    treeContainers.forEach((container) => {
      // 使用节流函数优化滚动性能
      container.addEventListener("scroll", this.throttle(() => this.drawConnections(), 10));
    });
  }

  private throttle(func: () => void, delay: number): () => void {
    let lastCall = 0;
    return () => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func();
      }
    };
  }

  private getNodeVisibilityPosition(nodeId: string): "top" | "bottom" | "visible" | "unknown" {
    // 使用data-id属性获取节点
    const nodeElement = document
      .querySelector(`[data-id="${nodeId}"]`)?.querySelector(".tree-label") as HTMLElement | null;
    if (!nodeElement) {
      return "unknown";
    }

    const treeContainer = nodeElement.closest(".tree-container") as HTMLElement | null;
    if (!treeContainer) {
      return "unknown";
    }

    // 使用getBoundingClientRect获取准确位置
    const nodeRect = nodeElement.getBoundingClientRect();
    const containerRect = treeContainer.getBoundingClientRect();

    // 如果nodeRect.top === 0 则向递归查找上级top不为0的node节点
    let tmpNodeRect: DOMRect | null = null;
    if (nodeRect.top === 0) {
      tmpNodeRect = this.getParentNode(nodeId);
    }

    if (nodeRect.top === 0 && tmpNodeRect) {
      // 节点在容器顶部不可见（包括完全不可见和部分不可见）
      if (tmpNodeRect.top < containerRect.top) {
        return "top";
      }
      // 节点在容器底部不可见（包括完全不可见和部分不可见）
      else if (tmpNodeRect.bottom > containerRect.bottom) {
        return "bottom";
      }
      // 节点可见
      else {
        return "visible";
      }
    } else {
      // 节点在容器顶部不可见（包括完全不可见和部分不可见）
      if (nodeRect.top < containerRect.top) {
        return "top";
      }
      // 节点在容器底部不可见（包括完全不可见和部分不可见）
      else if (nodeRect.bottom > containerRect.bottom) {
        return "bottom";
      }
      // 节点可见
      else {
        return "visible";
      }
    }
  }

  private findFirstVisibleNode(): HTMLElement | null {
    // 获取所有节点
    const allNodes = document.querySelectorAll(".tree-node") as NodeListOf<HTMLElement>;

    // 遍历所有节点，返回第一个可见的节点
    for (const node of Array.from(allNodes)) {
      const nodeId = node.dataset.id!;
      if (this.isNodeVisible(nodeId)) {
        return node;
      }
    }

    // 如果没有找到可见节点，返回null
    return null;
  }

  private drawConnections(): void {
    const svg = document.getElementById("connection-layer") as SVGSVGElement | null;
    if (!svg) return;
    svg.innerHTML = ""; // 清除现有连接
    const svgRect = svg.getBoundingClientRect();

    this.connections.forEach((conn) => {
      // 找到源节点和目标节点
      const sourceElement = document.querySelector(
        `[data-id="${conn.source}"] .tree-label`
      ) as HTMLElement | null;
      const targetElement = document.querySelector(
        `[data-id="${conn.target}"] .tree-label`
      ) as HTMLElement | null;

      if (sourceElement && targetElement) {
        const svgRect = svg!.getBoundingClientRect();
        const sourceTreeContainer = sourceElement.closest(".tree-container") as HTMLElement | null;
        if (!sourceTreeContainer) return;
        const targetTreeContainer = targetElement.closest(".tree-container") as HTMLElement | null;
        if (!targetTreeContainer) return;

        const sourceRect = sourceElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const sourceContainerRect = sourceTreeContainer.getBoundingClientRect();
        const targetContainerRect = targetTreeContainer.getBoundingClientRect();

        // 判断连接方向
        const isLeftToRight = conn.source.startsWith("left-") && conn.target.startsWith("right-");
        const isRightToLeft = conn.source.startsWith("right-") && conn.target.startsWith("left-");

        const sourceVisibilityPos = this.getNodeVisibilityPosition(conn.source);
        const targetVisibilityPos = this.getNodeVisibilityPosition(conn.target);

        // 计算连接线的起点和终点
        let startX: number, startY: number, endX: number, endY: number;

        // 处理源节点连接点
        if (!this.isNodeVisible(conn.source)) {
          // 源节点不可见，检查是因为父节点闭合还是在容器外不可见
          const sourceElement = document.querySelector(
            `[data-id="${conn.source}"]`
          ) as HTMLElement;
          let nearestSourceClosedParent: string | null = null;

          // 查找最近的闭合但可见的父节点
          let sourceParent = sourceElement.parentElement;
          while (
            sourceParent &&
            sourceParent.classList.contains("tree-children")
          ) {
            if (!sourceParent.classList.contains("active")) {
              // 找到闭合的父节点，检查该父节点是否可见
              const parentNode = sourceParent.parentElement as HTMLElement;
              const parentId = parentNode.dataset.id!;
              if (this.isNodeVisible(parentId)) {
                nearestSourceClosedParent = parentId;
                break;
              }
            }
            sourceParent = sourceParent.parentElement?.parentElement || null;
          }

          if (nearestSourceClosedParent) {
            // 有闭合但可见的父节点，连接到该父节点
            const parentElement = document.querySelector(
              `[data-id="${nearestSourceClosedParent}"] .tree-label`
            ) as HTMLElement;
            const parentRect = parentElement.getBoundingClientRect();

            // 对于左侧树，连接点在右侧边缘；对于右侧树，连接点在左侧边缘
            startX = sourceTreeContainer.id === "leftTree"
              ? sourceContainerRect.right + 5 - svgRect.left
              : sourceContainerRect.left - 5 - svgRect.left;
            startY = parentRect.top + parentRect.height / 2 - svgRect.top;
          } else {
            // 节点在容器外不可见，连接到容器边缘
            // 对于左侧树，连接点在右侧边缘；对于右侧树，连接点在左侧边缘
            startX = sourceTreeContainer.id === "leftTree"
              ? sourceContainerRect.right + 5 - svgRect.left
              : sourceContainerRect.left - 5 - svgRect.left;

            if (sourceVisibilityPos === "top") {
              // 节点在顶部不可见，连接到容器顶部固定位置
              startY = sourceContainerRect.top - svgRect.top;
            } else if (sourceVisibilityPos === "bottom") {
              // 节点在底部不可见，连接到容器底部边缘
              startY = sourceContainerRect.bottom - svgRect.top;
            } else {
              // 计算垂直位置 - 尝试找到最近的可视祖先节点的Y坐标
              const nearestSourceAncestor = this.findNearestVisibleAncestor(conn.source);
              if (nearestSourceAncestor) {
                const ancestorRect = document
                  .querySelector(
                    `[data-id="${nearestSourceAncestor}"] .tree-label`
                  )!
                  .getBoundingClientRect();
                startY = ancestorRect.top + ancestorRect.height / 2 - svgRect.top;
              } else {
                // 如果没有可视祖先节点，使用容器中心
                startY = sourceContainerRect.top + sourceContainerRect.height / 2 - svgRect.top;
              }
            }
          }
        } else {
          // 源节点可见，连接点位于容器外部
          const sourceContainerRect = sourceTreeContainer.getBoundingClientRect();

          // 对于左侧树，连接点在容器右侧外面；对于右侧树，连接点在左侧外面
          startX = sourceTreeContainer.id === "leftTree"
            ? sourceContainerRect.right + 5 - svgRect.left
            : sourceContainerRect.left - 5 - svgRect.left;

          // Y坐标为节点垂直中心
          startY = sourceRect.top + sourceRect.height / 2 - svgRect.top;
        }

        // 转换为SVG坐标
        startX -= svgRect.left;
        startY -= svgRect.top;

        // 查找最近的闭合但可见的父节点
        let nearestSourceClosedParent: string | null = null;
        if (!this.isNodeVisible(conn.source)) {
          const sourceElement = document.querySelector(`[data-id="${conn.source}"]`) as HTMLElement;
          let sourceParent = sourceElement.parentElement;
          while (sourceParent && sourceParent.classList.contains("tree-children")) {
            if (!sourceParent.classList.contains("active")) {
              const parentNode = sourceParent.parentElement as HTMLElement;
              const parentId = parentNode.dataset.id!;
              if (this.isNodeVisible(parentId)) {
                nearestSourceClosedParent = parentId;
                break;
              }
            }
            sourceParent = sourceParent.parentElement?.parentElement || null;
          }
        }

        // 特殊处理：如果节点在顶部或底部不可见且没有闭合父节点，固定Y坐标
        if (sourceVisibilityPos === "top" && !nearestSourceClosedParent) {
          startY = sourceTreeContainer.getBoundingClientRect().top - svgRect.top;
        } else if (sourceVisibilityPos === "bottom" && !nearestSourceClosedParent) {
          // startY = sourceTreeContainer.getBoundingClientRect().bottom - svgRect.top - 10;
        }

        // 处理目标节点连接点
        let nearestTargetClosedParent: string | null = null;

        if (this.isNodeVisible(conn.target)) {
          // 目标节点可见，连接点位于容器外部

          // 对于左侧树，连接点在容器右侧外面；对于右侧树，连接点在左侧外面
          endX = targetTreeContainer.id === "leftTree"
            ? targetContainerRect.right + 5 - svgRect.left
            : targetContainerRect.left - 5 - svgRect.left;

          // Y坐标为节点垂直中心
          endY = targetRect.top + targetRect.height / 2 - svgRect.top;
        } else {
          // 目标节点不可见，检查是因为父节点闭合还是在容器外不可见
          const targetElement = document.querySelector(
            `[data-id="${conn.target}"]`
          ) as HTMLElement;

          // 查找最近的闭合但可见的父节点
          let targetParent = targetElement.parentElement;
          while (
            targetParent &&
            targetParent.classList.contains("tree-children")
          ) {
            if (!targetParent.classList.contains("active")) {
              // 找到闭合的父节点，检查该父节点是否可见
              const parentNode = targetParent.parentElement as HTMLElement;
              const parentId = parentNode.dataset.id!;
              if (this.isNodeVisible(parentId)) {
                nearestTargetClosedParent = parentId;
                break;
              }
            }
            targetParent = targetParent.parentElement?.parentElement || null;
          }

          if (nearestTargetClosedParent) {
            // 有闭合但可见的父节点，连接到该父节点
            const parentElement = document.querySelector(
              `[data-id="${nearestTargetClosedParent}"] .tree-label`
            ) as HTMLElement;
            const parentRect = parentElement.getBoundingClientRect();

            // 对于左侧树，连接点在右侧边缘；对于右侧树，连接点在左侧边缘
            endX = targetTreeContainer.id === "leftTree"
              ? targetContainerRect.right + 5 - svgRect.left
              : targetContainerRect.left - 5 - svgRect.left;
            endY = parentRect.top + parentRect.height / 2 - svgRect.top;
          } else {
            // 节点在容器外不可见，连接到容器边缘
            // 对于左侧树，连接点在右侧边缘；对于右侧树，连接点在左侧边缘
            endX = targetTreeContainer.id === "leftTree"
              ? targetContainerRect.right + 5 - svgRect.left
              : targetContainerRect.left - 5 - svgRect.left;

            if (targetVisibilityPos === "top") {
              // 节点在顶部不可见，连接到容器顶部固定位置
              endY = targetContainerRect.top - svgRect.top - 10;
            } else if (targetVisibilityPos === "bottom") {
              // 节点在底部不可见，连接到容器底部边缘
              endY = targetContainerRect.bottom - 10 - svgRect.top;
            } else {
              // 计算垂直位置 - 尝试找到最近的可视祖先节点的Y坐标
              const nearestTargetAncestor = this.findNearestVisibleAncestor(conn.target);
              if (nearestTargetAncestor) {
                const ancestorRect = document
                  .querySelector(
                    `[data-id="${nearestTargetAncestor}"] .tree-label`
                  )!
                  .getBoundingClientRect();
                endY = ancestorRect.top + ancestorRect.height / 2 - svgRect.top;
              } else {
                // 如果没有可视祖先节点，使用容器中心
                endY = targetContainerRect.top + targetContainerRect.height / 2 - svgRect.top;
              }
            }
          }
        }

        // 转换为SVG坐标
        endX -= svgRect.left;
        endY -= svgRect.top;

        // 特殊处理：如果节点在顶部或底部不可见且没有闭合父节点，固定Y坐标
        if (targetVisibilityPos === "top" && !nearestTargetClosedParent) {
          endY = targetTreeContainer.getBoundingClientRect().top - svgRect.top;
        } else if (
          targetVisibilityPos === "bottom" &&
          !nearestTargetClosedParent
        ) {
          endY = targetTreeContainer.getBoundingClientRect().bottom - svgRect.top;
        }

        // 创建路径
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        let d: string;
        const controlOffset = this.bezier || 100; // 贝塞尔曲线控制点偏移量

        if (isLeftToRight) {
          d = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
          path.setAttribute("marker-end", "url(#arrowhead-end)");
        } else if (isRightToLeft) {
          d = `M ${startX} ${startY} C ${startX - controlOffset} ${startY}, ${endX + controlOffset} ${endY}, ${endX} ${endY}`;
          path.setAttribute("marker-end", "url(#arrowhead-start)");
        } else {
          // 处理其他连接方向（如果有的话）
          d = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
        }

        path.setAttribute("d", d);
        // 根据连接方向设置不同颜色
        if (isLeftToRight) {
          path.setAttribute("stroke", "#0090F0"); // 蓝色表示从左到右
        } else if (isRightToLeft) {
          path.setAttribute("stroke", "#FE732F"); // 橙色表示从右到左
        } else {
          path.setAttribute("stroke", "#666"); // 默认颜色
        }
        // 根据节点是否可见以及不可见位置设置线条样式
        const isSourceVisible = this.isNodeVisible(conn.source);
        const isTargetVisible = this.isNodeVisible(conn.target);

        // 检查源节点是否在顶部不可见（左右树通用）
        const isSourceTopInvisible = sourceVisibilityPos === "top";

        // 检查目标节点是否在顶部不可见（左右树通用）
        const isTargetTopInvisible = targetVisibilityPos === "top";

        path.setAttribute("stroke-width", "1.5");
        path.setAttribute("fill", "none");

        // 设置线条样式 - 当左右树任意节点超出顶部可视范围时，连线都设置为虚线
        if (isSourceTopInvisible || isTargetTopInvisible) {
          // 节点在顶部不可见，使用长虚线
          path.setAttribute("stroke-dasharray", "5,5");
        } else if (!isSourceVisible || !isTargetVisible) {
          // 其他不可见情况，使用短虚线
          path.setAttribute("stroke-dasharray", "5,5");
        } else {
          // 节点可见，使用实线
          path.removeAttribute("stroke-dasharray");
        }

        svg.appendChild(path);
      }
    });

    // 添加箭头标记
    if (this.connections.length > 0 && !document.getElementById("arrowhead-end")) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );

      // 右向箭头（用于从左到右的连接）
      const markerEnd = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      markerEnd.setAttribute("id", "arrowhead-end");
      markerEnd.setAttribute("markerWidth", "10");
      markerEnd.setAttribute("markerHeight", "7");
      markerEnd.setAttribute("refX", "9");
      markerEnd.setAttribute("refY", "3.5");
      markerEnd.setAttribute("orient", "auto");

      const polygonEnd = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      polygonEnd.setAttribute("points", "0 0, 10 3.5, 0 7");
      polygonEnd.setAttribute("fill", "#4096ff");

      markerEnd.appendChild(polygonEnd);

      // 左向箭头（用于从右到左的连接）
      const markerStart = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      markerStart.setAttribute("id", "arrowhead-start");
      markerStart.setAttribute("markerWidth", "10");
      markerStart.setAttribute("markerHeight", "7");
      markerStart.setAttribute("refX", "9");
      markerStart.setAttribute("refY", "3.5");
      markerStart.setAttribute("orient", "auto");

      const polygonStart = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      polygonStart.setAttribute("points", "0 0, 10 3.5, 0 7");
      polygonStart.setAttribute("fill", "#ff7a45");

      markerStart.appendChild(polygonStart);

      defs.appendChild(markerEnd);
      defs.appendChild(markerStart);
      svg.appendChild(defs);
    }
  }

  // 初始化树
  private initializeTrees(): void {
    const leftTree = document.getElementById("leftTree") as HTMLElement | null;
    const rightTree = document.getElementById("rightTree") as HTMLElement | null;

    if (!leftTree || !rightTree) return;
    // 渲染左侧树
    this.leftTreeData.forEach((node) => {
      this.renderTreeNode(node, leftTree!);
    });

    // 渲染右侧树
    this.rightTreeData.forEach((node) => {
      this.renderTreeNode(node, rightTree!);
    });

    // 添加滚动事件监听
    this.addScrollListenersWithThrottle();

    // 添加默认连接线
    this.connections.push(...this.linkList);
    this.drawConnections(); // 绘制默认连接线
  }
  // 导出方法
  public redraw(): void {
    this.drawConnections();
  }

  public updateData(leftTreeData: TreeNode[], rightTreeData: TreeNode[], linkList: Connection[]): void {
    this.leftTreeData = leftTreeData;
    this.rightTreeData = rightTreeData;
    this.linkList = linkList;
    this.connections = [...linkList];
    this.initializeTrees();
  }
}

// 导出类
export default DoubleTreeFlow;