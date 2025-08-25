type NodeType = 'input' | 'output' | 'inOut';
interface TreeNode {
    id: string;
    label: string;
    level: number;
    type: NodeType;
    icon?: string;
    children?: TreeNode[];
    parentId?: string;
}
interface Connection {
    source: string;
    target: string;
}
declare class DoubleTreeFlow {
    private leftTreeData;
    private rightTreeData;
    private linkList;
    private container;
    private connections;
    private selectedNode;
    private enableLink;
    private bezier;
    private enableTxtBgColor;
    constructor(containerId: string, leftTreeData: TreeNode[], rightTreeData: TreeNode[], linkList: Connection[], options?: {
        bezier?: number;
        enableLink?: boolean;
        enableTxtBgColor?: boolean;
    });
    private init;
    private getParentNode;
    private renderTreeNode;
    private handleNodeClick;
    private isNodeVisible;
    private findNearestVisibleAncestor;
    private addScrollListenersWithThrottle;
    private throttle;
    private getNodeVisibilityPosition;
    private findFirstVisibleNode;
    private drawConnections;
    private initializeTrees;
    redraw(): void;
    updateData(leftTreeData: TreeNode[], rightTreeData: TreeNode[], linkList: Connection[]): void;
}
export default DoubleTreeFlow;
