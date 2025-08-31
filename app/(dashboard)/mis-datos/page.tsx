import BreadcrumbNav from "@/components/breadcrumb-nav"
import ProfileCard from "@/components/profile-card"

export default function MisDatos() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav current="MI PERFIL" />

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Mi Perfil</h1>

        <ProfileCard />
      </div>
    </div>
  )
}
