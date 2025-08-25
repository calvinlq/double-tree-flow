class x {
  constructor(t, s, i, r, e = {}) {
    this.connections = [], this.selectedNode = null, this.enableLink = e.enableLink !== void 0 ? e.enableLink : !1, this.enableTxtBgColor = e.enableTxtBgColor !== void 0 ? e.enableTxtBgColor : !1, this.bezier = e.bezier !== void 0 ? e.bezier : 100, this.leftTreeData = s, this.rightTreeData = i, this.linkList = r;
    const n = document.getElementById(t);
    if (!n)
      throw new Error(`Container with id "${t}" not found`);
    n.style.display = "flex", n.style.justifyContent = "space-around", n.style.padding = "6px 10px", this.container = n, this.init();
  }
  init() {
    this.container.innerHTML = '<svg id="connection-layer"></svg>';
    const t = document.createElement("div");
    t.className = "tree-container", t.id = "leftTree";
    const s = this.container.dataset.treewidth, i = this.container.dataset.treeheight;
    s && (t.style.width = `${s}px`), i && (t.style.maxHeight = `${i}px`);
    const r = document.createElement("div");
    r.className = "tree-container", r.id = "rightTree", s && (r.style.width = `${s}px`), i && (r.style.maxHeight = `${i}px`), this.container.appendChild(t), this.container.appendChild(r), this.initializeTrees(), window.addEventListener("resize", () => this.drawConnections());
  }
  getParentNode(t) {
    const s = document.querySelector(`[data-id="${t}"]`), i = s.getBoundingClientRect();
    return i.top !== 0 ? i : this.getParentNode(s.parentElement.parentElement.dataset.id);
  }
  renderTreeNode(t, s) {
    const i = document.createElement("div");
    let r = `tree-node level-${t.level}`;
    t.children && t.children.length > 0 && (r += " has-children"), t.level === 1 && (r += " level-1-node"), i.className = r, i.dataset.id = t.id, i.dataset.level = t.level.toString(), t.parentId && (i.dataset.parentId = t.parentId);
    const e = document.createElement("div");
    if (e.className = `tree-node-row level-${t.level}`, i.appendChild(e), t.children && t.children.length > 0) {
      const o = document.createElement("span");
      o.className = "tree-toggle minus", o.addEventListener("click", (E) => {
        E.stopPropagation();
        const l = i.querySelector(".tree-children");
        l.classList.toggle("active"), l.classList.contains("active") ? (o.classList.remove("plus"), o.classList.add("minus")) : (o.classList.remove("minus"), o.classList.add("plus")), this.drawConnections();
      }), e.appendChild(o);
    } else {
      const o = document.createElement("span");
      o.className = "no-toggle", o.style.width = "3px", o.style.display = "inline-block", o.style.marginRight = "5px", e.classList.add("not-children"), e.appendChild(o);
    }
    let n = "";
    switch (t.type) {
      case "input":
        n = "assets/images/input.svg";
        break;
      case "output":
        n = "assets/images/output.svg";
        break;
      case "inOut":
        n = "assets/images/inOut.svg";
        break;
      default:
        n = t.icon || "";
    }
    if (n) {
      const o = document.createElement("img");
      o.src = n, o.className = "tree-icon", e.appendChild(o);
    }
    const a = document.createElement("span");
    if (a.className = "tree-label", this.enableTxtBgColor ? (a.className += " tree-bg-color", a.style.padding = "2px 10px") : a.className += " default", a.textContent = t.label, a.addEventListener("click", () => {
      this.handleNodeClick(t.id);
    }), e.appendChild(a), t.children && t.children.length > 0) {
      const o = document.createElement("div");
      o.className = "tree-children active", i.appendChild(o), t.children.forEach((E) => {
        E.parentId = t.id, this.renderTreeNode(E, o);
      });
    }
    s.appendChild(i);
  }
  handleNodeClick(t) {
    if (this.selectedNode) {
      const i = document.querySelector(
        `[data-id="${this.selectedNode}"] .tree-label`
      );
      i && i.classList.remove("selected");
    }
    if (this.selectedNode && this.selectedNode !== t) {
      const i = this.selectedNode.startsWith("left-") && t.startsWith("right-"), r = this.selectedNode.startsWith("right-") && t.startsWith("left-");
      if (this.enableLink && (i || r)) {
        const e = this.selectedNode, n = t;
        this.connections.push({ source: e, target: n }), this.drawConnections(), this.selectedNode = null;
        return;
      } else if (!this.enableLink) {
        this.selectedNode = t;
        const e = document.querySelector(
          `[data-id="${t}"] .tree-label`
        );
        e && e.classList.add("selected");
        return;
      }
    }
    if (this.selectedNode === t) {
      const i = document.querySelector(
        `[data-id="${t}"] .tree-label`
      );
      i && i.classList.remove("selected"), this.selectedNode = null;
      return;
    }
    this.selectedNode = t;
    const s = document.querySelector(
      `[data-id="${t}"] .tree-label`
    );
    s && s.classList.add("selected");
  }
  isNodeVisible(t) {
    const s = document.querySelector(`[data-id="${t}"]`);
    if (!s) return !1;
    let i = s.parentElement;
    for (; i && i.classList.contains("tree-children"); ) {
      if (!i.classList.contains("active"))
        return !1;
      i = i.parentElement?.parentElement || null;
    }
    const r = s.closest(".tree-container");
    if (!r) return !1;
    const e = s.getBoundingClientRect(), n = r.getBoundingClientRect();
    return e.bottom > n.top && e.top < n.bottom;
  }
  findNearestVisibleAncestor(t) {
    const s = document.querySelector(`[data-id="${t}"]`);
    if (!s) return null;
    if (this.isNodeVisible(t))
      return t;
    let i = s.dataset.parentId;
    for (; i; ) {
      if (this.isNodeVisible(i))
        return i;
      const l = document.querySelector(`[data-id="${i}"]`);
      if (!l) break;
      i = l.dataset.parentId;
    }
    const r = s.dataset.level, e = Array.from(
      document.querySelectorAll(`.tree-node[data-level="${r}"]`)
    ), n = s.getBoundingClientRect(), a = e.filter((l) => this.isNodeVisible(l.dataset.id));
    if (a.length === 0) {
      const l = s.parentElement?.closest(".tree-node");
      return l ? this.findNearestVisibleAncestor(l.dataset.id) : null;
    }
    return a.sort((l, p) => {
      const $ = l.getBoundingClientRect(), T = p.getBoundingClientRect();
      return Math.abs($.top - n.top) - Math.abs(T.top - n.top);
    }), a[0].dataset.id;
  }
  addScrollListenersWithThrottle() {
    document.querySelectorAll(".tree-container").forEach((s) => {
      s.addEventListener("scroll", this.throttle(() => this.drawConnections(), 10));
    });
  }
  throttle(t, s) {
    let i = 0;
    return () => {
      const r = Date.now();
      r - i >= s && (i = r, t());
    };
  }
  getNodeVisibilityPosition(t) {
    const s = document.querySelector(`[data-id="${t}"]`)?.querySelector(".tree-label");
    if (!s)
      return "unknown";
    const i = s.closest(".tree-container");
    if (!i)
      return "unknown";
    const r = s.getBoundingClientRect(), e = i.getBoundingClientRect();
    let n = null;
    return r.top === 0 && (n = this.getParentNode(t)), r.top === 0 && n ? n.top < e.top ? "top" : n.bottom > e.bottom ? "bottom" : "visible" : r.top < e.top ? "top" : r.bottom > e.bottom ? "bottom" : "visible";
  }
  findFirstVisibleNode() {
    const t = document.querySelectorAll(".tree-node");
    for (const s of Array.from(t)) {
      const i = s.dataset.id;
      if (this.isNodeVisible(i))
        return s;
    }
    return null;
  }
  drawConnections() {
    const t = document.getElementById("connection-layer");
    if (t && (t.innerHTML = "", t.getBoundingClientRect(), this.connections.forEach((s) => {
      const i = document.querySelector(
        `[data-id="${s.source}"] .tree-label`
      ), r = document.querySelector(
        `[data-id="${s.target}"] .tree-label`
      );
      if (i && r) {
        const e = t.getBoundingClientRect(), n = i.closest(".tree-container");
        if (!n) return;
        const a = r.closest(".tree-container");
        if (!a) return;
        const o = i.getBoundingClientRect(), E = r.getBoundingClientRect(), l = n.getBoundingClientRect(), p = a.getBoundingClientRect(), $ = s.source.startsWith("left-") && s.target.startsWith("right-"), T = s.source.startsWith("right-") && s.target.startsWith("left-"), R = this.getNodeVisibilityPosition(s.source), y = this.getNodeVisibilityPosition(s.target);
        let f, u, b, h;
        if (this.isNodeVisible(s.source)) {
          const w = n.getBoundingClientRect();
          f = n.id === "leftTree" ? w.right + 5 - e.left : w.left - 5 - e.left, u = o.top + o.height / 2 - e.top;
        } else {
          const w = document.querySelector(
            `[data-id="${s.source}"]`
          );
          let c = null, m = w.parentElement;
          for (; m && m.classList.contains("tree-children"); ) {
            if (!m.classList.contains("active")) {
              const N = m.parentElement.dataset.id;
              if (this.isNodeVisible(N)) {
                c = N;
                break;
              }
            }
            m = m.parentElement?.parentElement || null;
          }
          if (c) {
            const N = document.querySelector(
              `[data-id="${c}"] .tree-label`
            ).getBoundingClientRect();
            f = n.id === "leftTree" ? l.right + 5 - e.left : l.left - 5 - e.left, u = N.top + N.height / 2 - e.top;
          } else if (f = n.id === "leftTree" ? l.right + 5 - e.left : l.left - 5 - e.left, R === "top")
            u = l.top - e.top;
          else if (R === "bottom")
            u = l.bottom - e.top;
          else {
            const d = this.findNearestVisibleAncestor(s.source);
            if (d) {
              const N = document.querySelector(
                `[data-id="${d}"] .tree-label`
              ).getBoundingClientRect();
              u = N.top + N.height / 2 - e.top;
            } else
              u = l.top + l.height / 2 - e.top;
          }
        }
        f -= e.left, u -= e.top;
        let A = null;
        if (!this.isNodeVisible(s.source)) {
          let c = document.querySelector(`[data-id="${s.source}"]`).parentElement;
          for (; c && c.classList.contains("tree-children"); ) {
            if (!c.classList.contains("active")) {
              const d = c.parentElement.dataset.id;
              if (this.isNodeVisible(d)) {
                A = d;
                break;
              }
            }
            c = c.parentElement?.parentElement || null;
          }
        }
        R === "top" && !A && (u = n.getBoundingClientRect().top - e.top);
        let v = null;
        if (this.isNodeVisible(s.target))
          b = a.id === "leftTree" ? p.right + 5 - e.left : p.left - 5 - e.left, h = E.top + E.height / 2 - e.top;
        else {
          let c = document.querySelector(
            `[data-id="${s.target}"]`
          ).parentElement;
          for (; c && c.classList.contains("tree-children"); ) {
            if (!c.classList.contains("active")) {
              const d = c.parentElement.dataset.id;
              if (this.isNodeVisible(d)) {
                v = d;
                break;
              }
            }
            c = c.parentElement?.parentElement || null;
          }
          if (v) {
            const d = document.querySelector(
              `[data-id="${v}"] .tree-label`
            ).getBoundingClientRect();
            b = a.id === "leftTree" ? p.right + 5 - e.left : p.left - 5 - e.left, h = d.top + d.height / 2 - e.top;
          } else if (b = a.id === "leftTree" ? p.right + 5 - e.left : p.left - 5 - e.left, y === "top")
            h = p.top - e.top - 10;
          else if (y === "bottom")
            h = p.bottom - 10 - e.top;
          else {
            const m = this.findNearestVisibleAncestor(s.target);
            if (m) {
              const d = document.querySelector(
                `[data-id="${m}"] .tree-label`
              ).getBoundingClientRect();
              h = d.top + d.height / 2 - e.top;
            } else
              h = p.top + p.height / 2 - e.top;
          }
        }
        b -= e.left, h -= e.top, y === "top" && !v ? h = a.getBoundingClientRect().top - e.top : y === "bottom" && !v && (h = a.getBoundingClientRect().bottom - e.top);
        const g = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        let S;
        const C = this.bezier || 100;
        $ ? (S = `M ${f} ${u} C ${f + C} ${u}, ${b - C} ${h}, ${b} ${h}`, g.setAttribute("marker-end", "url(#arrowhead-end)")) : T ? (S = `M ${f} ${u} C ${f - C} ${u}, ${b + C} ${h}, ${b} ${h}`, g.setAttribute("marker-end", "url(#arrowhead-start)")) : S = `M ${f} ${u} C ${f + C} ${u}, ${b - C} ${h}, ${b} ${h}`, g.setAttribute("d", S), $ ? g.setAttribute("stroke", "#0090F0") : T ? g.setAttribute("stroke", "#FE732F") : g.setAttribute("stroke", "#666");
        const L = this.isNodeVisible(s.source), k = this.isNodeVisible(s.target), B = R === "top", V = y === "top";
        g.setAttribute("stroke-width", "1.5"), g.setAttribute("fill", "none"), B || V || !L || !k ? g.setAttribute("stroke-dasharray", "5,5") : g.removeAttribute("stroke-dasharray"), t.appendChild(g);
      }
    }), this.connections.length > 0 && !document.getElementById("arrowhead-end"))) {
      const s = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      ), i = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      i.setAttribute("id", "arrowhead-end"), i.setAttribute("markerWidth", "10"), i.setAttribute("markerHeight", "7"), i.setAttribute("refX", "9"), i.setAttribute("refY", "3.5"), i.setAttribute("orient", "auto");
      const r = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      r.setAttribute("points", "0 0, 10 3.5, 0 7"), r.setAttribute("fill", "#4096ff"), i.appendChild(r);
      const e = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      e.setAttribute("id", "arrowhead-start"), e.setAttribute("markerWidth", "10"), e.setAttribute("markerHeight", "7"), e.setAttribute("refX", "9"), e.setAttribute("refY", "3.5"), e.setAttribute("orient", "auto");
      const n = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      n.setAttribute("points", "0 0, 10 3.5, 0 7"), n.setAttribute("fill", "#ff7a45"), e.appendChild(n), s.appendChild(i), s.appendChild(e), t.appendChild(s);
    }
  }
  // 初始化树
  initializeTrees() {
    const t = document.getElementById("leftTree"), s = document.getElementById("rightTree");
    !t || !s || (this.leftTreeData.forEach((i) => {
      this.renderTreeNode(i, t);
    }), this.rightTreeData.forEach((i) => {
      this.renderTreeNode(i, s);
    }), this.addScrollListenersWithThrottle(), this.connections.push(...this.linkList), this.drawConnections());
  }
  // 导出方法
  redraw() {
    this.drawConnections();
  }
  updateData(t, s, i) {
    this.leftTreeData = t, this.rightTreeData = s, this.linkList = i, this.connections = [...i], this.initializeTrees();
  }
}
export {
  x as default
};
