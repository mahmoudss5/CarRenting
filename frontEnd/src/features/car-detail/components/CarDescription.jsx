/**
 * Long-form car description with editorial heading.
 */
export default function CarDescription({ car }) {
  const paragraphs = car.description.split('\n\n');

  return (
    <div className="mt-8">
      <h2 className="font-manrope font-bold text-headline-sm text-on-surface mb-4">
        Detailed Description
      </h2>
      <div className="flex flex-col gap-4">
        {paragraphs.map((para, i) => (
          <p key={i} className="font-inter text-body-md text-on-surface/65 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
