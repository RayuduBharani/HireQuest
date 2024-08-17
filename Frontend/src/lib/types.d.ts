interface IsignUpData {
    username: string;
    useremail: string;
    userpassword: string;
}

interface IsignInData {
    useremail: string;
    userpassword: string;
}

interface IcookieData {
    success: boolean;
    token: string;
    userId: string;
    useremail: string;
    userimage: string;
    username: string;
    role? : string;
}

interface MyContextType {
    RoleInfo: IRoleInfoData | null;
    setRoleInfo: React.Dispatch<React.SetStateAction<IRoleInfoData | null>>;
}

interface ICandidateFormData {
    name: String,
    currentJobLocation: String,
    currentCompany: String,
    preffedJobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    previesCompanies: String,
    totalExperience: String,
    college: String,
    collegeLocation: String,
    graduateYear: String,
    CGPA: String,
    linkedInProfile: String,
    gitHubProfile: String,
    resume: String
}

interface IRecuiterFormData {
    userId: string,
    email: string,
    userType : string ,
    role: {
        recruiterInfo: {
            name: '',
            companyName: '',
            companyRole: ''
        }
    }
}

interface IOnboardResponse {
    success: boolean
    message: string
}

interface IProps {
    Component: React.ComponentType;
    protectedRoutes?: boolean;
    onBorardRoute? : boolean
}

interface candidatFormDataObject {
    [key: string]: string | File
}

interface IRoleInfoData {
    data: {
        _id: string,
        userId: {
            createdAt: string,
            updatedAt: string,
            useremail: string,
            username: string,
            userimage: string,
            userpassword: string,
            _id: string
        },
        userType : string ,
        email: string,
        role: {
            recruiterInfo ?: {
                companyName: string,
                companyRole: string,
                name: string
            },
            candidateInfo ?: {
                name: String,
                currentJobLocation: String,
                currentCompany: String,
                preffedJobLocation: String,
                currentSalary: String,
                noticePeriod: String,
                previesCompanies: String,
                totalExperience: String,
                college: String,
                collegeLocation: String,
                graduateYear: String,
                CGPA: String,
                linkedInProfile: String,
                gitHubProfile: String,
                resume: String
            }
        }
    }
}

interface IuserType {
    userType : string
}

interface IUserData {
    username: string;
    useremail: string;
    userpassword: string;
    userimage?: string;
    role?: 'candidate' | 'recruiter' | null;
    profile?: string | null;
    roleProfile?: 'Candidate' | 'Recruiter' | null;
    createdAt: Date;
    updatedAt: Date;
}
