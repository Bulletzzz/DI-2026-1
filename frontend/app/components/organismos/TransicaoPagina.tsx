"use client"

import { useEffect, useRef, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { gsap } from "gsap"

const BLOCOS = 20

export default function TransicaoPagina({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoOverlayRef = useRef<HTMLDivElement>(null)
  const blocosRef = useRef<HTMLDivElement[]>([])
  const transicionando = useRef(false)

  useEffect(() => {
    if (!overlayRef.current) return

    for (let i = 0; i < BLOCOS; i++) {
      const bloco = document.createElement("div")
      bloco.className = "pt-block"
      bloco.style.background = "#1a1a1a"
      overlayRef.current.appendChild(bloco)
      blocosRef.current.push(bloco)
    }

    gsap.set(blocosRef.current, { scaleX: 0, transformOrigin: "left" })
    gsap.set(logoOverlayRef.current, { opacity: 0 })

    return () => {
      blocosRef.current = []
    }
  }, [])

  useEffect(() => {
    transicionando.current = false
    if (!blocosRef.current.length) return

    gsap.killTweensOf(blocosRef.current)
    gsap.killTweensOf(logoOverlayRef.current)
    gsap.set(logoOverlayRef.current, { opacity: 0 })

    gsap.to(blocosRef.current, {
      scaleX: 0,
      duration: 0.35,
      stagger: 0.04,
      ease: "power3.inOut",
      transformOrigin: "right",
    })
  }, [pathname])

  const cobrir = useCallback((url: string) => {
    gsap.killTweensOf(blocosRef.current)
    gsap.killTweensOf(logoOverlayRef.current)

    const tl = gsap.timeline({ onComplete: () => router.push(url) })

    tl.to(blocosRef.current, {
      scaleX: 1,
      duration: 0.75,
      stagger: 0.04,
      ease: "power3.inOut",
      transformOrigin: "left",
    })
    .to(logoOverlayRef.current, { opacity: 1, duration: 0.25 }, "-=0.35")
    .to(logoOverlayRef.current, { opacity: 0, duration: 0.25 }, "+=0.2")
  }, [router])

  const navegar = useCallback((url: string) => {
    if (transicionando.current) return
    transicionando.current = true
    cobrir(url)
  }, [cobrir])

  const interceptarClique = useCallback((e: MouseEvent) => {
    const ancora = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null
    if (!ancora) return

    const href = ancora.getAttribute("href")
    if (!href || !href.startsWith("/")) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || ancora.target === "_blank") return
    if (transicionando.current) { e.preventDefault(); return }

    const url = new URL(ancora.href).pathname
    if (url !== pathname) {
      e.preventDefault()
      navegar(url)
    }
  }, [pathname, navegar])

  useEffect(() => {
    document.addEventListener("click", interceptarClique, { capture: true })
    return () => document.removeEventListener("click", interceptarClique, { capture: true })
  }, [interceptarClique])

  return (
    <>
      <div ref={overlayRef} className="pt-overlay" />
      <div ref={logoOverlayRef} className="pt-logo-overlay" style={{ background: "#0f0f0f" }}>
        <div className="pt-logo-container">
          <img src="/Logo.svg" alt="BEAST" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
      {children}
    </>
  )
}
