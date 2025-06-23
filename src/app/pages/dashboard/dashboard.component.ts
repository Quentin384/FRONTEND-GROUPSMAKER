// src/app/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupesService, Groupe, Tirage } from '../../core/services/groupes.service';
import { AuthService } from '../../core/services/auth.service';

import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';
import { FormListeComponent } from './form-liste.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FormListeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listes: Liste[] = [];
  personneForm: { [idListe: number]: Personne } = {};
  groupesFormes: { [idListe: number]: Groupe[] } = {};

  constructor(
    private groupesService: GroupesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerListes();
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  redirigerVersAdmin(): void {
    this.router.navigate(['/admin']);
  }

  chargerListes(): void {
  this.groupesService.getListes().subscribe({
    next: (listes) => {
      console.log('Listes reçues au chargement :', listes);
      this.listes = [...listes];
    },
    error: (err) => {
      console.error('Erreur au chargement des listes :', err);
    }
  });
}


  ajouterListe(listeData: { nom: string; personnes: Personne[] }): void {
    this.groupesService.ajouterListe(listeData.nom).subscribe(listeCree => {
      const idListe = listeCree.id;
      if (idListe) {
        const ajouts = listeData.personnes.map(p =>
          this.groupesService.ajouterPersonneDansListe(idListe, p)
        );
        Promise.all(ajouts.map(obs => obs.toPromise())).then(() => this.chargerListes());
      }
    });
  }

  ajouterPersonneDansListe(idListe: number): void {
    const personne = this.personneForm[idListe];
    if (personne.nom.trim()) {
      this.groupesService.ajouterPersonneDansListe(idListe, personne).subscribe(() => {
        this.chargerListes();
        this.personneForm[idListe] = this.getDefaultPersonne();
      });
    }
  }

  formerGroupes(idListe: number, nbGroupes: number, criteres: string[]): void {
    const liste = this.listes.find(l => l.id === idListe);
    if (!liste) return;

    const nomsGroupes = Array.from({ length: nbGroupes }, (_, i) => `Groupe ${i + 1}`);
    const groupes = this.groupesService.formerGroupesAleatoires(
      liste.personnes,
      nbGroupes,
      nomsGroupes,
      criteres
    );

    this.groupesFormes[idListe] = groupes;
  }

  private getDefaultPersonne(): Personne {
    return {
      nom: '',
      genre: 'MASCULIN',
      aisanceFrancais: 1,
      ancienDWWM: false,
      niveauTechnique: 1,
      profil: 'TIMIDE',
      age: 18
    };
  }
}