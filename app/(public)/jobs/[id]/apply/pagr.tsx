import ApplyJobClient from "../../../../components/ApplyJobClient";

export default function ApplyJobPage({ params }: { params: { id: string } }) {
  return <ApplyJobClient jobId={params.id} />;
}