import { PropsWithChildren } from "react";

type StatisticsContainerProps = PropsWithChildren<{
  title: string;
}>;

function StatisticsContainer({ title, children }: StatisticsContainerProps) {
  return (
    <div className="border w-full rounded-xl shadow px-4 py-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="grid grid-cols-2 gap-2 md:gap-4">{children}</div>
    </div>
  );
}

type StatisticsItemProps = {
  title: string;
  statistic: number;
  icon: React.ReactNode;
};

function StatisticsItem({ title, statistic, icon }: StatisticsItemProps) {
  return (
    <div className="border rounded-lg p-2 flex gap-2 items-center">
      <div className="border-1 rounded-full p-2 flex items-center">{icon}</div>
      <div className="px-2 truncate">
        <p className="text-lg font-medium">{title}</p>
        <p>{statistic}</p>
      </div>
    </div>
  );
}

const Statistics = {
  Container: StatisticsContainer,
  Item: StatisticsItem,
};

export default Statistics;
