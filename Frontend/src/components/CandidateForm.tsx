import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CandidateForm() {
  // const [CandidateFormData, setCandidateFormData] = useState<ICandidateFormData>({
  //   name: '',
  //   currentJobLocation: '',
  //   currentCompany: '',
  //   preffedJobLocation: '',
  //   currentSalary: '',
  //   noticePeriod: '',
  //   previesCompanies: '',
  //   totalExperience: '',
  //   college: '',
  //   collegeLocation: '',
  //   graduateYear: '',
  //   CGPA: '',
  //   linkedInProfile: '',
  //   gitHubProfile: '',
  //   resume: ''
  // })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const candidateFormData: candidatFormDataObject = {};
    for (const [key, value] of formData.entries()) {
      candidateFormData[key] = value;
    }
    console.log(candidateFormData);
  }
  const tiles = [
    { label: "Name", name: "name" },
    { label: "Current Company", name: "currentCompany" },
    { label: "Current Job Location", name: "currentJobLocation" },
    { label: "Preferred Job Location", name: "preferredJobLocation" },
    { label: "Current Salary", name: "currentSalary" },
    { label: "Notice Period", name: "noticePeriod" },
    { label: "Previous Companies", name: "previousCompanies" },
    { label: "Total Experience", name: "totalExperience" },
    { label: "College", name: "college" },
    { label: "College Location", name: "collegeLocation" },
    { label: "Graduation Year", name: "graduateYear" },
    { label: "CGPA", name: "CGPA" },
    { label: "LinkedIn Profile", name: "linkedInProfile" },
    { label: "GitHub Profile", name: "githubProfile" },
    { label: "Resume", name: "resume", type: "file" },
  ];
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border-t-2 pt-4 border-primary p-1"
    >
      {tiles.map((tile, key) => (
        <div key={key}>
          <Label htmlFor={tile.label} className="ml-1">
            {tile.label}
          </Label>
          <Input name={tile.name} id={tile.label} type={tile.type || "text"} />
        </div>
      ))}
      <Button type="submit">Onboard as a Candidate</Button>
    </form>
  );
}
