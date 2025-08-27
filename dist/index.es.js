const I = "data:image/svg+xml,%3csvg%20width='101'%20height='101'%20viewBox='0%200%20101%20101'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.5208%2024.6667V16.8333C10.5208%2014.5091%2012.4049%2012.625%2014.7291%2012.625H39.9791L50.5%2025.25H86.2708C88.5951%2025.25%2090.4791%2027.1341%2090.4791%2029.4583V84.1667C90.4791%2086.4909%2088.5951%2088.375%2086.2708%2088.375H14.7291C12.4049%2088.375%2010.5208%2086.4909%2010.5208%2084.1667V78.5'%20stroke='%23818181'%20stroke-width='5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3%2062.5V47.5H25.5V32.4142C25.5%2031.5233%2026.5771%2031.0771%2027.2071%2031.7071L50.2929%2054.7929C50.6834%2055.1834%2050.6834%2055.8166%2050.2929%2056.2071L27.2071%2079.2929C26.5771%2079.9229%2025.5%2079.4767%2025.5%2078.5858V62.5H3Z'%20fill='%23F1BA10'%20stroke='%233D3D3D'%20stroke-width='2'/%3e%3c/svg%3e", H = "data:image/svg+xml,%3csvg%20width='101'%20height='101'%20viewBox='0%200%20101%20101'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M90.4791%2032V29.4583C90.4791%2027.1341%2088.5951%2025.25%2086.2708%2025.25H50.5L39.9791%2012.625H14.7291C12.4049%2012.625%2010.5208%2014.5091%2010.5208%2016.8333V84.1667C10.5208%2086.4909%2012.4049%2088.375%2014.7291%2088.375H86.2708C88.5951%2088.375%2090.4791%2086.4909%2090.4791%2084.1667V79.5'%20stroke='%23818181'%20stroke-width='5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M51%2062.5V47.5H73.5V32.4142C73.5%2031.5233%2074.5771%2031.0771%2075.2071%2031.7071L98.2929%2054.7929C98.6834%2055.1834%2098.6834%2055.8166%2098.2929%2056.2071L75.2071%2079.2929C74.5771%2079.9229%2073.5%2079.4767%2073.5%2078.5858V62.5H51Z'%20fill='%230068D4'%20stroke='%233D3D3D'%20stroke-width='2'/%3e%3c/svg%3e", W = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2022.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='图层_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%2054%2054'%20style='enable-background:new%200%200%2054%2054;'%20xml:space='preserve'%20width='100px'%20height='100px'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:none;stroke:%23333333;stroke-miterlimit:10;}%20.st1{fill:%23F1BA10;stroke:%23333333;stroke-miterlimit:10;}%20.st2{fill:%231664B5;stroke:%23333333;stroke-miterlimit:10;}%20%3c/style%3e%3cg%3e%3cpolygon%20class='st0'%20points='47.4,46.6%206.1,46.6%206.6,7.4%2047.9,7.4%20'/%3e%3cg%3e%3cpolygon%20class='st1'%20points='26.4,27.8%2013.8,15.2%2013.8,24.3%202.5,24.3%202.5,31.3%2013.8,31.3%2013.8,40.4%20'/%3e%3cpolygon%20class='st2'%20points='51.5,27.8%2038.9,15.2%2038.9,24.3%2027.6,24.3%2027.6,31.3%2038.9,31.3%2038.9,40.4%20'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
var O = Object.defineProperty, T = Object.getOwnPropertySymbols, _ = Object.prototype.hasOwnProperty, z = Object.prototype.propertyIsEnumerable, R = (E, e, n) => e in E ? O(E, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : E[e] = n, B = (E, e) => {
  for (var n in e || (e = {}))
    _.call(e, n) && R(E, n, e[n]);
  if (T)
    for (var n of T(e))
      z.call(e, n) && R(E, n, e[n]);
  return E;
};
class U {
  constructor(e, n, t, s, i = {}) {
    this.connections = [], this.selectedNode = null, this.currentConnection = null, this.handleDocumentClick = (l) => {
      const r = document.getElementById("connection-delete-menu"), f = document.getElementById("connection-layer");
      r && l.target !== r && !r.contains(l.target) && !(f && f.contains(l.target) && l.target.tagName === "path") && this.removeDeleteMenu();
    }, this.enableLink = i.enableLink !== void 0 ? i.enableLink : !0, this.enableTxtBgColor = i.enableTxtBgColor !== void 0 ? i.enableTxtBgColor : !1, this.bezier = i.bezier !== void 0 ? i.bezier : 70, this.onConnectionsChange = i.onConnectionsChange, this.onConnectionChange = i.onConnectionChange, this.onUpdateConnection = i.onUpdateConnection, this.leftTreeData = Array.isArray(n) ? n : [], this.rightTreeData = Array.isArray(t) ? t : [], this.linkList = Array.isArray(s) ? s : [];
    const o = document.getElementById(e);
    if (!o)
      throw new Error(`Container with id "${e}" not found`);
    o.style.display = "flex", o.style.justifyContent = "space-around", o.style.padding = "6px 10px", this.container = o, this.init();
  }
  init() {
    this.container.innerHTML = '<svg id="connection-layer"></svg>';
    const e = document.createElement("div");
    e.className = "tree-container", e.id = "leftTree";
    const n = document.createElement("div");
    n.className = "tree-container", n.id = "rightTree";
    const t = this.container.dataset.treewidth, s = this.container.dataset.treeheight;
    t && (e.style.width = `${t}px`, n.style.width = `${t}px`), s && (e.style.height = `${s}px`, n.style.height = `${s}px`), this.container.appendChild(e), this.container.appendChild(n), this.initializeTrees(), window.addEventListener("resize", () => this.drawConnections());
  }
  getParentNode(e) {
    const n = document.querySelector(`[data-id="${e}"]`), t = n.getBoundingClientRect();
    return t.top !== 0 ? t : this.getParentNode(n.parentElement.parentElement.dataset.id);
  }
  renderTreeNode(e, n) {
    const t = document.createElement("div");
    let s = `tree-node level-${e.level}`;
    e.children && e.children.length > 0 && (s += " has-children"), e.level === 1 && (s += " level-1-node"), t.className = s, t.dataset.id = e.id, t.dataset.level = e.level.toString(), e.parentId && (t.dataset.parentId = e.parentId);
    const i = document.createElement("div");
    if (i.className = `tree-node-row level-${e.level}`, t.appendChild(i), e.children && e.children.length > 0) {
      const r = document.createElement("span");
      r.className = "tree-toggle minus", r.addEventListener("click", (f) => {
        f.stopPropagation();
        const c = t.querySelector(".tree-children");
        c.classList.toggle("active"), c.classList.contains("active") ? (r.classList.remove("plus"), r.classList.add("minus")) : (r.classList.remove("minus"), r.classList.add("plus")), this.drawConnections();
      }), i.appendChild(r);
    } else {
      const r = document.createElement("span");
      r.className = "no-toggle", r.style.width = "3px", r.style.display = "inline-block", r.style.marginRight = "5px", i.classList.add("not-children"), i.appendChild(r);
    }
    let o = "";
    switch (e.type) {
      case "input":
        o = I;
        break;
      case "output":
        o = H;
        break;
      case "inOut":
        o = W;
        break;
      default:
        o = e.icon || "";
    }
    if (o) {
      const r = document.createElement("img");
      r.src = o, r.className = "tree-icon", i.appendChild(r);
    }
    const l = document.createElement("span");
    if (l.className = "tree-label", this.enableTxtBgColor ? (l.className += " tree-bg-color", l.style.padding = "2px 10px") : l.className += " default", l.textContent = e.label, l.addEventListener("click", () => {
      this.handleNodeClick(e.id);
    }), i.appendChild(l), e.children && e.children.length > 0) {
      const r = document.createElement("div");
      r.className = "tree-children active", t.appendChild(r), e.children.forEach((f) => {
        f.parentId = e.id, this.renderTreeNode(f, r);
      });
    }
    n.appendChild(t);
  }
  handleNodeClick(e) {
    if (this.selectedNode) {
      const t = document.querySelector(
        `[data-id="${this.selectedNode}"] .tree-label`
      );
      t && t.classList.remove("selected");
    }
    if (this.selectedNode && this.selectedNode !== e) {
      const t = this.selectedNode.startsWith("left-") && e.startsWith("right-"), s = this.selectedNode.startsWith("right-") && e.startsWith("left-");
      if (this.enableLink && (t || s)) {
        const i = this.selectedNode, o = e, l = `connection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, r = { source: i, target: o, id: l };
        this.connections.push(r), this.drawConnections(), this.onConnectionsChange && this.onConnectionsChange([...this.connections]), this.onConnectionChange && this.onConnectionChange(r, "add"), this.selectedNode = null;
        return;
      } else if (!this.enableLink) {
        this.selectedNode = e;
        const i = document.querySelector(
          `[data-id="${e}"] .tree-label`
        );
        i && i.classList.add("selected");
        return;
      }
    }
    if (this.selectedNode === e) {
      const t = document.querySelector(
        `[data-id="${e}"] .tree-label`
      );
      t && t.classList.remove("selected"), this.selectedNode = null;
      return;
    }
    this.selectedNode = e;
    const n = document.querySelector(
      `[data-id="${e}"] .tree-label`
    );
    n && n.classList.add("selected");
  }
  isNodeVisible(e) {
    const n = document.querySelector(`[data-id="${e}"]`);
    if (!n) return !1;
    let t = n.parentElement;
    for (; t && t.classList.contains("tree-children"); ) {
      if (!t.classList.contains("active"))
        return !1;
      t = t.parentElement && t.parentElement.parentElement ? t.parentElement.parentElement : null;
    }
    const s = n.closest(".tree-container");
    if (!s) return !1;
    const i = n.getBoundingClientRect(), o = s.getBoundingClientRect();
    return i.bottom > o.top && i.top < o.bottom;
  }
  findNearestVisibleAncestor(e) {
    const n = document.querySelector(`[data-id="${e}"]`);
    if (!n) return null;
    if (this.isNodeVisible(e))
      return e;
    let t = n.dataset.parentId;
    for (; t; ) {
      if (this.isNodeVisible(t))
        return t;
      const c = document.querySelector(`[data-id="${t}"]`);
      if (!c) break;
      t = c.dataset.parentId;
    }
    const s = n.dataset.level, i = Array.from(
      document.querySelectorAll(`.tree-node[data-level="${s}"]`)
    ), o = n.getBoundingClientRect(), l = i.filter((c) => this.isNodeVisible(c.dataset.id));
    if (l.length === 0) {
      const c = n.parentElement ? n.parentElement.closest(".tree-node") : null;
      return c ? this.findNearestVisibleAncestor(c.dataset.id) : null;
    }
    return l.sort((c, m) => {
      const A = c.getBoundingClientRect(), x = m.getBoundingClientRect();
      return Math.abs(A.top - o.top) - Math.abs(x.top - o.top);
    }), l[0].dataset.id;
  }
  addScrollListenersWithThrottle() {
    document.querySelectorAll(".tree-container").forEach((n) => {
      n.addEventListener("scroll", this.throttle(() => this.drawConnections(), 10));
    });
  }
  throttle(e, n) {
    let t = 0;
    return () => {
      const s = Date.now();
      s - t >= n && (t = s, e());
    };
  }
  getNodeVisibilityPosition(e) {
    const n = document.querySelector(`[data-id="${e}"]`), t = n ? n.querySelector(".tree-label") : null;
    if (!t)
      return "unknown";
    const s = t.closest(".tree-container");
    if (!s)
      return "unknown";
    const i = t.getBoundingClientRect(), o = s.getBoundingClientRect();
    let l = null;
    return i.top === 0 && (l = this.getParentNode(e)), i.top === 0 && l ? l.top < o.top ? "top" : l.bottom > o.bottom ? "bottom" : "visible" : i.top < o.top ? "top" : i.bottom > o.bottom ? "bottom" : "visible";
  }
  findFirstVisibleNode() {
    const e = document.querySelectorAll(".tree-node");
    for (const n of Array.from(e)) {
      const t = n.dataset.id;
      if (this.isNodeVisible(t))
        return n;
    }
    return null;
  }
  drawConnections() {
    const e = document.getElementById("connection-layer");
    if (e && (e.innerHTML = "", e.getBoundingClientRect(), this.removeDeleteMenu(), this.connections.forEach((n) => {
      const t = document.querySelector(
        `[data-id="${n.source}"] .tree-label`
      ), s = document.querySelector(
        `[data-id="${n.target}"] .tree-label`
      );
      if (t && s) {
        const i = e.getBoundingClientRect(), o = t.closest(".tree-container");
        if (!o) return;
        const l = s.closest(".tree-container");
        if (!l) return;
        const r = t.getBoundingClientRect(), f = s.getBoundingClientRect(), c = o.getBoundingClientRect(), m = l.getBoundingClientRect(), A = n.source.startsWith("left-") && n.target.startsWith("right-"), x = n.source.startsWith("right-") && n.target.startsWith("left-"), L = this.getNodeVisibilityPosition(n.source), k = this.getNodeVisibilityPosition(n.target);
        let C, p, b, u;
        if (this.isNodeVisible(n.source)) {
          const y = o.getBoundingClientRect();
          C = o.id === "leftTree" ? y.right + 5 - i.left : y.left - 5 - i.left, p = r.top + r.height / 2 - i.top;
        } else {
          const y = document.querySelector(
            `[data-id="${n.source}"]`
          );
          let d = null, g = y.parentElement;
          for (; g && g.classList.contains("tree-children"); ) {
            if (!g.classList.contains("active")) {
              const v = g.parentElement.dataset.id;
              if (this.isNodeVisible(v)) {
                d = v;
                break;
              }
            }
            g = g.parentElement && g.parentElement.parentElement ? g.parentElement.parentElement : null;
          }
          if (d) {
            const v = document.querySelector(
              `[data-id="${d}"] .tree-label`
            ).getBoundingClientRect();
            C = o.id === "leftTree" ? c.right + 5 - i.left : c.left - 5 - i.left, p = v.top + v.height / 2 - i.top;
          } else if (C = o.id === "leftTree" ? c.right + 5 - i.left : c.left - 5 - i.left, L === "top")
            p = c.top - i.top;
          else if (L === "bottom")
            p = c.bottom - i.top;
          else {
            const h = this.findNearestVisibleAncestor(n.source);
            if (h) {
              const v = document.querySelector(
                `[data-id="${h}"] .tree-label`
              ).getBoundingClientRect();
              p = v.top + v.height / 2 - i.top;
            } else
              p = c.top + c.height / 2 - i.top;
          }
        }
        C -= i.left, p -= i.top;
        let S = null;
        if (!this.isNodeVisible(n.source)) {
          let d = document.querySelector(`[data-id="${n.source}"]`).parentElement;
          for (; d && d.classList.contains("tree-children"); ) {
            if (!d.classList.contains("active")) {
              const h = d.parentElement.dataset.id;
              if (this.isNodeVisible(h)) {
                S = h;
                break;
              }
            }
            d = d.parentElement && d.parentElement.parentElement ? d.parentElement.parentElement : null;
          }
        }
        L === "top" && !S && (p = o.getBoundingClientRect().top - i.top);
        let N = null;
        if (this.isNodeVisible(n.target))
          b = l.id === "leftTree" ? m.right + 5 - i.left : m.left - 5 - i.left, u = f.top + f.height / 2 - i.top;
        else {
          let d = document.querySelector(
            `[data-id="${n.target}"]`
          ).parentElement;
          for (; d && d.classList.contains("tree-children"); ) {
            if (!d.classList.contains("active")) {
              const h = d.parentElement.dataset.id;
              if (this.isNodeVisible(h)) {
                N = h;
                break;
              }
            }
            d = d.parentElement && d.parentElement.parentElement ? d.parentElement.parentElement : null;
          }
          if (N) {
            const h = document.querySelector(
              `[data-id="${N}"] .tree-label`
            ).getBoundingClientRect();
            b = l.id === "leftTree" ? m.right + 5 - i.left : m.left - 5 - i.left, u = h.top + h.height / 2 - i.top;
          } else if (b = l.id === "leftTree" ? m.right + 5 - i.left : m.left - 5 - i.left, k === "top")
            u = m.top - i.top - 10;
          else if (k === "bottom")
            u = m.bottom - 10 - i.top;
          else {
            const g = this.findNearestVisibleAncestor(n.target);
            if (g) {
              const h = document.querySelector(
                `[data-id="${g}"] .tree-label`
              ).getBoundingClientRect();
              u = h.top + h.height / 2 - i.top;
            } else
              u = m.top + m.height / 2 - i.top;
          }
        }
        b -= i.left, u -= i.top, k === "top" && !N ? u = l.getBoundingClientRect().top - i.top : k === "bottom" && !N && (u = l.getBoundingClientRect().bottom - i.top);
        const a = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        let $;
        const w = this.bezier;
        A ? ($ = `M ${C} ${p} C ${C + w} ${p}, ${b - w} ${u}, ${b} ${u}`, a.setAttribute("marker-end", "url(#arrowhead-end)")) : x ? ($ = `M ${C} ${p} C ${C - w} ${p}, ${b + w} ${u}, ${b} ${u}`, a.setAttribute("marker-end", "url(#arrowhead-start)")) : $ = `M ${C} ${p} C ${C + w} ${p}, ${b - w} ${u}, ${b} ${u}`, a.setAttribute("d", $), A ? a.setAttribute("stroke", "#0090F0") : x ? a.setAttribute("stroke", "#FE732F") : a.setAttribute("stroke", "#666");
        const V = this.isNodeVisible(n.source), D = this.isNodeVisible(n.target), P = L === "top", q = k === "top";
        a.setAttribute("stroke-width", "1.5"), a.setAttribute("fill", "none"), P || q || !V || !D ? a.setAttribute("stroke-dasharray", "5,5") : a.removeAttribute("stroke-dasharray");
        const M = a.getAttribute("stroke-width");
        a.style.pointerEvents = "auto", a.setAttribute("vector-effect", "non-scaling-stroke"), a.setAttribute("stroke-linecap", "round"), a.setAttribute("stroke-linejoin", "round"), a.addEventListener("mouseenter", () => {
          a.setAttribute("stroke-width", "2"), a.style.cursor = "pointer", a.setAttribute("stroke-opacity", "2");
        }), a.addEventListener("mouseleave", () => {
          a.setAttribute("stroke-width", M || "1.5"), a.style.cursor = "default", a.setAttribute("stroke-opacity", "1");
        }), a.addEventListener("contextmenu", (y) => {
          y.preventDefault(), this.currentConnection = n, this.showDeleteMenu(y.clientX, y.clientY);
        }), e.appendChild(a);
      }
    }), this.connections.length > 0 && !document.getElementById("arrowhead-end"))) {
      const n = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      ), t = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      t.setAttribute("id", "arrowhead-end"), t.setAttribute("markerWidth", "10"), t.setAttribute("markerHeight", "7"), t.setAttribute("refX", "9"), t.setAttribute("refY", "3.5"), t.setAttribute("orient", "auto"), t.setAttribute("markerUnits", "userSpaceOnUse");
      const s = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      s.setAttribute("points", "0 0, 10 3.5, 0 7"), s.setAttribute("fill", "#4096ff"), t.appendChild(s);
      const i = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      i.setAttribute("id", "arrowhead-start"), i.setAttribute("markerWidth", "10"), i.setAttribute("markerHeight", "7"), i.setAttribute("refX", "9"), i.setAttribute("refY", "3.5"), i.setAttribute("orient", "auto"), i.setAttribute("markerUnits", "userSpaceOnUse");
      const o = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      o.setAttribute("points", "0 0, 10 3.5, 0 7"), o.setAttribute("fill", "#ff7a45"), i.appendChild(o), n.appendChild(t), n.appendChild(i), e.appendChild(n);
    }
  }
  // 初始化树
  initializeTrees() {
    const e = document.getElementById("leftTree"), n = document.getElementById("rightTree");
    if (!e || !n) return;
    const t = Array.isArray(this.leftTreeData) ? this.leftTreeData : [], s = Array.isArray(this.rightTreeData) ? this.rightTreeData : [];
    t.forEach((i) => {
      this.renderTreeNode(i, e);
    }), s.forEach((i) => {
      this.renderTreeNode(i, n);
    }), this.addScrollListenersWithThrottle(), this.connections.push(...this.linkList), this.drawConnections(), this.onConnectionsChange && this.onConnectionsChange([...this.connections]);
  }
  redraw() {
    this.drawConnections();
  }
  updateData(e, n, t) {
    this.leftTreeData = Array.isArray(e) ? e : [], this.rightTreeData = Array.isArray(n) ? n : [], this.linkList = Array.isArray(t) ? t : [], this.connections = [...this.linkList], this.initializeTrees(), this.onConnectionsChange && this.onConnectionsChange([...this.connections]);
  }
  // 获取当前所有连接线
  getConnections() {
    return [...this.connections];
  }
  // 删除单个连接线
  removeConnection(e) {
    const n = this.connections.findIndex(
      (t) => t.id && t.id === e.id || t.source === e.source && t.target === e.target
    );
    if (n !== -1) {
      const t = this.connections[n];
      return this.connections.splice(n, 1), this.drawConnections(), this.onConnectionChange && this.onConnectionChange(t, "remove"), this.onConnectionsChange && this.onConnectionsChange([...this.connections]), !0;
    }
    return !1;
  }
  /**
   * 更新指定连接的数据
   * @param updatedConnection 更新后的连接对象，必须包含id以标识要更新的连接
   */
  updateConnection(e) {
    if (!e.id)
      return;
    const n = this.connections.findIndex((t) => t.id === e.id);
    if (n !== -1) {
      const t = this.connections[n];
      this.connections[n] = B(B({}, t), e), this.drawConnections(), this.onUpdateConnection && this.onUpdateConnection(this.connections[n]), this.onConnectionsChange && this.onConnectionsChange([...this.connections]);
    }
  }
  // 显示删除菜单
  showDeleteMenu(e, n) {
    this.removeDeleteMenu();
    const t = document.createElement("div");
    t.id = "connection-delete-menu", t.style.position = "fixed", t.style.left = `${e + 10}px`, t.style.top = `${n}px`, t.style.backgroundColor = "white", t.style.border = "1px solid #ddd", t.style.borderRadius = "4px", t.style.padding = "4px 0", t.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)", t.style.zIndex = "1000", t.style.fontSize = "12px";
    const s = document.createElement("button");
    s.innerText = "删除连线", s.style.border = "none", s.style.backgroundColor = "transparent", s.style.padding = "6px 12px", s.style.cursor = "pointer", s.style.textAlign = "left", s.style.color = "#666", s.addEventListener("mouseenter", () => {
      s.style.backgroundColor = "#f5f5f5", s.style.color = "#333";
    }), s.addEventListener("mouseleave", () => {
      s.style.backgroundColor = "transparent", s.style.color = "#666";
    }), s.addEventListener("click", () => {
      this.currentConnection && this.removeConnection(this.currentConnection), this.removeDeleteMenu();
    }), t.appendChild(s), document.body.appendChild(t), document.addEventListener("click", this.handleDocumentClick);
  }
  // 移除删除菜单
  removeDeleteMenu() {
    const e = document.getElementById("connection-delete-menu");
    e && document.body.removeChild(e), document.removeEventListener("click", this.handleDocumentClick);
  }
}
export {
  U as default
};
