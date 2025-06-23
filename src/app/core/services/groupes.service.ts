// src/app/core/services/groupes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';

export interface Groupe {
  nom: string;
  membres: Personne[];
}

export interface Tirage {
  id?: number;
  groupes: Groupe[];
  date: string | Date;
  valide: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GroupesService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ----------- REST API -----------

  getListes(): Observable<Liste[]> {
    return this.http.get<Liste[]>(`${this.api}/listes`);
  }

  ajouterListe(nom: string): Observable<Liste> {
    return this.http.post<Liste>(`${this.api}/listes`, { nom });
  }

  ajouterPersonneDansListe(idListe: number, personne: Personne): Observable<Personne> {
    return this.http.post<Personne>(`${this.api}/listes/${idListe}/personnes`, personne);
  }

  getPersonnes(idListe: number): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${this.api}/listes/${idListe}/personnes`);
  }

  getHistoriqueGroupes(idListe: number): Observable<Tirage[]> {
    return this.http.get<Tirage[]>(`${this.api}/listes/${idListe}/tirages`);
  }

  enregistrerTirage(idListe: number, tirage: Tirage): Observable<Tirage> {
    return this.http.post<Tirage>(`${this.api}/listes/${idListe}/tirages`, tirage);
  }

  validerTirage(idListe: number, tirageId: number): Observable<Tirage> {
    return this.http.patch<Tirage>(`${this.api}/listes/${idListe}/tirages/${tirageId}`, { valide: true });
  }

  // ----------- LOGIQUE ALEATOIRE (FRONT) -----------

  formerGroupesAleatoires(
    personnes: Personne[],
    nombreGroupes: number,
    nomsGroupes: string[],
    criteresMixite: string[]
  ): Groupe[] {
    if (!personnes || personnes.length === 0) return [];
    if (nombreGroupes <= 0 || nomsGroupes.length !== nombreGroupes) return [];

    // --- Critères de répartition ---
    const estAncienDWWM = (p: Personne) => p.ancienDWWM === true;
    const getTrancheAge = (p: Personne) => {
      if (!p.age) return 'inconnu';
      if (p.age < 25) return 'jeune';
      if (p.age < 40) return 'moyen';
      return 'senior';
    };

    // --- Mélange de Fisher-Yates ---
    const melanger = (arr: Personne[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    // --- Création des groupes vides ---
    const groupes: Groupe[] = nomsGroupes.map(nom => ({ nom, membres: [] }));

    // --- Répartition ---
    let personnesRestantes = [...personnes];

    if (criteresMixite.length === 0) {
      melanger(personnesRestantes);
      personnesRestantes.forEach((p, i) => {
        groupes[i % nombreGroupes].membres.push(p);
      });
    } else if (criteresMixite.includes('anciensDWWM')) {
      const anciens = personnesRestantes.filter(estAncienDWWM);
      const autres = personnesRestantes.filter(p => !estAncienDWWM(p));
      melanger(anciens);
      melanger(autres);
      anciens.forEach((p, i) => {
        groupes[i % nombreGroupes].membres.push(p);
      });
      autres.forEach((p, i) => {
        groupes[i % nombreGroupes].membres.push(p);
      });
    } else if (criteresMixite.includes('mixAge')) {
      const groupesAge: { [tranche: string]: Personne[] } = {};
      personnesRestantes.forEach(p => {
        const tranche = getTrancheAge(p);
        if (!groupesAge[tranche]) groupesAge[tranche] = [];
        groupesAge[tranche].push(p);
      });
      Object.values(groupesAge).forEach(arr => melanger(arr));
      Object.values(groupesAge).forEach(arr => {
        arr.forEach((p, i) => {
          groupes[i % nombreGroupes].membres.push(p);
        });
      });
    } else {
      melanger(personnesRestantes);
      personnesRestantes.forEach((p, i) => {
        groupes[i % nombreGroupes].membres.push(p);
      });
    }

    return groupes;
  }
}
