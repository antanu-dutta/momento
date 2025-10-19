import { Code } from "lucide-react";
import React from "react";
import StatCard from "./StatCard";

const StatsContainer = () => {
  return (
    <div className="grid grid-cols-4 overflow-auto gap-5">
      <StatCard
        title="Code Snippets"
        value="24"
        subtitle="Total saved"
        icon={<Code size={32} />}
        borderColor="border-blue-500"
        iconColor="text-blue-600"
      />
    </div>
  );
};

export default StatsContainer;
