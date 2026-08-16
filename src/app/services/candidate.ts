import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private readonly storageKey = 'worksphere_candidates';

  private candidates: Candidate[] = [];


  constructor() {
    this.loadCandidates();
  }


  private loadCandidates(): void {

    const storedCandidates =
      localStorage.getItem(this.storageKey);

    if (storedCandidates) {

      this.candidates =
        JSON.parse(storedCandidates);

    } else {

      this.candidates = [

        {
          id: 1,
          name: 'Aarav Shah',
          email: 'aarav@example.com',
          phone: '9876543210',
          position: 'Angular Developer',
          experience: 1,
          appliedDate: '2026-07-20',
          status: 'Interview'
        },

        {
          id: 2,
          name: 'Riya Patel',
          email: 'riya@example.com',
          phone: '9876501234',
          position: 'UI/UX Designer',
          experience: 2,
          appliedDate: '2026-07-18',
          status: 'Shortlisted'
        },

        {
          id: 3,
          name: 'Kabir Mehta',
          email: 'kabir@example.com',
          phone: '9823456712',
          position: 'Backend Developer',
          experience: 3,
          appliedDate: '2026-07-15',
          status: 'Applied'
        },

        {
          id: 4,
          name: 'Ananya Joshi',
          email: 'ananya@example.com',
          phone: '9898765432',
          position: 'Frontend Developer',
          experience: 2,
          appliedDate: '2026-07-10',
          status: 'Hired'
        },

        {
          id: 5,
          name: 'Dev Malhotra',
          email: 'dev@example.com',
          phone: '9812345678',
          position: 'Python Developer',
          experience: 1,
          appliedDate: '2026-07-05',
          status: 'Rejected'
        }

      ];

      this.saveCandidates();

    }

  }


  private saveCandidates(): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.candidates)
    );

  }


  getCandidates(): Candidate[] {

    return this.candidates;

  }

  addCandidate(candidate: Candidate): void {
    this.candidates.push(candidate);
    this.saveCandidates();
  }


  deleteCandidate(id: number): void {

    this.candidates =
      this.candidates.filter(
        candidate =>
          candidate.id !== id
      );

    this.saveCandidates();

  }

}














