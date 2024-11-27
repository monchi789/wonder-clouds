import { Users, UserPlus, FileText } from "lucide-react";
import StatCard from "../components/StatCard";

const HomeMain = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total de Clientes"
          value={10}
          icon={UserPlus}
          color="bg-wonder-blue"
        />
        <StatCard
          title="Total de usuarios"
          value={10}
          icon={Users}
          color="bg-[#104D7E]"
        />
        <StatCard
          title="Publicaciones"
          value={5}
          icon={FileText}
          color="bg-[#6C6CD1]"
        />
      </div>
    </div>
  );
};

export default HomeMain;
