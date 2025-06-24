interface StatsCardProps {
    title: string;
    value: string | number;
    bg: string;
    text: string;
  }
  
  export const StatsCard = ({ title, value, bg, text }: StatsCardProps) => (
    <div className={`${bg} ${text} p-4 rounded-lg shadow-sm`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )