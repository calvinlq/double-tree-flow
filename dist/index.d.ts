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
    id?: string;
    [key: string]: any;
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
    private onConnectionsChange?;
    private onConnectionChange?;
    private onUpdateConnection?;
    constructor(containerId: string, leftTreeData: TreeNode[], rightTreeData: TreeNode[], linkList: Connection[], options?: {
        bezier?: number;
        enableLink?: boolean;
        enableTxtBgColor?: boolean;
        onConnectionsChange?: (connections: Connection[]) => void;
        onConnectionChange?: (connection: Connection, type: 'add' | 'remove') => void;
        onUpdateConnection?: (connection: Connection) => void;
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
    private currentConnection;
    private drawConnections;
    private initializeTrees;
    redraw(): void;
    updateData(leftTreeData: TreeNode[], rightTreeData: TreeNode[], linkList: Connection[]): void;
    getConnections(): Connection[];
    removeConnection(connection: Connection): boolean;
    /**
     * 更新指定连接的数据
     * @param updatedConnection 更新后的连接对象，必须包含id以标识要更新的连接
     */
    updateConnection(updatedConnection: Connection): void;
    private showDeleteMenu;
    private removeDeleteMenu;
    private handleDocumentClick;
}
export default DoubleTreeFlow;
