// app/jobs/apply/[id]/page.tsx
export const dynamic = 'force-dynamic'; // Force runtime route resolution

export default function ApplyJobPage({ params }: { params: { id: string } }) {
  console.log("✅ SERVER: ApplyJobPage rendered");
  console.log("🆔 SERVER: Job ID is", params.id);

  return (
    <div style={{ padding: "40px", fontSize: "24px" }}>
      <p>Apply page rendered for job ID: {params.id}</p>
    </div>
  );
}
