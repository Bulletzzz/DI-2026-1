module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/Atalhos/Algos/DI 2025/frontend/app/components/organismos/TransicaoPagina.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransicaoPagina
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Atalhos/Algos/DI 2025/frontend/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
const BLOCOS = 20;
function TransicaoPagina({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logoOverlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const blocosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const transicionando = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!overlayRef.current) return;
        for(let i = 0; i < BLOCOS; i++){
            const bloco = document.createElement("div");
            bloco.className = "pt-block";
            bloco.style.background = "#1a1a1a";
            overlayRef.current.appendChild(bloco);
            blocosRef.current.push(bloco);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(blocosRef.current, {
            scaleX: 0,
            transformOrigin: "left"
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(logoOverlayRef.current, {
            opacity: 0
        });
        return ()=>{
            blocosRef.current = [];
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        transicionando.current = false;
        if (!blocosRef.current.length) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(blocosRef.current);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(logoOverlayRef.current);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(logoOverlayRef.current, {
            opacity: 0
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(blocosRef.current, {
            scaleX: 0,
            duration: 0.75,
            stagger: 0.04,
            ease: "power3.inOut",
            transformOrigin: "right"
        });
    }, [
        pathname
    ]);
    const cobrir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((url)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(blocosRef.current);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(logoOverlayRef.current);
        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onComplete: ()=>router.push(url)
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
    }, [
        router
    ]);
    const navegar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((url)=>{
        if (transicionando.current) return;
        transicionando.current = true;
        cobrir(url);
    }, [
        cobrir
    ]);
    const interceptarClique = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
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
    }, [
        pathname,
        navegar
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.addEventListener("click", interceptarClique, {
            capture: true
        });
        return ()=>document.removeEventListener("click", interceptarClique, {
                capture: true
            });
    }, [
        interceptarClique
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: overlayRef,
                className: "pt-overlay"
            }, void 0, false, {
                fileName: "[project]/Desktop/Atalhos/Algos/DI 2025/frontend/app/components/organismos/TransicaoPagina.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: logoOverlayRef,
                className: "pt-logo-overlay",
                style: {
                    background: "#0f0f0f"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-logo-container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Atalhos$2f$Algos$2f$DI__2025$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_mr153._.js.map