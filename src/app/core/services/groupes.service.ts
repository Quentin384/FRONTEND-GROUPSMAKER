import { Injectable } from '@angular/core';
import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';

export interface Groupe {
  nom: string;
  membres: Personne[];
}

export interface Tirage {
  groupes: Groupe[];
  date: Date;
  valide: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GroupesService {
  private listes: Liste[] = [];
  private historiqueTirages: { [nomListe: string]: Tirage[] } = {};

  getListes(): Liste[] {
    return this.listes;
  }

  ajouterListe(nom: string): void {
    if (this.listes.find(l => l.nom === nom)) {
      return;
    }
    this.listes.push({
      nom,
      tirages: 0,
      personnes: []
    });
  }

  ajouterPersonneDansListe(nomListe: string, personne: Personne): void {
    const liste = this.listes.find(l => l.nom === nomListe);
    if (!liste) {
      console.warn(`Liste '${nomListe}' non trouvée`);
      return;
    }
    liste.personnes.push(personne);
  }

  formerGroupesAleatoires(
    nomListe: string,
    nombreGroupes: number,
    nomsGroupes: string[],
    criteresMixite: string[]
  ): Groupe[] {
    const liste = this.listes.find(l => l.nom === nomListe);
    if (!liste) {
      console.warn(`Liste '${nomListe}' non trouvée`);
      return [];
    }
    if (nombreGroupes <= 0 || nomsGroupes.length !== nombreGroupes) {
      console.warn(`Nombre de groupes ou noms invalides`);
      return [];
    }

    const dernierTirage = this.historiqueTirages[nomListe]?.slice(-1)[0];
    if (dernierTirage?.valide) {
      console.warn(`Le dernier tirage est validé, impossible de le modifier.`);
      return dernierTirage.groupes;
    }

    let personnes = [...liste.personnes];

    const estAncienDWWM = (p: Personne) => p.ancienDWWM === true;

    const getTrancheAge = (p: Personne) => {
      if (!p.age) return 'inconnu';
      if (p.age < 25) return 'jeune';
      if (p.age < 40) return 'moyen';
      return 'senior';
    };

    const groupes: Groupe[] = nomsGroupes.map(nom => ({ nom, membres: [] }));

    // Fonction pour mélanger un tableau (Fisher-Yates)
    const melanger = (arr: Personne[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    if (criteresMixite.length === 0) {
      melanger(personnes);
      personnes.forEach((p, i) => {
        groupes[i % nombreGroupes].membres.push(p);
      });
    } else {
      if (criteresMixite.includes('anciensDWWM')) {
        const anciens = personnes.filter(estAncienDWWM);
        const autres = personnes.filter(p => !estAncienDWWM(p));

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
        personnes.forEach(p => {
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
        melanger(personnes);
        personnes.forEach((p, i) => {
          groupes[i % nombreGroupes].membres.push(p);
        });
      }
    }

    if (!this.historiqueTirages[nomListe]) {
      this.historiqueTirages[nomListe] = [];
    }

    for (const tirage of this.historiqueTirages[nomListe]) {
      if (this.tiragesEgaux(tirage.groupes, groupes)) {
        console.warn(`Tirage identique déjà existant, relancer le tirage.`);
        return [];
      }
    }

    this.historiqueTirages[nomListe].push({
      groupes,
      date: new Date(),
      valide: false
    });

    liste.tirages++;

    return groupes;
  }

  private tiragesEgaux(g1: Groupe[], g2: Groupe[]): boolean {
    if (g1.length !== g2.length) return false;
    for (let i = 0; i < g1.length; i++) {
      const membres1 = g1[i].membres.map(p => p.nom).sort();
      const membres2 = g2[i].membres.map(p => p.nom).sort();
      if (membres1.length !== membres2.length) return false;
      for (let j = 0; j < membres1.length; j++) {
        if (membres1[j] !== membres2[j]) return false;
      }
    }
    return true;
  }

  validerTirage(nomListe: string): void {
    const tirages = this.historiqueTirages[nomListe];
    if (!tirages || tirages.length === 0) return;
    tirages[tirages.length - 1].valide = true;
  }

  getDernierTirage(nomListe: string): Tirage | undefined {
    return this.historiqueTirages[nomListe]?.slice(-1)[0];
  }

  getHistoriqueGroupes(): { [nomListe: string]: Tirage[] } {
    return this.historiqueTirages;
  }
}
