// src/app/core/services/groupes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';
import { Groupe } from '../../models/groupe.model';
import { Tirage } from '../../models/tirage.model';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ----- API REST -----

  getListes(): Observable<Liste[]> {
    return this.http.get<Liste[]>(`${this.api}/listes`);
  }

  ajouterListe(nom: string): Observable<Liste> {
    return this.http.post<Liste>(`${this.api}/listes`, { nom });
  }

  supprimerListe(idListe: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/listes/${idListe}`);
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
    return this.http.patch<Tirage>(`${this.api}/listes/${idListe}/tirages/${tirageId}`, {
      valide: true
    });
  }

  // ----- LOGIQUE DE GROUPEMENT -----

  formerGroupesAleatoires(
    personnes: Personne[],
    nombreGroupes: number,
    nomsGroupes: string[],
    criteresMixite: string[]
  ): Groupe[] {
    if (!personnes.length || nombreGroupes < 1 || nomsGroupes.length !== nombreGroupes) {
      return [];
    }

    const estAncien = (p: Personne) => p.ancienDWWM;
    const getTrancheAge = (p: Personne) =>
      p.age < 25 ? 'jeune' : p.age < 40 ? 'moyen' : 'senior';

    const melanger = (arr: Personne[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    const groupes: Groupe[] = nomsGroupes.map(nom => ({ nom, membres: [] }));
    let reste = [...personnes];

    if (!criteresMixite.length) {
      melanger(reste);
      reste.forEach((p, i) => groupes[i % nombreGroupes].membres.push(p));
      return groupes;
    }

    if (criteresMixite.includes('anciensDWWM')) {
      const anciens = reste.filter(estAncien);
      const autres = reste.filter(p => !estAncien(p));
      melanger(anciens);
      melanger(autres);
      [...anciens, ...autres].forEach((p, i) => groupes[i % nombreGroupes].membres.push(p));
      return groupes;
    }

    if (criteresMixite.includes('mixAge')) {
      const byTranche: Record<string, Personne[]> = {};
      reste.forEach(p => {
        const tranche = getTrancheAge(p);
        (byTranche[tranche] ||= []).push(p);
      });
      Object.values(byTranche).forEach(arr => {
        melanger(arr);
        arr.forEach((p, i) => groupes[i % nombreGroupes].membres.push(p));
      });
      return groupes;
    }

    melanger(reste);
    reste.forEach((p, i) => groupes[i % nombreGroupes].membres.push(p));
    return groupes;
  }
}
