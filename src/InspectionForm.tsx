import { useState } from "react";

const steps = [
  "Building Condition",
  "Parking Lot",
  "Landscaping",
  "Photo Upload",
] as const;

export default function InspectionForm() {
  const [step, setStep] = useState(0); // 0‑based index
  const [formData, setFormData] = useState({
    // building
    building1: "",
    building2: "",
    building3: "",
    // lot
    lot1: "",
    lot2: "",
    lot3: "",
    // landscape
    land1: "",
    land2: "",
    land3: "",
  });
  const [photos, setPhotos] = useState<FileList | null>(null);

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
  }
  function previous() {
    if (step > 0) setStep(step - 1);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhotos(e.target.files);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to API
    alert("Report submitted!");
  }

  return (
    <form className="max-w-sm mx-auto p-4 bg-gray-100" onSubmit={handleSubmit}>
      <div className="progress text-center font-bold mb-4">
        Step {step + 1} of {steps.length}
      </div>

      {/* STEP 1 — Building */}
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">🏢 Building Condition</h2>
          <Question
            name="building1"
            text="Are there any visible damages?"
            value={formData.building1}
            onChange={handleRadioChange}
          />
          <Question
            name="building2"
            text="Is the entrance area clean and accessible?"
            value={formData.building2}
            onChange={handleRadioChange}
          />
          <Question
            name="building3"
            text="Are safety signs visible and in good condition?"
            value={formData.building3}
            onChange={handleRadioChange}
          />
          <NavButtons next={next} />
        </div>
      )}

      {/* STEP 2 — Parking Lot */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">🚧 Parking Lot</h2>
          <Question
            name="lot1"
            text="Is the lot free of cracks/potholes?"
            value={formData.lot1}
            onChange={handleRadioChange}
          />
          <Question
            name="lot2"
            text="Are striping and markings visible?"
            value={formData.lot2}
            onChange={handleRadioChange}
          />
          <Question
            name="lot3"
            text="Any blocked or damaged areas?"
            value={formData.lot3}
            onChange={handleRadioChange}
          />
          <NavButtons previous={previous} next={next} />
        </div>
      )}

      {/* STEP 3 — Landscaping */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">🌳 Landscaping</h2>
          <Question
            name="land1"
            text="Are lawn and plants maintained?"
            value={formData.land1}
            onChange={handleRadioChange}
          />
          <Question
            name="land2"
            text="Any trash or overgrowth visible?"
            value={formData.land2}
            onChange={handleRadioChange}
          />
          <Question
            name="land3"
            text="Are shrubs blocking walkways/signs?"
            value={formData.land3}
            onChange={handleRadioChange}
          />
          <NavButtons previous={previous} next={next} />
        </div>
      )}

      {/* STEP 4 — Photos & Submit */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">📷 Upload Photos</h2>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="w-full"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={previous}
              className="flex-1 bg-gray-300 p-2"
            >
              Back
            </button>
            <button type="submit" className="flex-1 bg-green-500 text-white p-2">
              ✅ Submit Report
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

/** Simple radio‑button question component */
function Question({
  name,
  text,
  value,
  onChange,
}: {
  name: string;
  text: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="question">
      <p className="mb-1">{text}</p>
      {(["Yes", "No", "Not Sure"] as const).map((opt) => (
        <label key={opt} className="mr-3">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={onChange}
          />
          {" "}{opt}
        </label>
      ))}
    </div>
  );
}

function NavButtons({
  previous,
  next,
}: {
  previous?: () => void;
  next?: () => void;
}) {
  return (
    <div className="flex gap-2">
      {previous && (
        <button type="button" onClick={previous} className="flex-1 bg-gray-300 p-2">
          Back
        </button>
      )}
      {next && (
        <button type="button" onClick={next} className="flex-1 bg-blue-500 text-white p-2">
          {previous ? "Next ➡️" : "Next"}
        </button>
      )}
    </div>
  );
}
