import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Candidate } from '../../models/candidate';
import { CandidateService } from '../../services/candidate';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-recruitment',
  imports: [FormsModule],
  templateUrl: './recruitment.html',
  styleUrl: './recruitment.css'
})
export class Recruitment implements OnInit {

  candidates: Candidate[] = [];

  searchText = '';

  selectedStatus = '';

  statuses: Candidate['status'][] = [
    'Applied',
    'Interview',
    'Shortlisted',
    'Rejected',
    'Hired'
  ];


  // Add Candidate Modal

  showAddCandidateModal = false;


  newCandidate: Candidate = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: 0,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied'
  };


  constructor(
    private candidateService: CandidateService,
    private notificationService: NotificationService
  ) {}


  ngOnInit(): void {

    this.loadCandidates();

  }


  loadCandidates(): void {

    this.candidates =
      this.candidateService.getCandidates();

  }


  get filteredCandidates(): Candidate[] {

    const search =
      this.searchText.trim().toLowerCase();


    return this.candidates.filter(candidate => {

      const matchesSearch =
        !search ||
        candidate.name.toLowerCase().includes(search) ||
        candidate.email.toLowerCase().includes(search) ||
        candidate.position.toLowerCase().includes(search);


      const matchesStatus =
        !this.selectedStatus ||
        candidate.status === this.selectedStatus;


      return matchesSearch && matchesStatus;

    });

  }


  getStatusCount(
    status: Candidate['status']
  ): number {

    return this.candidates.filter(
      candidate => candidate.status === status
    ).length;

  }


  resetFilters(): void {

    this.searchText = '';

    this.selectedStatus = '';

  }


  deletedCandidate(id: number): void {

    const candidate = this.candidates.find(
      item => item.id === id
    );
    
    if (!candidate) {
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to delete this candidate ${candidate.name} ?`
    );


    if (!confirmed) {
      return;
    }


    this.candidateService.deleteCandidate(id);

    this.notificationService.addNotification(
      'Candidate Removed',
      `${candidate.name} was removed from the recruitment pipeline.`,
      'info'
    );

    this.loadCandidates();

  }


  // ========================================
  // ADD CANDIDATE
  // ========================================

  openAddCandidateModal(): void {

    this.newCandidate = {

      id: 0,

      name: '',

      email: '',

      phone: '',

      position: '',

      experience: 0,

      appliedDate:
        new Date().toISOString().split('T')[0],

      status: 'Applied'

    };


    this.showAddCandidateModal = true;

  }


  closeAddCandidateModal(): void {

    this.showAddCandidateModal = false;

  }


  addCandidate(): void {

    const candidate: Candidate = {

      ...this.newCandidate,

      id: Date.now(),

      experience:
        Number(this.newCandidate.experience)

    };


    this.candidateService.addCandidate(candidate);

    this.notificationService.addNotification(
      'New candidate added',
      `${candidate.name} applied for ${candidate.position}`,
      'candidate'
    );

    this.loadCandidates();

    this.closeAddCandidateModal();

  }

}