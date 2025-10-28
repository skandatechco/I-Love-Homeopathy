export default function ReviewerAttribution({
  reviewer
}: {
  reviewer?: string;
}) {
  if (!reviewer) return null;
  return (
    <div className="mt-6 text-[11px] text-gray-500 leading-relaxed">
      Reviewed by {reviewer} (BHMS / MD [Hom])
    </div>
  );
}
