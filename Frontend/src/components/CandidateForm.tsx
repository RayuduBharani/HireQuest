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
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const candidateFormData : candidatFormDataObject = {}
    for (const [key, value] of formData.entries()) {
      candidateFormData[key] = value
    }
    console.log(candidateFormData)
    
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border-t-2 pt-4 border-primary p-1">
      <div>
        <Label htmlFor="Name" className="ml-1">Your Name</Label>
        <Input name="name" id="Name" />
      </div>

      <div>
        <Label htmlFor="Current Company" className="ml-1">Current Company</Label>
        <Input name='currentCompany' id="Current Company" />
      </div>

      <div>
        <Label htmlFor="Current Job Location" className="ml-1">Current Job Location</Label>
        <Input name="currentJobLocation" id="Current Job Location" />
      </div>

      <div>
        <Label htmlFor="Prefered Job Location" className="ml-1">Prefered Job Location</Label>
        <Input  name="preffedJobLocation" id="Prefered Job Location" />
      </div>

      <div>
        <Label htmlFor="Current Salary" className="ml-1">Current Salary</Label>
        <Input name="currentSalary" id="Current Salary" />
      </div>

      <div>
        <Label htmlFor="Notice Period" className="ml-1">Notice Period</Label>
        <Input name="noticePeriod" id="Notice Period" />
      </div>

      <div>
        <Label htmlFor="Previous Companies" className="ml-1">Previous Companies</Label>
        <Input name="previesCompanies" id="Previous Companies" />
      </div>

      <div>
        <Label htmlFor="Total Experience" className="ml-1">Total Experience</Label>
        <Input   name="totalExperience" id="Total Experience" />
      </div>

      <div>
        <Label htmlFor="College" className="ml-1">College</Label>
        <Input   name="college" id="College" />
      </div>

      <div>
        <Label htmlFor="College Location" className="ml-1">College Location</Label>
        <Input   name="collegeLocation" id="College Location" />
      </div>

      <div>
        <Label htmlFor="Graduation Year" className="ml-1">Graduation Year</Label>
        <Input   name="graduateYear" id="Graduation Year" />
      </div>

      <div>
        <Label htmlFor="CGPA" className="ml-1">CGPA</Label>
        <Input   name="CGPA" id="CGPA" />
      </div>

      <div>
        <Label htmlFor="LinkedIn Profile" className="ml-1">LinkedIn Profile</Label>
        <Input   name="linkedInProfile" id="LinkedIn Profile" />
      </div>

      <div>
        <Label htmlFor="GitHub Profile" className="ml-1">GitHub Profile</Label>
        <Input   name="gitHubProfile" id="GitHub Profile" />
      </div>

      <div>
        <Label htmlFor="Resume" className="ml-1">Resume</Label>
        <Input   name="resume" id="Resume" type="file" />
      </div>
      <Button>Onboard as a Candidate</Button>
    </form>
  )
}
