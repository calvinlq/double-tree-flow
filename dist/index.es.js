const B = "data:image/svg+xml,%3csvg%20width='101'%20height='101'%20viewBox='0%200%20101%20101'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.5208%2024.6667V16.8333C10.5208%2014.5091%2012.4049%2012.625%2014.7291%2012.625H39.9791L50.5%2025.25H86.2708C88.5951%2025.25%2090.4791%2027.1341%2090.4791%2029.4583V84.1667C90.4791%2086.4909%2088.5951%2088.375%2086.2708%2088.375H14.7291C12.4049%2088.375%2010.5208%2086.4909%2010.5208%2084.1667V78.5'%20stroke='%23818181'%20stroke-width='5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3%2062.5V47.5H25.5V32.4142C25.5%2031.5233%2026.5771%2031.0771%2027.2071%2031.7071L50.2929%2054.7929C50.6834%2055.1834%2050.6834%2055.8166%2050.2929%2056.2071L27.2071%2079.2929C26.5771%2079.9229%2025.5%2079.4767%2025.5%2078.5858V62.5H3Z'%20fill='%23F1BA10'%20stroke='%233D3D3D'%20stroke-width='2'/%3e%3c/svg%3e", q = "data:image/svg+xml,%3csvg%20width='101'%20height='101'%20viewBox='0%200%20101%20101'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M90.4791%2032V29.4583C90.4791%2027.1341%2088.5951%2025.25%2086.2708%2025.25H50.5L39.9791%2012.625H14.7291C12.4049%2012.625%2010.5208%2014.5091%2010.5208%2016.8333V84.1667C10.5208%2086.4909%2012.4049%2088.375%2014.7291%2088.375H86.2708C88.5951%2088.375%2090.4791%2086.4909%2090.4791%2084.1667V79.5'%20stroke='%23818181'%20stroke-width='5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M51%2062.5V47.5H73.5V32.4142C73.5%2031.5233%2074.5771%2031.0771%2075.2071%2031.7071L98.2929%2054.7929C98.6834%2055.1834%2098.6834%2055.8166%2098.2929%2056.2071L75.2071%2079.2929C74.5771%2079.9229%2073.5%2079.4767%2073.5%2078.5858V62.5H51Z'%20fill='%230068D4'%20stroke='%233D3D3D'%20stroke-width='2'/%3e%3c/svg%3e", H = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2022.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='图层_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%2054%2054'%20style='enable-background:new%200%200%2054%2054;'%20xml:space='preserve'%20width='100px'%20height='100px'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:none;stroke:%23333333;stroke-miterlimit:10;}%20.st1{fill:%23F1BA10;stroke:%23333333;stroke-miterlimit:10;}%20.st2{fill:%231664B5;stroke:%23333333;stroke-miterlimit:10;}%20%3c/style%3e%3cg%3e%3cpolygon%20class='st0'%20points='47.4,46.6%206.1,46.6%206.6,7.4%2047.9,7.4%20'/%3e%3cg%3e%3cpolygon%20class='st1'%20points='26.4,27.8%2013.8,15.2%2013.8,24.3%202.5,24.3%202.5,31.3%2013.8,31.3%2013.8,40.4%20'/%3e%3cpolygon%20class='st2'%20points='51.5,27.8%2038.9,15.2%2038.9,24.3%2027.6,24.3%2027.6,31.3%2038.9,31.3%2038.9,40.4%20'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
class D {
  constructor(n, i, t, r, e = {}) {
    this.connections = [], this.selectedNode = null, this.enableLink = e.enableLink !== void 0 ? e.enableLink : !1, this.enableTxtBgColor = e.enableTxtBgColor !== void 0 ? e.enableTxtBgColor : !1, this.bezier = e.bezier !== void 0 ? e.bezier : 100, this.leftTreeData = i, this.rightTreeData = t, this.linkList = r;
    const s = document.getElementById(n);
    if (!s)
      throw new Error(`Container with id "${n}" not found`);
    s.style.display = "flex", s.style.justifyContent = "space-around", s.style.padding = "6px 10px", this.container = s, this.init();
  }
  init() {
    this.container.innerHTML = '<svg id="connection-layer"></svg>';
    const n = document.createElement("div");
    n.className = "tree-container", n.id = "leftTree";
    const i = this.container.dataset.treewidth, t = this.container.dataset.treeheight;
    i && (n.style.width = `${i}px`), t && (n.style.maxHeight = `${t}px`);
    const r = document.createElement("div");
    r.className = "tree-container", r.id = "rightTree", i && (r.style.width = `${i}px`), t && (r.style.maxHeight = `${t}px`), this.container.appendChild(n), this.container.appendChild(r), this.initializeTrees(), window.addEventListener("resize", () => this.drawConnections());
  }
  getParentNode(n) {
    const i = document.querySelector(`[data-id="${n}"]`), t = i.getBoundingClientRect();
    return t.top !== 0 ? t : this.getParentNode(i.parentElement.parentElement.dataset.id);
  }
  renderTreeNode(n, i) {
    const t = document.createElement("div");
    let r = `tree-node level-${n.level}`;
    n.children && n.children.length > 0 && (r += " has-children"), n.level === 1 && (r += " level-1-node"), t.className = r, t.dataset.id = n.id, t.dataset.level = n.level.toString(), n.parentId && (t.dataset.parentId = n.parentId);
    const e = document.createElement("div");
    if (e.className = `tree-node-row level-${n.level}`, t.appendChild(e), n.children && n.children.length > 0) {
      const o = document.createElement("span");
      o.className = "tree-toggle minus", o.addEventListener("click", (E) => {
        E.stopPropagation();
        const a = t.querySelector(".tree-children");
        a.classList.toggle("active"), a.classList.contains("active") ? (o.classList.remove("plus"), o.classList.add("minus")) : (o.classList.remove("minus"), o.classList.add("plus")), this.drawConnections();
      }), e.appendChild(o);
    } else {
      const o = document.createElement("span");
      o.className = "no-toggle", o.style.width = "3px", o.style.display = "inline-block", o.style.marginRight = "5px", e.classList.add("not-children"), e.appendChild(o);
    }
    let s = "";
    switch (n.type) {
      case "input":
        s = B;
        break;
      case "output":
        s = q;
        break;
      case "inOut":
        s = H;
        break;
      default:
        s = n.icon || "";
    }
    if (s) {
      const o = document.createElement("img");
      o.src = s, o.className = "tree-icon", e.appendChild(o);
    }
    const l = document.createElement("span");
    if (l.className = "tree-label", this.enableTxtBgColor ? (l.className += " tree-bg-color", l.style.padding = "2px 10px") : l.className += " default", l.textContent = n.label, l.addEventListener("click", () => {
      this.handleNodeClick(n.id);
    }), e.appendChild(l), n.children && n.children.length > 0) {
      const o = document.createElement("div");
      o.className = "tree-children active", t.appendChild(o), n.children.forEach((E) => {
        E.parentId = n.id, this.renderTreeNode(E, o);
      });
    }
    i.appendChild(t);
  }
  handleNodeClick(n) {
    if (this.selectedNode) {
      const t = document.querySelector(
        `[data-id="${this.selectedNode}"] .tree-label`
      );
      t && t.classList.remove("selected");
    }
    if (this.selectedNode && this.selectedNode !== n) {
      const t = this.selectedNode.startsWith("left-") && n.startsWith("right-"), r = this.selectedNode.startsWith("right-") && n.startsWith("left-");
      if (this.enableLink && (t || r)) {
        const e = this.selectedNode, s = n;
        this.connections.push({ source: e, target: s }), this.drawConnections(), this.selectedNode = null;
        return;
      } else if (!this.enableLink) {
        this.selectedNode = n;
        const e = document.querySelector(
          `[data-id="${n}"] .tree-label`
        );
        e && e.classList.add("selected");
        return;
      }
    }
    if (this.selectedNode === n) {
      const t = document.querySelector(
        `[data-id="${n}"] .tree-label`
      );
      t && t.classList.remove("selected"), this.selectedNode = null;
      return;
    }
    this.selectedNode = n;
    const i = document.querySelector(
      `[data-id="${n}"] .tree-label`
    );
    i && i.classList.add("selected");
  }
  isNodeVisible(n) {
    const i = document.querySelector(`[data-id="${n}"]`);
    if (!i) return !1;
    let t = i.parentElement;
    for (; t && t.classList.contains("tree-children"); ) {
      if (!t.classList.contains("active"))
        return !1;
      t = t.parentElement && t.parentElement.parentElement ? t.parentElement.parentElement : null;
    }
    const r = i.closest(".tree-container");
    if (!r) return !1;
    const e = i.getBoundingClientRect(), s = r.getBoundingClientRect();
    return e.bottom > s.top && e.top < s.bottom;
  }
  findNearestVisibleAncestor(n) {
    const i = document.querySelector(`[data-id="${n}"]`);
    if (!i) return null;
    if (this.isNodeVisible(n))
      return n;
    let t = i.dataset.parentId;
    for (; t; ) {
      if (this.isNodeVisible(t))
        return t;
      const a = document.querySelector(`[data-id="${t}"]`);
      if (!a) break;
      t = a.dataset.parentId;
    }
    const r = i.dataset.level, e = Array.from(
      document.querySelectorAll(`.tree-node[data-level="${r}"]`)
    ), s = i.getBoundingClientRect(), l = e.filter((a) => this.isNodeVisible(a.dataset.id));
    if (l.length === 0) {
      const a = i.parentElement ? i.parentElement.closest(".tree-node") : null;
      return a ? this.findNearestVisibleAncestor(a.dataset.id) : null;
    }
    return l.sort((a, g) => {
      const k = a.getBoundingClientRect(), $ = g.getBoundingClientRect();
      return Math.abs(k.top - s.top) - Math.abs($.top - s.top);
    }), l[0].dataset.id;
  }
  addScrollListenersWithThrottle() {
    document.querySelectorAll(".tree-container").forEach((i) => {
      i.addEventListener("scroll", this.throttle(() => this.drawConnections(), 10));
    });
  }
  throttle(n, i) {
    let t = 0;
    return () => {
      const r = Date.now();
      r - t >= i && (t = r, n());
    };
  }
  getNodeVisibilityPosition(n) {
    const i = document.querySelector(`[data-id="${n}"]`), t = i ? i.querySelector(".tree-label") : null;
    if (!t)
      return "unknown";
    const r = t.closest(".tree-container");
    if (!r)
      return "unknown";
    const e = t.getBoundingClientRect(), s = r.getBoundingClientRect();
    let l = null;
    return e.top === 0 && (l = this.getParentNode(n)), e.top === 0 && l ? l.top < s.top ? "top" : l.bottom > s.bottom ? "bottom" : "visible" : e.top < s.top ? "top" : e.bottom > s.bottom ? "bottom" : "visible";
  }
  findFirstVisibleNode() {
    const n = document.querySelectorAll(".tree-node");
    for (const i of Array.from(n)) {
      const t = i.dataset.id;
      if (this.isNodeVisible(t))
        return i;
    }
    return null;
  }
  drawConnections() {
    const n = document.getElementById("connection-layer");
    if (n && (n.innerHTML = "", n.getBoundingClientRect(), this.connections.forEach((i) => {
      const t = document.querySelector(
        `[data-id="${i.source}"] .tree-label`
      ), r = document.querySelector(
        `[data-id="${i.target}"] .tree-label`
      );
      if (t && r) {
        const e = n.getBoundingClientRect(), s = t.closest(".tree-container");
        if (!s) return;
        const l = r.closest(".tree-container");
        if (!l) return;
        const o = t.getBoundingClientRect(), E = r.getBoundingClientRect(), a = s.getBoundingClientRect(), g = l.getBoundingClientRect(), k = i.source.startsWith("left-") && i.target.startsWith("right-"), $ = i.source.startsWith("right-") && i.target.startsWith("left-"), T = this.getNodeVisibilityPosition(i.source), v = this.getNodeVisibilityPosition(i.target);
        let f, u, b, h;
        if (this.isNodeVisible(i.source)) {
          const N = s.getBoundingClientRect();
          f = s.id === "leftTree" ? N.right + 5 - e.left : N.left - 5 - e.left, u = o.top + o.height / 2 - e.top;
        } else {
          const N = document.querySelector(
            `[data-id="${i.source}"]`
          );
          let c = null, p = N.parentElement;
          for (; p && p.classList.contains("tree-children"); ) {
            if (!p.classList.contains("active")) {
              const C = p.parentElement.dataset.id;
              if (this.isNodeVisible(C)) {
                c = C;
                break;
              }
            }
            p = p.parentElement && p.parentElement.parentElement ? p.parentElement.parentElement : null;
          }
          if (c) {
            const C = document.querySelector(
              `[data-id="${c}"] .tree-label`
            ).getBoundingClientRect();
            f = s.id === "leftTree" ? a.right + 5 - e.left : a.left - 5 - e.left, u = C.top + C.height / 2 - e.top;
          } else if (f = s.id === "leftTree" ? a.right + 5 - e.left : a.left - 5 - e.left, T === "top")
            u = a.top - e.top;
          else if (T === "bottom")
            u = a.bottom - e.top;
          else {
            const d = this.findNearestVisibleAncestor(i.source);
            if (d) {
              const C = document.querySelector(
                `[data-id="${d}"] .tree-label`
              ).getBoundingClientRect();
              u = C.top + C.height / 2 - e.top;
            } else
              u = a.top + a.height / 2 - e.top;
          }
        }
        f -= e.left, u -= e.top;
        let R = null;
        if (!this.isNodeVisible(i.source)) {
          let c = document.querySelector(`[data-id="${i.source}"]`).parentElement;
          for (; c && c.classList.contains("tree-children"); ) {
            if (!c.classList.contains("active")) {
              const d = c.parentElement.dataset.id;
              if (this.isNodeVisible(d)) {
                R = d;
                break;
              }
            }
            c = c.parentElement && c.parentElement.parentElement ? c.parentElement.parentElement : null;
          }
        }
        T === "top" && !R && (u = s.getBoundingClientRect().top - e.top);
        let y = null;
        if (this.isNodeVisible(i.target))
          b = l.id === "leftTree" ? g.right + 5 - e.left : g.left - 5 - e.left, h = E.top + E.height / 2 - e.top;
        else {
          let c = document.querySelector(
            `[data-id="${i.target}"]`
          ).parentElement;
          for (; c && c.classList.contains("tree-children"); ) {
            if (!c.classList.contains("active")) {
              const d = c.parentElement.dataset.id;
              if (this.isNodeVisible(d)) {
                y = d;
                break;
              }
            }
            c = c.parentElement && c.parentElement.parentElement ? c.parentElement.parentElement : null;
          }
          if (y) {
            const d = document.querySelector(
              `[data-id="${y}"] .tree-label`
            ).getBoundingClientRect();
            b = l.id === "leftTree" ? g.right + 5 - e.left : g.left - 5 - e.left, h = d.top + d.height / 2 - e.top;
          } else if (b = l.id === "leftTree" ? g.right + 5 - e.left : g.left - 5 - e.left, v === "top")
            h = g.top - e.top - 10;
          else if (v === "bottom")
            h = g.bottom - 10 - e.top;
          else {
            const p = this.findNearestVisibleAncestor(i.target);
            if (p) {
              const d = document.querySelector(
                `[data-id="${p}"] .tree-label`
              ).getBoundingClientRect();
              h = d.top + d.height / 2 - e.top;
            } else
              h = g.top + g.height / 2 - e.top;
          }
        }
        b -= e.left, h -= e.top, v === "top" && !y ? h = l.getBoundingClientRect().top - e.top : v === "bottom" && !y && (h = l.getBoundingClientRect().bottom - e.top);
        const m = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        let L;
        const w = this.bezier || 100;
        k ? (L = `M ${f} ${u} C ${f + w} ${u}, ${b - w} ${h}, ${b} ${h}`, m.setAttribute("marker-end", "url(#arrowhead-end)")) : $ ? (L = `M ${f} ${u} C ${f - w} ${u}, ${b + w} ${h}, ${b} ${h}`, m.setAttribute("marker-end", "url(#arrowhead-start)")) : L = `M ${f} ${u} C ${f + w} ${u}, ${b - w} ${h}, ${b} ${h}`, m.setAttribute("d", L), k ? m.setAttribute("stroke", "#0090F0") : $ ? m.setAttribute("stroke", "#FE732F") : m.setAttribute("stroke", "#666");
        const A = this.isNodeVisible(i.source), S = this.isNodeVisible(i.target), x = T === "top", V = v === "top";
        m.setAttribute("stroke-width", "1.5"), m.setAttribute("fill", "none"), x || V || !A || !S ? m.setAttribute("stroke-dasharray", "5,5") : m.removeAttribute("stroke-dasharray"), n.appendChild(m);
      }
    }), this.connections.length > 0 && !document.getElementById("arrowhead-end"))) {
      const i = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      ), t = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      t.setAttribute("id", "arrowhead-end"), t.setAttribute("markerWidth", "10"), t.setAttribute("markerHeight", "7"), t.setAttribute("refX", "9"), t.setAttribute("refY", "3.5"), t.setAttribute("orient", "auto");
      const r = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      r.setAttribute("points", "0 0, 10 3.5, 0 7"), r.setAttribute("fill", "#4096ff"), t.appendChild(r);
      const e = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      e.setAttribute("id", "arrowhead-start"), e.setAttribute("markerWidth", "10"), e.setAttribute("markerHeight", "7"), e.setAttribute("refX", "9"), e.setAttribute("refY", "3.5"), e.setAttribute("orient", "auto");
      const s = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      s.setAttribute("points", "0 0, 10 3.5, 0 7"), s.setAttribute("fill", "#ff7a45"), e.appendChild(s), i.appendChild(t), i.appendChild(e), n.appendChild(i);
    }
  }
  // 初始化树
  initializeTrees() {
    const n = document.getElementById("leftTree"), i = document.getElementById("rightTree");
    !n || !i || (this.leftTreeData.forEach((t) => {
      this.renderTreeNode(t, n);
    }), this.rightTreeData.forEach((t) => {
      this.renderTreeNode(t, i);
    }), this.addScrollListenersWithThrottle(), this.connections.push(...this.linkList), this.drawConnections());
  }
  // 导出方法
  redraw() {
    this.drawConnections();
  }
  updateData(n, i, t) {
    this.leftTreeData = n, this.rightTreeData = i, this.linkList = t, this.connections = [...t], this.initializeTrees();
  }
}
export {
  D as default
};
