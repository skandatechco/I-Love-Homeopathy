export default function UrgentCareWarning({ redFlags }: { redFlags: string[] }) {
  return (
    <div className="mt-6 rounded-md border border-red-300 bg-red-50 p-4 text-[12px] leading-relaxed text-red-800">
      <div className="font-semibold text-red-900 text-xs uppercase tracking-wide">
        Seek urgent care if:
      </div>
      <ul className="list-disc pl-4 mt-2">
        {redFlags.map((flag, i) => (
          <li key={i}>{flag}</li>
        ))}
      </ul>
    </div>
  );
}
