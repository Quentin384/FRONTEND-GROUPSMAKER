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

  /**
   * Forme des groupes selon un nombre défini, noms donnés, et critères de mixité.
   * @param nomListe Le nom de la liste.
   * @param nombreGroupes Le nombre de groupes souhaités.
   * @param nomsGroupes Les noms à donner aux groupes.
   * @param criteresMixite Liste des critères à prendre en compte ('anciensDWWM', 'mixAge', etc.)
   * @returns Un tableau de groupes (nom + membres).
   */
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

    // Empêcher le tirage si le dernier tirage est validé
    const dernierTirage = this.historiqueTirages[nomListe]?.slice(-1)[0];
    if (dernierTirage?.valide) {
      console.warn(`Le dernier tirage est validé, impossible de le modifier.`);
      return dernierTirage.groupes;
    }

    // Copier les personnes
    let personnes = [...liste.personnes];

    // Fonction pour vérifier si une personne est ancien DWWM (exemple)
    const estAncienDWWM = (p: Personne) => p.ancienDWWM === true;

    // Fonction pour obtenir la tranche d'âge (exemple simple)
    const getTrancheAge = (p: Personne) => {
      if (!p.age) return 'inconnu';
      if (p.age < 25) return 'jeune';
      if (p.age < 40) return 'moyen';
      return 'senior';
    };

    // Initialiser groupes vides avec noms
    const groupes: Groupe[] = nomsGroupes.map(nom => ({ nom, membres: [] }));

    // Si aucun critère, faire un simple mélange et répartition
    if (criteresMixite.length === 0) {
      // Mélanger Fisher-Yates
      for (let i = personnes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [personnes[i], personnes[j]] = [personnes[j], personnes[i]];
      }
      personnes.forEach((p, i) => {
        groupes[i % nombreGroupes].membres.push(p);
      });
    } else {
      // Gérer les critères
      // Exemple : on répartit d'abord les anciens DWWM dans chaque groupe
      if (criteresMixite.includes('anciensDWWM')) {
        const anciens = personnes.filter(estAncienDWWM);
        const autres = personnes.filter(p => !estAncienDWWM(p));

        // Mélanger chaque sous-groupe
        const melanger = (arr: Personne[]) => {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        };
        melanger(anciens);
        melanger(autres);

        // Répartir les anciens d'abord
        anciens.forEach((p, i) => {
          groupes[i % nombreGroupes].membres.push(p);
        });
        // Puis le reste
        autres.forEach((p, i) => {
          groupes[i % nombreGroupes].membres.push(p);
        });
      } else {
        // Pas d'ancien DWWM à gérer
        // Gérer uniquement mixAge si demandé
        if (criteresMixite.includes('mixAge')) {
          // Séparer par tranche d'âge
          const groupesAge: { [tranche: string]: Personne[] } = {};
          personnes.forEach(p => {
            const tranche = getTrancheAge(p);
            if (!groupesAge[tranche]) groupesAge[tranche] = [];
            groupesAge[tranche].push(p);
          });

          // Mélanger chaque tranche
          const melanger = (arr: Personne[]) => {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
          };
          Object.values(groupesAge).forEach(arr => melanger(arr));

          // Répartir chaque tranche dans les groupes, groupe par groupe, tranche par tranche
          Object.values(groupesAge).forEach(arr => {
            arr.forEach((p, i) => {
              groupes[i % nombreGroupes].membres.push(p);
            });
          });
        } else {
          // Pas de critère, répartition simple
          for (let i = personnes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [personnes[i], personnes[j]] = [personnes[j], personnes[i]];
          }
          personnes.forEach((p, i) => {
            groupes[i % nombreGroupes].membres.push(p);
          });
        }
      }
    }

    // Vérifier répétition du tirage (simple comparaison des groupes par noms et membres)
    if (this.historiqueTirages[nomListe]) {
      for (const tirage of this.historiqueTirages[nomListe]) {
        if (this.tiragesEgaux(tirage.groupes, groupes)) {
          console.warn(`Tirage identique déjà existant, relancer le tirage.`);
          // On pourrait ici relancer récursivement ou retourner un message
          return [];
        }
      }
    } else {
      this.historiqueTirages[nomListe] = [];
    }

    // Stocker ce tirage non validé
    this.historiqueTirages[nomListe].push({
      groupes,
      date: new Date(),
      valide: false
    });

    liste.tirages++;

    return groupes;
  }

  /**
   * Compare deux tirages (groupes) pour vérifier s'ils sont identiques.
   * Comparaison simple par membres dans chaque groupe.
   */
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

  /**
   * Valide un tirage, empêchant toute modification future.
   * @param nomListe Le nom de la liste concernée.
   */
  validerTirage(nomListe: string): void {
    const tirages = this.historiqueTirages[nomListe];
    if (!tirages || tirages.length === 0) return;
    tirages[tirages.length - 1].valide = true;
  }

  /**
   * Récupère le dernier tirage (validé ou non).
   */
  getDernierTirage(nomListe: string): Tirage | undefined {
    return this.historiqueTirages[nomListe]?.slice(-1)[0];
  }
}
