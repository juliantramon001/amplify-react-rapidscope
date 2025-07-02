import { useState } from 'react';

export default function InspectionForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [formData, setFormData] = useState({
    vehicle: '',
    issues: '',
  });

  function next() {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function previous() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Inspection submitted');
  }

  return (
    <form className="inspection-form" onSubmit={handleSubmit}>
      <div className="progress">Step {step} of {totalSteps}</div>

      {step === 1 && (
        <div className="step">
          <label>
            Vehicle
            <input name="vehicle" value={formData.vehicle} onChange={handleChange} />
          </label>
          <div className="navigation">
            <button type="button" onClick={next}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <label>
            Issues
            <textarea name="issues" value={formData.issues} onChange={handleChange} />
          </label>
          <div className="navigation">
            <button type="button" onClick={previous}>Back</button>
            <button type="button" onClick={next}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <p>Review information and submit.</p>
          <p><strong>Vehicle:</strong> {formData.vehicle}</p>
          <p><strong>Issues:</strong> {formData.issues}</p>
          <div className="navigation">
            <button type="button" onClick={previous}>Back</button>
            <button type="submit">Submit</button>
          </div>
        </div>
      )}
    </form>
  );
}
