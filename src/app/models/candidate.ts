export interface Candidate {
    id: number,
    name: string,
    email: string,
    phone: string,
    position: string,
    experience: number,
    appliedDate: string,
    status: 'Applied' | 'Interview' | 'Shortlisted' | 'Rejected' | 'Hired';
}