import Sidebar from "@/app/components/organismos/Sidebar"
import Footer from "@/app/components/organismos/Footer"

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
