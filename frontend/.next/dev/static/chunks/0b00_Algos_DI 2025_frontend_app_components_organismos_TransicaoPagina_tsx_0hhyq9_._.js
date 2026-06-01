(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Atalhos/Algos/DI 2025/frontend/app/components/organismos/TransicaoPagina.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransicaoPagina
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const BLOCOS = 20;
function TransicaoPagina({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logoOverlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const blocosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const transicionando = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransicaoPagina.useEffect": ()=>{
            if (!overlayRef.current) return;
            for(let i = 0; i < BLOCOS; i++){
                const bloco = document.createElement("div");
                bloco.className = "pt-block";
                bloco.style.background = "#1a1a1a";
                overlayRef.current.appendChild(bloco);
                blocosRef.current.push(bloco);
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(blocosRef.current, {
                scaleX: 0,
                transformOrigin: "left"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(logoOverlayRef.current, {
                opacity: 0
            });
            return ({
                "TransicaoPagina.useEffect": ()=>{
                    blocosRef.current = [];
                }
            })["TransicaoPagina.useEffect"];
        }
    }["TransicaoPagina.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransicaoPagina.useEffect": ()=>{
            transicionando.current = false;
            if (!blocosRef.current.length) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(blocosRef.current);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(logoOverlayRef.current);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(logoOverlayRef.current, {
                opacity: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(blocosRef.current, {
                scaleX: 0,
                duration: 0.75,
                stagger: 0.04,
                ease: "power3.inOut",
                transformOrigin: "right"
            });
        }
    }["TransicaoPagina.useEffect"], [
        pathname
    ]);
    const cobrir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TransicaoPagina.useCallback[cobrir]": (url)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(blocosRef.current);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(logoOverlayRef.current);
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                onComplete: {
                    "TransicaoPagina.useCallback[cobrir].tl": ()=>router.push(url)
                }["TransicaoPagina.useCallback[cobrir].tl"]
            });
            tl.to(blocosRef.current, {
                scaleX: 1,
                duration: 0.75,
                stagger: 0.04,
                ease: "power3.inOut",
                transformOrigin: "left"
            }).to(logoOverlayRef.current, {
                opacity: 1,
                duration: 0.25
            }, "-=0.35").to(logoOverlayRef.current, {
                opacity: 0,
                duration: 0.25
            }, "+=0.2");
        }
    }["TransicaoPagina.useCallback[cobrir]"], [
        router
    ]);
    const navegar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TransicaoPagina.useCallback[navegar]": (url)=>{
            if (transicionando.current) return;
            transicionando.current = true;
            cobrir(url);
        }
    }["TransicaoPagina.useCallback[navegar]"], [
        cobrir
    ]);
    const interceptarClique = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TransicaoPagina.useCallback[interceptarClique]": (e)=>{
            const ancora = e.target.closest("a[href]");
            if (!ancora) return;
            const href = ancora.getAttribute("href");
            if (!href || !href.startsWith("/")) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || ancora.target === "_blank") return;
            if (transicionando.current) {
                e.preventDefault();
                return;
            }
            const url = new URL(ancora.href).pathname;
            if (url !== pathname) {
                e.preventDefault();
                navegar(url);
            }
        }
    }["TransicaoPagina.useCallback[interceptarClique]"], [
        pathname,
        navegar
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransicaoPagina.useEffect": ()=>{
            document.addEventListener("click", interceptarClique, {
                capture: true
            });
            return ({
                "TransicaoPagina.useEffect": ()=>document.removeEventListener("click", interceptarClique, {
                        capture: true
                    })
            })["TransicaoPagina.useEffect"];
        }
    }["TransicaoPagina.useEffect"], [
        interceptarClique
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: overlayRef,
                className: "pt-overlay"
            }, void 0, false, {
                fileName: "[project]/Desktop/Atalhos/Algos/DI 2025/frontend/app/components/organismos/TransicaoPagina.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: logoOverlayRef,
                className: "pt-logo-overlay",
                style: {
                    background: "#0f0f0f"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-logo-container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/Logo.svg",
                        alt: "BEAST",
                        style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Atalhos/Algos/DI 2025/frontend/app/components/organismos/TransicaoPagina.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Atalhos/Algos/DI 2025/frontend/app/components/organismos/TransicaoPagina.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Atalhos/Algos/DI 2025/frontend/app/components/organismos/TransicaoPagina.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true);
}
_s(TransicaoPagina, "azpjd8j8GI/wdVm5jw160rUfHTk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = TransicaoPagina;
var _c;
__turbopack_context__.k.register(_c, "TransicaoPagina");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=0b00_Algos_DI%202025_frontend_app_components_organismos_TransicaoPagina_tsx_0hhyq9_._.js.map