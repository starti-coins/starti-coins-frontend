import Page from "@/components/@ui/page";
import MemberLeaderboard from "../components/member-leaderboard";

function MemberReports() {
  return (
    <Page>
      <h3 className="text-2xl font-medium">Relatórios de Membros</h3>
      <p className="text-muted-foreground mb-4 mt-1">
        Lista dos colaboradores mais produtivos, ordenada pela quantidade de
        horas trabalhadas.
      </p>
      <div className="my-8">
        <MemberLeaderboard />
      </div>
    </Page>
  );
}

export default MemberReports;
